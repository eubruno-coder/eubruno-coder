// FAQ interativa do portfólio: respostas locais, selecionadas pelo visitante.
const faqGroups = [
  {id:"sobre",label:"Sobre",questions:[
    {q:"Quem é Bruno Silva?",a:"Bruno é um profissional em transição e desenvolvimento de carreira na área de tecnologia, com direcionamento para Cloud, desenvolvimento e infraestrutura. Este workspace reúne sua trajetória, estudos e projetos públicos."},
    {q:"Qual é seu objetivo profissional?",a:"O foco atual é evoluir na área de Cloud, ampliando conhecimentos em desenvolvimento, infraestrutura e práticas DevOps. O posicionamento é de aspirante a Cloud, sem apresentar estudos como experiência profissional."},
    {q:"O que encontro nesta plataforma?",a:"Você pode explorar o perfil profissional, os estudos em Cloud, o Development Lab, os projetos, os repositórios públicos do GitHub, a formação, a experiência e os canais de contato."}
  ]},
  {id:"projetos",label:"Projetos",questions:[
    {q:"Quais projetos estão em destaque?",a:"Entre as iniciativas públicas estão LicitaRadar, Menu Lanchonete, NCroch’s, Delivery Laboratório e outros projetos e laboratórios. Consulte a área Projetos para ver descrições, tecnologias e links atualizados."},
    {q:"O que é o LicitaRadar?",a:"É um buscador regional de editais de compras públicas, em desenvolvimento. A proposta inclui localizar oportunidades e facilitar a compreensão dos editais."},
    {q:"Os projetos estão todos concluídos?",a:"Não. O catálogo diferencia projetos em desenvolvimento, protótipos, estudos e laboratórios. O status apresentado em cada cartão indica o estágio informado."},
    {q:"Onde posso ver o código-fonte?",a:"Abra a área Projetos para acessar os links de cada iniciativa ou use o módulo GitHub Explorer para consultar os repositórios públicos diretamente no GitHub."}
  ]},
  {id:"tecnologias",label:"Tecnologias",questions:[
    {q:"Quais tecnologias aparecem no portfólio?",a:"O portfólio reúne temas como AWS, Linux, Docker, Kubernetes (EKS), CloudWatch, Git, GitHub Actions, CI/CD, Shell Script, HTML, CSS, JavaScript, Python e FastAPI. A aplicação indica quando um tema está em estudo."},
    {q:"Bruno tem experiência profissional com AWS?",a:"Bruno teve experiência como estagiário na Compass UOL em atividades relacionadas a DevSecOps e Cloud AWS. Essa passagem é apresentada como estágio, não como cargo pleno."},
    {q:"Python e Prometheus são experiência profissional?",a:"Python está relacionado à formação e aos estudos em desenvolvimento. Prometheus e Grafana são conhecimentos estudados; não são apresentados como ferramentas aplicadas em experiência profissional."}
  ]},
  {id:"formacao",label:"Formação",questions:[
    {q:"Qual é a formação acadêmica?",a:"Bruno concluiu Gestão da Tecnologia da Informação pela UNIASSELVI em 2025."},
    {q:"Está cursando alguma pós-graduação?",a:"Sim. Está cursando pós-graduação Lato Sensu em Desenvolvimento de Sistemas com Python pela UNIASSELVI."},
    {q:"Quais estudos complementares estão listados?",a:"O perfil também apresenta estudos e formações complementares em Linux, servidores, AWS, DevOps e CI/CD. Consulte a seção Formação para os detalhes publicados."}
  ]},
  {id:"experiencia",label:"Experiência",questions:[
    {q:"Qual foi sua experiência em tecnologia?",a:"Na Compass UOL, Bruno atuou como estagiário em atividades relacionadas a DevSecOps e Cloud AWS, entre setembro de 2024 e fevereiro de 2025, com contato com Kubernetes (EKS), Shell Script, CloudWatch e pipelines CI/CD."},
    {q:"Sua trajetória se limita à tecnologia?",a:"Não. A trajetória também inclui atendimento, suporte técnico, relacionamento com clientes, operações, supervisão de equipes e atividades comerciais."},
    {q:"Onde vejo o histórico profissional?",a:"Acesse a seção Experiência no menu lateral. Ela apresenta as empresas, funções, períodos e principais atividades informadas."}
  ]},
  {id:"contato",label:"Contato",questions:[
    {q:"Como entrar em contato?",a:"Você pode utilizar os canais profissionais: e-mail bruno_silvap@outlook.com, LinkedIn linkedin.com/in/bruno-pereirasilva e GitHub github.com/eubruno-coder."},
    {q:"Onde encontro o LinkedIn?",a:"Acesse linkedin.com/in/bruno-pereirasilva ou abra a seção Contato nesta plataforma."},
    {q:"Onde encontro o GitHub?",a:"Acesse github.com/eubruno-coder ou utilize o módulo GitHub Explorer para navegar pelos repositórios públicos."}
  ]}
];

