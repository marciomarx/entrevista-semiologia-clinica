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

const stepFeedback = {
  abertura: [
    {
      asked: "Quando pergunta identificação e ocupação, o entrevistador contextualiza idade, rotina, linguagem e riscos ocupacionais.",
      missed: "Sem identificação adequada, a entrevista perde contexto e pode ignorar fatores de risco ligados à idade, trabalho e rotina."
    },
    {
      asked: "Quando pergunta o motivo principal, o entrevistador organiza a prioridade do atendimento a partir da fala do paciente.",
      missed: "Sem queixa principal clara, a entrevista fica dispersa e pode focar em dados secundários antes do problema real."
    },
    {
      asked: "Quando explica a entrevista, cria vínculo, reduz ansiedade e aumenta a colaboração do paciente.",
      missed: "Sem explicar o processo, o paciente pode responder pouco, omitir informações ou sentir que está sendo interrogado sem acolhimento."
    }
  ],
  queixa: [
    {
      asked: "Quando investiga início e evolução, o entrevistador constrói a linha do tempo e diferencia quadros agudos, crônicos e progressivos.",
      missed: "Sem cronologia, fica difícil estimar gravidade, urgência e relação entre sintomas, medicamentos e hábitos."
    },
    {
      asked: "Quando pergunta intensidade, frequência, melhora e piora, aproxima o raciocínio da causa provável e dos gatilhos.",
      missed: "Sem caracterizar o sintoma, o entrevistador pode subestimar gravidade ou deixar passar fatores modificáveis."
    },
    {
      asked: "Quando busca sintomas associados, amplia o diagnóstico diferencial e identifica pistas clínicas sem precisar induzir resposta.",
      missed: "Sem sintomas associados, há risco de formular hipótese incompleta ou não reconhecer manifestações importantes."
    }
  ],
  medicamentos: [
    {
      asked: "Quando investiga medicamentos e adesão, diferencia falha terapêutica verdadeira de uso irregular ou técnica inadequada.",
      missed: "Sem essa pergunta, o entrevistador pode achar que o tratamento não funciona quando o problema é adesão, dose ou técnica."
    },
    {
      asked: "Quando pergunta automedicação, identifica riscos comuns como anti-inflamatórios, sedativos, chás, antibióticos ou uso prolongado sem indicação.",
      missed: "Sem investigar automedicação, pode deixar passar uma causa de piora, interação medicamentosa ou efeito adverso evitável."
    },
    {
      asked: "Quando pergunta alergias e reações, aumenta a segurança antes de orientar qualquer conduta.",
      missed: "Sem esse cuidado, uma orientação aparentemente simples pode expor o paciente a reação ou medicamento inadequado."
    }
  ],
  contexto: [
    {
      asked: "Quando pergunta antecedentes e família, identifica risco basal, comorbidades e predisposição clínica.",
      missed: "Sem antecedentes, a avaliação fica descolada do risco real do paciente e pode minimizar situações importantes."
    },
    {
      asked: "Quando investiga hábitos, encontra fatores modificáveis que sustentam a orientação educativa.",
      missed: "Sem hábitos, a conduta tende a ficar genérica e menos aplicável à vida do paciente."
    },
    {
      asked: "Quando avalia impacto funcional, mede repercussão do problema na vida diária e ajuda a graduar severidade.",
      missed: "Sem impacto funcional, o entrevistador pode subestimar sofrimento, limitação, risco ou necessidade de encaminhamento."
    }
  ],
  alerta: [
    {
      asked: "Quando pergunta sinais de alerta, identifica situações que mudam a urgência da conduta.",
      missed: "Sem sinais de alerta, o entrevistador pode manter orientação ambulatorial quando o caso exige avaliação imediata."
    },
    {
      asked: "Quando busca sinais vitais ou dados objetivos, ancora a entrevista em medidas e reduz achismos.",
      missed: "Sem dados objetivos disponíveis, pode perder evidências de gravidade, descontrole ou necessidade de encaminhamento."
    },
    {
      asked: "Quando reconhece necessidade de atendimento imediato, demonstra segurança clínica e protege o paciente.",
      missed: "Sem reconhecer urgência, há risco de atraso em cuidado essencial e falsa tranquilização."
    }
  ],
  fechamento: [
    {
      asked: "Quando resume o caso, confirma entendimento e permite corrigir informações antes da hipótese final.",
      missed: "Sem síntese, erros de interpretação podem passar despercebidos e comprometer a hipótese clínica."
    },
    {
      asked: "Quando pergunta se faltou algo, abre espaço para dados que o paciente não contou espontaneamente.",
      missed: "Sem essa checagem, informações importantes podem ficar fora da entrevista."
    },
    {
      asked: "Quando orienta com prudência, evita diagnóstico fechado indevido e mantém foco educativo e seguro.",
      missed: "Sem fechamento prudente, o aluno pode prometer certeza diagnóstica, orientar de forma insegura ou deixar o paciente sem próximos passos."
    }
  ]
};

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

