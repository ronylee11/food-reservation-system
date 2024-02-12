//require("dotenv").config(); // load environment variables

const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

const dbUrl =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/food_reservation_system";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(dbUrl);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();

  // Close the server
  app.close();
});

// Test the GET / route
describe("GET /", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
  });
});
