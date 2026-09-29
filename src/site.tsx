import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  Mail,
  Menu,
  Play,
  Search,
  Send,
  X,
  Youtube,
} from "lucide-react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { outreachProjects } from "./outreach";
import {
  ImpactPage,
  JoinPage,
  OutreachDetail,
  OutreachIndex,
} from "./outreach-pages";

type Language = "pt" | "en";
type LocalText = { pt: string; en: string };
const A = "/assets/";
const EMAIL = "magicislandbrasil@gmail.com";
const YOUTUBE = "https://www.youtube.com/channel/UCAnewK-DV-rgF4bJnpuJH1Q";
const INSTAGRAM = "https://www.instagram.com/frc5800/";
const GITHUB = "https://github.com/FRC5800";
const FIRST = "https://frc-events.firstinspires.org/2026/team/5800";
const pick = (value: LocalText, language: Language) => value[language];

const nav = [
  { to: "/quem-somos", pt: "Quem somos", en: "About us" },
  { to: "/projetos", pt: "Projetos", en: "Projects" },
  { to: "/impacto", pt: "Impacto", en: "Impact" },
  { to: "/robos", pt: "Robôs", en: "Robots" },
  { to: "/participe", pt: "Participe", en: "Join us" },
  { to: "/patrocinadores", pt: "Patrocinadores", en: "Sponsors" },
  { to: "/nos-apoie", pt: "Nos apoie", en: "Support us" },
  { to: "/contato", pt: "Contato", en: "Contact" },
];
const searchExtras = [
  {
    to: "/blog",
    pt: "Diário da equipe",
    en: "Team journal",
    keywords: "blog notícias arquivo",
  },
  {
    to: "/projetos#magic-scouting",
    pt: "Magic Scouting",
    en: "Magic Scouting",
    keywords: "app aplicativo scouting dados partidas",
  },
  {
    to: "/robos",
    pt: "Galeria de robôs",
    en: "Robot gallery",
    keywords: "robótica arena temporada fotos",
  },
  {
    to: "/quem-somos",
    pt: "História da equipe",
    en: "Team history",
    keywords: "2015 2016 ifsc first trajetória impacto",
  },
  {
    to: "/participe",
    pt: "Processo seletivo",
    en: "Team selection",
    keywords: "inscrição entrar estudante seleção",
  },
  ...outreachProjects.map((project) => ({
    to: `/projetos/${project.slug}`,
    pt: project.title.pt,
    en: project.title.en,
    keywords: `${project.category} ${project.lead.pt} ${project.lead.en}`,
  })),
];

const areas = [
  {
    image: "team-volunteers.jpg",
    title: { pt: "Impacto social", en: "Social impact" },
    text: {
      pt: "Levamos ciência e robótica para além da oficina, aproximando estudantes e comunidades da tecnologia.",
      en: "We bring science and robotics beyond our workshop, connecting students and communities with technology.",
    },
  },
  {
    image: "team-build.jpg",
    title: { pt: "Engenharia", en: "Engineering" },
    text: {
      pt: "Transformamos ideias em mecanismos: projetamos, montamos, testamos e melhoramos a cada temporada.",
      en: "We turn ideas into mechanisms: designing, building, testing and improving every season.",
    },
  },
  {
    image: "team-outreach.jpg",
    title: { pt: "Comunicação", en: "Communications" },
    text: {
      pt: "Contamos as histórias da equipe e construímos pontes entre pessoas, escolas e parceiros.",
      en: "We share the team’s stories and build bridges between people, schools and partners.",
    },
  },
  {
    image: "team-event.jpg",
    title: { pt: "Competição", en: "Competition" },
    text: {
      pt: "Na arena, estratégia e trabalho em equipe encontram o robô que construímos juntos.",
      en: "In the arena, strategy and teamwork meet the robot we build together.",
    },
  },
];

const projects = [
  outreachProjects[0],
  outreachProjects[4],
  outreachProjects[1],
].map((project) => ({
  ...project,
  image: `outreach/${project.image}`,
  kind: {
    pt: project.category === "inclusion" ? "Inclusão" : "Educação",
    en: project.category === "inclusion" ? "Inclusion" : "Education",
  },
  text: project.lead,
}));

const sponsors = [
  { image: "ifsc.png", name: "Instituto Federal de Santa Catarina" },
  { image: "feesc.png", name: "FEESC" },
  { image: "3m.png", name: "3M" },
  { image: "baumann.png", name: "Baumann" },
  { image: "outreach/aurora-coop.png", name: "Aurora Coop" },
  { image: "rockwell.png", name: "Rockwell Automation" },
  { image: "qualcomm.png", name: "Qualcomm" },
];

const seasons = [
  { year: "2023", game: "CHARGED UP" },
  { year: "2024", game: "CRESCENDO" },
  { year: "2025", game: "REEFSCAPE" },
  { year: "2026", game: "REBUILT" },
];
const cadDocuments = [
  {
    year: "2024",
    game: "CRESCENDO",
    url: "https://cad.onshape.com/documents/628e3e1203a94d02724cd113/w/d5e9d3a73718207f3e8ed7ea/e/0c1c67e8d97cf4b2015ffaf4",
  },
  {
    year: "2025",
    game: "REEFSCAPE",
    url: "https://cad.onshape.com/documents/f06482e50946d3af5b32bdf3/w/48a2ed856077f6681269d5a8/e/230fa964fcc50b7d8fcd6532",
  },
  {
    year: "2025",
    game: "OFFSEASON",
    url: "https://cad.onshape.com/documents/642930962c0a4f160c3f129f/w/8ff6e8efb0cfe94a84dc1a7b/e/818c726da3113ea93f811abd",
  },
  {
    year: "2026",
    game: "REBUILT",
    url: "https://cad.onshape.com/documents/d9fab1247458486262d25bf1/w/e25a43f6981b5fde967c6a2e/e/e09bcceeddab6ab60090f8ac",
  },
];

