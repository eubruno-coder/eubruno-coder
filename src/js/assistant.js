// Modo temporário sem IA: o widget responde com informações predefinidas.\n// Quando a API estiver publicada, basta inserir sua URL nesta constante.\nconst ASSISTANT_ENDPOINT = "";

const styles = `
  .assistant-launcher{position:fixed;right:24px;bottom:24px;z-index:30;display:flex;align-items:center;gap:10px;padding:13px 18px;border:1px solid rgba(167,139,250,.42);border-radius:999px;background:linear-gradient(110deg,#713cff,#168bff);color:#fff;font:700 13px "DM Sans",sans-serif;box-shadow:0 12px 34px rgba(45,55,160,.34);cursor:pointer;transition:transform .2s,box-shadow .2s}
  .assistant-launcher:hover{transform:translateY(-3px);box-shadow:0 16px 38px rgba(45,55,160,.44)}
  .assistant-launcher:focus-visible,.assistant-send:focus-visible,.assistant-close:focus-visible,.assistant-input:focus-visible{outline:3px solid #a78bfa;outline-offset:3px}
  .assistant-launcher-mark{display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:#ffffff26;font-size:16px}
  .assistant-panel{position:fixed;right:24px;bottom:88px;z-index:31;display:none;flex-direction:column;width:min(390px,calc(100vw - 32px));height:min(560px,calc(100dvh - 120px));overflow:hidden;border:1px solid var(--line,#263451);border-radius:20px;background:var(--panel,#111a32);color:var(--text,#f4f7ff);box-shadow:0 24px 70px #0007}
  .assistant-panel.is-open{display:flex;animation:assistant-enter .18s ease-out}
  @keyframes assistant-enter{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .assistant-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid var(--line,#263451);background:linear-gradient(110deg,#713cff20,#168bff12)}
  .assistant-identity{display:flex;align-items:center;gap:11px}
  .assistant-avatar{position:relative;box-shadow:0 0 0 5px #713cff13;animation:assistant-glow 2.8s ease-in-out infinite alternate}
  @keyframes assistant-glow{from{filter:drop-shadow(0 0 2px #8b72ff55)}to{filter:drop-shadow(0 0 10px #8b72ffbb)}}
  .assistant-avatar:after{content:"";position:absolute;inset:-4px;border:1px solid #8b72ff66;border-radius:17px;animation:assistant-pulse 2.8s ease-out infinite}
  @keyframes assistant-pulse{0%{transform:scale(.92);opacity:.8}75%,100%{transform:scale(1.22);opacity:0}}
  .assistant-avatar{display:grid;place-items:center;width:38px;height:38px;border-radius:13px;background:linear-gradient(135deg,#713cff,#168bff);color:white;font-size:18px}
  .assistant-head strong{display:block;font:800 14px Manrope,sans-serif}
  .assistant-head small{display:flex;align-items:center;gap:6px;margin-top:4px;color:var(--muted,#a7b4cc);font-size:11px}
  .assistant-status{width:6px;height:6px;border-radius:50%;background:#45d49a;box-shadow:0 0 8px #45d49a99}
  .assistant-close{width:34px;height:34px;border:1px solid var(--line,#263451);border-radius:10px;background:transparent;color:inherit;font-size:20px;cursor:pointer}
  .assistant-messages{display:flex;flex:1;flex-direction:column;gap:12px;overflow-y:auto;padding:17px}
  .assistant-message{max-width:88%;padding:11px 13px;border:1px solid var(--line,#263451);border-radius:14px;background:var(--panel-2,#172342);font-size:12px;line-height:1.65;white-space:pre-wrap;overflow-wrap:anywhere}
  .assistant-message.user{align-self:flex-end;border-color:#713cff55;background:linear-gradient(120deg,#713cff2b,#168bff1b)}
  .assistant-message.bot{align-self:flex-start;border-bottom-left-radius:5px}
  .assistant-message.user{border-bottom-right-radius:5px}
  .assistant-message{animation:assistant-message-in .28s ease both}
  @keyframes assistant-message-in{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
  .assistant-chips{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 2px;animation:assistant-message-in .35s ease both}
  .assistant-chip{padding:8px 10px;border:1px solid #8064ff66;border-radius:999px;background:#713cff13;color:var(--text,#f4f7ff);font:600 11px "DM Sans",sans-serif;cursor:pointer;transition:background .18s,border-color .18s,transform .18s}
  .assistant-chip:hover{transform:translateY(-1px);border-color:#9b85ff;background:#713cff2b}
  .assistant-projects{display:grid;gap:8px;margin-top:10px}
  .assistant-project-card{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 11px;border:1px solid #6476a533;border-radius:12px;background:linear-gradient(110deg,#ffffff08,#713cff0b);text-decoration:none!important;color:inherit!important;transition:border-color .18s,transform .18s}
  .assistant-project-card:hover{transform:translateY(-2px);border-color:#8b72ff99}
  .assistant-project-card strong{display:block;font-size:11px}
  .assistant-project-card small{display:block;margin-top:3px;color:var(--muted,#a7b4cc);font-size:10px;line-height:1.4}
  .assistant-project-arrow{color:#a78bfa;font-size:17px}
  .assistant-message a{color:var(--accent-2,#168bff);text-decoration:underline}
  .assistant-typing{display:flex;align-items:center;gap:8px;color:var(--muted,#a7b4cc);font-size:11px;padding:0 17px 10px}
  .assistant-typing[hidden]{display:none}
  .assistant-dots{display:flex;gap:3px}
  .assistant-dots i{width:5px;height:5px;border-radius:50%;background:#a78bfa;animation:assistant-dot 1s ease-in-out infinite}
  .assistant-dots i:nth-child(2){animation-delay:.14s}.assistant-dots i:nth-child(3){animation-delay:.28s}
  @keyframes assistant-dot{0%,60%,100%{opacity:.35;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}
  .assistant-form{display:flex;gap:9px;padding:13px;border-top:1px solid var(--line,#263451)}
  .assistant-input{flex:1;min-width:0;resize:none;max-height:100px;padding:11px 12px;border:1px solid var(--line,#263451);border-radius:12px;background:var(--bg,#080d1d);color:var(--text,#f4f7ff);font:12px "DM Sans",sans-serif}
  .assistant-send{width:42px;flex-shrink:0;border:0;border-radius:12px;background:linear-gradient(135deg,#713cff,#168bff);color:white;font-size:18px;cursor:pointer}
  .assistant-send:disabled{opacity:.45;cursor:not-allowed}
  .assistant-disclaimer{padding:0 15px 12px;color:var(--muted,#a7b4cc);font-size:9px;line-height:1.4}
  @media(max-width:600px){.assistant-launcher{right:16px;bottom:16px;padding:12px 15px}.assistant-panel{right:8px;bottom:76px;width:calc(100vw - 16px);height:min(620px,calc(100dvh - 92px));border-radius:17px}}
  @media(prefers-reduced-motion:reduce){.assistant-launcher,.assistant-panel,.assistant-message,.assistant-chips,.assistant-avatar:after,.assistant-dots i{animation:none!important;transition:none!important}}
`;

