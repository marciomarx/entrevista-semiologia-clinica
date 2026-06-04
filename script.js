const steps = [
  {
    id: "abertura",
    title: "Abertura e identificação",
    purpose: "Avaliar se o entrevistador iniciou com vínculo, identificação e escuta inicial.",
    prompts: [
      ["Confirmou nome, idade e ocupação?", "Responda com dados pessoais do personagem, sem antecipar a doença."],
      ["Perguntou o motivo principal da procura?", "Responda a queixa em linguagem leiga, como um paciente real."],
      ["Explicou que faria perguntas para entender melhor o caso?", "Marque se a abordagem foi respeitosa e organizada."]
    ]
  },
  {
    id: "queixa",
    title: "Queixa e história atual",
    purpose: "Verificar se o entrevistador explorou a linha do tempo e características do sintoma.",
    prompts: [
      ["Investigou quando começou e como evoluiu?", "Responda duração, progressão e padrão dos sintomas."],
      ["Perguntou intensidade, frequência, melhora e piora?", "Ofereça apenas os fatores perguntados."],
      ["Buscou sintomas associados relevantes?", "Responda positivos e negativos sem entregar a hipótese clínica."]
    ]
  },
  {
    id: "medicamentos",
    title: "Medicamentos e automedicação",
    purpose: "Avaliar uso correto, adesão, riscos de automedicação e possíveis agravantes.",
    prompts: [
      ["Perguntou medicamentos em uso e adesão?", "Informe uso correto, esquecimento ou interrupção conforme o caso."],
      ["Investigou automedicação, fitoterápicos ou uso por conta própria?", "Revele medicamentos usados sem orientação quando o caso tiver."],
      ["Perguntou alergias ou reações anteriores?", "Responda de modo direto, sem ampliar além da pergunta."]
    ]
  },
  {
    id: "contexto",
    title: "Antecedentes e hábitos",
    purpose: "Checar se o entrevistador buscou fatores de risco pessoais, familiares e sociais.",
    prompts: [
      ["Perguntou doenças anteriores e história familiar?", "Informe fatores de risco do personagem."],
      ["Investigou alimentação, sono, atividade física, álcool e tabaco?", "Responda hábitos relevantes para o caso."],
      ["Avaliou impacto na rotina e funcionalidade?", "Descreva limitações nas atividades, trabalho ou sono."]
    ]
  },
  {
    id: "alerta",
    title: "Sinais de alerta",
    purpose: "Avaliar se o entrevistador reconhece gravidade e necessidade de encaminhamento.",
    prompts: [
      ["Perguntou sinais de alerta específicos do caso?", "Responda apenas os sinais presentes ou negue os ausentes."],
      ["Investigou sinais vitais, medidas ou dados objetivos disponíveis?", "Forneça valores do caso quando perguntado."],
      ["Reconheceu quando haveria necessidade de atendimento imediato?", "Marque se o entrevistador identificou urgência ou risco."]
    ]
  },
  {
    id: "fechamento",
    title: "Fechamento da entrevista",
    purpose: "Avaliar síntese, linguagem clara e preparação para a hipótese final.",
    prompts: [
      ["Resumiu o que entendeu antes de concluir?", "Marque se a síntese foi coerente com as respostas dadas."],
      ["Checou se faltou alguma informação importante?", "Marque se houve abertura para complementar dados."],
      ["Preparou orientação inicial sem prometer diagnóstico fechado?", "Marque se a postura foi prudente e educativa."]
    ]
  }
];

const finalCriteria = [
  {
    id: "hipotese",
    label: "Hipótese clínica",
    points: 10,
    question: "Qual é sua hipótese clínica principal?"
  },
  {
    id: "problema",
    label: "Problema principal do paciente",
    points: 8,
    question: "Qual é o problema principal que precisa ser resolvido?"
  },
  {
    id: "alertas",
    label: "Sinais de alerta",
    points: 6,
    question: "Quais sinais de alerta você identificou ou investigou?"
  },
  {
    id: "conduta",
    label: "Orientação ou conduta educativa",
    points: 6,
    question: "Qual orientação ou conduta educativa você faria?"
  }
];

