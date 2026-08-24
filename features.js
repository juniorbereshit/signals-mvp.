// features.js
// Módulo comportamental do Robô Financeiro Comportamental

// Normaliza valores para 0–1
function normalize(value, min, max) {
  if (max === min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/* ---------------------------------------------------------
   1. MEDO
--------------------------------------------------------- */
function scoreMedo(data) {
  const queda = normalize(data.variacaoNegativa, 0, 10);
  const volatilidade = normalize(data.volatilidade, 0, 5);
  const distanciaSuporte = normalize(data.distanciaSuporte, 0, 8);
  const velocidadeQueda = normalize(data.velocidadeQueda, 0, 12);

  return (queda * 0.35) +
         (volatilidade * 0.25) +
         (distanciaSuporte * 0.20) +
         (velocidadeQueda * 0.20);
}

/* ---------------------------------------------------------
   2. GANÂNCIA
--------------------------------------------------------- */
function scoreGanancia(data) {
  const candlesVerdes = normalize(data.candlesVerdes, 0, 10);
  const rompimentos = normalize(data.rompimentos, 0, 5);
  const volume = normalize(data.volume, 0, 100);
  const distanciaResistencia = normalize(data.distanciaResistencia, 0, 8);

  return (candlesVerdes * 0.30) +
         (rompimentos * 0.25) +
         (volume * 0.25) +
         (distanciaResistencia * 0.20);
}

/* ---------------------------------------------------------
   3. EUFORIA
--------------------------------------------------------- */
function scoreEuforia(data) {
  const rsi = normalize(data.rsi, 50, 100);
  const volumeExplosivo = normalize(data.volumeExplosivo, 0, 150);
  const precoAcimaMedia = normalize(data.precoAcimaMedia, 0, 15);
  const aceleracao = normalize(data.aceleracao, 0, 20);

  return (rsi * 0.30) +
         (volumeExplosivo * 0.30) +
         (precoAcimaMedia * 0.20) +
         (aceleracao * 0.20);
}

/* ---------------------------------------------------------
   4. PÂNICO
--------------------------------------------------------- */
function scorePanico(data) {
  const quedasAbruptas = normalize(data.quedasAbruptas, 0, 20);
  const gaps = normalize(data.gaps, 0, 10);
  const liquidacoes = normalize(data.liquidacoes, 0, 1000);
  const rompimentoSuporte = normalize(data.rompimentoSuporte, 0, 1);

  return (quedasAbruptas * 0.40) +
         (gaps * 0.20) +
         (liquidacoes * 0.25) +
         (rompimentoSuporte * 0.15);
}

/* ---------------------------------------------------------
   5. DISCIPLINA
--------------------------------------------------------- */
function scoreDisciplina(data) {
  const consistencia = normalize(data.consistencia, 0, 10);
  const respeitoMedias = normalize(data.respeitoMedias, 0, 1);
  const ruido = 1 - normalize(data.ruido, 0, 10);
  const estabilidadeVolume = normalize(data.estabilidadeVolume, 0, 10);

  return (consistencia * 0.30) +
         (respeitoMedias * 0.30) +
         (ruido * 0.20) +
         (estabilidadeVolume * 0.20);
}

/* ---------------------------------------------------------
   6. VIÉS DE CONFIRMAÇÃO
--------------------------------------------------------- */
function scoreViesConfirmacao(data) {
  const tendenciaProlongada = normalize(data.tendenciaProlongada, 0, 20);
  const baixaReversao = normalize(data.baixaReversao, 0, 10);
  const insistenciaDirecao = normalize(data.insistenciaDirecao, 0, 1);

  return (tendenciaProlongada * 0.40) +
         (baixaReversao * 0.30) +
         (insistenciaDirecao * 0.30);
}

/* ---------------------------------------------------------
   7. EFEITO MANADA
--------------------------------------------------------- */
function scoreManada(data) {
  const volumeAnormal = normalize(data.volumeAnormal, 0, 200);
  const movimentosSincronizados = normalize(data.movimentosSincronizados, 0, 1);
  const aceleracaoColetiva = normalize(data.aceleracaoColetiva, 0, 20);
  const rompimentosSimultaneos = normalize(data.rompimentosSimultaneos, 0, 5);

  return (volumeAnormal * 0.35) +
         (movimentosSincronizados * 0.25) +
         (aceleracaoColetiva * 0.25) +
         (rompimentosSimultaneos * 0.15);
}

/* ---------------------------------------------------------
   8. HEURÍSTICAS
--------------------------------------------------------- */
function scoreHeuristicas(data) {
  const atalhos = normalize(data.atalhos, 0, 10);
  const repeticoes = normalize(data.repeticoes, 0, 10);
  const padroes = normalize(data.padroes, 0, 10);
  const comportamentoAutomatico = normalize(data.comportamentoAutomatico, 0, 1);

  return (atalhos * 0.25) +
         (repeticoes * 0.25) +
         (padroes * 0.25) +
         (comportamentoAutomatico * 0.25);
}

/* ---------------------------------------------------------
   9. SCORE FINAL
--------------------------------------------------------- */
function scoreComportamentalFinal(data) {
  const medo = scoreMedo(data);
  const ganancia = scoreGanancia(data);
  const euforia = scoreEuforia(data);
  const panico = scorePanico(data);
  const disciplina = scoreDisciplina(data);
  const vies = scoreViesConfirmacao(data);
  const manada = scoreManada(data);
  const heuristicas = scoreHeuristicas(data);

  const soma =
    (medo * 0.15) +
    (ganancia * 0.15) +
    (euforia * 0.10) +
    (panico * 0.10) +
    (disciplina * 0.15) +
    (vies * 0.10) +
    (manada * 0.15) +
    (heuristicas * 0.10);

  return normalize(soma, 0, 1);
}

module.exports = {
  scoreMedo,
  scoreGanancia,
  scoreEuforia,
  scorePanico,
  scoreDisciplina,
  scoreViesConfirmacao,
  scoreManada,
  scoreHeuristicas,
  scoreComportamentalFinal
};

