const commentController = require("../controllers/commentsController");
const Comments = require("../models/comment");
const Buyer = require("../models/buyer")
const Ad = require("../models/ad")
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
  AdId: null
};

const updateComment = {
  id: "2435",
  content: "Here",
  buyerId: "1234",
  adId: "906054",
  votes: 0,
  createdAt: "2025",
  updatedAt: "2025",
  BuyerId: null,
  AdId: null,
  createdAt: new Date(),
  save: () =>  {content: "Updated comment" }
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

describe("POST /ads/:adId/comment", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a new comment", async () => {
    jest.spyOn(Comments, "create").mockImplementation(() => mockComment);
    jest.spyOn(Buyer, "findByPk").mockImplementation(() => true);
    jest.spyOn(Ad, "findByPk").mockImplementation(() => true);

    const response = await request(app)
      .post("/ads/5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f/comment")
      .send({ buyer: "5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f", comment: "New comment" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({message: 'Comment created', comment: mockComment});
  });

  it("should return 404 if buyer or ad is not found", async () => {
    jest.spyOn(Buyer, "findByPk").mockImplementation(() => null);
    jest.spyOn(Ad, "findByPk").mockImplementation(() => null);

    const response = await request(app)
      .post("/ads/5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f/comment")
      .send({ buyer: "5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f", comment: "New comment" });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Buyer or Ad not found.");
  });

  it("should return 500 on validation error", async () => {
    const response = await request(app)
      .post("/ads/5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f/comment")
      .send({ buyer: "5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f" });

    expect(response.statusCode).toBe(500);
  });
});

describe("PATCH /ads/comment/:commentId", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should update a comment within 15 minutes", async () => {
    jest.spyOn(Comments, "findByPk").mockImplementation(() => updateComment);

    const response = await request(app)
      .patch("/ads/comment/5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f")
      .send({ comment: "Updated comment" });

    expect(response.statusCode).toBe(200);
    expect(response.body._comment.content).toBe("Updated comment");
  });

  it("should return 403 if comment is older than 15 minutes", async () => {
    const oldComment = { ...mockComment, createdAt: new Date(Date.now() - 16 * 60 * 1000) };
    jest.spyOn(Comments, "findByPk").mockImplementation(() => oldComment);

    const response = await request(app)
      .patch("/ads/comment/5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f")
      .send({ comment: "Updated comment" });

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("Comment can only be updated within 15 minutes of creation.");
  });

  it("should return 404 if comment does not exist", async () => {
    jest.spyOn(Comments, "findByPk").mockImplementation(() => null);

    const response = await request(app)
      .patch("/ads/comment/5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f")
      .send({ comment: "Updated comment" });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Comment not found.");
  });
});

describe("POST /ads/comment/:commentId/vote/:vote", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should upvote a comment successfully", async () => {
    jest.spyOn(Comments, "findByPk").mockImplementation(() => updateComment);
    const response = await request(app)
      .post("/ads/comment/5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f/vote/upvote");

    expect(response.statusCode).toBe(200);
    expect(response.body._comment.votes).toBe(1);
  });

  it("should downvote a comment successfully", async () => {
    jest.spyOn(Comments, "findByPk").mockImplementation(() => updateComment);

    const response = await request(app)
      .post("/ads/comment/5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f/vote/downvote");

    expect(response.statusCode).toBe(200);
    expect(response.body._comment.votes).toBe(0);
  });

  it("should return 404 if comment does not exist", async () => {
    jest.spyOn(Comments, "findByPk").mockImplementation(() => null);

    const response = await request(app)
      .post("/ads/comment/5bcc9a1e-8f34-45d0-8eed-d22256ad4e3f/vote/upvote");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Comment not found.");
  });

  it("should return 500 on validation error", async () => {
    const response = await request(app)
      .post("/ads/comment/5bcc9a1e-8f34-45d0-8eed-d4e3f/vote/invalidVote");

    expect(response.statusCode).toBe(500);
  });
});
