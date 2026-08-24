// model.js
// Modelo matemático do Robô Financeiro Comportamental

const {
  scoreComportamentalFinal
} = require("./features");

// ---------------------------------------------------------
// 1. Fibonacci (retracement simples)
// ---------------------------------------------------------
function fibonacciLevels(precoAtual, max, min) {
  const diff = max - min;

  return {
    nivel236: max - diff * 0.236,
    nivel382: max - diff * 0.382,
    nivel618: max - diff * 0.618
  };
}

// ---------------------------------------------------------
// 2. Pitágoras (distância euclidiana entre movimentos)
// ---------------------------------------------------------
function distanciaPitagoras(a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

// ---------------------------------------------------------
// 3. Engenharia (médias, volatilidade, amplitude)
// ---------------------------------------------------------
function engenharia(data) {
  const mediaMovel = (data.precoAtual + data.precoAnterior) / 2;
  const volatilidade = Math.abs(data.precoAtual - mediaMovel);
  const amplitude = Math.abs(data.max - data.min);

  return {
    mediaMovel,
    volatilidade,
    amplitude
  };
}

// ---------------------------------------------------------
// 4. Sinal matemático bruto
// ---------------------------------------------------------
function gerarSinalMatematico(data) {
  const fib = fibonacciLevels(data.precoAtual, data.max, data.min);
  const pit = distanciaPitagoras(data.variacao, data.velocidade);
  const eng = engenharia(data);
  const comportamento = scoreComportamentalFinal(data);

  // Peso de cada componente
  const pesoFib = 0.25;
  const pesoPit = 0.20;
  const pesoEng = 0.25;
  const pesoComp = 0.30;

  // Normalizações simples
  const fibScore = data.precoAtual > fib.nivel382 ? 1 : 0;
  const pitScore = Math.min(1, pit / 50);
  const engScore = Math.min(1, (eng.volatilidade + eng.amplitude) / 100);

  const sinal =
    (fibScore * pesoFib) +
    (pitScore * pesoPit) +
    (engScore * pesoEng) +
    (comportamento * pesoComp);

  return {
    sinalBruto