const caseResponses = {
  "Hipertensão arterial sistêmica": {
    abertura: [
      "Meu nome é Roberto Almeida, tenho 58 anos e trabalho como motorista de aplicativo.",
      "Vim porque minha pressão tem aparecido alta em algumas medições e fiquei preocupado.",
      "Pode perguntar, sim. Eu só queria entender se isso é grave e o que estou fazendo errado."
    ],
    queixa: [
      "Percebi nas últimas três semanas. Às vezes dá 15 por 9, 16 por 10, mas não me sinto tão mal.",
      "Não sinto dor forte. Às vezes fico com uma pressão na cabeça, principalmente quando estou cansado.",
      "Não tive falta de ar, desmaio, dor no peito nem formigamento. Minha visão às vezes fica cansada, mas nada súbito."
    ],
    medicamentos: [
      "Tomo losartana, mas confesso que esqueço alguns dias, principalmente quando saio cedo para trabalhar.",
      "Não tomo remédio por conta para pressão. Às vezes tomo um anti-inflamatório para dor no joelho.",
      "Não tenho alergia conhecida a medicamentos."
    ],
    contexto: [
      "Meu pai teve infarto com pouco mais de 60 anos. Eu já ouvi que minha pressão era alta antes.",
      "Como bastante comida salgada na rua, faço pouca atividade física e tomo café várias vezes ao dia. Não fumo.",
      "Minha rotina é corrida. Fico muitas horas sentado e acabo medindo a pressão depois de café ou caminhada."
    ],
    alerta: [
      "Não tive dor no peito, falta de ar, fraqueza de um lado do corpo, confusão ou alteração visual de repente.",
      "A última medida foi 16 por 10. Eu tinha tomado café e estava andando antes de medir.",
      "Se você explicar esses sinais, eu entendo que nesses casos eu deveria procurar atendimento rápido."
    ],
    fechamento: [
      "Isso faz sentido. Eu realmente não tomo o remédio certinho e meço a pressão meio de qualquer jeito.",
      "Acho importante falar que minha alimentação tem muito sal e minha rotina dificulta cuidar disso.",
      "Entendi que preciso medir melhor, registrar os valores e não parar o remédio por conta própria."
    ]
  },
  "Diabetes mellitus tipo 2": {
    abertura: [
      "Meu nome é Helena Duarte, tenho 62 anos e sou aposentada.",
      "Vim porque estou com muita sede, urinando muito à noite e minha glicose deu alta.",
      "Tudo bem, pode perguntar. Eu quero saber se esses sintomas têm relação com o açúcar no sangue."
    ],
    queixa: [
      "Começou há uns dois meses, mas nas últimas semanas ficou mais frequente.",
      "Tenho sede quase o dia todo e acordo duas ou três vezes à noite para urinar. Melhora um pouco quando bebo água.",
      "Tenho cansaço, visão embaçada às vezes e um formigamento leve nos pés. Não tive vômitos."
    ],
    medicamentos: [
      "Uso metformina, mas às vezes esqueço, principalmente a dose da noite.",
      "Tomo chás para 'baixar açúcar', mas não sei se ajudam. Não uso insulina.",
      "Não tenho alergias que eu saiba."
    ],
    contexto: [
      "Minha mãe tinha diabetes. Eu também tenho pressão alta.",
      "Tenho comido muito pão e doces. Caminho pouco porque sinto cansaço.",
      "O cansaço atrapalha minhas tarefas, e acordar à noite está prejudicando meu sono."
    ],
    alerta: [
      "Não tive vômitos, sonolência forte, respiração estranha ou confusão. Só muita sede e urina.",
      "A glicemia na farmácia deu 268 mg/dL depois do almoço. Em jejum já deu perto de 180 mg/dL.",
      "Entendo que se eu ficar sonolenta, desidratada ou vomitando devo procurar atendimento."
    ],
    fechamento: [
      "Você entendeu bem: estou com sede, urinando muito e não tomo a metformina sempre direito.",
      "Também queria dizer que estou preocupada com o formigamento nos pés.",
      "Entendi que preciso acompanhar melhor, registrar glicemias e conversar com meu médico."
    ]
  },
  "Obesidade e síndrome metabólica": {
    abertura: [
      "Meu nome é Carla Menezes, tenho 44 anos e trabalho em escritório.",
      "Vim porque ganhei peso, estou muito cansada e meus exames vieram alterados.",
      "Pode perguntar, mas eu fico um pouco desconfortável quando o assunto é peso."
    ],
    queixa: [
      "O ganho de peso foi acontecendo nos últimos anos, mas piorou no último ano.",
      "Sinto cansaço quase todos os dias. Piora quando subo escadas e melhora quando descanso.",
      "Tenho sono ruim, ronco segundo meu marido e às vezes sinto dor nos joelhos."
    ],
    medicamentos: [
      "Não uso remédio fixo para emagrecer. Já tentei alguns produtos naturais por conta própria.",
      "Já tomei chás e cápsulas que comprei pela internet, mas parei porque não vi resultado.",
      "Não tenho alergia conhecida."
    ],
    contexto: [
      "Minha mãe tem diabetes e meu pai tem pressão alta. Meus triglicerídeos vieram altos.",
      "Fico muito tempo sentada, como rápido e belisco à noite. Não fumo e bebo pouco.",
      "Tenho evitado sair e fazer atividade física por vergonha e por cansaço."
    ],
    alerta: [
      "Não sinto dor no peito. Tenho falta de ar só em esforço maior. Não tive desmaios.",
      "Minha pressão deu 14 por 9 em uma consulta. A cintura também aumentou bastante.",
      "Se tivesse dor no peito, falta de ar importante ou piora rápida, eu procuraria atendimento."
    ],
    fechamento: [
      "Sim, o ponto principal é que meu peso e meus exames estão me preocupando.",
      "Queria acrescentar que quando me sinto julgada eu acabo desistindo de procurar ajuda.",
      "Gostei quando você falou em metas possíveis, porque dietas muito rígidas eu não consigo manter."
    ]
  },
  "Dislipidemias": {
    abertura: [
      "Meu nome é Paulo Nogueira, tenho 51 anos e sou gerente comercial.",
      "Vim por causa dos exames de colesterol, principalmente o LDL, que veio alto.",
      "Pode perguntar. Tenho dúvidas porque fiquei com medo do remédio."
    ],
    queixa: [
      "Descobri no exame de rotina do mês passado. Eu não sinto nada específico.",
      "Não tenho dor, mas fiquei preocupado porque o médico falou em risco para o coração.",
      "Não tive dor no peito, falta de ar ou desmaio."
    ],
    medicamentos: [
      "O médico passou estatina, mas eu parei depois de umas duas semanas.",
      "Parei porque li na internet que poderia fazer mal ao fígado e dar dor muscular. Não falei com o médico ainda.",
      "Não tenho alergias conhecidas."
    ],
    contexto: [
      "Meu pai teve AVC. Eu estou acima do peso e meu LDL veio bem alto.",
      "Como muita comida pronta, carne gordurosa e pouca verdura. Faço pouca atividade física.",
      "Na rotina eu viajo muito a trabalho, então acabo comendo em estrada e restaurante."
    ],
    alerta: [
      "Não tive dor no peito, fraqueza de um lado do corpo, fala enrolada ou dor forte na perna ao caminhar.",
      "O LDL veio 182 mg/dL. Não lembro todos os valores, mas o triglicerídeo também estava alto.",
      "Entendo que sintomas como dor no peito ou sinais neurológicos seriam urgência."
    ],
    fechamento: [
      "Você entendeu: o problema não é um sintoma, é meu risco e eu ter parado o remédio.",
      "Acho importante dizer que minha decisão veio de medo, não de efeito colateral real.",
      "Entendi que preciso conversar com o médico antes de parar e cuidar da alimentação."
    ]
  },
  "Asma": {
    abertura: [
      "Meu nome é Letícia Souza, tenho 27 anos e sou professora.",
      "Vim porque estou tossindo, com chiado e usando a bombinha mais do que antes.",
      "Pode perguntar. Eu queria saber se estou usando a bombinha direito."
    ],
    queixa: [
      "Piorou nos últimos dois meses, principalmente à noite e quando faço esforço.",
      "A tosse é frequente e o chiado aparece quando subo escada. A bombinha azul melhora, mas volta depois.",
      "Tenho aperto no peito às vezes. Não tive febre nem catarro amarelo."
    ],
    medicamentos: [
      "Uso salbutamol quando falta ar e tenho uma bombinha de corticoide para usar todos os dias, mas esqueço.",
      "Não uso espaçador. Às vezes aperto a bombinha e respiro rápido, sem coordenar muito.",
      "Não tenho alergia a remédios conhecida."
    ],
    contexto: [
      "Tenho rinite e minha mãe também tinha chiado no peito.",
      "Piora com poeira, mofo e exercício. Não fumo.",
      "A tosse atrapalha minhas aulas e meu sono."
    ],
    alerta: [
      "Hoje consigo falar frases completas. Não fiquei roxa nem sonolenta, mas já acordei à noite com falta de ar.",
      "Não medi saturação hoje. Em uma crise anterior já deu 93%.",
      "Entendo que se eu não melhorar com a bombinha, tiver dificuldade para falar ou ficar muito cansada, devo procurar urgência."
    ],
    fechamento: [
      "Sim, eu uso muito a bombinha de alívio e esqueço a de controle.",
      "Também acho que minha técnica pode estar errada porque nunca me ensinaram direito.",
      "Entendi que preciso revisar a técnica, usar o controlador e ter um plano para crises."
    ]
  },
  "Doença pulmonar obstrutiva crônica": {
    abertura: [
      "Meu nome é João Batista, tenho 68 anos e sou aposentado.",
      "Vim porque estou cansando mais para caminhar e tenho tosse há muito tempo.",
      "Pode perguntar. Eu achava que era só idade, mas está incomodando."
    ],
    queixa: [
      "A falta de ar vem piorando há anos, mas nos últimos meses ficou mais clara.",
      "Piora quando subo ladeira ou caminho rápido. Melhora quando paro para descansar.",
      "Tenho tosse com catarro pela manhã. Não tive dor no peito forte."
    ],
    medicamentos: [
      "Tenho um inalador, mas uso só quando lembro ou quando falta mais ar.",
      "Não uso remédios por conta para respirar. Às vezes tomo xarope quando a tosse incomoda.",
      "Não lembro de alergia a medicamentos."
    ],
    contexto: [
      "Fumei por quase 40 anos e parei há cinco anos. Meu irmão também tinha problema respiratório.",
      "Faço pouca atividade física. Vacina de gripe eu tomo alguns anos, outros esqueço.",
      "A falta de ar limita caminhada, mercado e tarefas simples."
    ],
    alerta: [
      "Não estou com falta de ar parado agora. Não tive confusão nem lábios roxos.",
      "Não sei minha saturação hoje. Quando tive piora com infecção, o catarro ficou mais escuro.",
      "Entendo que se tiver falta de ar em repouso, febre forte ou catarro purulento devo procurar atendimento."
    ],
    fechamento: [
      "Você entendeu bem: é uma falta de ar crônica que piora com esforço.",
      "Acho importante falar que usei cigarro por muitos anos.",
      "Entendi que preciso usar o inalador corretamente, vacinar e reconhecer pioras."
    ]
  },
  "Dengue e arboviroses": {
    abertura: [
      "Meu nome é Marina Costa, tenho 34 anos e trabalho em uma escola.",
      "Vim porque estou com febre, muita dor no corpo e dor de cabeça.",
      "Pode perguntar. Estou preocupada porque muita gente no meu bairro ficou doente."
    ],
    queixa: [
      "Começou há dois dias, de repente, com febre e dor no corpo.",
      "A dor é forte, principalmente no corpo e atrás dos olhos. Melhora um pouco com repouso.",
      "Tenho náusea leve, mas não vomitei. Não estou com tosse importante."
    ],
    medicamentos: [
      "Tomei ibuprofeno por conta própria ontem porque a dor estava forte.",
      "Também tomei dipirona uma vez. Não usei antibiótico.",
      "Não tenho alergia conhecida."
    ],
    contexto: [
      "Não tenho doenças importantes. No meu bairro tem muitos casos parecidos.",
      "Estou bebendo pouca água porque fico enjoada. Não fumo.",
      "Estou sem trabalhar desde ontem porque a dor no corpo é intensa."
    ],
    alerta: [
      "Não tive sangramento, dor abdominal forte, tontura intensa nem vômitos repetidos.",
      "A febre chegou a 38,8 °C. Não medi pressão hoje.",
      "Entendo que sangramento, dor abdominal forte, vômitos ou tontura seriam sinais para procurar serviço de saúde."
    ],
    fechamento: [
      "Isso mesmo: comecei com febre e dor forte no corpo há dois dias.",
      "Acho importante lembrar que tomei ibuprofeno sem orientação.",
      "Entendi que devo hidratar, evitar anti-inflamatório e observar sinais de alarme."
    ]
  },
  "Infecções respiratórias agudas": {
    abertura: [
      "Meu nome é Rafael Lima, tenho 39 anos e trabalho em vendas.",
      "Vim porque estou tossindo, com coriza e queria saber se preciso de antibiótico.",
      "Pode perguntar, mas eu já tive isso antes e acho que antibiótico resolve rápido."
    ],
    queixa: [
      "Começou há três dias com coriza, garganta arranhando e tosse seca.",
      "A febre foi baixa, perto de 37,8 °C. Piora à noite e melhora com repouso e líquidos.",
      "Não tenho falta de ar, dor no peito ou chiado. O nariz está escorrendo bastante."
    ],
    medicamentos: [
      "Tomei antigripal por conta própria e pastilha para garganta.",
      "Não comecei antibiótico ainda, mas queria comprar.",
      "Não tenho alergia a medicamentos que eu saiba."
    ],
    contexto: [
      "Meu filho ficou resfriado semana passada. Não tenho doença pulmonar.",
      "Durmo pouco e trabalho falando bastante. Não fumo.",
      "A tosse atrapalha o trabalho, mas consigo fazer minhas atividades."
    ],
    alerta: [
      "Não tive falta de ar, confusão, febre alta persistente nem piora depois de melhorar.",
      "Não medi saturação. A febre foi baixa e passou com antitérmico.",
      "Entendo que falta de ar, dor no peito ou febre alta persistente mudariam a conduta."
    ],
    fechamento: [
      "Entendi que meu quadro parece mais leve e recente.",
      "Também entendi que antibiótico não é sempre necessário para tosse e coriza.",
      "Vou observar sinais de piora, hidratar e procurar atendimento se aparecer alerta."
    ]
  },
  "Ansiedade, insônia e sofrimento psíquico": {
    abertura: [
      "Meu nome é Bianca Rocha, tenho 31 anos e sou analista administrativa.",
      "Vim porque não estou dormindo bem, sinto palpitações e estou muito preocupada.",
      "Pode perguntar. É um pouco difícil falar disso, mas eu preciso de ajuda."
    ],
    queixa: [
      "Começou há uns três meses, depois que aumentou a pressão no trabalho.",
      "A insônia acontece quase toda noite. Demoro para dormir e acordo cansada.",
      "Tenho aperto no peito quando fico nervosa, palpitações e pensamentos acelerados."
    ],
    medicamentos: [
      "Não uso remédio controlado. Às vezes tomo bebida alcoólica para tentar relaxar.",
      "Já pensei em tomar calmante de outra pessoa, mas não cheguei a tomar.",
      "Não tenho alergias conhecidas."
    ],
    contexto: [
      "Minha mãe teve depressão. Eu já tive crises de ansiedade antes, mas mais leves.",
      "Tenho dormido pouco, tomado muito café e quase não faço atividade física.",
      "Está afetando meu trabalho e minha relação em casa. Choro com facilidade."
    ],
    alerta: [
      "Não tenho plano de me machucar, mas em alguns dias penso que não aguento mais essa rotina.",
      "Não tive desmaio. As palpitações passam quando consigo me acalmar.",
      "Entendo que se eu pensar em me ferir ou perder o controle devo procurar ajuda imediatamente."
    ],
    fechamento: [
      "Você entendeu: o sono ruim e a ansiedade estão atrapalhando minha vida.",
      "Acho importante falar que eu estava tentando resolver sozinha com álcool e café demais.",
      "Entendi que preciso de apoio, evitar automedicação e procurar acompanhamento."
    ]
  },
  "Gastrite, refluxo e uso inadequado de antiácidos/IBP": {
    abertura: [
      "Meu nome é Eduardo Martins, tenho 46 anos e sou técnico de manutenção.",
      "Vim porque sinto queimação no estômago e no peito, principalmente depois de comer.",
      "Pode perguntar. Eu tomo omeprazol faz tempo, mas não sei se estou usando certo."
    ],
    queixa: [
      "A queimação vem há meses. Piora quando como muito, tomo café ou deito logo depois.",
      "A sensação sobe para o peito e garganta. Melhora parcialmente com omeprazol.",
      "Não tive vômito com sangue, fezes pretas ou perda de peso importante."
    ],
    medicamentos: [
      "Tomo omeprazol quase todo dia por conta própria há vários meses.",
      "Também tomo anti-inflamatório quando minha lombar ataca.",
      "Não tenho alergia conhecida."
    ],
    contexto: [
      "Não tenho doença grave conhecida. Meu pai teve úlcera.",
      "Tomo bastante café, como tarde da noite e às vezes bebo nos fins de semana.",
      "A queimação atrapalha o sono quando deito logo depois de jantar."
    ],
    alerta: [
      "Não tenho dificuldade para engolir, anemia conhecida, perda de peso, sangue nas fezes ou vômitos persistentes.",
      "Não fiz exames recentes. A dor não é forte como aperto no peito de esforço.",
      "Entendo que sangue, perda de peso, anemia ou dificuldade para engolir exigem avaliação rápida."
    ],
    fechamento: [
      "Isso mesmo: eu uso omeprazol por conta e também anti-inflamatório às vezes.",
      "Acho importante falar que café e deitar depois de comer pioram bastante.",
      "Entendi que preciso rever o uso do remédio e procurar avaliação se persistir ou tiver sinais de alerta."
    ]
  }
};

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
const finalAssessmentEl = document.querySelector(".final-assessment");
const printReportEl = document.querySelector("#print-report");
const stepPanelEl = document.querySelector(".step-panel");
const nextButton = document.querySelector("#next-button");
const totalScoreButton = document.querySelector("#total-score-button");
const pdfButton = document.querySelector("#pdf-button");
const whatsappButton = document.querySelector("#whatsapp-button");

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
  const interviewTabs = steps.map((step, index) => `
    <button class="step-tab ${index === selectedStep ? "active" : ""}" type="button" data-step="${index}">
      ${index + 1}. ${step.title}
    </button>
  `).join("");
  const finalTab = `
    <button class="step-tab ${selectedStep === steps.length ? "active" : ""}" type="button" data-step="${steps.length}">
      ${steps.length + 1}. Perguntas finais
    </button>
  `;
  stepTabs.innerHTML = interviewTabs + finalTab;
}

