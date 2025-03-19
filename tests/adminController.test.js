const adminController = require("../controllers/adminController");
const { Post, User, Ad, Report } = require("../models");

// Mock Sequelize models
jest.mock("../models", () => ({
  Post: {
    findByPk: jest.fn(),
    destroy: jest.fn(),
  },
  User: {
    findByPk: jest.fn(),
  },
  Ad: {
    create: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
  },
  Report: {
    findAll: jest.fn(),
  },
}));

describe("Admin Controller", () => {
  let req, res;

  beforeEach(() => {
    // Mock request and response objects
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  // Test 1: Delete a Post
  describe("deletePost", () => {
    it("should delete a post and return success message", async () => {
      req.params.postId = "123";
      const mockPost = { id: "123", destroy: jest.fn().mockResolvedValue() };
      Post.findByPk.mockResolvedValue(mockPost);

      await adminController.deletePost(req, res);

      expect(Post.findByPk).toHaveBeenCalledWith("123");
      expect(mockPost.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Post deleted successfully" });
    });

    it("should return 404 if post is not found", async () => {
      req.params.postId = "123";
      Post.findByPk.mockResolvedValue(null);

      await adminController.deletePost(req, res);

      expect(Post.findByPk).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Post not found" });
    });
  });
  // Test 2: Approve/Reject Posts
  describe("approveOrRejectPost", () => {
    it("should approve a post and return success message", async () => {
      req.params.postId = "123";
      req.body.status = "approved";
      const mockPost = { id: "123", status: "pending", save: jest.fn().mockResolvedValue() };
      Post.findByPk.mockResolvedValue(mockPost);

      await adminController.approveOrRejectPost(req, res);

      expect(Post.findByPk).toHaveBeenCalledWith("123");
      expect(mockPost.status).toBe("approved");
      expect(mockPost.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Post approved successfully", post: mockPost });
    });

    it("should reject a post and return success message", async () => {
      req.params.postId = "123";
      req.body.status = "rejected";
      const mockPost = { id: "123", status: "pending", save: jest.fn().mockResolvedValue() };
      Post.findByPk.mockResolvedValue(mockPost);

      await adminController.approveOrRejectPost(req, res);

      expect(Post.findByPk).toHaveBeenCalledWith("123");
      expect(mockPost.status).toBe("rejected");
      expect(mockPost.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Post rejected successfully", post: mockPost });
    });
  });

  // Test 3: Ban Users
  describe("banUser", () => {
    it("should ban a user and return success message", async () => {
      req.params.userId = "123";
      const mockUser = { id: "123", status: "active", save: jest.fn().mockResolvedValue() };
      User.findByPk.mockResolvedValue(mockUser);

      await adminController.banUser(req, res);

      expect(User.findByPk).toHaveBeenCalledWith("123");
      expect(mockUser.status).toBe("banned");
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "User banned successfully", user: mockUser });
    });
  });

  // Test 4: View Reports
  describe("viewReports", () => {
    it("should fetch all reports and return them", async () => {
      const mockReports = [{ id: "1", reason: "Spam" }];
      Report.findAll.mockResolvedValue(mockReports);

      await adminController.viewReports(req, res);

      expect(Report.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ reports: mockReports });
    });
  });
});