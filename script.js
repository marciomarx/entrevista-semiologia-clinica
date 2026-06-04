const steps = [
  {
    id: "identificacao",
    title: "Identificação e vínculo",
    purpose: "Abrir a entrevista, confirmar dados essenciais e estabelecer comunicação respeitosa.",
    prompts: [
      ["Confirmou nome, idade, ocupação e motivo da procura?", "A identificação contextualiza riscos, rotina e linguagem adequada."],
      ["Perguntou como o paciente prefere ser chamado?", "Esse detalhe melhora vínculo e adesão à entrevista."],
      ["Explicou que fará perguntas para compreender o quadro?", "A transparência reduz ansiedade e melhora colaboração."]
    ]
  },
  {
    id: "queixa",
    title: "Queixa principal",
    purpose: "Registrar o problema central com as palavras do paciente.",
    prompts: [
      ["Perguntou qual é o principal incômodo hoje?", "A queixa principal organiza a prioridade da consulta."],
      ["Investigou início, duração e evolução do sintoma?", "Tempo e progressão ajudam a diferenciar quadros agudos e crônicos."],
      ["Avaliou intensidade, fatores de melhora e piora?", "Esses dados aproximam o raciocínio da hipótese clínica."]
    ]
  },
  {
    id: "hda",
    title: "História da doença atual",
    purpose: "Construir uma linha do tempo coerente e identificar associações clínicas relevantes.",
    prompts: [
      ["Organizou os sintomas em ordem cronológica?", "A cronologia evita conclusões apressadas."],
      ["Investigou sintomas associados positivos e negativos?", "O que está ausente também orienta o diagnóstico diferencial."],
      ["Perguntou sobre tratamentos já tentados e resposta obtida?", "Uso prévio de medicamentos pode mascarar ou agravar o quadro."]
    ]
  },
  {
    id: "sistemas",
    title: "Interrogatório dirigido",
    purpose: "Explorar sistemas relacionados à queixa e rastrear sinais de gravidade.",
    prompts: [
      ["Fez perguntas dirigidas ao sistema mais provável?", "A entrevista deve ser ampla, mas não dispersa."],
      ["Buscou sinais de alerta compatíveis com o tema?", "Sinais de alerta mudam a urgência da conduta."],
      ["Investigou impacto funcional, sono, alimentação e rotina?", "A repercussão cotidiana ajuda a graduar a gravidade."]
    ]
  },
  {
    id: "antecedentes",
    title: "Antecedentes e contexto",
    purpose: "Relacionar doença atual com história pessoal, familiar, social e medicamentosa.",
    prompts: [
      ["Perguntou doenças prévias, internações e alergias?", "Antecedentes mudam risco, conduta e segurança."],
      ["Investigou medicamentos, automedicação e adesão?", "Erros de uso são frequentes e clinicamente importantes."],
      ["Explorou hábitos, alimentação, atividade física, álcool e tabaco?", "Hábitos influenciam prevenção, manejo e educação em saúde."]
    ]
  },
  {
    id: "fechamento",
    title: "Síntese e orientação",
    purpose: "Devolver ao paciente uma síntese clara e definir próximos passos seguros.",
    prompts: [
      ["Resumiu o caso em linguagem simples?", "A síntese confirma entendimento e corrige ruídos."],
      ["Indicou sinais que exigem atendimento imediato?", "O paciente precisa saber quando procurar urgência."],
      ["Propôs orientação educativa compatível com o problema?", "Educação em saúde deve ser concreta, segura e verificável."]
    ]
  }
];

