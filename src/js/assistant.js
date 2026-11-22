const ASSISTANT_ENDPOINT = "https://YOUR-WORKER.workers.dev/api/chat";

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
  .assistant-avatar{display:grid;place-items:center;width:38px;height:38px;border-radius:13px;background:linear-gradient(135deg,#713cff,#168bff);color:white;font-size:18px}
  .assistant-head strong{display:block;font:800 14px Manrope,sans-serif}
  .assistant-head small{display:block;margin-top:3px;color:var(--muted,#a7b4cc);font-size:11px}
  .assistant-close{width:34px;height:34px;border:1px solid var(--line,#263451);border-radius:10px;background:transparent;color:inherit;font-size:20px;cursor:pointer}
  .assistant-messages{display:flex;flex:1;flex-direction:column;gap:12px;overflow-y:auto;padding:17px}
  .assistant-message{max-width:88%;padding:11px 13px;border:1px solid var(--line,#263451);border-radius:14px;background:var(--panel-2,#172342);font-size:12px;line-height:1.65;white-space:pre-wrap;overflow-wrap:anywhere}
  .assistant-message.user{align-self:flex-end;border-color:#713cff55;background:linear-gradient(120deg,#713cff2b,#168bff1b)}
  .assistant-message.bot{align-self:flex-start}
  .assistant-message a{color:var(--accent-2,#168bff);text-decoration:underline}
  .assistant-typing{color:var(--muted,#a7b4cc);font-size:11px;padding:0 17px 10px}
  .assistant-form{display:flex;gap:9px;padding:13px;border-top:1px solid var(--line,#263451)}
  .assistant-input{flex:1;min-width:0;resize:none;max-height:100px;padding:11px 12px;border:1px solid var(--line,#263451);border-radius:12px;background:var(--bg,#080d1d);color:var(--text,#f4f7ff);font:12px "DM Sans",sans-serif}
  .assistant-send{width:42px;flex-shrink:0;border:0;border-radius:12px;background:linear-gradient(135deg,#713cff,#168bff);color:white;font-size:18px;cursor:pointer}
  .assistant-send:disabled{opacity:.45;cursor:not-allowed}
  .assistant-disclaimer{padding:0 15px 12px;color:var(--muted,#a7b4cc);font-size:9px;line-height:1.4}
  @media(max-width:600px){.assistant-launcher{right:16px;bottom:16px;padding:12px 15px}.assistant-panel{right:8px;bottom:76px;width:calc(100vw - 16px);height:min(620px,calc(100dvh - 92px));border-radius:17px}}
  @media(prefers-reduced-motion:reduce){.assistant-launcher,.assistant-panel{animation:none;transition:none}}
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
    <div class="assistant-identity"><span class="assistant-avatar" aria-hidden="true">✦</span><span><strong>Assistente</strong><small>Guia do portfólio · online para ajudar</small></span></div>
    <button class="assistant-close" type="button" aria-label="Fechar conversa">×</button>
  </header>
  <div class="assistant-messages" role="log" aria-live="polite" aria-relevant="additions">
    <div class="assistant-message bot">Olá! 👋 Sou o Assistente do portfólio. Posso apresentar os projetos, explicar as tecnologias utilizadas e ajudar você a conhecer a trajetória profissional do Bruno. O que gostaria de saber?</div>
  </div>
  <div class="assistant-typing" hidden>Assistente está pensando…</div>
  <form class="assistant-form">
    <textarea class="assistant-input" rows="1" maxlength="1200" aria-label="Digite sua mensagem" placeholder="Escreva sua pergunta…"></textarea>
    <button class="assistant-send" type="submit" aria-label="Enviar mensagem">➤</button>
  </form>
  <div class="assistant-disclaimer">Respostas geradas por IA com base nas informações públicas do portfólio e dos repositórios selecionados.</div>
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

function setOpen(open) {
  panel.classList.toggle("is-open", open);
  launcher.setAttribute("aria-expanded", String(open));
  if (open) input.focus();
  else launcher.focus();
}
function addMessage(role, text) {
  const item = document.createElement("div");
  item.className = `assistant-message ${role}`;
  item.textContent = text;
  messages.append(item);
  messages.scrollTop = messages.scrollHeight;
}
launcher.addEventListener("click", () => setOpen(!panel.classList.contains("is-open")));
close.addEventListener("click", () => setOpen(false));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && panel.classList.contains("is-open")) setOpen(false);
});

form.addEventListener("submit", async event => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message || busy) return;
  if (ASSISTANT_ENDPOINT.includes("YOUR-WORKER")) {
    addMessage("bot", "O chat já está instalado, mas a API ainda precisa ser configurada. Em breve estarei pronto para conversar!");
    return;
  }
  addMessage("user", message);
  history.push({ role: "user", content: message });
  if (history.length > 8) history.splice(0, history.length - 8);
  input.value = "";
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
