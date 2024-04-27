test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3001/api/v1/status");

  var responseBody = await response.json();
  //console.log(responseBody);

  expect(response.status).toBe(200);

  expect(responseBody.updated_at).toBeDefined();

  const parseUpdateAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toEqual(parseUpdateAt);

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toEqual("16.2");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});

// test.only("Teste sql injection", async () => {
//   // const response = await fetch(
//   //   "http://localhost:3001/api/v1/status?databaseName=local_db",
//   // );

//   const response = await fetch(
//     "http://localhost:3001/api/v1/status?databaseName='; select pg_sleep(4); --",
//   );
// });
