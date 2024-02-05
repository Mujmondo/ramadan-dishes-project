const { describe, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../server");
const dishesCooktime = require("../utils/dishesCooktime");

describe("GET /cooktime", () => {
  it("should return data for valid queries", async () => {
    const response = await request(app)
      .get("/cooktime")
      .query({ day: 15, ingredient: "Horseradish" });

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([
      {
        name: "Blunkett Salad",
        ingredients: ["Bread", "Horseradish", "Egg", "Tuna"],
        cooktime: "117 minutes after Asr",
      },
    ]);
  });


  it("should handle ungiven queries", async () => {
    const response = await request(app)
      .get("/cooktime")
      .query({ day: 0, ingredient: "Garlic" });

    expect(response.status).toBe(400);
  });
});


describe("GET /suggest", () => {
  it("should return data for valid day query", async () => {
    const response = await request(app).get("/suggest").query({ day: 15 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "ingredients", "cooktime");
  });

  it("should handle invalid queries", async () => {
    const response = await request(app).get("/suggest").query({ day: "jdids" });

    expect(response.status).toBe(400);
  });
});


describe("dishes with cooktime function", () => {
  it("should return dishes and filter times array according to specific given day with calculated cooktime", () => {
    const times = [
      { day: "25", asr: "15:48", Maghrib: "18:37" },
      { day: "26", asr: "15:48", Maghrib: "18:37" },
    ];
    const dishes = [
      {
        name: "Ummak Huriya",
        ingredients: ["Carrot", "Garlic", "Harissa", "Onion"],
        duration: 15,
      },
      {
        name: "Jerbian Rice",
        ingredients: ["Carrot", "Rice", "Potatoe", "Onion", "Tomatoe"],
        duration: 300,
      },
    ];
    expect(dishesCooktime(times, dishes, 25)).toEqual([
      {
        name: "Ummak Huriya",
        ingredients: ["Carrot", "Garlic", "Harissa", "Onion"],
        cooktime: "139 minutes after Asr",
      },
      {
        name: "Jerbian Rice",
        ingredients: ["Carrot", "Rice", "Potatoe", "Onion", "Tomatoe"],
        cooktime: "146 minutes before Asr",
      },
    ]);
  });
});
