const request = require("supertest");
const app = require("../app");
const Ad = require("../models/ad");

//Mock the ad model so that the sequelize functions don't actually perform a db call
jest.mock("../models/ad", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("Ad Controller Tests", () => {
  it("should create an ad successfully", async () => {
    const mockAd = {
      id: 1,
      title: "Test Ad",
      description: "My first test ad",
      price: "N5,000",
      photo:"",
      category: "Electronics",
      boosted: "true",
      status: "available",
      sellerId:"1"
    };
    Ad.create.mockResolvedValue(mockAd)
    const response = await request(app).post("/ads").send(mockAd);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockAd)
    expect(Ad.create).toHaveBeenCalledWith(mockAd)
  });

  it("should get all ads", async()=>{
    const mockAds = [{
        id: 1,
        title: "Test Ad",
        description: "My first test ad",
        price: "N5,000",
        photo:"",
        category: "Electronics",
        boosted: "true",
        status: "available",
        sellerId:"1"
      },
      {
        id: 2,
        title: "LED strip light",
        description: "10m LED light for decoration",
        price: "N7,000",
        photo:"",
        category: "Electronics",
        boosted: "true",
        status: "available",
        sellerId:"2"
      }
    ];

    Ad.findAll.mockResolvedValue(mockAds);
    const response = await request(app).get("/ads")

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockAds);
    expect(Ad.findAll).toHaveBeenCalled();
  });

  it("should fetch a specific ad",async() =>{
    const mockAd = {
        id: 2,
        title: "LED strip light",
        description: "10m LED light for decoration",
        price: "N7,000",
        photo:"",
        category: "Electronics",
        boosted: "true",
        status: "available",
        sellerId:"2"
      };
      Ad.findByPk.mockResolvedValue(mockAd);
      const response = await request(app).get("/ads/2");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAd)
      expect(Ad.findByPk).toHaveBeenCalledWith("2")
  })
});