const cases = [
  {
    area: "Cardiometabólico",
    title: "Hipertensão arterial sistêmica",
    patient: "Roberto, 58 anos",
    context: "Pressão elevada em medidas recentes e uso irregular de anti-hipertensivo.",
    summary: "Treina investigação de aferição correta, adesão, fatores de risco, lesão de órgão-alvo e sinais de urgência.",
    hypothesis: "Elevação pressórica persistente possivelmente associada a adesão irregular, técnica inadequada de aferição ou risco cardiovascular acumulado.",
    redFlags: "Dor torácica, dispneia, déficit neurológico, confusão, alteração visual súbita, PA muito elevada com sintomas.",
    education: "Orientar aferição correta, registro domiciliar, adesão, redução de sal, atividade física segura e retorno médico programado."
  },
  {
    area: "Cardiometabólico",
    title: "Diabetes mellitus tipo 2",
    patient: "Helena, 62 anos",
    context: "Sede, noctúria e glicemias capilares elevadas em farmácia comunitária.",
    summary: "Explora sintomas hiperglicêmicos, risco cardiovascular, uso de medicamentos e sinais de descompensação.",
    hypothesis: "Hiperglicemia sintomática sugestiva de diabetes tipo 2 ou controle glicêmico inadequado.",
    redFlags: "Vômitos, sonolência, desidratação, perda de peso importante, respiração anormal, glicemia muito elevada com sintomas.",
    education: "Orientar acompanhamento, plano alimentar, atividade física, cuidado com pés, adesão e sinais de descompensação."
  },
  {
    area: "Cardiometabólico",
    title: "Obesidade e síndrome metabólica",
    patient: "Carla, 44 anos",
    context: "Ganho ponderal progressivo, circunferência abdominal aumentada e fadiga.",
    summary: "Treina abordagem acolhedora, rastreio de comorbidades e avaliação de hábitos sem julgamento.",
    hypothesis: "Excesso de adiposidade central com possível resistência insulínica e risco cardiometabólico aumentado.",
    redFlags: "Dispneia importante, dor torácica, edema progressivo, sonolência diurna intensa com pausas respiratórias, depressão grave.",
    education: "Pactuar metas realistas, alimentação possível, sono, movimento gradual e acompanhamento multiprofissional."
  },
  {
    area: "Cardiometabólico",
    title: "Dislipidemias",
    patient: "Paulo, 51 anos",
    context: "Exames mostram LDL elevado; paciente interrompeu estatina por medo de efeitos adversos.",
    summary: "Foca risco global, adesão, eventos cardiovasculares prévios e comunicação sobre benefício terapêutico.",
    hypothesis: "Dislipidemia com risco cardiovascular dependente de idade, comorbidades, história familiar e adesão medicamentosa.",
    redFlags: "Dor torácica, sinais neurológicos agudos, claudicação intensa, história familiar de eventos muito precoces.",
    education: "Explicar risco cardiovascular, importância da adesão, hábitos alimentares e necessidade de acompanhamento laboratorial."
  },
  {
    area: "Respiratório",
    title: "Asma",
    patient: "Letícia, 27 anos",
    context: "Tosse, chiado e uso frequente de broncodilatador de alívio.",
    summary: "Avalia controle da asma, técnica inalatória, gatilhos, adesão ao controlador e gravidade da crise.",
    hypothesis: "Asma parcialmente controlada ou não controlada, possivelmente por técnica inadequada e baixa adesão ao tratamento de manutenção.",
    redFlags: "Fala entrecortada, cianose, saturação baixa, sonolência, piora rápida, ausência de resposta ao broncodilatador.",
    education: "Revisar técnica inalatória, uso de espaçador, diferença entre alívio e controle, plano de ação e gatilhos."
  },
  {
    area: "Respiratório",
    title: "Doença pulmonar obstrutiva crônica",
    patient: "João, 68 anos",
    context: "Dispneia aos esforços, tosse crônica e tabagismo prévio importante.",
    summary: "Treina avaliação de dispneia, exacerbações, tabagismo, vacinação, técnica inalatória e sinais de infecção.",
    hypothesis: "DPOC com limitação funcional e risco de exacerbação, exigindo avaliação de gravidade e adesão ao tratamento.",
    redFlags: "Dispneia em repouso, confusão, lábios arroxeados, febre persistente, escarro purulento abundante, saturação baixa.",
    education: "Orientar cessação do tabagismo, vacinação, técnica inalatória, reconhecimento de exacerbação e reabilitação respiratória."
  },
  {
    area: "Infeccioso",
    title: "Dengue e arboviroses",
    patient: "Marina, 34 anos",
    context: "Febre, mialgia intensa e cefaleia após aumento de casos no bairro.",
    summary: "Explora tempo de febre, hidratação, uso inadequado de anti-inflamatórios e sinais de alarme.",
    hypothesis: "Síndrome febril aguda compatível com arbovirose, com necessidade de estratificação de risco.",
    redFlags: "Dor abdominal intensa, vômitos persistentes, sangramento, tontura, sonolência, queda de pressão, pouca urina.",
    education: "Orientar hidratação, evitar AINEs sem avaliação, acompanhar sinais de alarme e procurar serviço de saúde."
  },
  {
    area: "Respiratório/Infeccioso",
    title: "Infecções respiratórias agudas",
    patient: "Rafael, 39 anos",
    context: "Tosse, coriza e febre baixa há três dias; quer antibiótico.",
    summary: "Diferencia quadro viral comum de sinais sugestivos de gravidade ou complicação bacteriana.",
    hypothesis: "Infecção respiratória aguda provavelmente viral, mas dependente de duração, sinais sistêmicos e fatores de risco.",
    redFlags: "Falta de ar, dor torácica, febre persistente alta, confusão, piora após melhora inicial, saturação baixa.",
    education: "Explicar uso racional de antibióticos, medidas de suporte, higiene respiratória e critérios de reavaliação."
  },
  {
    area: "Saúde mental",
    title: "Ansiedade, insônia e sofrimento psíquico",
    patient: "Bianca, 31 anos",
    context: "Insônia, palpitações e preocupação constante após sobrecarga no trabalho.",
    summary: "Treina escuta qualificada, duração dos sintomas, prejuízo funcional, uso de substâncias e risco de autoagressão.",
    hypothesis: "Sofrimento psíquico com sintomas ansiosos e insônia, exigindo avaliação de gravidade e rede de apoio.",
    redFlags: "Ideação suicida, autoagressão, confusão, sintomas psicóticos, uso abusivo de sedativos, incapacidade funcional grave.",
    education: "Acolher, orientar higiene do sono, evitar automedicação sedativa e encaminhar conforme risco e persistência."
  },
  {
    area: "Gastrointestinal",
    title: "Gastrite, refluxo e uso inadequado de antiácidos/IBP",
    patient: "Eduardo, 46 anos",
    context: "Queimação recorrente e uso diário de omeprazol por conta própria há meses.",
    summary: "Explora sintomas dispépticos, refluxo, sinais de alarme, AINEs, álcool e automedicação prolongada.",
    hypothesis: "Sintomas dispépticos ou refluxo com automedicação prolongada, exigindo revisão de risco e indicação correta.",
    redFlags: "Perda de peso, vômitos persistentes, sangue nas fezes ou vômitos, anemia, disfagia, dor intensa progressiva.",
    education: "Orientar uso responsável de IBP, evitar AINEs sem orientação, medidas alimentares e avaliação médica se persistente."
  }
];

