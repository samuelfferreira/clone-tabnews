import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        let response1Body = await response1.json();

        expect(Array.isArray(response1Body)).toBe(true);
        expect(response1Body.length).toBeGreaterThan(0);
        expect(response1.status).toBe(201);
      });

      test("For the second time", async () => {
        const response2 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        let response2Body2 = await response2.json();

        expect(Array.isArray(response2Body2)).toBe(true);
        expect(response2Body2.length).toBe(0);
      });
    });
  });
});
