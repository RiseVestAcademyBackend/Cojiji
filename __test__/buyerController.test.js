//viewOrderHistory testing
const { viewOrderHistory, verifyAccount, saveFavourite } = require("../controllers/buyerController");
const Order = require("../models/orders");
const Buyer = require("../models/buyer");

jest.mock("../models/orders");  
jest.mock("../models/buyer");

describe("viewOrderHistory", () => {
    let req, res;
    beforeEach(() => {
        req = {
            params: {
                buyerId: "buyer123", // Mocked buyerId
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it("should return 200 and orders when orders are found", async () => {
        const mockOrders = [
            { id: "order1", status: "successful" },
            { id: "order2", status: "inprogress" },
        ];

        Order.findAll.mockResolvedValue(mockOrders); // Mock the resolved value

        await viewOrderHistory(req, res);

        expect(Order.findAll).toHaveBeenCalledWith({ where: { buyerId: "buyer123" } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ orders: mockOrders });
    });

    it("should return 404 when no orders are found", async () => {
        Order.findAll.mockResolvedValue([]); // Return an empty array for no orders

        await viewOrderHistory(req, res);

        expect(Order.findAll).toHaveBeenCalledWith({ where: { buyerId: "buyer123" } });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "No orders found for this buyer." });
    });

    it("should return 500 when an error occurs", async () => {
        const mockError = new Error("Database error");

        Order.findAll.mockRejectedValue(mockError); // Mock a rejected promise

        await viewOrderHistory(req, res);

        expect(Order.findAll).toHaveBeenCalledWith({ where: { buyerId: "buyer123" } });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Error fetching order history",
            error: mockError,
        });
    });
});


//verifyBuyer testing
describe("verifyAccount", () => {
    let req, res;
    beforeEach(() => {
        req = {
            params: {
                buyerId: "buyer123",   
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();  
    });

    it("should return 404 if buyer is not found", async () => {
        Buyer.findByPk = jest.fn().mockResolvedValue(null);

        await verifyAccount(req, res);

        expect(Buyer.findByPk).toHaveBeenCalledWith("buyer123");
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Buyer not found." });
    });

    it("should verify the account and return 200 with buyer data", async () => {
        const mockBuyer = {
            id: "buyer123",
            is_verified: false,
            save: jest.fn().mockResolvedValue(true),  
        };

        Buyer.findByPk = jest.fn().mockResolvedValue(mockBuyer);

        await verifyAccount(req, res);

        expect(Buyer.findByPk).toHaveBeenCalledWith("buyer123");
        expect(mockBuyer.is_verified).toBe(true); // Ensure verification status is updated
        expect(mockBuyer.save).toHaveBeenCalled(); // Ensure the save method is called
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Account verified successfully.",
            buyer: mockBuyer,
        });
    });

    it("should return 500 if an error occurs", async () => {
        const mockError = new Error("Database error");

        Buyer.findByPk = jest.fn().mockRejectedValue(mockError);

        await verifyAccount(req, res);

        expect(Buyer.findByPk).toHaveBeenCalledWith("buyer123");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Error verifying account",
            error: mockError,
        });
    });
});






//saveFavoritw testing