const style = document.createElement("style");
style.textContent = styles;
document.head.append(style);

const launcher = document.createElement("button");
launcher.className = "assistant-launcher";
launcher.type = "button";
launcher.setAttribute("aria-expanded", "false");
launcher.setAttribute("aria-controls", "portfolio-assistant");
launcher.innerHTML = '<span class="assistant-launcher-mark" aria-hidden="true">✦</span><span>Posso ajudar?</span>';

const panel = document.createElement("section");
panel.className = "assistant-panel";
panel.id = "portfolio-assistant";
panel.setAttribute("aria-label", "Assistente do portfólio");
panel.innerHTML = `
  <header class="assistant-head">
    <div class="assistant-identity"><span class="assistant-avatar" aria-hidden="true">✦</span><span><strong>Assistente</strong><small><i class="assistant-status"></i> Online · pronto para conversar</small></span></div>
    <button class="assistant-close" type="button" aria-label="Fechar conversa">×</button>
  </header>
  <div class="assistant-messages" role="log" aria-live="polite" aria-relevant="additions">
  </div>
  <div class="assistant-typing" hidden><span class="assistant-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>Preparando uma resposta…</span></div>
  <form class="assistant-form">
    <textarea class="assistant-input" rows="1" maxlength="1200" aria-label="Digite sua mensagem" placeholder="Escreva sua pergunta…"></textarea>
    <button class="assistant-send" type="submit" aria-label="Enviar mensagem">➤</button>
  </form>
`;

