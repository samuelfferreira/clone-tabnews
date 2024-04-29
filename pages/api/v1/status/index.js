import database from "/infra/database.js";

async function status(request, response) {
  const databaseVersionResult = await database.query("show server_version;");
  const updatedAt = new Date().toISOString();
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  const databaseMaxConnectionsResult = await database.query(
    "show max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  //vulneravel
  // const databaseOpenedConnectionsResult = await database.query(
  //   `select count(*)::int from pg_stat_activity where datname = '${databaseName}';`,
  // );

  //nao vulneravel
  const databaseOpenedConnectionsResult = await database.query({
    text: "select count(*)::int from pg_stat_activity where datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;

//Dry Run
//Live run
