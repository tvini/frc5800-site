import { useState } from "react";
import "./outreach.css";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Mail,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  categoryLabels,
  outreachProjects,
  type Language,
  type OutreachCategory,
} from "./outreach";

const asset = (file: string) => `/assets/outreach/${file}`;
const email = "magicislandbrasil@gmail.com";
const categories: (OutreachCategory | "all")[] = [
  "all",
  "education",
  "inclusion",
  "teams",
  "engineering",
];

function SourceNote({
  language,
  pages,
}: {
  language: Language;
  pages?: string;
}) {
  return (
    <p className="outreach-source">
      {language === "pt"
        ? "Fonte: FRC5800 Outreach Book 2026"
        : "Source: FRC5800 Outreach Book 2026"}
      {pages ? ` · ${language === "pt" ? "páginas" : "pages"} ${pages}` : ""}.
    </p>
  );
}

function ContactLink({
  language,
  subject,
}: {
  language: Language;
  subject: string;
}) {
  return (
    <a
      className="outreach-cta"
      href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}
    >
      {language === "pt" ? "Converse com a equipe" : "Talk to the team"}{" "}
      <ArrowUpRight size={18} />
    </a>
  );
}

export function OutreachIndex({ language }: { language: Language }) {
  const [category, setCategory] = useState<OutreachCategory | "all">("all");
  const visible = outreachProjects.filter(
    (project) => category === "all" || project.category === category,
  );
  return (
    <main>
      <section className="outreach-hero">
        <img src={asset("team-2026.jpg")} alt="" />
        <div className="page-width outreach-hero-copy">
          <span className="overline">OUTREACH · FRC5800</span>
          <h1>
            {language === "pt" ? (
              <>
                IDEIAS QUE
                <br />
                SAEM DA <em>ARENA.</em>
              </>
            ) : (
              <>
                IDEAS BEYOND
                <br />
                THE <em>ARENA.</em>
              </>
            )}
          </h1>
          <p>
            {language === "pt"
              ? "Projetos reais, feitos por estudantes, que levam engenharia, oportunidade e pertencimento a mais pessoas."
              : "Real student-led projects bringing engineering, opportunity and a sense of belonging to more people."}
          </p>
          <a href="#explorar" className="outreach-hero-jump">
            {language === "pt" ? "Explorar projetos" : "Explore projects"}{" "}
            <ArrowDown size={18} />
          </a>
        </div>
        <span className="outreach-hero-index">01 / OUTREACH</span>
      </section>
      <section className="outreach-intro page-width" id="explorar">
        <div>
          <span className="overline">
            {language === "pt" ? "NOSSO TRABALHO" : "OUR WORK"}
          </span>
          <h2>
            {language === "pt"
              ? "CONSTRUIR É SÓ O COMEÇO."
              : "BUILDING IS JUST THE START."}
          </h2>
        </div>
        <p>
          {language === "pt"
            ? "O que aprendemos com robôs vira oficina, mentoria, torneio e projeto junto da comunidade. Conheça as iniciativas documentadas em nosso Outreach Book 2026."
            : "What we learn through robots becomes workshops, mentoring, tournaments and community projects. Explore the initiatives documented in our 2026 Outreach Book."}
        </p>
      </section>
      <section
        className="outreach-directory page-width"
        aria-label={language === "pt" ? "Projetos da equipe" : "Team projects"}
      >
        <div className="outreach-directory-head">
          <div>
            <span className="overline">
              {language === "pt" ? "PORTFÓLIO DE IMPACTO" : "IMPACT PORTFOLIO"}
            </span>
            <h2>
              {language === "pt"
                ? "EXPLORE OS PROJETOS"
                : "EXPLORE THE PROJECTS"}
            </h2>
          </div>
          <span className="outreach-count">
            {String(visible.length).padStart(2, "0")} /{" "}
            {String(outreachProjects.length).padStart(2, "0")}
          </span>
        </div>
        <div
          className="outreach-filters"
          role="group"
          aria-label={
            language === "pt" ? "Filtrar projetos" : "Filter projects"
          }
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={item === category ? "active" : ""}
              aria-pressed={item === category}
              onClick={() => setCategory(item)}
            >
              {item === "all"
                ? language === "pt"
                  ? "Todos"
                  : "All"
                : categoryLabels[item][language]}
            </button>
          ))}
        </div>
        <div className="outreach-project-grid">
          {visible.map((project, index) => (
            <Link
              key={project.slug}
              className={`outreach-project-card ${index === 0 && category === "all" ? "feature" : ""}`}
              to={`/projetos/${project.slug}`}
            >
              <div className="outreach-project-photo">
                <img
                  src={asset(project.image)}
                  alt={project.imageAlt[language]}
                  loading="lazy"
                />
                <span>{project.year}</span>
              </div>
              <div className="outreach-project-info">
                <span className="overline">
                  {categoryLabels[project.category][language]}
                </span>
                <h3>{project.title[language]}</h3>
                <p>{project.lead[language]}</p>
                <span className="outreach-project-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <SourceNote language={language} />
      </section>
      <section className="outreach-lab" id="magic-scouting">
        <div className="page-width outreach-lab-inner">
          <div>
            <span className="overline">OPEN SOURCE · FRC5800</span>
            <h2>
              MAGIC
              <br />
              SCOUTING
            </h2>
            <p>
              {language === "pt"
                ? "O aplicativo de scouting criado pela equipe transforma observações de partidas em informação para decidir melhor. O código está disponível publicamente."
                : "The team's scouting app turns match observations into information for better decisions. Its code is publicly available."}
            </p>
            <a
              href="https://github.com/FRC5800/MagicScouting"
              target="_blank"
              rel="noreferrer"
              className="outreach-cta"
            >
              {language === "pt" ? "Explorar no GitHub" : "Explore on GitHub"}{" "}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <img
            src="/assets/magic-scouting.png"
            alt="Magic Scouting"
            loading="lazy"
          />
        </div>
      </section>
      <section className="outreach-next page-width">
        <span className="overline">
          {language === "pt" ? "VEJA O QUE ISSO GERA" : "SEE THE RESULTS"}
        </span>
        <h2>
          {language === "pt"
            ? "OS NÚMEROS TÊM HISTÓRIAS."
            : "EVERY NUMBER HAS A STORY."}
        </h2>
        <Link to="/impacto" className="outreach-cta">
          {language === "pt" ? "Explore nosso impacto" : "Explore our impact"}{" "}
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}

export function OutreachDetail({ language }: { language: Language }) {
  const { slug } = useParams();
  const project = outreachProjects.find((item) => item.slug === slug);
  if (!project)
    return (
      <main className="outreach-missing page-width">
        <h1>
          {language === "pt" ? "PROJETO NÃO ENCONTRADO" : "PROJECT NOT FOUND"}
        </h1>
        <Link to="/projetos">
          {language === "pt" ? "Ver projetos" : "See projects"}{" "}
          <ArrowRight size={18} />
        </Link>
      </main>
    );
  const index = outreachProjects.indexOf(project);
  const next = outreachProjects[(index + 1) % outreachProjects.length];
  return (
    <main>
      <section className="outreach-detail-hero">
        <div className="page-width">
          <Link className="outreach-back" to="/projetos">
            <ArrowLeft size={17} />{" "}
            {language === "pt" ? "Todos os projetos" : "All projects"}
          </Link>
          <span className="overline">
            {categoryLabels[project.category][language]} · {project.year}
          </span>
          <h1>{project.title[language]}</h1>
          <p>{project.lead[language]}</p>
        </div>
      </section>
      <div className="outreach-detail-cover">
        <img src={asset(project.image)} alt={project.imageAlt[language]} />
      </div>
      <section className="outreach-detail-story page-width">
        <div className="outreach-detail-aside">
          <span>FRC5800 / OUTREACH</span>
          <strong>{String(index + 1).padStart(2, "0")}</strong>
        </div>
        <div>
          <span className="overline">
            {language === "pt" ? "A INICIATIVA" : "THE INITIATIVE"}
          </span>
          <h2>
            {language === "pt"
              ? "APRENDER FAZENDO. COMPARTILHAR APRENDENDO."
              : "LEARN BY DOING. SHARE WHAT WE LEARN."}
          </h2>
          <p>{project.story[language]}</p>
          <p>{project.outcome[language]}</p>
          <SourceNote language={language} pages={project.pages} />
        </div>
      </section>
      {project.slug === "torneios-educacionais" ? (
        <section className="tournament-stories page-width">
          <div className="tournament-heading">
            <span className="overline">
              {language === "pt"
                ? "DUAS EDIÇÕES, MUITAS DESCOBERTAS"
                : "TWO EDITIONS, MANY DISCOVERIES"}
            </span>
            <h2>
              {language === "pt"
                ? "A ARENA MUDA. O APRENDIZADO FICA."
                : "THE ARENA CHANGES. LEARNING STAYS."}
            </h2>
          </div>
          <div className="tournament-grid">
            <article>
              <img
                src={asset("culture-conquest-team.jpg")}
                alt={
                  language === "pt"
                    ? "Participantes do Culture Conquest"
                    : "Culture Conquest participants"
                }
                loading="lazy"
              />
              <div>
                <span>2024 / CULTURE CONQUEST</span>
                <h3>CULTURE CONQUEST</h3>
                <p>
                  {language === "pt"
                    ? "Desafios sobre as atividades econômicas de Santa Catarina uniram trabalho em equipe, projeto e estratégia."
                    : "Challenges about economic activities in Santa Catarina brought together teamwork, design and strategy."}
                </p>
                <strong>
                  217{" "}
                  <small>{language === "pt" ? "crianças" : "children"}</small>
                </strong>
                <strong>
                  17 <small>kits</small>
                </strong>
              </div>
            </article>
            <article>
              <img
                src={asset("revolution-team.png")}
                alt={
                  language === "pt"
                    ? "Equipe participante do R3volution"
                    : "R3volution participating team"
                }
                loading="lazy"
              />
              <div>
                <span>2025 / R3VOLUTION</span>
                <h3>R3VOLUTION</h3>
                <p>
                  {language === "pt"
                    ? "Os 3Rs e a sustentabilidade inspiraram uma edição conectada à comunidade do Morro da Cruz."
                    : "The 3Rs and sustainability inspired an edition connected to the Morro da Cruz community."}
                </p>
                <strong>
                  133{" "}
                  <small>{language === "pt" ? "crianças" : "children"}</small>
                </strong>
                <strong>
                  14 <small>kits</small>
                </strong>
              </div>
            </article>
          </div>
          <SourceNote language={language} pages="12–13" />
        </section>
      ) : null}
      <section className="outreach-detail-results">
        <div className="page-width">
          <span className="overline">
            {language === "pt" ? "EM PERSPECTIVA" : "AT A GLANCE"}
          </span>
          <h2>
            {language === "pt" ? "RESULTADOS DO PROJETO" : "PROJECT RESULTS"}
          </h2>
          <div className="outreach-detail-stats">
            {project.stats.map((stat) => (
              <div key={stat.number}>
                <strong>
                  {language === "pt"
                    ? stat.number
                    : stat.number.replace(".", ",")}
                </strong>
                <span>{stat.label[language]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="outreach-detail-gallery page-width">
        <img
          src={asset(project.secondaryImage)}
          alt={project.secondaryAlt[language]}
          loading="lazy"
        />
        <div>
          <span className="overline">
            {language === "pt" ? "A PRÓXIMA CONEXÃO" : "THE NEXT CONNECTION"}
          </span>
          <h2>
            {language === "pt"
              ? "VAMOS CONSTRUIR JUNTOS?"
              : "LET'S BUILD TOGETHER."}
          </h2>
          <p>
            {language === "pt"
              ? "Quer levar uma iniciativa à sua escola, apoiar o projeto ou trocar experiências? Fale com a equipe."
              : "Want to bring an initiative to your school, support this project or exchange experiences? Talk to the team."}
          </p>
          <ContactLink
            language={language}
            subject={`FRC5800 · ${project.title.pt}`}
          />
        </div>
      </section>
      <Link to={`/projetos/${next.slug}`} className="outreach-next-project">
        <span>{language === "pt" ? "PRÓXIMO PROJETO" : "NEXT PROJECT"}</span>
        <strong>{next.title[language]}</strong>
        <ArrowRight size={30} />
      </Link>
    </main>
  );
}

const milestones = [
  {
    number: "2.000",
    pt: "crianças alcançadas pela robótica no hospital",
    en: "children reached by hospital robotics",
    image: "hospital-child.jpg",
    slug: "robotica-no-hospital",
  },
  {
    number: "82",
    pt: "professores formados para multiplicar o aprendizado",
    en: "teachers trained to share learning",
    image: "teacher-training.jpg",
    slug: "formacao-de-professores",
  },
  {
    number: "350+",
    pt: "participantes em torneios educacionais",
    en: "participants in educational tournaments",
    image: "culture-conquest-team.jpg",
    slug: "torneios-educacionais",
  },
  {
    number: "60+",
    pt: "meninas participaram do Bridge for Girls",
    en: "girls joined Bridge for Girls",
    image: "bridge-group.jpg",
    slug: "bridge-for-girls",
  },
];

export function ImpactPage({ language }: { language: Language }) {
  return (
    <main>
      <section className="impact-hero">
        <div className="page-width impact-hero-grid">
          <div>
            <span className="overline">FRC5800 / OUTREACH BOOK 2026</span>
            <h1>
              {language === "pt" ? (
                <>
                  ROBÓTICA QUE
                  <br />
                  <em>SE MULTIPLICA.</em>
                </>
              ) : (
                <>
                  ROBOTICS THAT
                  <br />
                  <em>KEEPS GROWING.</em>
                </>
              )}
            </h1>
            <p>
              {language === "pt"
                ? "Nascemos em uma escola pública. Hoje, nosso maior projeto é abrir mais portas para a próxima geração."
                : "We started in a public school. Today, our biggest project is opening more doors for the next generation."}
            </p>
            <Link className="outreach-cta" to="/projetos">
              {language === "pt"
                ? "Conheça as iniciativas"
                : "Explore the initiatives"}{" "}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <img
            src={asset("team-2026.jpg")}
            alt={
              language === "pt"
                ? "Equipe FRC5800 em 2026"
                : "FRC5800 team in 2026"
            }
          />
        </div>
      </section>
      <section className="impact-manifesto page-width">
        <span className="overline">
          {language === "pt" ? "NOSSA MISSÃO" : "OUR MISSION"}
        </span>
        <h2>
          {language === "pt" ? (
            <>
              DA ESCOLA PÚBLICA <em>PARA AS ESCOLAS PÚBLICAS.</em>
            </>
          ) : (
            <>
              FROM PUBLIC SCHOOL <em>TO PUBLIC SCHOOLS.</em>
            </>
          )}
        </h2>
        <p>
          {language === "pt"
            ? "Defendemos a robótica como experiência educativa acessível a estudantes da rede pública. Competir nos desafia; compartilhar o que descobrimos transforma a nossa comunidade."
            : "We stand for robotics as an educational opportunity accessible to public-school students. Competition challenges us; sharing what we discover transforms our community."}
        </p>
      </section>
      <section className="impact-milestones page-width">
        <div className="impact-milestones-heading">
          <span className="overline">
            {language === "pt"
              ? "PESSOAS, NÃO SÓ NÚMEROS"
              : "PEOPLE, NOT JUST NUMBERS"}
          </span>
          <h2>
            {language === "pt"
              ? "UM IMPACTO QUE SE VÊ."
              : "IMPACT YOU CAN SEE."}
          </h2>
        </div>
        <div className="impact-milestone-grid">
          {milestones.map((item) => (
            <Link key={item.slug} to={`/projetos/${item.slug}`}>
              <img src={asset(item.image)} alt="" loading="lazy" />
              <div>
                <strong>
                  {language === "pt"
                    ? item.number
                    : item.number.replace(".", ",")}
                </strong>
                <span>{item[language]}</span>
                <ArrowUpRight size={20} />
              </div>
            </Link>
          ))}
        </div>
        <SourceNote language={language} />
      </section>
      <section className="impact-school-band">
        <div className="page-width impact-school-inner">
          <div>
            <span className="overline">
              {language === "pt"
                ? "2025 · SEMANA MUNICIPAL DA ROBÓTICA"
                : "2025 · MUNICIPAL ROBOTICS WEEK"}
            </span>
            <h2>
              13{" "}
              {language === "pt"
                ? "ESCOLAS EM UMA SEMANA."
                : "SCHOOLS IN ONE WEEK."}
            </h2>
            <p>
              {language === "pt"
                ? "Mais de 380 crianças encontraram a robótica com a ajuda de 39 voluntários. Cada escola foi uma chance de começar uma nova história."
                : "More than 380 children encountered robotics with help from 39 volunteers. Every school was a chance to start a new story."}
            </p>
            <Link className="outreach-cta" to="/projetos/semana-da-robotica">
              {language === "pt" ? "Conheça a Semana" : "Explore the Week"}{" "}
              <ArrowRight size={18} />
            </Link>
          </div>
          <img
            src={asset("robotics-week-class.jpg")}
            alt={
              language === "pt"
                ? "Oficina em escola na Semana da Robótica"
                : "School workshop during Robotics Week"
            }
            loading="lazy"
          />
        </div>
      </section>
      <section className="impact-ripple page-width">
        <div>
          <span className="overline">
            {language === "pt" ? "O CONHECIMENTO VIAJA" : "KNOWLEDGE TRAVELS"}
          </span>
          <h2>
            {language === "pt"
              ? "DE UMA EQUIPE PARA MUITAS."
              : "FROM ONE TEAM TO MANY."}
          </h2>
          <p>
            {language === "pt"
              ? "Mentorias online, formação de professores e apoio a equipes FIRST fazem o aprendizado continuar mesmo quando a oficina termina."
              : "Online mentoring, teacher training and support for FIRST teams keep learning moving long after a workshop ends."}
          </p>
        </div>
        <div className="impact-ripple-facts">
          <div>
            <strong>58</strong>
            <span>
              {language === "pt"
                ? "unidades de aprendizagem produzidas"
                : "learning units produced"}
            </span>
          </div>
          <div>
            <strong>6</strong>
            <span>
              {language === "pt"
                ? "equipes capacitadas pelo Magic Alliance até 2026"
                : "teams trained through Magic Alliance by 2026"}
            </span>
          </div>
          <div>
            <strong>10+</strong>
            <span>
              {language === "pt"
                ? "projetos educacionais com bolsas aprovadas"
                : "educational grant projects approved"}
            </span>
          </div>
        </div>
      </section>
      <section className="impact-end">
        <div className="page-width">
          <span className="overline">
            {language === "pt"
              ? "FAÇA PARTE DO PRÓXIMO CAPÍTULO"
              : "BE PART OF THE NEXT CHAPTER"}
          </span>
          <h2>
            {language === "pt"
              ? "O FUTURO SE CONSTRÓI EM EQUIPE."
              : "THE FUTURE IS A TEAM EFFORT."}
          </h2>
          <div>
            <Link className="outreach-cta" to="/participe">
              {language === "pt" ? "Como participar" : "How to join"}{" "}
              <ArrowRight size={18} />
            </Link>
            <Link className="outreach-cta outline" to="/nos-apoie">
              {language === "pt" ? "Apoie a 5800" : "Support the 5800"}{" "}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <SourceNote language={language} pages="03–24" />
        </div>
      </section>
    </main>
  );
}

const faq = [
  {
    q: {
      pt: "Preciso saber programar ou construir robôs?",
      en: "Do I need to know how to code or build robots?",
    },
    a: {
      pt: "O processo apresentado no Outreach Book valoriza diferentes habilidades. Engenharia, comunicação, estratégia e impacto social fazem parte da equipe. Para os critérios atuais de seleção, fale diretamente com a 5800.",
      en: "The selection process described in the Outreach Book values different skills. Engineering, communication, strategy and community impact all matter. Contact the 5800 for current selection criteria.",
    },
  },
  {
    q: { pt: "Quando abrem as inscrições?", en: "When do applications open?" },
    a: {
      pt: "As datas variam. Acompanhe o Instagram da equipe ou escreva para receber informações sobre o próximo processo seletivo.",
      en: "Dates vary. Follow the team's Instagram or write to ask about the next selection process.",
    },
  },
  {
    q: {
      pt: "Uma escola pode propor uma parceria?",
      en: "Can a school propose a partnership?",
    },
    a: {
      pt: "Sim. Conte qual atividade você imagina, sua escola e o público participante. A equipe pode conversar sobre oficinas, projetos educacionais e mentoria conforme a disponibilidade.",
      en: "Yes. Tell us what activity you have in mind, your school and your audience. The team can discuss workshops, educational projects and mentoring according to availability.",
    },
  },
  {
    q: { pt: "Como posso apoiar a equipe?", en: "How can I support the team?" },
    a: {
      pt: "Empresas e pessoas podem conversar conosco sobre patrocínio, doação de materiais, serviços ou colaboração em projetos. Visite a página de apoio para começar.",
      en: "Companies and individuals can talk to us about sponsorship, materials, services or project collaboration. Visit the support page to get started.",
    },
  },
];

export function JoinPage({ language }: { language: Language }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main>
      <section className="join-hero">
        <img src={asset("selection-team.jpg")} alt="" />
        <div className="page-width">
          <span className="overline">
            {language === "pt"
              ? "PESSOAS FAZEM A 5800"
              : "PEOPLE MAKE THE 5800"}
          </span>
          <h1>
            {language === "pt" ? (
              <>
                A PRÓXIMA IDEIA
                <br />
                PODE SER <em>SUA.</em>
              </>
            ) : (
              <>
                THE NEXT BIG IDEA
                <br />
                COULD BE <em>YOURS.</em>
              </>
            )}
          </h1>
          <p>
            {language === "pt"
              ? "A Magic Island Robotics reúne estudantes para criar robôs, compartilhar ciência e fazer diferença na comunidade."
              : "Magic Island Robotics brings students together to build robots, share science and make a difference in the community."}
          </p>
          <a
            className="outreach-cta"
            href={`mailto:${email}?subject=${encodeURIComponent(language === "pt" ? "Quero participar da FRC5800" : "Joining FRC5800")}`}
          >
            {language === "pt"
              ? "Quero saber do próximo processo"
              : "Ask about the next selection"}{" "}
            <Mail size={18} />
          </a>
        </div>
      </section>
      <section className="join-process page-width">
        <div>
          <span className="overline">
            {language === "pt"
              ? "COMO FUNCIONOU A SELEÇÃO"
              : "HOW SELECTION HAS WORKED"}
          </span>
          <h2>
            {language === "pt"
              ? "TODO TALENTO TEM UM LUGAR AQUI."
              : "EVERY TALENT HAS A PLACE HERE."}
          </h2>
          <p>
            {language === "pt"
              ? "O Outreach Book descreve um processo seletivo prático, com desafios colaborativos que se parecem com a vida real da equipe. O formato e as datas da próxima edição devem ser confirmados com a 5800."
              : "The Outreach Book describes a hands-on selection process with collaborative challenges inspired by real team life. Confirm the next edition's format and dates with the 5800."}
          </p>
          <span className="join-process-stat">
            ~80{" "}
            <small>
              {language === "pt"
                ? "candidatos por ano, em média no livro"
                : "applicants per year on average in the book"}
            </small>
          </span>
        </div>
        <ol>
          <li>
            <span>01</span>
            <strong>
              {language === "pt" ? "Conhecer a equipe" : "Meet the team"}
            </strong>
            <p>
              {language === "pt"
                ? "Descubra como engenharia, comunicação, estratégia e extensão trabalham juntas."
                : "Discover how engineering, communication, strategy and outreach work together."}
            </p>
          </li>
          <li>
            <span>02</span>
            <strong>
              {language === "pt"
                ? "Resolver em aliança"
                : "Solve as an alliance"}
            </strong>
            <p>
              {language === "pt"
                ? "O livro mostra uma simulação com alianças, jogo fictício e planejamento de robô."
                : "The book shows a simulation with alliances, a fictional game and robot planning."}
            </p>
          </li>
          <li>
            <span>03</span>
            <strong>
              {language === "pt" ? "Apresentar impacto" : "Present impact"}
            </strong>
            <p>
              {language === "pt"
                ? "As equipes também pensam em como levar o aprendizado para outras pessoas."
                : "Teams also think about how to bring learning to others."}
            </p>
          </li>
        </ol>
      </section>
      <section className="join-faq">
        <div className="page-width">
          <div>
            <span className="overline">
              {language === "pt" ? "DÚVIDAS FREQUENTES" : "FREQUENT QUESTIONS"}
            </span>
            <h2>{language === "pt" ? "BORA CONVERSAR?" : "LET'S TALK."}</h2>
          </div>
          <div className="join-faq-list">
            {faq.map((item, index) => (
              <div key={index} className={open === index ? "open" : ""}>
                <button
                  type="button"
                  aria-expanded={open === index}
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  {item.q[language]} <ChevronDown size={20} />
                </button>
                {open === index ? <p>{item.a[language]}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="outreach-next page-width">
        <span className="overline">
          {language === "pt" ? "CONTATO DIRETO" : "DIRECT CONTACT"}
        </span>
        <h2>
          {language === "pt"
            ? "A GENTE QUER OUVIR VOCÊ."
            : "WE'D LOVE TO HEAR FROM YOU."}
        </h2>
        <ContactLink language={language} subject="Contato pelo site FRC5800" />
        <SourceNote language={language} pages="18" />
      </section>
    </main>
  );
}