document.body.append(launcher, panel);
const messages = panel.querySelector(".assistant-messages");
const form = panel.querySelector(".assistant-form");
const input = panel.querySelector(".assistant-input");
const send = panel.querySelector(".assistant-send");
const typing = panel.querySelector(".assistant-typing");
const close = panel.querySelector(".assistant-close");
const history = [];
let busy = false;

const projectData = [
  { name: "LicitaRadar", detail: "Buscador regional de editais · em desenvolvimento", url: "https://github.com/eubruno-coder/licitaradar" },
  { name: "Menu Lanchonete", detail: "Protótipo de cardápio digital e pedidos", url: "https://github.com/eubruno-coder/menu_lanchonete" },
  { name: "NCroch’s", detail: "Site para apresentar criações de crochê", url: "https://github.com/eubruno-coder/site_ncrochs" }
];

function fallbackReply(question) {
  const q = question.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  if (/^(oi|ola|bom dia|boa tarde|boa noite|tudo bem)/.test(q)) {
    return "Olá! 👋 Posso ajudar você a conhecer o portfólio. Pergunte sobre projetos, experiência, formação, tecnologias ou formas de contato.";
  }
  if (/(projeto|repositorio|github|portfolio)/.test(q)) {
    return "Separei alguns projetos públicos para você conhecer. Cada um mostra uma frente diferente de desenvolvimento:";
  }
  if (/(experiencia|trabalhou|trabalho|carreira|compass|estagio|devsecops)/.test(q)) {
    return "A trajetória combina experiência em atendimento, operações, relacionamento com clientes e supervisão. Na Compass UOL, Bruno atuou como estagiário em atividades relacionadas a DevSecOps e Cloud AWS, entre setembro de 2024 e fevereiro de 2025. O portfólio apresenta essa passagem como estágio, não como cargo pleno.";
  }
  if (/(formacao|faculdade|pos graduacao|graduacao|curso|estudo)/.test(q)) {
    return "Bruno concluiu Gestão da Tecnologia da Informação pela UNIASSELVI em dezembro de 2025 e está cursando a pós-graduação em Desenvolvimento de Sistemas com Python, também pela UNIASSELVI.";
  }
  if (/(tecnologia|linguagem|ferramenta|cloud|aws|devops|kubernetes|linux|python)/.test(q)) {
    return "Entre as tecnologias e temas listados estão AWS, Kubernetes (EKS), CloudWatch, Linux, Docker, CI/CD, GitHub Actions, Shell Script, IaC e Git. Python, Prometheus e Grafana aparecem como conhecimentos em estudo, não como experiência profissional comprovada.";
  }
  if (/(contato|email|e-mail|linkedin|contrat|falar com)/.test(q)) {
    return "Você pode conhecer os canais profissionais pelos links abaixo:\\nGitHub: https://github.com/eubruno-coder\\nLinkedIn: https://linkedin.com/in/bruno-pereirasilva\\nE-mail: bruno_silvap@outlook.com";
  }
  if (/(quem e|sobre|bruno)/.test(q)) {
    return "Bruno Silva é um profissional em transição e desenvolvimento de carreira na área de tecnologia, com direcionamento para Cloud, DevOps e infraestrutura. O portfólio reúne sua formação, experiência profissional e projetos públicos.";
  }
  return "Não encontrei uma resposta específica para isso ainda. Posso ajudar com projetos, trajetória profissional, formação, tecnologias ou contato. Qual desses assuntos você quer explorar?";
}

function setOpen(open) {
  panel.classList.toggle("is-open", open);
  launcher.setAttribute("aria-expanded", String(open));
  if (open) input.focus();
  else launcher.focus();
}
function addMessage(role, text, showProjects = false) {
  const item = document.createElement("div");
  item.className = `assistant-message ${role}`;
  item.textContent = text;
  messages.append(item);
  if (showProjects) {
    const cards = document.createElement("div");
    cards.className = "assistant-projects";
    projectData.forEach(project => {
      const link = document.createElement("a");
      link.className = "assistant-project-card";
      link.href = project.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      const copy = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = project.name;
      const detail = document.createElement("small");
      detail.textContent = project.detail;
      copy.append(title, detail);
      const arrow = document.createElement("span");
      arrow.className = "assistant-project-arrow";
      arrow.textContent = "↗";
      link.append(copy, arrow);
      cards.append(link);
    });
    messages.append(cards);
  }
  messages.scrollTop = messages.scrollHeight;
}