const cases = [
  {
    area: "Cardiometabólico",
    title: "Hipertensão arterial sistêmica",
    patient: "Roberto, 58 anos",
    context: "Pressão elevada em medidas recentes e uso irregular de anti-hipertensivo.",
    hiddenContext: "Roberto usa losartana de forma irregular, costuma medir a pressão logo após café e caminhada, usa muito sal e tem pai que infartou cedo. Hoje está assintomático.",
    actingRule: "Só diga que a pressão está alta se perguntarem sobre medidas. Não fale 'hipertensão descontrolada' espontaneamente.",
    summary: "Treina aferição correta, adesão, risco cardiovascular, sinais de lesão de órgão-alvo e orientação educativa.",
    hypothesis: "Elevação pressórica persistente por adesão irregular e possível técnica inadequada de aferição.",
    problem: "Controle inadequado da pressão e baixa adesão ao tratamento.",
    redFlags: "Dor torácica, dispneia, déficit neurológico, confusão, alteração visual súbita, PA muito elevada com sintomas.",
    education: "Orientar aferição correta, registro domiciliar, adesão, redução de sal, atividade física segura e retorno médico."
  },
  {
    area: "Cardiometabólico",
    title: "Diabetes mellitus tipo 2",
    patient: "Helena, 62 anos",
    context: "Sede, noctúria e glicemias capilares elevadas em farmácia comunitária.",
    hiddenContext: "Helena sente muita sede, urina à noite, ganhou peso nos últimos anos e esquece doses da metformina. Tem formigamento leve nos pés.",
    actingRule: "Responda os sintomas conforme perguntarem. Não diga 'meu diabetes está descompensado' sem que o entrevistador formule essa hipótese.",
    summary: "Explora hiperglicemia, adesão, sintomas, risco cardiovascular e sinais de descompensação.",
    hypothesis: "Diabetes tipo 2 com controle glicêmico inadequado.",
    problem: "Hiperglicemia sintomática associada à adesão irregular e necessidade de acompanhamento.",
    redFlags: "Vômitos, sonolência, desidratação, perda de peso importante, respiração anormal, glicemia muito elevada com sintomas.",
    education: "Orientar acompanhamento, adesão, plano alimentar, atividade física, cuidado com pés e sinais de descompensação."
  },
  {
    area: "Cardiometabólico",
    title: "Obesidade e síndrome metabólica",
    patient: "Carla, 44 anos",
    context: "Ganho ponderal progressivo, circunferência abdominal aumentada e fadiga.",
    hiddenContext: "Carla tem ganho de peso central, pressão limítrofe, triglicerídeos altos, sono ruim e rotina sedentária. Sente vergonha de falar do peso.",
    actingRule: "Demonstre desconforto se a abordagem for julgadora. Colabore mais quando o entrevistador usar linguagem acolhedora.",
    summary: "Treina abordagem sem estigma, hábitos, comorbidades e risco cardiometabólico.",
    hypothesis: "Obesidade abdominal com provável síndrome metabólica.",
    problem: "Risco cardiometabólico aumentado associado a sedentarismo, alimentação e sono inadequado.",
    redFlags: "Dispneia importante, dor torácica, edema progressivo, sonolência diurna intensa com pausas respiratórias, depressão grave.",
    education: "Pactuar metas realistas, alimentação possível, sono, movimento gradual e acompanhamento multiprofissional."
  },
  {
    area: "Cardiometabólico",
    title: "Dislipidemias",
    patient: "Paulo, 51 anos",
    context: "Exames mostram LDL elevado; paciente interrompeu estatina por medo de efeitos adversos.",
    hiddenContext: "Paulo parou a estatina após ler comentários na internet. Tem LDL alto, pai com AVC e alimentação rica em ultraprocessados.",
    actingRule: "Só conte que parou a estatina se perguntarem sobre medicamentos e adesão.",
    summary: "Foca risco global, adesão, eventos familiares e comunicação sobre benefício terapêutico.",
    hypothesis: "Dislipidemia com baixa adesão por medo de efeitos adversos.",
    problem: "Risco cardiovascular aumentado por LDL elevado e interrupção do tratamento.",
    redFlags: "Dor torácica, sinais neurológicos agudos, claudicação intensa, história familiar de eventos muito precoces.",
    education: "Explicar risco cardiovascular, adesão, hábitos alimentares e acompanhamento laboratorial."
  },
  {
    area: "Respiratório",
    title: "Asma",
    patient: "Letícia, 27 anos",
    context: "Tosse, chiado e uso frequente de broncodilatador de alívio.",
    hiddenContext: "Letícia usa salbutamol várias vezes por semana, esquece corticoide inalatório e não usa espaçador. Piora com poeira e exercício.",
    actingRule: "Não diga 'minha asma está fora de controle'. Relate tosse, chiado e uso da bombinha quando perguntarem.",
    summary: "Avalia controle, técnica inalatória, gatilhos, adesão e gravidade da crise.",
    hypothesis: "Asma não controlada por baixa adesão e técnica inalatória inadequada.",
    problem: "Uso excessivo de medicação de alívio e falha no tratamento controlador.",
    redFlags: "Fala entrecortada, cianose, saturação baixa, sonolência, piora rápida, ausência de resposta ao broncodilatador.",
    education: "Revisar técnica inalatória, espaçador, diferença entre alívio e controle, plano de ação e gatilhos."
  },
  {
    area: "Respiratório",
    title: "Doença pulmonar obstrutiva crônica",
    patient: "João, 68 anos",
    context: "Dispneia aos esforços, tosse crônica e tabagismo prévio importante.",
    hiddenContext: "João fumou por 40 anos, tem tosse com catarro pela manhã, piora aos esforços e usa inalador de forma irregular.",
    actingRule: "Responda como alguém que acha a falta de ar 'coisa da idade', a menos que o entrevistador investigue melhor.",
    summary: "Treina dispneia, exacerbações, tabagismo, vacinação, técnica inalatória e sinais de infecção.",
    hypothesis: "DPOC com limitação funcional e risco de exacerbação.",
    problem: "Sintomas respiratórios crônicos com baixa adesão/técnica e risco por tabagismo prévio.",
    redFlags: "Dispneia em repouso, confusão, lábios arroxeados, febre persistente, escarro purulento abundante, saturação baixa.",
    education: "Orientar cessação do tabagismo, vacinação, técnica inalatória, sinais de exacerbação e reabilitação."
  },
  {
    area: "Infeccioso",
    title: "Dengue e arboviroses",
    patient: "Marina, 34 anos",
    context: "Febre, mialgia intensa e cefaleia após aumento de casos no bairro.",
    hiddenContext: "Marina tem febre há dois dias, dor no corpo, dor atrás dos olhos e tomou ibuprofeno por conta própria. Sem sangramentos até agora.",
    actingRule: "Não fale dengue de início. Diga que há muitos casos no bairro apenas se perguntarem contexto epidemiológico.",
    summary: "Explora síndrome febril, hidratação, anti-inflamatórios e sinais de alarme.",
    hypothesis: "Síndrome febril aguda compatível com arbovirose, provável dengue.",
    problem: "Risco de complicação e uso inadequado de anti-inflamatório em suspeita de dengue.",
    redFlags: "Dor abdominal intensa, vômitos persistentes, sangramento, tontura, sonolência, queda de pressão, pouca urina.",
    education: "Orientar hidratação, evitar AINEs, acompanhar sinais de alarme e procurar serviço de saúde."
  },
  {
    area: "Respiratório/Infeccioso",
    title: "Infecções respiratórias agudas",
    patient: "Rafael, 39 anos",
    context: "Tosse, coriza e febre baixa há três dias; quer antibiótico.",
    hiddenContext: "Rafael tem coriza, tosse seca e febre baixa há três dias. Quer antibiótico porque 'sempre resolve', mas não tem falta de ar.",
    actingRule: "Insista um pouco no desejo por antibiótico, mas aceite explicação clara sobre quando ele é ou não necessário.",
    summary: "Diferencia quadro viral comum de sinais de gravidade ou complicação bacteriana.",
    hypothesis: "Infecção respiratória aguda provavelmente viral.",
    problem: "Sintomas respiratórios leves com expectativa inadequada de antibiótico.",
    redFlags: "Falta de ar, dor torácica, febre persistente alta, confusão, piora após melhora inicial, saturação baixa.",
    education: "Explicar uso racional de antibióticos, suporte, higiene respiratória e critérios de reavaliação."
  },
  {
    area: "Saúde mental",
    title: "Ansiedade, insônia e sofrimento psíquico",
    patient: "Bianca, 31 anos",
    context: "Insônia, palpitações e preocupação constante após sobrecarga no trabalho.",
    hiddenContext: "Bianca dorme mal, sente palpitações, usa bebida alcoólica para relaxar e está sobrecarregada. Nega plano de autoagressão, mas sente desesperança em alguns dias.",
    actingRule: "Responda com cautela e só fale sofrimento emocional mais profundo se houver escuta acolhedora.",
    summary: "Treina escuta qualificada, prejuízo funcional, substâncias, risco e rede de apoio.",
    hypothesis: "Sofrimento psíquico com sintomas ansiosos e insônia.",
    problem: "Insônia e ansiedade com impacto funcional e necessidade de avaliação de risco.",
    redFlags: "Ideação suicida, autoagressão, confusão, sintomas psicóticos, uso abusivo de sedativos, incapacidade funcional grave.",
    education: "Acolher, orientar higiene do sono, evitar automedicação sedativa e encaminhar conforme risco."
  },
  {
    area: "Gastrointestinal",
    title: "Gastrite, refluxo e uso inadequado de antiácidos/IBP",
    patient: "Eduardo, 46 anos",
    context: "Queimação recorrente e uso diário de omeprazol por conta própria há meses.",
    hiddenContext: "Eduardo usa omeprazol diariamente sem avaliação, toma anti-inflamatório para dor lombar e piora após refeições grandes e café.",
    actingRule: "Relate a queimação e o alívio parcial. Só revele uso prolongado de IBP e AINE se perguntarem medicamentos.",
    summary: "Explora sintomas dispépticos, refluxo, sinais de alarme, AINEs, álcool e automedicação.",
    hypothesis: "Refluxo/dispepsia com uso inadequado e prolongado de IBP.",
    problem: "Automedicação prolongada e fatores agravantes gastrointestinais.",
    redFlags: "Perda de peso, vômitos persistentes, sangue nas fezes ou vômitos, anemia, disfagia, dor intensa progressiva.",
    education: "Orientar uso responsável de IBP, evitar AINEs sem orientação, medidas alimentares e avaliação se persistente."
  }
];