function TranslationButton({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (value: Language) => void;
}) {
  return (
    <div
      className="language-toggle"
      aria-label={language === "pt" ? "Idioma" : "Language"}
    >
      <button
        className={language === "pt" ? "selected" : ""}
        onClick={() => setLanguage("pt")}
        aria-label="Português"
        aria-pressed={language === "pt"}
      >
        <img src={`${A}flag-br.png`} alt="" />
      </button>
      <span aria-hidden="true" />
      <button
        className={language === "en" ? "selected" : ""}
        onClick={() => setLanguage("en")}
        aria-label="English"
        aria-pressed={language === "en"}
      >
        <img src={`${A}flag-us.png`} alt="" />
      </button>
    </div>
  );
}

function Header({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (value: Language) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const results = [...nav, ...searchExtras].filter((item) =>
    `${item.pt} ${item.en} ${"keywords" in item ? item.keywords : ""}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <header className="site-header">
        <div className="header-inner page-width">
          <Link to="/" className="brand" aria-label="FRC5800 — início">
            <img src={`${A}logo.png`} alt="FRC5800 Magic Island Robotics" />
          </Link>
          <nav
            className="desktop-nav"
            aria-label={
              language === "pt" ? "Navegação principal" : "Main navigation"
            }
          >
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item[language]}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <TranslationButton language={language} setLanguage={setLanguage} />
            <button
              className="icon-button search-trigger"
              aria-label={language === "pt" ? "Buscar" : "Search"}
              onClick={() => setSearchOpen(true)}
            >
              <Search size={21} />
            </button>
            <button
              className="icon-button menu-trigger"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav className="mobile-nav" aria-label="Menu">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item[language]} <ArrowUpRight size={17} />
              </NavLink>
            ))}
          </nav>
        ) : null}
      </header>
      {searchOpen ? (
        <div
          className="overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSearchOpen(false);
          }}
        >
          <div
            className="search-panel"
            role="dialog"
            aria-modal="true"
            aria-label={language === "pt" ? "Buscar no site" : "Search site"}
          >
            <div className="search-field">
              <Search size={22} />
              <input
                autoFocus
                placeholder={
                  language === "pt"
                    ? "O que você quer conhecer?"
                    : "What would you like to explore?"
                }
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && results[0])
                    navigate(results[0].to);
                }}
              />
              <button
                className="icon-button"
                onClick={() => setSearchOpen(false)}
                aria-label="Fechar"
              >
                <X size={22} />
              </button>
            </div>
            <div className="search-results">
              {results.length ? (
                results.map((item) => (
                  <Link key={`${item.to}-${item.pt}`} to={item.to}>
                    {item[language]}
                    <ArrowUpRight size={18} />
                  </Link>
                ))
              ) : (
                <p>
                  {language === "pt"
                    ? "Nenhuma página encontrada. Tente outro termo."
                    : "No page found. Try another term."}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Footer({ language }: { language: Language }) {
  return (
    <footer className="site-footer">
      <div className="page-width footer-main">
        <div>
          <Link to="/" className="footer-brand">
            <img src={`${A}logo.png`} alt="FRC5800 Magic Island Robotics" />
          </Link>
          <p>
            {language === "pt"
              ? "Da escola pública para as escolas públicas."
              : "From the public school for public schools."}
          </p>
          <span>Florianópolis, Santa Catarina · Brasil</span>
        </div>
        <div>
          <h3>{language === "pt" ? "Explore" : "Explore"}</h3>
          {nav.slice(0, 4).map((item) => (
            <Link key={item.to} to={item.to}>
              {item[language]}
            </Link>
          ))}
          <Link to="/blog">{language === "pt" ? "Diário" : "Journal"}</Link>
        </div>
        <div>
          <h3>{language === "pt" ? "Participe" : "Get involved"}</h3>
          {nav.slice(4).map((item) => (
            <Link key={item.to} to={item.to}>
              {item[language]}
            </Link>
          ))}
        </div>
        <div className="footer-connect">
          <h3>{language === "pt" ? "Acompanhe a 5800" : "Follow the 5800"}</h3>
          <div className="social-row">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={21} />
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              GH
            </a>
          </div>
          <a className="footer-email" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      </div>
      <div className="page-width footer-bottom">
        <span>© {new Date().getFullYear()} FRC5800 Magic Island Robotics</span>
        <span>IFSC · Florianópolis</span>
      </div>
    </footer>
  );
}

function SectionHeading({
  overline,
  title,
  text,
  light = false,
}: {
  overline?: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      {overline ? <span className="overline">{overline}</span> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function ActionLink({
  to,
  children,
  light = false,
  external = false,
}: {
  to: string;
  children: React.ReactNode;
  light?: boolean;
  external?: boolean;
}) {
  const className = `pill-link ${light ? "pill-light" : ""}`;
  return external ? (
    <a className={className} href={to} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={18} />
    </a>
  ) : (
    <Link className={className} to={to}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}

function SponsorStrip({ language }: { language: Language }) {
  return (
    <div
      className="sponsor-strip"
      aria-label={
        language === "pt"
          ? "Marcas do material da equipe"
          : "Brands in the team archive"
      }
    >
      <div className="sponsor-track">
        {[...sponsors, ...sponsors].map((sponsor, index) => (
          <img
            key={`${sponsor.name}-${index}`}
            src={`${A}${sponsor.image}`}
            alt={index < sponsors.length ? sponsor.name : ""}
            aria-hidden={index >= sponsors.length}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

function Home({ language }: { language: Language }) {
  const [area, setArea] = useState<number | null>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  useEffect(() => {
    if (area === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setArea(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [area]);
  const next = () => setProjectIndex((value) => (value + 1) % projects.length);
  const previous = () =>
    setProjectIndex((value) => (value + projects.length - 1) % projects.length);
  return (
    <main>
      <section className="hero">
        <div className="hero-image" />
        <div className="page-width hero-content">
          <span className="hero-decade">
            {language === "pt" ? "DESDE 2015" : "SINCE 2015"}
          </span>
          <h1>
            MAGIC ISLAND
            <br />
            ROBOTICS
          </h1>
          <p>From the public school for public schools!</p>
          <ActionLink to="/quem-somos">
            {language === "pt"
              ? "Conheça nossa história"
              : "Discover our story"}
          </ActionLink>
        </div>
        <a
          className="scroll-cue"
          href="#o-que-fazemos"
          aria-label={
            language === "pt" ? "Rolar para conteúdo" : "Scroll to content"
          }
        >
          <span>
            {language === "pt" ? "Role para explorar" : "Scroll to explore"}
          </span>
          <ArrowDown size={18} />
        </a>
      </section>
      <section className="intro-section page-width" id="o-que-fazemos">
        <div className="intro-symbol">
          <img src={`${A}first.png`} alt="FIRST Robotics Competition" />
        </div>
        <div>
          <span className="overline">FRC 5800 · FLORIANÓPOLIS</span>
          <h2>{language === "pt" ? "O QUE FAZEMOS?" : "WHAT DO WE DO?"}</h2>
          <p>
            {language === "pt"
              ? "Somos a primeira equipe de Santa Catarina a participar da FIRST Robotics Competition. Desde 2015, trabalhamos para tornar a robótica mais acessível às escolas públicas."
              : "We are the first team from Santa Catarina to take part in the FIRST Robotics Competition. Since 2015, we have worked to make robotics more accessible to public schools."}
          </p>
          <Link className="text-link" to="/quem-somos">
            {language === "pt" ? "Mais sobre a equipe" : "More about the team"}{" "}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="film-section page-width">
        <div className="film-frame">
          <img
            src={`${A}team-hero.jpg`}
            alt={
              language === "pt"
                ? "Integrantes da Magic Island Robotics em uma competição"
                : "Magic Island Robotics team at a competition"
            }
            loading="lazy"
          />
          <div className="film-shade" />
          <div className="film-caption">
            <span>
              {language === "pt"
                ? "NOSSA HISTÓRIA EM MOVIMENTO"
                : "OUR STORY IN MOTION"}
            </span>
            <h2>{language === "pt" ? "VÍDEOS DA 5800" : "WATCH THE 5800"}</h2>
            <a
              className="play-button"
              href={YOUTUBE}
              target="_blank"
              rel="noreferrer"
              aria-label={
                language === "pt"
                  ? "Abrir canal da equipe no YouTube"
                  : "Open the team YouTube channel"
              }
            >
              <Play size={25} fill="currentColor" />
            </a>
          </div>
        </div>
        <p>
          {language === "pt"
            ? "Conheça a equipe, os robôs e as temporadas no nosso canal."
            : "Meet the team, robots and seasons on our channel."}
        </p>
      </section>
      <section className="areas-section page-width">
        <div className="areas-title">
          <span className="overline">
            {language === "pt" ? "GENTE QUE FAZ" : "THE PEOPLE BEHIND IT"}
          </span>
          <h2>
            {language === "pt" ? (
              <>
                CONHEÇA <br />
                NOSSAS <br />
                ÁREAS
              </>
            ) : (
              <>
                EXPLORE <br />
                OUR <br />
                AREAS
              </>
            )}
          </h2>
          <p>
            {language === "pt"
              ? "Uma equipe, muitas maneiras de fazer a robótica acontecer."
              : "One team, many ways to make robotics happen."}
          </p>
        </div>
        <div className="areas-grid">
          {areas.map((item, index) => (
            <button
              className="area-tile"
              key={item.image}
              onClick={() => setArea(index)}
              aria-label={`${language === "pt" ? "Conheça" : "Explore"} ${pick(item.title, language)}`}
            >
              <img src={`${A}${item.image}`} alt="" loading="lazy" />
              <span>
                {pick(item.title, language)}
                <ArrowUpRight size={18} />
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="impact-section">
        <div className="page-width impact-inner">
          <SectionHeading
            overline={
              language === "pt" ? "UM LEGADO COLETIVO" : "A SHARED LEGACY"
            }
            title={
              language === "pt" ? "RESULTADOS E IMPACTO" : "RESULTS AND IMPACT"
            }
            text={
              language === "pt"
                ? "Desde 2015, transformamos curiosidade em projetos, conquistas e oportunidades de aprender."
                : "Since 2015, we have turned curiosity into projects, achievements and opportunities to learn."
            }
            light
          />
          <div className="impact-grid">
            <div>
              <strong>{language === "pt" ? "2.000" : "2,000"}</strong>
              <span>
                {language === "pt"
                  ? "crianças alcançadas pela robótica no hospital"
                  : "children reached by hospital robotics"}
              </span>
            </div>
            <div>
              <strong>82</strong>
              <span>
                {language === "pt"
                  ? "professores formados"
                  : "teachers trained"}
              </span>
            </div>
            <div>
              <strong>350+</strong>
              <span>
                {language === "pt"
                  ? "participantes em torneios educacionais"
                  : "educational tournament participants"}
              </span>
            </div>
          </div>
          <Link to="/impacto" className="text-link">
            {language === "pt"
              ? "Conheça as histórias por trás dos números"
              : "Meet the stories behind the numbers"}{" "}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="projects-section page-width">
        <div className="projects-top">
          <SectionHeading
            overline={language === "pt" ? "ALÉM DA ARENA" : "BEYOND THE ARENA"}
            title={language === "pt" ? "NOSSOS PROJETOS" : "OUR PROJECTS"}
            text={
              language === "pt"
                ? "Ideias que aproximam a robótica educacional de mais pessoas."
                : "Ideas that bring educational robotics to more people."
            }
          />
          <div className="carousel-controls">
            <button
              onClick={previous}
              aria-label={
                language === "pt" ? "Projeto anterior" : "Previous project"
              }
            >
              <ArrowLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label={
                language === "pt" ? "Próximo projeto" : "Next project"
              }
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
        <div className="project-stage">
          {projects.map((project, index) => (
            <article
              key={project.image}
              className={`project-card ${index === projectIndex ? "selected" : ""}`}
            >
              <img src={`${A}${project.image}`} alt="" loading="lazy" />
              <div>
                <span>{pick(project.kind, language)}</span>
                <h3>
                  {typeof project.title === "string"
                    ? project.title
                    : pick(project.title, language)}
                </h3>
                <p>{pick(project.text, language)}</p>
                <Link to={`/projetos/${project.slug}`}>
                  {language === "pt"
                    ? "Conheça os projetos"
                    : "Explore projects"}{" "}
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="carousel-dots" aria-label="Projetos">
          {projects.map((project, index) => (
            <button
              key={project.image}
              className={index === projectIndex ? "selected" : ""}
              aria-label={`${language === "pt" ? "Mostrar projeto" : "Show project"} ${index + 1}`}
              aria-pressed={index === projectIndex}
              onClick={() => setProjectIndex(index)}
            />
          ))}
        </div>
      </section>
      <section className="robot-feature">
        <div className="page-width robot-feature-inner">
          <img
            src={`${A}robot-feature.png`}
            alt={
              language === "pt"
                ? "Robô da equipe FRC5800"
                : "FRC5800 team robot"
            }
            loading="lazy"
          />
          <div>
            <span className="overline">FRC 5800</span>
            <h2>
              {language === "pt"
                ? "ROBÔS FEITOS POR PESSOAS"
                : "ROBOTS BUILT BY PEOPLE"}
            </h2>
            <p>
              {language === "pt"
                ? "Cada temporada traz um desafio novo. Conheça de perto o trabalho que ganha vida na arena."
                : "Every season brings a new challenge. See the work that comes to life in the arena."}
            </p>
            <ActionLink to="/robos">
              {language === "pt"
                ? "Acesse a galeria de robôs"
                : "Explore the robot gallery"}
            </ActionLink>
          </div>
        </div>
      </section>
      <section className="scouting-section">
        <div className="page-width scouting-inner">
          <div>
            <span className="overline">
              {language === "pt" ? "TECNOLOGIA DA EQUIPE" : "TECH BY THE TEAM"}
            </span>
            <h2>MAGIC SCOUTING</h2>
            <p>
              {language === "pt"
                ? "Nosso aplicativo de scouting para equipes interessadas em transformar dados de partidas em decisões."
                : "Our scouting app helps teams turn match data into decisions."}
            </p>
            <ActionLink to="/projetos#magic-scouting">
              {language === "pt" ? "Conheça o projeto" : "Discover the project"}
            </ActionLink>
          </div>
          <img
            src={`${A}magic-scouting.png`}
            alt="Prévia do aplicativo Magic Scouting"
            loading="lazy"
          />
        </div>
      </section>
      <SponsorStrip language={language} />
      {area !== null ? (
        <div
          className="overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setArea(null);
          }}
        >
          <div
            className="area-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={pick(areas[area].title, language)}
          >
            <button
              className="dialog-close"
              onClick={() => setArea(null)}
              aria-label="Fechar"
            >
              <X size={22} />
            </button>
            <img src={`${A}${areas[area].image}`} alt="" />
            <div>
              <span className="overline">
                {language === "pt" ? "NOSSAS ÁREAS" : "OUR AREAS"}
              </span>
              <h2>{pick(areas[area].title, language)}</h2>
              <p>{pick(areas[area].text, language)}</p>
              <Link
                to="/contato"
                className="text-link"
                onClick={() => setArea(null)}
              >
                {language === "pt"
                  ? "Converse com a equipe"
                  : "Talk to the team"}{" "}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
}) {
  return (
    <section
      className={`page-hero ${image ? "page-hero-photo" : ""}`}
      style={
        image
          ? {
              backgroundImage: `linear-gradient(90deg, #10283fee 0%, #10283fc7 50%, #10283f85 100%), url(${A}${image})`,
            }
          : undefined
      }
    >
      <div className="page-width">
        <span className="overline">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

function About({ language }: { language: Language }) {
  const timeline = [
    {
      year: "2015",
      pt: "Nasce a Magic Island Robotics no Instituto Federal de Santa Catarina.",
      en: "Magic Island Robotics is founded at the Federal Institute of Santa Catarina.",
    },
    {
      year: "2016",
      pt: "A equipe estreia na FIRST Robotics Competition.",
      en: "The team makes its FIRST Robotics Competition debut.",
    },
    {
      year: "2019",
      pt: "A equipe amplia suas oficinas de robótica educacional para além da competição.",
      en: "The team expands its educational robotics workshops beyond competition.",
    },
    {
      year: "2019",
      pt: "A 5800 representa Santa Catarina em uma competição em Québec, no Canadá.",
      en: "The 5800 represents Santa Catarina at a competition in Québec, Canada.",
    },
    {
      year: "2025",
      pt: "A 5800 conquista o Regional Brazil - Brasília e leva a robótica a 13 escolas em uma semana.",
      en: "The 5800 wins the Brazil - Brasília Regional and brings robotics to 13 schools in one week.",
    },
    {
      year: "2026",
      pt: "A equipe recebe o Regional Engineering Inspiration Award no Festival de Robotique.",
      en: "The team receives the Regional Engineering Inspiration Award at Festival de Robotique.",
    },
  ];
  return (
    <main>
      <PageHero
        eyebrow="FRC 5800 · DESDE 2015"
        title={language === "pt" ? "A NOSSA HISTÓRIA" : "OUR STORY"}
        text={
          language === "pt"
            ? "Uma equipe de escola pública que decidiu ocupar o mundo da robótica — e abrir caminho para mais gente fazer o mesmo."
            : "A public school team that set out to enter the world of robotics — and open the way for others to do the same."
        }
        image="team-hero.jpg"
      />
      <section className="page-width about-intro">
        <div className="big-quote">
          “From the public school for public schools!”
        </div>
        <div>
          <span className="overline">MAGIC ISLAND ROBOTICS</span>
          <h2>
            {language === "pt"
              ? "A ROBÓTICA É UM ESPAÇO PARA TODOS."
              : "ROBOTICS BELONGS TO EVERYONE."}
          </h2>
          <p>
            {language === "pt"
              ? "Somos a equipe FRC5800, do IFSC Câmpus Florianópolis. Competimos na FIRST Robotics Competition e usamos tudo o que aprendemos para aproximar a ciência de escolas e comunidades."
              : "We are FRC5800 from IFSC Florianópolis. We compete in the FIRST Robotics Competition and use what we learn to bring science closer to schools and communities."}
          </p>
        </div>
      </section>
      <section className="timeline-section">
        <div className="page-width">
          <SectionHeading
            overline={
              language === "pt"
                ? "UMA DÉCADA EM CONSTRUÇÃO"
                : "A DECADE IN THE MAKING"
            }
            title={language === "pt" ? "MARCOS DA 5800" : "THE 5800 MILESTONES"}
          />
          <div className="timeline">
            {timeline.map((item) => (
              <div key={item.year} className="timeline-row">
                <span className="timeline-year">{item.year}</span>
                <span className="timeline-point" aria-hidden="true" />
                <p>{item[language]}</p>
              </div>
            ))}
          </div>
          <a
            className="text-link"
            href={FIRST}
            target="_blank"
            rel="noreferrer"
          >
            {language === "pt"
              ? "Ver histórico oficial na FIRST"
              : "See the official FIRST history"}{" "}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="page-width values-section">
        <SectionHeading
          overline={language === "pt" ? "O QUE NOS MOVE" : "WHAT DRIVES US"}
          title={
            language === "pt"
              ? "APRENDER, CONSTRUIR, COMPARTILHAR."
              : "LEARN, BUILD, SHARE."
          }
        />
        <div className="values-grid">
          <article>
            <span>01</span>
            <h3>
              {language === "pt" ? "Educação pública" : "Public education"}
            </h3>
            <p>
              {language === "pt"
                ? "Nossa origem define nosso compromisso com o acesso ao conhecimento."
                : "Our roots shape our commitment to access to knowledge."}
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>{language === "pt" ? "Trabalho em equipe" : "Teamwork"}</h3>
            <p>
              {language === "pt"
                ? "Ideias diferentes ganham força quando pessoas trabalham juntas."
                : "Different ideas become stronger when people work together."}
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>
              {language === "pt"
                ? "Impacto além da arena"
                : "Impact beyond the arena"}
            </h3>
            <p>
              {language === "pt"
                ? "A competição é parte da jornada; compartilhar o que aprendemos dá sentido a ela."
                : "Competition is part of the journey; sharing what we learn gives it meaning."}
            </p>
          </article>
        </div>
      </section>
      <section className="about-photo-band">
        <img
          src={`${A}team-volunteers.jpg`}
          alt="Integrantes da equipe em atividade"
          loading="lazy"
        />
        <img
          src={`${A}team-build.jpg`}
          alt="Integrantes trabalhando em projeto"
          loading="lazy"
        />
        <img
          src={`${A}team-community.jpg`}
          alt="Integrantes em ação comunitária"
          loading="lazy"
        />
        <img
          src={`${A}team-event.jpg`}
          alt="Integrante da equipe em evento"
          loading="lazy"
        />
      </section>
      <section className="closing-cta page-width">
        <h2>
          {language === "pt"
            ? "A PRÓXIMA HISTÓRIA PODE TER VOCÊ."
            : "YOU CAN BE PART OF THE NEXT CHAPTER."}
        </h2>
        <ActionLink to="/participe">
          {language === "pt"
            ? "Descubra como participar"
            : "Discover how to join"}
        </ActionLink>
      </section>
    </main>
  );
}

function Robots({ language }: { language: Language }) {
  const [active, setActive] = useState(seasons.length - 1);
  const [activeCad, setActiveCad] = useState(3);
  const [lightbox, setLightbox] = useState<number | null>(null);
  useEffect(() => {
    if (lightbox === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);
  const selected = seasons[active];
  return (
    <main>
      <PageHero
        eyebrow="FRC 5800 · ROBÔS"
        title={language === "pt" ? "DENTRO DA ARENA" : "INSIDE THE ARENA"}
        text={
          language === "pt"
            ? "Cada robô representa meses de projeto, fabricação, programação, testes e colaboração."
            : "Every robot represents months of design, fabrication, programming, testing and collaboration."
        }
        image="robot-1.jpg"
      />
      <section className="page-width robots-intro">
        <SectionHeading
          overline={language === "pt" ? "GALERIA DE ROBÔS" : "ROBOT GALLERY"}
          title={
            language === "pt"
              ? "ENGENHARIA EM MOVIMENTO"
              : "ENGINEERING IN MOTION"
          }
          text={
            language === "pt"
              ? "Registros de robôs da 5800 em competições. Clique em uma imagem para ampliar."
              : "Photos of 5800 robots at competitions. Select an image to see it up close."
          }
        />
        <div className="robot-photo-grid">
          {[1, 3, 2].map((n, index) => (
            <button
              key={n}
              onClick={() => setLightbox(n)}
              aria-label={`${language === "pt" ? "Ampliar foto de robô" : "Enlarge robot photo"} ${index + 1}`}
            >
              <img
                src={`${A}robot-${n}.jpg`}
                alt={`${language === "pt" ? "Robô FRC5800 em competição" : "FRC5800 robot at competition"} ${index + 1}`}
                loading="lazy"
              />
              <span>
                <ArrowUpRight size={22} />
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="season-section">
        <div className="page-width season-inner">
          <div>
            <span className="overline">FIRST ROBOTICS COMPETITION</span>
            <h2>
              {language === "pt"
                ? "CADA TEMPORADA, UM NOVO DESAFIO."
                : "A NEW CHALLENGE EVERY SEASON."}
            </h2>
            <p>
              {language === "pt"
                ? "Explore os jogos recentes da competição e o histórico oficial da equipe."
                : "Explore recent competition games and the team’s official record."}
            </p>
          </div>
          <div className="season-picker">
            <div
              className="season-tabs"
              role="tablist"
              aria-label={language === "pt" ? "Temporadas" : "Seasons"}
            >
              {seasons.map((season, index) => (
                <button
                  key={season.year}
                  role="tab"
                  aria-selected={active === index}
                  onClick={() => setActive(index)}
                >
                  {season.year}
                </button>
              ))}
            </div>
            <div className="season-result" role="tabpanel">
              <span>
                {language === "pt" ? "JOGO DA TEMPORADA" : "SEASON GAME"}
              </span>
              <strong>{selected.game}</strong>
              <p>
                {language === "pt"
                  ? `Temporada ${selected.year} da FIRST Robotics Competition.`
                  : `${selected.year} FIRST Robotics Competition season.`}
              </p>
              <a
                href={`https://frc-events.firstinspires.org/${selected.year}/team/5800`}
                target="_blank"
                rel="noreferrer"
              >
                {language === "pt"
                  ? "Ver participação oficial"
                  : "See official team record"}{" "}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="cad-archive">
        <div className="page-width">
          <div className="cad-heading">
            <div>
              <span className="overline">OPEN CAD · FRC5800</span>
              <h2>
                {language === "pt"
                  ? "ABRA A ENGENHARIA."
                  : "OPEN THE ENGINEERING."}
              </h2>
              <p>
                {language === "pt"
                  ? "Explore os projetos CAD compartilhados pela equipe. Escolha uma temporada e abra o modelo no Onshape para girar, aproximar e examinar as peças."
                  : "Explore CAD projects shared by the team. Choose a season and open the model in Onshape to rotate, zoom and inspect its parts."}
              </p>
            </div>
            <span className="cad-head-mark" aria-hidden="true">
              5800<span>///</span>
            </span>
          </div>
          <div className="cad-archive-layout">
            <div
              className="cad-list"
              role="group"
              aria-label={language === "pt" ? "Modelos CAD" : "CAD models"}
            >
              {cadDocuments.map((document, index) => (
                <button
                  key={document.url}
                  type="button"
                  onClick={() => setActiveCad(index)}
                  aria-pressed={activeCad === index}
                  className={activeCad === index ? "active" : ""}
                >
                  <span>0{index + 1}</span>
                  <strong>
                    {document.year} <small>{document.game}</small>
                  </strong>
                  <ArrowUpRight size={20} />
                </button>
              ))}
            </div>
            <div className="cad-preview">
              <div className="cad-blueprint" aria-hidden="true">
                <span className="cad-ring one" />
                <span className="cad-ring two" />
                <span className="cad-cross cross-one">+</span>
                <span className="cad-cross cross-two">+</span>
                <strong>
                  FRC<span>5800</span>
                </strong>
              </div>
              <div className="cad-preview-copy">
                <span className="overline">
                  {language === "pt"
                    ? "DOCUMENTO DE PROJETO"
                    : "DESIGN DOCUMENT"}{" "}
                  · {cadDocuments[activeCad].year}
                </span>
                <h3>{cadDocuments[activeCad].game}</h3>
                <p>
                  {language === "pt"
                    ? "Modelo original da equipe no Onshape. O acesso depende das permissões definidas no documento."
                    : "Original team model in Onshape. Access depends on the document's sharing permissions."}
                </p>
                <a
                  href={cadDocuments[activeCad].url}
                  target="_blank"
                  rel="noreferrer"
                  className="outreach-cta"
                >
                  {language === "pt"
                    ? "Explorar modelo no Onshape"
                    : "Explore model in Onshape"}{" "}
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-width engineering-note">
        <div>
          <span className="overline">
            {language === "pt" ? "POR TRÁS DOS BUMPERS" : "BEHIND THE BUMPERS"}
          </span>
          <h2>
            {language === "pt"
              ? "CADA PEÇA CONTA UMA HISTÓRIA."
              : "EVERY PART TELLS A STORY."}
          </h2>
          <p>
            {language === "pt"
              ? "O robô final é só a parte visível. Na oficina, estudantes trabalham em mecânica, elétrica, software e estratégia para fazer cada solução funcionar."
              : "The finished robot is only the visible part. In the workshop, students work across mechanics, electronics, software and strategy to make each solution work."}
          </p>
        </div>
        <img
          src={`${A}robot-concept.png`}
          alt={
            language === "pt"
              ? "Desenho técnico de mecanismo de robô"
              : "Technical drawing of a robot mechanism"
          }
          loading="lazy"
        />
      </section>
      {lightbox !== null ? (
        <div
          className="overlay lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightbox(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={
              language === "pt"
                ? "Foto ampliada do robô"
                : "Enlarged robot photo"
            }
          >
            <button onClick={() => setLightbox(null)} aria-label="Fechar">
              <X size={25} />
            </button>
            <img
              src={`${A}robot-${lightbox}.jpg`}
              alt="Robô FRC5800 em competição"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}

function Sponsors({ language }: { language: Language }) {
  return (
    <main>
      <PageHero
        eyebrow={
          language === "pt" ? "QUEM CAMINHA COM A GENTE" : "WHO STANDS WITH US"
        }
        title={
          language === "pt"
            ? "APOIO QUE MOVE A 5800"
            : "SUPPORT THAT MOVES THE 5800"
        }
        text={
          language === "pt"
            ? "Apoiar a robótica educacional é investir em pessoas, possibilidades e no futuro da escola pública."
            : "Supporting educational robotics means investing in people, possibilities and the future of public education."
        }
      />
      <section className="page-width sponsor-page">
        <SectionHeading
          overline={language === "pt" ? "NOSSO ACERVO" : "OUR ARCHIVE"}
          title={
            language === "pt"
              ? "MARCAS QUE FAZEM PARTE DA NOSSA JORNADA"
              : "BRANDS IN OUR JOURNEY"
          }
          text={
            language === "pt"
              ? "Empresas e instituições que apoiam e impulsionam a nossa jornada."
              : "Companies and institutions that support and empower our journey."
          }
        />
        <div className="sponsor-grid">
          {sponsors.map((sponsor) => (
            <div key={sponsor.name}>
              <img
                src={`${A}${sponsor.image}`}
                alt={sponsor.name}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="sponsor-invite">
        <div className="page-width">
          <span className="overline">
            {language === "pt" ? "FAÇA PARTE" : "JOIN US"}
          </span>
          <h2>
            {language === "pt"
              ? "SUA MARCA PODE AJUDAR A CONSTRUIR O PRÓXIMO CAPÍTULO."
              : "YOUR BRAND CAN HELP BUILD THE NEXT CHAPTER."}
          </h2>
          <p>
            {language === "pt"
              ? "Converse com a equipe sobre formas de apoiar projetos, formação de estudantes e participação em competições."
              : "Talk to the team about supporting projects, student development and competition participation."}
          </p>
          <ActionLink to="/nos-apoie">
            {language === "pt" ? "Quero apoiar" : "I want to support"}
          </ActionLink>
        </div>
      </section>
    </main>
  );
}

function Support({ language }: { language: Language }) {
  return (
    <main>
      <PageHero
        eyebrow={language === "pt" ? "CONSTRUA COM A GENTE" : "BUILD WITH US"}
        title={language === "pt" ? "NOS APOIE" : "SUPPORT US"}
        text={
          language === "pt"
            ? "Com apoio, a robótica atravessa os muros da escola e chega mais longe."
            : "With support, robotics reaches beyond school walls and goes further."
        }
        image="team-community.jpg"
      />
      <section className="page-width support-intro">
        <SectionHeading
          title={
            language === "pt"
              ? "SEU APOIO VIRA OPORTUNIDADE."
              : "YOUR SUPPORT CREATES OPPORTUNITY."
          }
          text={
            language === "pt"
              ? "A equipe reúne estudantes de escola pública, mentores e parceiros em torno da robótica. Cada colaboração ajuda a manter projetos e experiências de aprendizagem em movimento."
              : "Our team brings together public school students, mentors and partners around robotics. Every collaboration helps keep projects and learning experiences moving."
          }
        />
        <div className="support-options">
          <article>
            <strong>01</strong>
            <h3>{language === "pt" ? "Parcerias" : "Partnerships"}</h3>
            <p>
              {language === "pt"
                ? "Sua organização pode colaborar com projetos, materiais e oportunidades para estudantes."
                : "Your organization can contribute to projects, materials and opportunities for students."}
            </p>
          </article>
          <article>
            <strong>02</strong>
            <h3>{language === "pt" ? "Mentoria" : "Mentorship"}</h3>
            <p>
              {language === "pt"
                ? "Conhecimento técnico e experiências profissionais ampliam o aprendizado da equipe."
                : "Technical knowledge and professional experience expand what the team can learn."}
            </p>
          </article>
          <article>
            <strong>03</strong>
            <h3>{language === "pt" ? "Divulgação" : "Spread the word"}</h3>
            <p>
              {language === "pt"
                ? "Compartilhar nossa história ajuda mais pessoas a conhecerem a robótica na escola pública."
                : "Sharing our story helps more people discover robotics in public education."}
            </p>
          </article>
        </div>
      </section>
      <section className="support-contact">
        <div className="page-width">
          <h2>{language === "pt" ? "VAMOS CONVERSAR?" : "LET’S TALK?"}</h2>
          <p>
            {language === "pt"
              ? "Conte como você gostaria de caminhar com a 5800. Nossa equipe responde por e-mail."
              : "Tell us how you would like to support the 5800. Our team responds by email."}
          </p>
          <a
            className="pill-link pill-light"
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("Quero apoiar a FRC5800")}`}
          >
            {language === "pt" ? "Escreva para a equipe" : "Email the team"}{" "}
            <Mail size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}

function Blog({ language }: { language: Language }) {
  const entries = [
    {
      tag: "2026 · FIRST",
      title: {
        pt: "A temporada REBUILT da 5800",
        en: "The 5800 REBUILT season",
      },
      text: {
        pt: "Acompanhe resultados, eventos e reconhecimentos da equipe no registro oficial da FIRST.",
        en: "Follow team results, events and awards in the official FIRST record.",
      },
      link: FIRST,
      image: "robot-1.jpg",
    },
    {
      tag: "OPEN SOURCE",
      title: { pt: "Magic Scouting no GitHub", en: "Magic Scouting on GitHub" },
      text: {
        pt: "Conheça o aplicativo de scouting criado pela equipe e acompanhe o desenvolvimento.",
        en: "Explore the scouting app built by the team and follow its development.",
      },
      link: "https://github.com/FRC5800/MagicScouting",
      image: "magic-scouting.png",
    },
    {
      tag: "COMUNIDADE",
      title: {
        pt: "O dia a dia da Magic Island",
        en: "Everyday life at Magic Island",
      },
      text: {
        pt: "Fotos, bastidores e novidades diretamente do perfil da equipe.",
        en: "Photos, behind-the-scenes moments and news from the team’s profile.",
      },
      link: INSTAGRAM,
      image: "team-event.jpg",
    },
  ];
  return (
    <main>
      <PageHero
        eyebrow={language === "pt" ? "DIÁRIO DE BORDO" : "TEAM JOURNAL"}
        title={
          language === "pt" ? "HISTÓRIAS DA ILHA" : "STORIES FROM THE ISLAND"
        }
        text={
          language === "pt"
            ? "Acompanhe o que construímos, aprendemos e compartilhamos pelo caminho."
            : "Follow what we build, learn and share along the way."
        }
        image="team-event.jpg"
      />
      <section className="page-width blog-section">
        <SectionHeading
          overline={
            language === "pt" ? "ACOMPANHE A EQUIPE" : "FOLLOW THE TEAM"
          }
          title={language === "pt" ? "ÚLTIMAS DA 5800" : "LATEST FROM THE 5800"}
        />
        <div className="blog-grid">
          {entries.map((entry) => (
            <a
              className="blog-card"
              href={entry.link}
              target="_blank"
              rel="noreferrer"
              key={entry.link}
            >
              <div>
                <img src={`${A}${entry.image}`} alt="" loading="lazy" />
              </div>
              <span>{entry.tag}</span>
              <h3>{pick(entry.title, language)}</h3>
              <p>{pick(entry.text, language)}</p>
              <span className="blog-more">
                {language === "pt" ? "Acessar conteúdo" : "Open story"}{" "}
                <ArrowUpRight size={17} />
              </span>
            </a>
          ))}
        </div>
        <div className="archive-link">
          <p>
            {language === "pt"
              ? "Quer revisitar publicações anteriores?"
              : "Want to revisit older posts?"}
          </p>
          <ActionLink to="https://frc5800.com/blog/" external>
            {language === "pt"
              ? "Abrir blog histórico"
              : "Open the historic blog"}
          </ActionLink>
        </div>
      </section>
    </main>
  );
}

function Contact({ language }: { language: Language }) {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = `${message}\n\n${language === "pt" ? "Enviado por" : "Sent by"}: ${name} (${email})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <main>
      <PageHero
        eyebrow={language === "pt" ? "FALE COM A 5800" : "TALK TO THE 5800"}
        title={
          language === "pt"
            ? "VAMOS CONSTRUIR JUNTOS?"
            : "LET’S BUILD TOGETHER."
        }
        text={
          language === "pt"
            ? "Uma ideia, uma parceria ou apenas uma conversa: queremos ouvir você."
            : "An idea, a partnership or just a conversation: we would love to hear from you."
        }
      />
      <section className="page-width contact-layout">
        <div className="contact-info">
          <span className="overline">
            {language === "pt" ? "CONTATO DIRETO" : "GET IN TOUCH"}
          </span>
          <h2>
            {language === "pt"
              ? "A CONVERSA COMEÇA AQUI."
              : "THE CONVERSATION STARTS HERE."}
          </h2>
          <p>
            {language === "pt"
              ? "Escreva para a equipe usando o formulário ou envie um e-mail diretamente."
              : "Write to the team using the form or send an email directly."}
          </p>
          <a className="contact-email" href={`mailto:${EMAIL}`}>
            <Mail size={21} />
            {EMAIL}
          </a>
          <p className="location">
            IFSC Câmpus Florianópolis
            <br />
            Florianópolis · Santa Catarina · Brasil
          </p>
          <div className="social-row">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={21} />
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              GH
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>{language === "pt" ? "Envie sua mensagem" : "Send a message"}</h3>
          <div className="form-row">
            <label>
              {language === "pt" ? "Seu nome" : "Your name"}
              <input
                name="name"
                required
                autoComplete="name"
                placeholder={
                  language === "pt"
                    ? "Como podemos chamar você?"
                    : "What should we call you?"
                }
              />
            </label>
            <label>
              E-mail
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="voce@exemplo.com"
              />
            </label>
          </div>
          <label>
            {language === "pt" ? "Assunto" : "Subject"}
            <span className="select-wrap">
              <select name="subject" required defaultValue="">
                <option value="" disabled>
                  {language === "pt"
                    ? "Selecione um assunto"
                    : "Choose a subject"}
                </option>
                <option>
                  {language === "pt"
                    ? "Parceria e patrocínio"
                    : "Partnership and sponsorship"}
                </option>
                <option>
                  {language === "pt"
                    ? "Projetos e escolas"
                    : "Projects and schools"}
                </option>
                <option>
                  {language === "pt"
                    ? "Imprensa e eventos"
                    : "Press and events"}
                </option>
                <option>{language === "pt" ? "Outro assunto" : "Other"}</option>
              </select>
              <ChevronDown size={18} />
            </span>
          </label>
          <label>
            {language === "pt" ? "Mensagem" : "Message"}
            <textarea
              name="message"
              rows={6}
              required
              placeholder={
                language === "pt"
                  ? "Conte sua ideia ou dúvida..."
                  : "Tell us about your idea or question..."
              }
            />
          </label>
          <p className="form-note">
            {language === "pt"
              ? "O botão abre seu aplicativo de e-mail com a mensagem preenchida."
              : "The button opens your email app with the message filled in."}
          </p>
          <button type="submit" className="pill-link">
            {language === "pt" ? "Preparar e-mail" : "Prepare email"}{" "}
            <Send size={17} />
          </button>
          {sent ? (
            <p className="form-status" role="status">
              <Check size={17} />
              {language === "pt"
                ? "Seu aplicativo de e-mail foi acionado. Confirme o envio por lá."
                : "Your email app was opened. Confirm sending there."}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}

function NotFound({ language }: { language: Language }) {
  return (
    <main className="not-found page-width">
      <strong>404</strong>
      <h1>{language === "pt" ? "PÁGINA NÃO ENCONTRADA" : "PAGE NOT FOUND"}</h1>
      <p>
        {language === "pt"
          ? "Esse caminho não faz parte do mapa da ilha."
          : "This path is not on the island map."}
      </p>
      <ActionLink to="/">
        {language === "pt" ? "Voltar ao início" : "Back to home"}
      </ActionLink>
    </main>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() =>
    localStorage.getItem("frc5800-language") === "en" ? "en" : "pt",
  );
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("frc5800-language", language);
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = `FRC5800 — Magic Island Robotics`;
  }, [location.pathname]);
  useEffect(() => {
    if (location.hash)
      setTimeout(
        () => document.getElementById(location.hash.slice(1))?.scrollIntoView(),
        60,
      );
  }, [location.hash, location.pathname]);
  const routes = useMemo(
    () => (
      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/quem-somos" element={<About language={language} />} />
        <Route
          path="/projetos"
          element={<OutreachIndex language={language} />}
        />
        <Route
          path="/projetos/:slug"
          element={<OutreachDetail language={language} />}
        />
        <Route path="/impacto" element={<ImpactPage language={language} />} />
        <Route path="/participe" element={<JoinPage language={language} />} />
        <Route path="/robos" element={<Robots language={language} />} />
        <Route
          path="/patrocinadores"
          element={<Sponsors language={language} />}
        />
        <Route path="/nos-apoie" element={<Support language={language} />} />
        <Route path="/blog" element={<Blog language={language} />} />
        <Route path="/contato" element={<Contact language={language} />} />
        <Route path="*" element={<NotFound language={language} />} />
      </Routes>
    ),
    [language],
  );
  return (
    <>
      <a className="skip-link" href="#main-content">
        {language === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <Header language={language} setLanguage={setLanguage} />
      <div id="main-content">{routes}</div>
      <Footer language={language} />
    </>
  );
}