let selectedCase = 0;
let selectedStep = 0;

const caseButtons = document.querySelector("#case-buttons");
const stepTabs = document.querySelector("#step-tabs");
const promptsEl = document.querySelector("#prompts");
const scoreResult = document.querySelector("#score-result");

document.querySelector("#case-count").textContent = cases.length;

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

function checkboxId(caseIndex, stepIndex, promptIndex) {
  return `c${caseIndex}-s${stepIndex}-p${promptIndex}`;
}

function renderCase() {
  const current = cases[selectedCase];
  const step = steps[selectedStep];

  document.querySelector("#case-area").textContent = current.area;
  document.querySelector("#case-title").textContent = current.title;
  document.querySelector("#case-summary").textContent = current.summary;
  document.querySelector("#patient-name").textContent = current.patient;
  document.querySelector("#patient-context").textContent = current.context;
  document.querySelector("#step-title").textContent = step.title;
  document.querySelector("#step-purpose").textContent = step.purpose;
  document.querySelector("#hypothesis").textContent = current.hypothesis;
  document.querySelector("#red-flags").textContent = current.redFlags;
  document.querySelector("#education").textContent = current.education;

  promptsEl.innerHTML = step.prompts.map((prompt, index) => {
    const id = checkboxId(selectedCase, selectedStep, index);
    return `
      <div class="prompt-item">
        <input type="checkbox" id="${id}" data-score-item>
        <label for="${id}">
          <strong>${prompt[0]}</strong>
          <span>${prompt[1]}</span>
        </label>
      </div>
    `;
  }).join("");

  scoreResult.textContent = "Marque os itens realizados durante a entrevista.";
  renderCaseButtons();
  renderStepTabs();
}

function calculateScore() {
  const checked = document.querySelectorAll("[data-score-item]:checked").length;
  const totalVisible = document.querySelectorAll("[data-score-item]").length;
  const percent = Math.round((checked / totalVisible) * 100);
  let message = `Etapa atual: ${checked}/${totalVisible} itens marcados (${percent}%). `;

  if (percent >= 85) {
    message += "Entrevista muito bem conduzida nesta etapa.";
  } else if (percent >= 60) {
    message += "Boa condução, mas ainda há pontos importantes a completar.";
  } else {
    message += "Retome as perguntas essenciais antes de avançar.";
  }

  scoreResult.textContent = message;
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

document.querySelector("#score-button").addEventListener("click", calculateScore);
document.querySelector("#reset-button").addEventListener("click", () => {
  document.querySelectorAll("[data-score-item]").forEach((item) => {
    item.checked = false;
  });
  scoreResult.textContent = "Marcações limpas nesta etapa.";
});

renderCase();