let selectedCase = 0;
let selectedStep = 0;
const checkedItems = new Set();
const finalCheckedItems = new Set();

const caseButtons = document.querySelector("#case-buttons");
const stepTabs = document.querySelector("#step-tabs");
const promptsEl = document.querySelector("#prompts");
const finalItemsEl = document.querySelector("#final-items");
const scoreResult = document.querySelector("#score-result");
const reportContent = document.querySelector("#report-content");

document.querySelector("#case-count").textContent = cases.length;

function checkboxId(caseIndex, stepIndex, promptIndex) {
  return `c${caseIndex}-s${stepIndex}-p${promptIndex}`;
}

function finalId(caseIndex, criterionId) {
  return `c${caseIndex}-final-${criterionId}`;
}

function getInterviewTotalItems() {
  return steps.reduce((total, step) => total + step.prompts.length, 0);
}

function getCaseCheckedItems(caseIndex) {
  const prefix = `c${caseIndex}-`;
  return [...checkedItems].filter((item) => item.startsWith(prefix)).length;
}

function getStepCheckedItems(caseIndex, stepIndex) {
  const prefix = `c${caseIndex}-s${stepIndex}-`;
  return [...checkedItems].filter((item) => item.startsWith(prefix)).length;
}

function getFinalScore(caseIndex) {
  return finalCriteria.reduce((total, criterion) => {
    return finalCheckedItems.has(finalId(caseIndex, criterion.id)) ? total + criterion.points : total;
  }, 0);
}