const styles = \`
  .assistant-launcher{position:fixed;right:24px;bottom:24px;z-index:30;display:flex;align-items:center;gap:10px;padding:13px 18px;border:1px solid rgba(167,139,250,.42);border-radius:999px;background:linear-gradient(110deg,#713cff,#168bff);color:#fff;font:700 13px "DM Sans",sans-serif;box-shadow:0 12px 34px rgba(45,55,160,.34);cursor:pointer;transition:transform .2s,box-shadow .2s}
  .assistant-launcher:hover{transform:translateY(-3px);box-shadow:0 16px 38px rgba(45,55,160,.44)}
  .assistant-launcher:focus-visible,.assistant-close:focus-visible,.faq-category:focus-visible,.faq-question:focus-visible{outline:3px solid #a78bfa;outline-offset:3px}
  .assistant-launcher-mark{display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:#ffffff26;font-size:16px}
  .assistant-panel{position:fixed;right:24px;bottom:88px;z-index:31;display:none;flex-direction:column;width:min(440px,calc(100vw - 32px));height:min(650px,calc(100dvh - 112px));min-height:300px;overflow:hidden;border:1px solid var(--line,#263451);border-radius:20px;background:var(--panel,#111a32);color:var(--text,#f4f7ff);box-shadow:0 24px 70px #0007}
  .assistant-panel.is-open{display:flex;animation:assistant-enter .18s ease-out}
  @keyframes assistant-enter{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .assistant-head{display:flex;flex:0 0 auto;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;border-bottom:1px solid var(--line,#263451);background:linear-gradient(110deg,#713cff20,#168bff12)}
  .assistant-identity{display:flex;min-width:0;align-items:center;gap:11px}
  .assistant-avatar{display:grid;flex:0 0 38px;place-items:center;width:38px;height:38px;border-radius:13px;background:linear-gradient(135deg,#713cff,#168bff);color:white;font-size:18px;box-shadow:0 0 0 5px #713cff13}
  .assistant-head strong{display:block;font:800 14px Manrope,sans-serif}
  .assistant-head small{display:block;margin-top:4px;color:var(--muted,#a7b4cc);font-size:11px;line-height:1.4}
  .assistant-close{display:grid;flex:0 0 36px;place-items:center;width:36px;height:36px;border:1px solid var(--line,#263451);border-radius:10px;background:transparent;color:inherit;font-size:21px;cursor:pointer}
  .assistant-intro{flex:0 0 auto;padding:15px 18px 10px}
  .assistant-intro strong{display:block;font:700 13px Manrope,sans-serif}
  .assistant-intro p{margin:5px 0 0;color:var(--muted,#a7b4cc);font-size:11px;line-height:1.55}
  .faq-categories{display:flex;flex:0 0 auto;gap:7px;overflow-x:auto;padding:5px 18px 13px;scrollbar-width:thin;overscroll-behavior-x:contain}
  .faq-category{flex:0 0 auto;padding:9px 12px;border:1px solid var(--line,#263451);border-radius:999px;background:var(--panel-2,#172342);color:var(--muted,#a7b4cc);font:600 11px "DM Sans",sans-serif;cursor:pointer}
  .faq-category[aria-pressed="true"]{border-color:#8b72ff;background:#713cff25;color:var(--text,#f4f7ff)}
  .faq-content{display:flex;flex:1 1 auto;min-height:0;flex-direction:column;gap:12px;overflow-y:auto;padding:4px 18px 18px;overscroll-behavior:contain}
  .faq-section-label{margin:2px 0 0;color:var(--muted,#a7b4cc);font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
  .faq-question-list{display:grid;gap:8px}
  .faq-question{display:flex;width:100%;align-items:center;justify-content:space-between;gap:12px;padding:12px 13px;border:1px solid var(--line,#263451);border-radius:12px;background:var(--panel-2,#172342);color:var(--text,#f4f7ff);text-align:left;font:600 12px/1.45 "DM Sans",sans-serif;cursor:pointer;transition:border-color .18s,background .18s}
  .faq-question:hover,.faq-question[aria-pressed="true"]{border-color:#8b72ff99;background:#713cff18}
  .faq-question span:last-child{flex:0 0 auto;color:#a78bfa;font-size:17px}
  .faq-answer{padding:15px;border:1px solid #8064ff55;border-radius:14px;background:linear-gradient(130deg,#713cff17,#168bff0b);animation:assistant-enter .18s ease-out}
  .faq-answer[hidden]{display:none}
  .faq-answer-label{display:block;margin-bottom:7px;color:#a78bfa;font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
  .faq-answer p{margin:0;color:var(--text,#f4f7ff);font-size:12px;line-height:1.75;overflow-wrap:anywhere}
  .faq-hint{margin:0;color:var(--muted,#a7b4cc);font-size:10px;line-height:1.5}
  @media(max-width:600px){
    .assistant-launcher{right:16px;bottom:calc(16px + env(safe-area-inset-bottom));padding:12px 15px}
    .assistant-panel{right:0;bottom:0;width:100vw;width:100dvw;height:min(82dvh,720px);max-height:calc(100dvh - env(safe-area-inset-top) - 8px);min-height:280px;border-radius:20px 20px 0 0;border-bottom:0;padding-bottom:env(safe-area-inset-bottom)}
    .assistant-panel.is-open{animation:assistant-mobile-enter .2s ease-out}
    @keyframes assistant-mobile-enter{from{opacity:.7;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    .assistant-head{padding:13px 16px}
    .assistant-intro{padding:13px 16px 8px}
    .faq-categories{padding:5px 16px 12px}
    .faq-content{padding:4px 16px 16px}
    .faq-question{padding:13px}
  }
  @media(max-width:360px){
    .assistant-launcher{right:12px;bottom:calc(12px + env(safe-area-inset-bottom))}
    .assistant-head strong{font-size:13px}
    .assistant-intro p{font-size:10px}
    .faq-category{padding:8px 10px;font-size:10px}
  }
  @media(max-height:500px) and (max-width:900px){
    .assistant-panel{height:calc(100dvh - 8px);max-height:calc(100dvh - 8px)}
    .assistant-intro{padding-top:8px;padding-bottom:5px}
    .assistant-intro p{display:none}
    .faq-categories{padding-bottom:7px}
  }
  @media(prefers-reduced-motion:reduce){.assistant-launcher,.assistant-panel,.faq-answer{animation:none!important;transition:none!important}}
\`;

const style = document.createElement("style");
style.textContent = styles;
document.head.append(style);

const launcher = document.createElement("button");
launcher.className = "assistant-launcher";
launcher.type = "button";
launcher.setAttribute("aria-expanded", "false");
launcher.setAttribute("aria-controls", "portfolio-assistant");
launcher.innerHTML = '<span class="assistant-launcher-mark" aria-hidden="true">?</span><span>Perguntas frequentes</span>';

const panel = document.createElement("section");
panel.className = "assistant-panel";
panel.id = "portfolio-assistant";
panel.setAttribute("aria-label", "Perguntas frequentes do portfólio");
panel.innerHTML = \`
  <header class="assistant-head">
    <div class="assistant-identity"><span class="assistant-avatar" aria-hidden="true">?</span><span><strong>Central de dúvidas</strong><small>Respostas sobre o conteúdo desta plataforma</small></span></div>
    <button class="assistant-close" type="button" aria-label="Fechar perguntas frequentes">×</button>
  </header>
  <div class="assistant-intro"><strong>O que você gostaria de saber?</strong><p>Selecione um assunto e depois uma pergunta para consultar a resposta.</p></div>
  <nav class="faq-categories" aria-label="Categorias de perguntas"></nav>
  <div class="faq-content" aria-live="polite">
    <p class="faq-section-label">Selecione uma pergunta</p>
    <div class="faq-question-list"></div>
    <article class="faq-answer" hidden aria-live="polite"><span class="faq-answer-label">Resposta</span><p></p></article>
    <p class="faq-hint">As respostas são informações fixas do próprio portfólio e podem ser atualizadas junto com o site.</p>
  </div>
\`;

document.body.append(launcher, panel);
const categories = panel.querySelector(".faq-categories");
const questionList = panel.querySelector(".faq-question-list");
const answerCard = panel.querySelector(".faq-answer");
const answerText = answerCard.querySelector("p");
const close = panel.querySelector(".assistant-close");
let activeGroup = faqGroups[0].id;

function setOpen(open) {
  panel.classList.toggle("is-open", open);
  launcher.setAttribute("aria-expanded", String(open));
  if (!open) launcher.focus({ preventScroll: true });
}

function renderCategories() {
  categories.innerHTML = "";
  faqGroups.forEach(group => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "faq-category";
    button.textContent = group.label;
    button.setAttribute("aria-pressed", String(group.id === activeGroup));
    button.addEventListener("click", () => {
      activeGroup = group.id;
      renderCategories();
      renderQuestions();
    });
    categories.append(button);
  });
}

function renderQuestions() {
  const group = faqGroups.find(item => item.id === activeGroup) || faqGroups[0];
  questionList.innerHTML = "";
  answerCard.hidden = true;
  answerText.textContent = "";
  questionList.setAttribute("aria-label", "Perguntas sobre " + group.label);
  group.questions.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "faq-question";
    button.setAttribute("aria-pressed", "false");
    const label = document.createElement("span");
    label.textContent = item.q;
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "›";
    button.append(label, arrow);
    button.addEventListener("click", () => {
      questionList.querySelectorAll(".faq-question").forEach(question => question.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      answerText.textContent = item.a;
      answerCard.hidden = false;
      answerCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    questionList.append(button);
  });
}

launcher.addEventListener("click", () => setOpen(!panel.classList.contains("is-open")));
close.addEventListener("click", () => setOpen(false));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && panel.classList.contains("is-open")) setOpen(false);
});

renderCategories();
renderQuestions();
