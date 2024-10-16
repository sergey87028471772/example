import request from "supertest";

import { app } from "../src/0_app";

describe("/items", () => {
  test("should return an array of items with expected properties", async () => {
    const response = await request(app).get("/items/get?limit=10&offset=0");

    expect(response.status).toBe(200);

    response.body.forEach((item: any) => {
      expect(typeof item.marketHashName).toBe("string");
      expect(typeof item.currency).toBe("string");
      expect(typeof item.itemPage).toBe("string");
      expect(typeof item.marketPage).toBe("string");
      expect(typeof item.quantity).toBe("number");
      expect(item.suggestedPrice).toBeNumberOrNull();
      expect(item.minPrice).toBeNumberOrNull();
      expect(item.maxPrice).toBeNumberOrNull();
      expect(item.meanPrice).toBeNumberOrNull();
      expect(item.medianPrice).toBeNumberOrNull();
      expect(typeof item.createdAt).toBe("string");
      expect(typeof item.updatedAt).toBe("string");
      expect(typeof item.id).toBe("string");
    });
  });

  test("POST / should register purchase", async () => {
    const requestBody = {
      userName: "admin",
      purchaseItems: [
        {
          id: "ed8ef982-94e7-4448-bc68-ab8378bca9fa",
          count: 1,
        },
      ],
    };

    const response = await request(app)
      .post("/items/buy")
      .send(requestBody)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        result: "Покупка зарегистрирована",
      })
    );
  });
});