function getScores(caseIndex) {
  const interviewItems = getInterviewTotalItems();
  const checked = getCaseCheckedItems(caseIndex);
  const interviewScore = Math.round((checked / interviewItems) * 70);
  const finalScore = getFinalScore(caseIndex);
  return {
    checked,
    interviewItems,
    interviewScore,
    finalScore,
    total: interviewScore + finalScore
  };
}

function getPerformanceMessage(score) {
  if (score >= 85) return "Desempenho excelente: entrevista e raciocínio final muito bem integrados.";
  if (score >= 70) return "Bom desempenho: há pequenos pontos a fortalecer.";
  if (score >= 50) return "Desempenho parcial: revise perguntas essenciais e síntese final.";
  return "Desempenho inicial: retome a estrutura da entrevista e o raciocínio clínico.";
}

function renderCaseButtons() {
  caseButtons.innerHTML = cases.map((item, index) => `
    <button class="case-button ${index === selectedCase ? "active" : ""}" type="button" data-case="${index}">
      ${item.title}
    </button>
  `).join("");
}

function renderStepTabs() {
  stepTabs.innerHTML = steps.map((step, index) => `
    <button class="step-tab ${index === selectedStep ? "active" : ""}" type="button" data-step="${index}">
      ${index + 1}. ${step.title}
    </button>
  `).join("");
}

