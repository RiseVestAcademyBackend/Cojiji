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
