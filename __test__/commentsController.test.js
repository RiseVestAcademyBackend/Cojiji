const commentController = require("../controllers/commentsController");
const Comments = require("../models/comment");
const request = require("supertest");
const app = require("../app");

// jest.mock('../models/comment')

const mockComment = {
  id: "2435",
  content: "Here",
  buyerId: "1234",
  adId: "906054",
  votes: 0,
  createdAt: "2025",
  updatedAt: "2025",
  BuyerId: null,
  AdId: null,
};

describe("GET /ads/:adId/comments/:commentId", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should fetch a single comment tied to an ad", async () => {
    jest.spyOn(Comments, "findOne").mockImplementation(() => mockComment);

    const response = await request(app).get("/ads/906054/comments/2435");
    expect(response.body).toEqual({ comment: mockComment });
    expect(response.statusCode).toBe(200);
  });

  it("should throw a 404 when the comment isn't found", async () => {
    jest.spyOn(Comments, "findOne").mockImplementation(() => null);

    const response = await request(app).get("/ads/906054/comments/123");
    expect(response.statusCode).toBe(404);
  });
});

describe("GET /ads/:adId/comments", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should fetch all comments associated to an ad", async () => {
    jest.spyOn(Comments, "findAll").mockImplementation(() => [mockComment]);

    const response = await request(app).get("/ads/906054/comments");
    expect(response.body).toEqual([mockComment]);
    expect(response.statusCode).toBe(200);
  });

  it("should return empty array when no comments are found", async () => {
    jest.spyOn(Comments, "findAll").mockImplementation(() => []);

    const response = await request(app).get("/ads/906054/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("POST /ad/:adId/comment", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a new comment", async () => {
    jest.spyOn(Comments, "create").mockImplementation(() => mockComment);
    jest.spyOn(Comments, "findByPk").mockImplementation((id) => (id === "1234" || id === "906054") ? {} : null);

    const response = await request(app)
      .post("/ad/906054/comment")
      .send({ buyer: "1234", comment: "New comment" });

    expect(response.statusCode).toBe(200);
    expect(response.body._comment).toEqual(mockComment);
  });

  it("should return 404 if buyer or ad is not found", async () => {
    jest.spyOn(Comments, "findByPk").mockImplementation(() => null);

    const response = await request(app)
      .post("/ad/906054/comment")
      .send({ buyer: "9999", comment: "New comment" });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Buyer or Ad not found.");
  });

  it("should return 500 on validation error", async () => {
    const response = await request(app)
      .post("/ad/906054/comment")
      .send({ buyer: "1234" });

    expect(response.statusCode).toBe(500);
  });
});

describe("PATCH /comment/:commentId", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should update a comment within 15 minutes", async () => {
    const updatedComment = { ...mockComment, content: "Updated comment" };

    jest.spyOn(Comments, "findByPk").mockImplementation(() => mockComment);
    jest.spyOn(mockComment, "save").mockImplementation(() => updatedComment);

    const response = await request(app)
      .patch("/comment/2435")
      .send({ comment: "Updated comment" });

    expect(response.statusCode).toBe(200);
    expect(response.body._comment.content).toBe("Updated comment");
  });

  it("should return 403 if comment is older than 15 minutes", async () => {
    const oldComment = { ...mockComment, createdAt: new Date(Date.now() - 16 * 60 * 1000) };
    jest.spyOn(Comments, "findByPk").mockImplementation(() => oldComment);

    const response = await request(app)
      .patch("/comment/2435")
      .send({ comment: "Updated comment" });

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("Comment can only be updated within 15 minutes of creation.");
  });

  it("should return 404 if comment does not exist", async () => {
    jest.spyOn(Comments, "findByPk").mockImplementation(() => null);

    const response = await request(app)
      .patch("/comment/9999")
      .send({ comment: "Updated comment" });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Comment not found.");
  });
});

describe("POST /comment/:commentId/vote/:vote", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should upvote a comment successfully", async () => {
    const updatedComment = { ...mockComment, votes: mockComment.votes + 1 };
    jest.spyOn(Comments, "findByPk").mockImplementation(() => mockComment);
    jest.spyOn(mockComment, "save").mockImplementation(() => updatedComment);

    const response = await request(app)
      .patch("/comment/2435/vote/upvote");

    expect(response.statusCode).toBe(200);
    expect(response.body._comment.votes).toBe(mockComment.votes + 1);
  });

  it("should downvote a comment successfully", async () => {
    const updatedComment = { ...mockComment, votes: mockComment.votes - 1 };
    jest.spyOn(Comments, "findByPk").mockImplementation(() => mockComment);
    jest.spyOn(mockComment, "save").mockImplementation(() => updatedComment);

    const response = await request(app)
      .patch("/comment/2435/vote/downvote");

    expect(response.statusCode).toBe(200);
    expect(response.body._comment.votes).toBe(mockComment.votes - 1);
  });

  it("should return 404 if comment does not exist", async () => {
    jest.spyOn(Comments, "findByPk").mockImplementation(() => null);

    const response = await request(app)
      .patch("/comment/9999/vote/upvote");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Comment not found.");
  });

  it("should return 500 on validation error", async () => {
    const response = await request(app)
      .patch("/comment/2435/vote/invalidVote");

    expect(response.statusCode).toBe(500);
  });
});