function renderPrompts() {
  const step = steps[selectedStep];
  promptsEl.innerHTML = step.prompts.map((prompt, index) => {
    const id = checkboxId(selectedCase, selectedStep, index);
    const checked = checkedItems.has(id) ? "checked" : "";
    return `
      <div class="prompt-item">
        <input type="checkbox" id="${id}" data-score-item ${checked}>
        <label for="${id}">
          <strong>${prompt[0]}</strong>
          <span>${prompt[1]}</span>
        </label>
      </div>
    `;
  }).join("");
}

function renderFinalItems() {
  const current = cases[selectedCase];
  const answers = {
    hipotese: current.hypothesis,
    problema: current.problem,
    alertas: current.redFlags,
    conduta: current.education
  };

  finalItemsEl.innerHTML = finalCriteria.map((criterion) => {
    const id = finalId(selectedCase, criterion.id);
    const checked = finalCheckedItems.has(id) ? "checked" : "";
    return `
      <div class="final-item">
        <input type="checkbox" id="${id}" data-final-item ${checked}>
        <label for="${id}">
          <strong>${criterion.question}</strong>
          <span><b>Gabarito esperado:</b> ${answers[criterion.id]}</span>
          <em>${criterion.points} pontos</em>
        </label>
      </div>
    `;
  }).join("");
}

function renderReport() {
  const current = cases[selectedCase];
  const scores = getScores(selectedCase);
  const stepsHtml = steps.map((step, stepIndex) => {
    const stepChecked = getStepCheckedItems(selectedCase, stepIndex);
    const stepPercent = Math.round((stepChecked / step.prompts.length) * 100);
    const items = step.prompts.map((prompt, promptIndex) => {
      const id = checkboxId(selectedCase, stepIndex, promptIndex);
      const marker = checkedItems.has(id) ? "Realizado" : "Pendente";
      return `<li><strong>${marker}:</strong> ${prompt[0]}</li>`;
    }).join("");

    return `
      <article class="report-step">
        <h4>${stepIndex + 1}. ${step.title} - ${stepChecked}/${step.prompts.length} (${stepPercent}%)</h4>
        <ul>${items}</ul>
      </article>
    `;
  }).join("");

  const finalHtml = finalCriteria.map((criterion) => {
    const marker = finalCheckedItems.has(finalId(selectedCase, criterion.id)) ? "Acertou" : "Não pontuou";
    return `<li><strong>${marker}:</strong> ${criterion.label} (${criterion.points} pontos)</li>`;
  }).join("");

  reportContent.innerHTML = `
    <div class="report-summary">
      <div>
        <span class="label">Caso</span>
        <strong>${current.title}</strong>
      </div>
      <div>
        <span class="label">Paciente</span>
        <strong>${current.patient}</strong>
      </div>
      <div>
        <span class="label">Pontuação total</span>
        <strong>${scores.total}/100</strong>
      </div>
    </div>
    <p><strong>Entrevista:</strong> ${scores.checked}/${scores.interviewItems} itens, equivalente a ${scores.interviewScore}/70 pontos.</p>
    <p><strong>Raciocínio final:</strong> ${scores.finalScore}/30 pontos. ${getPerformanceMessage(scores.total)}</p>
    <article class="report-step">
      <h4>Avaliação final do raciocínio</h4>
      <ul>${finalHtml}</ul>
    </article>
    ${stepsHtml}
  `;
}

