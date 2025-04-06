const { exec } = require("node:child_process");
function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handlerReturn);

  function handlerReturn(error, stdout, stderror) {
    if (stdout.search("accepting connections") === -1) {
      //console.log("Não está aceitando conexões ainda.");
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\nPostgres está pronto e aceitando conexões");
  }
}

process.stdout.write("\n\nAguardando postgres aceitar conexões");
checkPostgres();
