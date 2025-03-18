const request = require("supertest");
const app = require("../app"); 
const Moderation = require("../models/moderation");

jest.mock("../models/moderation");

describe("Moderation System Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    test("POST /moderation/flagcomment - Should flag a comment", async () => {
        Moderation.create.mockResolvedValue({
            id: "flag-uuid",
            userId: "U1",
            targetId: "C10",
            type: "comment",
            reason: "Spam content"
        });

        const response = await request(app)
            .post("/moderation/flagcomment")
            .send({
                userId: "U1",
                commentId: "C10",
                reason: "Spam content"
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Comment flagged successfully");
    });

    test("POST /moderation/reportscam - Should report a user as a scammer", async () => {
        Moderation.create.mockResolvedValue({
            id: "report-uuid",
            userId: "U2",
            targetId: "U3",
            type: "scam",
            reason: "Fraudulent activity"
        });

        const response = await request(app)
            .post("/moderation/reportscam")
            .send({
                userId: "U2",
                reportedUserId: "U3",
                reason: "Fraudulent activity"
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User reported as scam successfully");
    });

    test("GET /moderation/flaggedcomments - Should retrieve all flagged comments", async () => {
        Moderation.findAll.mockResolvedValue([
            {
                id: "flag-uuid",
                userId: "U1",
                targetId: "C10",
                type: "comment",
                reason: "Offensive language",
                User: { id: "U1", username: "Alice" },
                FlaggedComment: { id: "C10", content: "Some bad comment" }
            }
        ]);

        const response = await request(app).get("/moderation/flaggedcomments");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].reason).toBe("Offensive language");
    });

    test("GET /moderation/reportedscams - Should retrieve all reported scam users", async () => {
        Moderation.findAll.mockResolvedValue([
            {
                id: "report-uuid",
                userId: "U2",
                targetId: "U3",
                type: "scam",
                reason: "Fake identity",
                User: { id: "U2", username: "Bob" },
                ReportedUser: { id: "U3", username: "FakeAccount123" }
            }
        ]);

        const response = await request(app).get("/moderation/reportedscams");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].ReportedUser.username).toBe("FakeAccount123");
    });
});