function renderCase() {
  const current = cases[selectedCase];
  const step = steps[selectedStep];

  document.querySelector("#case-area").textContent = current.area;
  document.querySelector("#case-title").textContent = current.title;
  document.querySelector("#case-summary").textContent = current.summary;
  document.querySelector("#patient-name").textContent = current.patient;
  document.querySelector("#patient-context").textContent = current.context;
  document.querySelector("#hidden-context").textContent = current.hiddenContext;
  document.querySelector("#acting-rule").textContent = current.actingRule;
  document.querySelector("#step-title").textContent = step.title;
  document.querySelector("#step-purpose").textContent = step.purpose;
  document.querySelector("#hypothesis").textContent = current.hypothesis;
  document.querySelector("#red-flags").textContent = current.redFlags;
  document.querySelector("#education").textContent = current.education;

  renderCaseButtons();
  renderStepTabs();
  renderPrompts();
  renderFinalItems();
  renderReport();
  scoreResult.textContent = "Aluno-paciente: marque os pontos conforme o entrevistador conduz a entrevista.";
}

function calculateStepScore() {
  const checked = document.querySelectorAll("[data-score-item]:checked").length;
  const totalVisible = document.querySelectorAll("[data-score-item]").length;
  const percent = Math.round((checked / totalVisible) * 100);
  scoreResult.textContent = `Etapa atual: ${checked}/${totalVisible} itens marcados (${percent}%).`;
  renderReport();
}

function calculateTotalScore() {
  const scores = getScores(selectedCase);
  scoreResult.textContent = `Pontuação total: ${scores.total}/100. Entrevista: ${scores.interviewScore}/70. Raciocínio final: ${scores.finalScore}/30. ${getPerformanceMessage(scores.total)}`;
  renderReport();
}

caseButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-case]");
  if (!button) return;
  selectedCase = Number(button.dataset.case);
  selectedStep = 0;
  renderCase();
});

stepTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-step]");
  if (!button) return;
  selectedStep = Number(button.dataset.step);
  renderCase();
});

promptsEl.addEventListener("change", (event) => {
  if (!event.target.matches("[data-score-item]")) return;
  if (event.target.checked) {
    checkedItems.add(event.target.id);
  } else {
    checkedItems.delete(event.target.id);
  }
  renderReport();
});

finalItemsEl.addEventListener("change", (event) => {
  if (!event.target.matches("[data-final-item]")) return;
  if (event.target.checked) {
    finalCheckedItems.add(event.target.id);
  } else {
    finalCheckedItems.delete(event.target.id);
  }
  renderReport();
});

document.querySelector("#score-button").addEventListener("click", calculateStepScore);
document.querySelector("#total-score-button").addEventListener("click", calculateTotalScore);
document.querySelector("#pdf-button").addEventListener("click", () => {
  calculateTotalScore();
  window.print();
});
document.querySelector("#reset-button").addEventListener("click", () => {
  const prefix = `c${selectedCase}-`;
  [...checkedItems].forEach((item) => {
    if (item.startsWith(prefix)) checkedItems.delete(item);
  });
  [...finalCheckedItems].forEach((item) => {
    if (item.startsWith(prefix)) finalCheckedItems.delete(item);
  });
  renderCase();
  scoreResult.textContent = "Marcações limpas neste caso.";
});

renderCase();
