import { describe, expect, test } from "@jest/globals";

import request from "supertest";

import app from "../src/0_app/app";

// >>>>>>>>>. in process

describe("Items API", () => {
  test("GET / should return more than 1 Item", async () => {
    const response = await request(app).get("/get");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(1);

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        market_hash_name: expect.any(String),
        currency: expect.any(String),
        suggested_price: expect.any(Number),
        item_page: expect.any(String),
        market_page: expect.any(String),
        min_price: expect.any(Number),
        max_price: expect.any(Number),
        mean_price: expect.any(Number),
        median_price: expect.any(Number),
        quantity: expect.any(Number),
        created_at: expect.any(Number),
        updated_at: expect.any(Number),
      })
    );
  });

  test("POST / should register purchase", async () => {
    const requestBody = {
      userName: "testUser",
      purchaseItems: [
        {
          marketHashName: "StatTrak™ Galil AR | Rocket Pop (Factory New)",
          count: 2,
        },
      ],
    };

    const response = await request(app)
      .post("/buy")
      .send(requestBody)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Покупка зарегистрирована");
  });
});