function streamMessage(text, done) {
  const item = document.createElement('div');
  item.className = 'assistant-message bot';
  messages.append(item);
  let index = 0;
  function step() {
    index = Math.min(index + (text.length > 220 ? 4 : 3), text.length);
    item.textContent = text.slice(0, index);
    messages.scrollTop = messages.scrollHeight;
    if (index < text.length) window.setTimeout(step, 17);
    else done();
  }
  window.setTimeout(step, 160);
}

function addProjectCards() {
  const cards = document.createElement('div');
  cards.className = 'assistant-projects';
  projectData.forEach(project => {
    const link = document.createElement('a');
    link.className = 'assistant-project-card';
    link.href = project.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const copy = document.createElement('span');
    const title = document.createElement('strong');
    title.textContent = project.name;
    const detail = document.createElement('small');
    detail.textContent = project.detail;
    copy.append(title, detail);
    const arrow = document.createElement('span');
    arrow.className = 'assistant-project-arrow';
    arrow.textContent = '↗';
    link.append(copy, arrow);
    cards.append(link);
  });
  messages.append(cards);
  messages.scrollTop = messages.scrollHeight;
}
function showChips(items) {
  const wrap = document.createElement("div");
  wrap.className = "assistant-chips";
  items.forEach(label => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "assistant-chip";
    chip.textContent = label;
    chip.addEventListener("click", () => { input.value = label; form.requestSubmit(); });
    wrap.append(chip);
  });
  messages.append(wrap);
  messages.scrollTop = messages.scrollHeight;
}
const welcome = document.createElement("div");
welcome.className = "assistant-message bot";
welcome.textContent = "Olá! 👋 Eu sou o Assistente do portfólio. Posso ajudar você a explorar os projetos, entender a trajetória e descobrir as tecnologias por trás de cada iniciativa.";
messages.append(welcome);
showChips(["Quais projetos ele tem?", "Conhecer sua trajetória", "Quais tecnologias utiliza?"]);

launcher.addEventListener("click", () => setOpen(!panel.classList.contains("is-open")));
close.addEventListener("click", () => setOpen(false));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && panel.classList.contains("is-open")) setOpen(false);
});

form.addEventListener("submit", async event => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message || busy) return;
  const oldChips = messages.querySelector(".assistant-chips");
  if (oldChips) oldChips.remove();
  addMessage("user", message);
  input.value = "";
  if (!ASSISTANT_ENDPOINT) {
    busy = true;
    send.disabled = true;
    typing.hidden = false;
    const answer = fallbackReply(message);
    const isProjects = /(projet|repositorio|repositório|github|portfolio|portfólio)/i.test(message);
    const thinkingTime = Math.min(1100, 420 + message.length * 9);
    window.setTimeout(() => {
      typing.hidden = true;
      streamMessage(answer, () => {
        if (isProjects) addProjectCards();
        busy = false;
        send.disabled = false;
        showChips(isProjects ? ["Como funciona o LicitaRadar?", "Quais tecnologias aparecem?"] : ["Ver projetos", "Conhecer a trajetória", "Falar com Bruno"]);
        input.focus();
      });
    }, thinkingTime);
    return;
  }
  history.push({ role: "user", content: message });
  if (history.length > 8) history.splice(0, history.length - 8);
  busy = true;
  send.disabled = true;
  typing.hidden = false;
  try {
    const response = await fetch(ASSISTANT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Não foi possível responder agora.");
    const answer = String(data.reply || "").trim();
    if (!answer) throw new Error("A resposta veio vazia. Tente novamente.");
    history.push({ role: "assistant", content: answer });
    if (history.length > 8) history.splice(0, history.length - 8);
    addMessage("bot", answer);
    showChips(["Ver projetos", "Conhecer a trajetória", "Falar com Bruno"]);
  } catch (error) {
    history.pop();
    addMessage("bot", error.message || "Tive um problema de conexão. Tente novamente em instantes.");
  } finally {
    busy = false;
    send.disabled = false;
    typing.hidden = true;
    input.focus();
  }
});
