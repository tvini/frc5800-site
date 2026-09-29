export type Language = "pt" | "en";
export type LocalText = { pt: string; en: string };
export type OutreachCategory =
  "education" | "inclusion" | "teams" | "engineering";

export const categoryLabels: Record<OutreachCategory, LocalText> = {
  education: { pt: "Educação", en: "Education" },
  inclusion: { pt: "Inclusão", en: "Inclusion" },
  teams: { pt: "Novas equipes", en: "New teams" },
  engineering: { pt: "Engenharia", en: "Engineering" },
};

export interface OutreachProject {
  slug: string;
  category: OutreachCategory;
  year: string;
  title: LocalText;
  lead: LocalText;
  story: LocalText;
  outcome: LocalText;
  image: string;
  secondaryImage: string;
  imageAlt: LocalText;
  secondaryAlt: LocalText;
  stats: { number: string; label: LocalText }[];
  pages: string;
}

export const outreachProjects: OutreachProject[] = [
  {
    slug: "robotica-no-hospital",
    category: "inclusion",
    year: "2025–2026",
    title: { pt: "Robótica no hospital", en: "Robotics at the hospital" },
    lead: {
      pt: "Peças de LEGO, imaginação e descoberta chegam às crianças em atendimento hospitalar.",
      en: "LEGO pieces, imagination and discovery reach children receiving hospital care.",
    },
    story: {
      pt: "A equipe leva oficinas de robótica a um ambiente em que brincar e aprender ganham outro significado. Integrantes são preparados para conduzir atividades educativas com as crianças e adaptar cada encontro ao contexto do hospital.",
      en: "The team brings robotics workshops to a setting where playing and learning take on another meaning. Members are trained to lead educational activities with children and adapt each meeting to the hospital setting.",
    },
    outcome: {
      pt: "O projeto está em seu segundo ano, com cinco meses de oficinas e cerca de 2 mil crianças alcançadas.",
      en: "The project is in its second year, with five months of workshops and around 2,000 children reached.",
    },
    image: "hospital-child.jpg",
    secondaryImage: "hospital-mentor.jpg",
    imageAlt: {
      pt: "Oficina de robótica no hospital",
      en: "Robotics workshop at the hospital",
    },
    secondaryAlt: {
      pt: "Mentoria durante atividade no hospital",
      en: "Mentoring during a hospital activity",
    },
    stats: [
      {
        number: "~2.000",
        label: { pt: "crianças alcançadas", en: "children reached" },
      },
      {
        number: "12",
        label: { pt: "voluntários capacitados", en: "trained volunteers" },
      },
      {
        number: "5",
        label: { pt: "meses de oficinas", en: "months of workshops" },
      },
    ],
    pages: "06",
  },
  {
    slug: "semana-da-robotica",
    category: "education",
    year: "2025",
    title: {
      pt: "Semana Municipal da Robótica",
      en: "Municipal Robotics Week",
    },
    lead: {
      pt: "Uma semana inteira para fazer a robótica ocupar as escolas de Florianópolis.",
      en: "A full week bringing robotics into Florianópolis schools.",
    },
    story: {
      pt: "As ações da Semana Municipal da Robótica aproximam estudantes da construção, da programação e do trabalho em equipe. Em vez de esperar que a escola venha até a oficina, a 5800 leva experiências práticas para dentro da rede de ensino.",
      en: "Municipal Robotics Week activities bring students closer to building, programming and teamwork. Rather than waiting for schools to visit the workshop, the 5800 takes hands-on experiences into the education network.",
    },
    outcome: {
      pt: "Na edição de 2025, o livro registra visitas a 13 escolas em uma semana, com mais de 380 crianças e 39 voluntários envolvidos.",
      en: "For 2025, the book records visits to 13 schools in one week, with more than 380 children and 39 volunteers involved.",
    },
    image: "robotics-week-class.jpg",
    secondaryImage: "robotics-week-workshop.jpg",
    imageAlt: {
      pt: "Estudantes em oficina da Semana da Robótica",
      en: "Students at a Robotics Week workshop",
    },
    secondaryAlt: {
      pt: "Atividade prática de robótica com estudantes",
      en: "Hands-on robotics activity with students",
    },
    stats: [
      {
        number: "13",
        label: { pt: "escolas visitadas", en: "schools visited" },
      },
      { number: "380+", label: { pt: "crianças", en: "children" } },
      { number: "39+", label: { pt: "voluntários", en: "volunteers" } },
    ],
    pages: "08–09",
  },
  {
    slug: "formacao-de-professores",
    category: "education",
    year: "2025–2026",
    title: { pt: "Formação de professores", en: "Teacher training" },
    lead: {
      pt: "Quando um professor aprende robótica, o conhecimento pode chegar a uma escola inteira.",
      en: "When a teacher learns robotics, that knowledge can reach an entire school.",
    },
    story: {
      pt: "A 5800 compartilha métodos e materiais para que educadores da rede municipal incorporem robótica às próprias aulas. A formação prioriza experiências replicáveis, de modo que o aprendizado continue depois da visita da equipe.",
      en: "The 5800 shares methods and materials so municipal educators can bring robotics into their own classes. Training focuses on activities they can repeat, allowing the learning to continue after the team's visit.",
    },
    outcome: {
      pt: "O livro registra 82 professores formados em 24 horas de capacitação e estima um alcance potencial de mais de 20 mil estudantes da rede municipal.",
      en: "The book records 82 teachers trained over 24 hours and estimates a potential reach of more than 20,000 municipal students.",
    },
    image: "teacher-training.jpg",
    secondaryImage: "online-workshops.jpg",
    imageAlt: {
      pt: "Professores participam de formação em robótica",
      en: "Teachers take part in robotics training",
    },
    secondaryAlt: {
      pt: "Material educativo usado em oficinas",
      en: "Educational material used in workshops",
    },
    stats: [
      {
        number: "82",
        label: { pt: "professores formados", en: "teachers trained" },
      },
      { number: "24h", label: { pt: "de capacitação", en: "of training" } },
      {
        number: "20 mil+",
        label: {
          pt: "alunos com alcance potencial",
          en: "students potentially reached",
        },
      },
    ],
    pages: "10",
  },
  {
    slug: "torneios-educacionais",
    category: "education",
    year: "2024–2025",
    title: { pt: "Torneios educacionais", en: "Educational tournaments" },
    lead: {
      pt: "Uma arena feita para aprender: criar, testar, errar e tentar de novo.",
      en: "An arena built for learning: design, test, fail and try again.",
    },
    story: {
      pt: "Inspirados na FIRST LEGO League, nossos torneios apresentam desafios ligados ao território e à vida dos estudantes. Culture Conquest explorou atividades econômicas de Santa Catarina; R3volution trouxe os 3Rs e a sustentabilidade para a comunidade do Morro da Cruz.",
      en: "Inspired by FIRST LEGO League, our tournaments explore challenges rooted in students' lives and surroundings. Culture Conquest explored economic activities in Santa Catarina; R3volution brought the 3Rs and sustainability to the Morro da Cruz community.",
    },
    outcome: {
      pt: "Entre 2024 e 2025, o livro registra nove torneios, mais de 350 crianças e jovens participantes, 31 kits e atividades em mais de 15 cidades. Três torneios foram replicados por participantes.",
      en: "Between 2024 and 2025, the book records nine tournaments, more than 350 young participants, 31 kits and activities across more than 15 cities. Participants replicated three tournaments.",
    },
    image: "culture-conquest-build.jpg",
    secondaryImage: "revolution-event.jpg",
    imageAlt: {
      pt: "Participantes constroem robôs no Culture Conquest",
      en: "Participants build robots at Culture Conquest",
    },
    secondaryAlt: {
      pt: "Torneio educacional R3volution",
      en: "R3volution educational tournament",
    },
    stats: [
      { number: "9", label: { pt: "torneios", en: "tournaments" } },
      { number: "350+", label: { pt: "participantes", en: "participants" } },
      { number: "15+", label: { pt: "cidades", en: "cities" } },
    ],
    pages: "11–13",
  },
  {
    slug: "bridge-for-girls",
    category: "inclusion",
    year: "2023–2026",
    title: { pt: "Bridge for Girls", en: "Bridge for Girls" },
    lead: {
      pt: "Oficinas lideradas por meninas para que mais meninas se vejam na ciência e engenharia.",
      en: "Workshops led by girls so more girls can picture themselves in science and engineering.",
    },
    story: {
      pt: "Durante um mês, integrantes da equipe conduzem encontros semanais de programação, engenharia e comunicação. A experiência aproxima novas participantes de referências femininas e de um espaço em que podem construir com autonomia.",
      en: "Over a month, team members lead weekly sessions in programming, engineering and communication. The experience connects participants with female role models and a place where they can build with confidence.",
    },
    outcome: {
      pt: "Em três anos, mais de 60 meninas participaram; 21 ingressaram na equipe. O livro registra a participação feminina na 5800 crescendo de 25% em 2023 para 54% em 2026.",
      en: "Over three years, more than 60 girls took part and 21 joined the team. The book records female participation in the 5800 rising from 25% in 2023 to 54% in 2026.",
    },
    image: "bridge-workshop.jpg",
    secondaryImage: "bridge-group.jpg",
    imageAlt: {
      pt: "Meninas em oficina do Bridge for Girls",
      en: "Girls at a Bridge for Girls workshop",
    },
    secondaryAlt: {
      pt: "Grupo participante do Bridge for Girls",
      en: "Bridge for Girls participants",
    },
    stats: [
      {
        number: "60+",
        label: { pt: "meninas participantes", en: "girls participated" },
      },
      {
        number: "21",
        label: { pt: "ingressaram na 5800", en: "joined the 5800" },
      },
      {
        number: "54%",
        label: {
          pt: "integrantes meninas em 2026",
          en: "girl members in 2026",
        },
      },
    ],
    pages: "17",
  },
  {
    slug: "novas-equipes-first",
    category: "teams",
    year: "2025–2026",
    title: { pt: "Novas equipes FIRST", en: "New FIRST teams" },
    lead: {
      pt: "A robótica cresce quando uma equipe ajuda outra a começar.",
      en: "Robotics grows when one team helps another get started.",
    },
    story: {
      pt: "A 5800 atua com escolas e institutos federais para apoiar equipes em diferentes programas FIRST. Isso inclui mentoria, contato com equipes interessadas e mobilização de peças e recursos para que mais estudantes tenham uma primeira temporada.",
      en: "The 5800 works with schools and federal institutes to support teams in different FIRST programs. This includes mentoring, reaching interested groups and securing parts and resources so more students can experience their first season.",
    },
    outcome: {
      pt: "O livro relata apoio à criação de duas equipes IFRC, uma FTC em escola pública e seis FLL em instituições públicas, além de 32 horas de mentoria IFRC.",
      en: "The book reports support for two IFRC teams, one FTC team at a public school and six FLL teams at public institutions, plus 32 hours of IFRC mentoring.",
    },
    image: "ifrc-group.jpg",
    secondaryImage: "fll-event.jpg",
    imageAlt: {
      pt: "Grupo de equipes em evento IFRC",
      en: "Teams gathered at an IFRC event",
    },
    secondaryAlt: {
      pt: "Participantes de evento FLL",
      en: "FLL event participants",
    },
    stats: [
      {
        number: "2",
        label: { pt: "equipes IFRC apoiadas", en: "IFRC teams supported" },
      },
      {
        number: "1",
        label: {
          pt: "equipe FTC em escola pública",
          en: "FTC team in a public school",
        },
      },
      {
        number: "6",
        label: {
          pt: "equipes FLL em instituições públicas",
          en: "FLL teams in public institutions",
        },
      },
    ],
    pages: "14–16",
  },
  {
    slug: "magic-alliance",
    category: "teams",
    year: "2026",
    title: { pt: "Magic Alliance", en: "Magic Alliance" },
    lead: {
      pt: "Mentorias online que tornam a experiência da 5800 acessível a outras equipes.",
      en: "Online mentoring that makes the 5800's experience available to other teams.",
    },
    story: {
      pt: "Encontros remotos criam um espaço para trocar práticas de construção, organização e competição com equipes em desenvolvimento. É uma forma de multiplicar conhecimento além de Florianópolis.",
      en: "Remote meetings create space to share building, organization and competition practices with developing teams. It is a way to share knowledge beyond Florianópolis.",
    },
    outcome: {
      pt: "A iniciativa já realizou oito encontros e capacitou seis equipes.",
      en: "The initiative has held eight meetings and trained six teams.",
    },
    image: "magic-alliance-call.jpg",
    secondaryImage: "online-workshops.jpg",
    imageAlt: {
      pt: "Encontro online de mentoria Magic Alliance",
      en: "Magic Alliance online mentoring call",
    },
    secondaryAlt: {
      pt: "Oficina educativa online",
      en: "Online educational workshop",
    },
    stats: [
      {
        number: "6",
        label: { pt: "equipes capacitadas", en: "teams trained" },
      },
      {
        number: "8",
        label: { pt: "encontros até 2026", en: "meetings through 2026" },
      },
    ],
    pages: "22",
  },
  {
    slug: "mundo-da-robotica",
    category: "education",
    year: "2026",
    title: { pt: "Mundo da Robótica", en: "World of Robotics" },
    lead: {
      pt: "Materiais e oficinas para que educadores levem robótica a mais salas de aula.",
      en: "Resources and workshops helping educators bring robotics into more classrooms.",
    },
    story: {
      pt: "O Mundo da Robótica reúne recursos online voltados a professores da rede pública. A equipe combina conteúdos que podem ser usados à distância com oficinas para apoiar quem quer transformar ideias de robótica em atividades de aprendizagem.",
      en: "Mundo da Robótica brings together online resources for public-school teachers. The team combines materials that can be used remotely with workshops to help turn robotics ideas into learning activities.",
    },
    outcome: {
      pt: "No conjunto das ações educacionais da equipe, foram 58 unidades de aprendizagem produzidas. A formação de professores é outra frente dessa estratégia de multiplicação.",
      en: "Across the team's educational initiatives, 58 learning units were produced. Teacher training is another part of this approach to sharing knowledge.",
    },
    image: "online-workshops.jpg",
    secondaryImage: "teacher-training.jpg",
    imageAlt: {
      pt: "Materiais apresentados em oficina online da equipe",
      en: "Materials shown during a team online workshop",
    },
    secondaryAlt: {
      pt: "Professores participam de formação",
      en: "Teachers take part in training",
    },
    stats: [
      {
        number: "58",
        label: {
          pt: "unidades de aprendizagem da equipe",
          en: "team learning units",
        },
      },
    ],
    pages: "07, 20",
  },
  {
    slug: "sonda-aquatica",
    category: "engineering",
    year: "2026",
    title: { pt: "Sonda aquática", en: "Aquatic probe" },
    lead: {
      pt: "Eletrônica e projeto de engenharia aprendidos em parceria com uma escola municipal.",
      en: "Electronics and engineering design learned alongside a municipal school.",
    },
    story: {
      pt: "A construção de uma sonda aquática aproxima os estudantes de sensores, prototipagem e solução de problemas reais. O trabalho apresenta a engenharia como ferramenta para investigar o ambiente.",
      en: "Building an aquatic probe introduces students to sensors, prototyping and real-world problem-solving. The work presents engineering as a tool for investigating the environment.",
    },
    outcome: {
      pt: "Exemplo prático de colaboração contínua entre a equipe e a escola municipal parceira.",
      en: "A practical example of ongoing collaboration between the team and the partner municipal school.",
    },
    image: "aquatic-team.jpg",
    secondaryImage: "team-build.jpg",
    imageAlt: {
      pt: "Equipe e estudantes no projeto da sonda aquática",
      en: "Team and students in the aquatic probe project",
    },
    secondaryAlt: {
      pt: "Integrantes da equipe trabalhando na oficina",
      en: "Team members working in the shop",
    },
    stats: [
      {
        number: "STEAM",
        label: { pt: "aprendizado prático", en: "hands-on learning" },
      },
    ],
    pages: "07",
  },
  {
    slug: "turret",
    category: "engineering",
    year: "2026",
    title: { pt: "Turret", en: "Turret" },
    lead: {
      pt: "Um projeto para transformar curiosidade mecânica em prototipagem e aprendizado.",
      en: "A project turning mechanical curiosity into prototyping and learning.",
    },
    story: {
      pt: "O projeto Turret leva integrantes a explorar conceitos de engenharia fora do calendário da arena. Projetar, construir e iterar sobre um mecanismo amplia as habilidades que voltam para os robôs da equipe.",
      en: "The Turret project lets members explore engineering ideas beyond the competition calendar. Designing, building and iterating a mechanism develops skills they bring back to the team's robots.",
    },
    outcome: {
      pt: "Desenvolvimento técnico e prototipagem contínua pelos integrantes da equipe.",
      en: "Technical development and continuous prototyping by team members.",
    },
    image: "turret.png",
    secondaryImage: "team-build.jpg",
    imageAlt: {
      pt: "Mecanismo Turret em desenvolvimento",
      en: "Turret mechanism in development",
    },
    secondaryAlt: {
      pt: "Integrantes em atividade de engenharia",
      en: "Members in an engineering activity",
    },
    stats: [
      {
        number: "5800",
        label: {
          pt: "engenharia além da arena",
          en: "engineering beyond the arena",
        },
      },
    ],
    pages: "07",
  },
];
