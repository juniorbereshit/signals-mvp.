// index.js
// Pipeline principal do Robô Financeiro Comportamental

const { gerarSinalMatematico } = require("./model");
const fs = require("fs");

// ---------------------------------------------------------
// 1. Carregar dados (exemplo usando test_input.json)
// ---------------------------------------------------------
function carregarDados(caminho = "./test_input.json") {
  try {
    const raw = fs.readFileSync(caminho, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
    return null;
  }
}

// ---------------------------------------------------------
// 2. Executar o robô
// ---------------------------------------------------------
function executarRobo(data) {
  if (!data) {
    console.error("Nenhum dado fornecido ao robô.");
    return null;
  }

  const resultadoMatematico = gerarSinalMatematico(data);

  // Sinal final (por enquanto só o matemático)
  // Anchor.js vai ajustar isso depois
  const sinalFinal = resultadoMatematico.sinalBruto;

  return {
    entrada: data,
    resultadoMatematico,
    sinalFinal
  };
}

// ---------------------------------------------------------
// 3. Rodar localmente (para testes)
// ---------------------------------------------------------
function rodarLocal() {
  console.log("Iniciando execução local do robô...");

  const dados = carregarDados();

  if (!dados) {
    console.error("Falha ao carregar dados.");
    return;
  }

  const resultado = executarRobo(dados);

  console.log("Resultado do robô:");
  console.log(JSON.stringify(resultado, null, 2));

  // Salvar relatório local
  fs.writeFileSync("last_report.json", JSON.stringify(resultado, null, 2));
  console.log("Relatório salvo em last_report.json");
}

// ---------------------------------------------------------
// Execução direta via terminal
// ---------------------------------------------------------
if (require.main === module) {
  rodarLocal();
}

module.exports = {
  carregarDados,
  executarRobo,
  rodarLocal
};

