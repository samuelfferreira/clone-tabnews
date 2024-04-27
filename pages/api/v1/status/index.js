import database from "../../../../infra/database";

async function status(request, response) {
  const result = await database.query("select 1;");
  console.log(result);
  response.status(200).json({
    chave: "valor",
  });
}

export default status;
