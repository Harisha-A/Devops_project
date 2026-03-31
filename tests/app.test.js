import request from "supertest";
import express from "express";
import app from "../server.js"; // you need to export app

test("GET / should return 200", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
});

test("POST /weather with no city should return 200 and show error", async () => {
  const res = await request(app).post("/weather").send("city=");
  expect(res.statusCode).toBe(200);
  expect(res.text).toContain("Unable to get weather data");
});

test("GET /unknown should return 404", async () => {
  const res = await request(app).get("/unknown-route");
  expect(res.statusCode).toBe(404);
});