function renderPrompts() {
  const current = cases[selectedCase];
  const step = steps[selectedStep];
  if (!step) {
    promptsEl.innerHTML = "";
    return;
  }
  promptsEl.innerHTML = step.prompts.map((prompt, index) => {
    const id = checkboxId(selectedCase, selectedStep, index);
    const checked = checkedItems.has(id) ? "checked" : "";
    const response = caseResponses[current.title]?.[step.id]?.[index] ?? prompt[1];
    return `
      <div class="prompt-item">
        <input type="checkbox" id="${id}" data-score-item ${checked}>
        <label for="${id}">
          <strong>${prompt[0]}</strong>
          <span><b>Resposta do aluno-paciente:</b> ${response}</span>
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
      const wasAsked = checkedItems.has(id);
      const marker = wasAsked ? "Realizado" : "Pendente";
      const response = caseResponses[current.title]?.[step.id]?.[promptIndex] ?? prompt[1];
      const feedback = stepFeedback[step.id][promptIndex];
      const feedbackText = wasAsked ? feedback.asked : feedback.missed;
      const feedbackLabel = wasAsked ? "Quando perguntou" : "Consequência de não perguntar";
      return `
        <li>
          <strong>${marker}:</strong> ${prompt[0]}
          <span class="report-feedback"><strong>Resposta esperada do paciente:</strong> ${response}</span>
          <span class="report-feedback"><strong>${feedbackLabel}:</strong> ${feedbackText}</span>
        </li>
      `;
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
  const isFinalStep = selectedStep === steps.length;

  document.querySelector("#case-area").textContent = current.area;
  document.querySelector("#case-title").textContent = current.title;
  document.querySelector("#case-summary").textContent = current.summary;
  document.querySelector("#patient-name").textContent = current.patient;
  document.querySelector("#patient-context").textContent = current.context;
  document.querySelector("#hidden-context").textContent = current.hiddenContext;
  document.querySelector("#acting-rule").textContent = current.actingRule;
  if (!isFinalStep) {
    document.querySelector("#step-title").textContent = step.title;
    document.querySelector("#step-purpose").textContent = step.purpose;
  }

  renderCaseButtons();
  renderStepTabs();
  renderPrompts();
  renderFinalItems();
  renderReport();
  stepPanelEl.classList.toggle("is-hidden", isFinalStep);
  finalAssessmentEl.classList.toggle("is-hidden", !isFinalStep);
  printReportEl.classList.toggle("is-hidden", !isFinalStep);
  nextButton.classList.toggle("is-hidden", isFinalStep);
  totalScoreButton.classList.toggle("is-hidden", !isFinalStep);
  pdfButton.classList.toggle("is-hidden", !isFinalStep);
  whatsappButton.classList.toggle("is-hidden", !isFinalStep);
  scoreResult.textContent = isFinalStep
    ? "Perguntas finais: peça ao aluno-farmacêutico a hipótese, o problema principal, os sinais de alerta e a orientação. Depois calcule a pontuação."
    : "Aluno-paciente: marque os pontos conforme o entrevistador conduz a entrevista. Não revele o caso ao aluno-farmacêutico.";
}

function calculateTotalScore() {
  const scores = getScores(selectedCase);
  scoreResult.textContent = `Pontuação total: ${scores.total}/100. Entrevista: ${scores.interviewScore}/70. Raciocínio final: ${scores.finalScore}/30. ${getPerformanceMessage(scores.total)}`;
  renderReport();
}

function buildWhatsAppText() {
  const current = cases[selectedCase];
  const scores = getScores(selectedCase);
  const finalLines = finalCriteria.map((criterion) => {
    const status = finalCheckedItems.has(finalId(selectedCase, criterion.id)) ? "acertou" : "não pontuou";
    return `- ${criterion.label}: ${status} (${criterion.points} pts)`;
  }).join("\n");

  const stepLines = steps.map((step, index) => {
    const checked = getStepCheckedItems(selectedCase, index);
    return `- ${step.title}: ${checked}/${step.prompts.length}`;
  }).join("\n");

  return [
    "Relatório da entrevista clínica",
    `Caso: ${current.title}`,
    `Paciente simulado: ${current.patient}`,
    "",
    `Pontuação total: ${scores.total}/100`,
    `Entrevista: ${scores.interviewScore}/70 (${scores.checked}/${scores.interviewItems} itens)`,
    `Raciocínio final: ${scores.finalScore}/30`,
    "",
    "Pontuação por bloco:",
    stepLines,
    "",
    "Perguntas finais:",
    finalLines,
    "",
    getPerformanceMessage(scores.total)
  ].join("\n");
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

document.querySelector("#total-score-button").addEventListener("click", calculateTotalScore);
document.querySelector("#pdf-button").addEventListener("click", () => {
  calculateTotalScore();
  window.print();
});
whatsappButton.addEventListener("click", () => {
  calculateTotalScore();
  const url = `https://wa.me/?text=${encodeURIComponent(buildWhatsAppText())}`;
  window.open(url, "_blank", "noopener");
});
nextButton.addEventListener("click", () => {
  selectedStep = Math.min(selectedStep + 1, steps.length);
  renderCase();
});

renderCase();
