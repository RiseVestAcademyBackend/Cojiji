const adminController = require("../controllers/adminController");
const { Buyer, Ad, Admin } = require("../models"); // Import your actual models
const { v4: uuidv4 } = require('uuid');

// Mock Sequelize models (Adjusted to match your model structure)
jest.mock("../models", () => ({
  Buyer: {
    findByPk: jest.fn(),
    save: jest.fn(), // Added save for status updates
  },
  Ad: {
    findByPk: jest.fn(),
    destroy: jest.fn(),
  },
  Admin: { //Added the Admin model.
    findByPk: jest.fn(),
    findAll: jest.fn()
  }
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

  // Test 1: Delete an Ad (Corrected to use Ad model)
  describe("deleteAd", () => {
    it("should delete an ad and return success message", async () => {
      const adId = uuidv4();
      req.params.adId = adId;
      const mockAd = { id: adId, destroy: jest.fn().mockResolvedValue() };
      Ad.findByPk.mockResolvedValue(mockAd);

      await adminController.deleteAd(req, res); // Corrected function name

      expect(Ad.findByPk).toHaveBeenCalledWith(adId);
      expect(mockAd.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Ad deleted successfully" }); // Corrected message
    });

    it("should return 404 if ad is not found", async () => {
      const adId = uuidv4();
      req.params.adId = adId;
      Ad.findByPk.mockResolvedValue(null);

      await adminController.deleteAd(req, res); // Corrected function name

      expect(Ad.findByPk).toHaveBeenCalledWith(adId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Ad not found" }); // Corrected message
    });
  });

  // Test 2: Approve/Reject Ads (Adjusted to use Ad model)
  describe("approveOrRejectAd", () => {
    it("should approve an ad and return success message", async () => {
      const adId = uuidv4();
      req.params.adId = adId;
      req.body.status = "approved"; // You might have a status field in your Ad model
      const mockAd = { id: adId, status: "pending", save: jest.fn().mockResolvedValue() }; // Added status
      Ad.findByPk.mockResolvedValue(mockAd);

      await adminController.approveOrRejectAd(req, res); // Corrected function name

      expect(Ad.findByPk).toHaveBeenCalledWith(adId);
      expect(mockAd.status).toBe("approved"); // Check for status update
      expect(mockAd.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Ad approved successfully", ad: mockAd }); // Corrected message
    });

    it("should reject an ad and return success message", async () => {
      const adId = uuidv4();
      req.params.adId = adId;
      req.body.status = "rejected";  // You might have a status field in your Ad model
      const mockAd = { id: adId, status: "pending", save: jest.fn().mockResolvedValue() }; // Added status
      Ad.findByPk.mockResolvedValue(mockAd);

      await adminController.approveOrRejectAd(req, res); // Corrected function name

      expect(Ad.findByPk).toHaveBeenCalledWith(adId);
      expect(mockAd.status).toBe("rejected"); // Check status
      expect(mockAd.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Ad rejected successfully", ad: mockAd }); // Corrected message
    });
    it("should return 404 if ad is not found", async () => {
      const adId = uuidv4();
      req.params.adId = adId;
      req.body.status = "approved";
      Ad.findByPk.mockResolvedValue(null);

      await adminController.approveOrRejectAd(req, res);

      expect(Ad.findByPk).toHaveBeenCalledWith(adId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Ad not found" });
    });
  });

  // Test 3: Ban Users (Adjusted to use Buyer model)
  describe("banUser", () => {
    it("should ban a user and return success message", async () => {
      const userId = uuidv4();
      req.params.userId = userId;
      const mockUser = { id: userId, status: "active", save: jest.fn().mockResolvedValue() }; // Added status
      Buyer.findByPk.mockResolvedValue(mockUser);

      await adminController.banUser(req, res);

      expect(Buyer.findByPk).toHaveBeenCalledWith(userId);
      expect(mockUser.status).toBe("banned"); // Check status
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "User banned successfully", user: mockUser }); //Corrected message
    });
    it("should return 404 if user is not found", async () => {
      const userId = uuidv4();
      req.params.userId = userId;
      Buyer.findByPk.mockResolvedValue(null);

      await adminController.banUser(req, res);

      expect(Buyer.findByPk).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });

  // Test 4: View Reports (Assuming you have a Report model and controller method)
  describe("viewReports", () => {
    it("should fetch all reports and return them", async () => {
      const mockReports = [{ id: uuidv4(), reason: "Spam" }]; // Example report data
      // Assuming you have a Report model and a findAll method on it.
      Admin.findAll.mockResolvedValue(mockReports); // Adjusted to use Admin

      await adminController.viewReports(req, res);

      expect(Admin.findAll).toHaveBeenCalled(); // Corrected to Admin.findAll
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ reports: mockReports }); // Corrected key name
    });
    it("should return 200 with empty array if no reports", async () => {
      Admin.findAll.mockResolvedValue([]);

      await adminController.viewReports(req, res);

      expect(Admin.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ reports: [] });
    });
  });
});
