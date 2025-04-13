
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const API_KEY = "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"; // <-- Ersetze das hier später im Editor mit deinem echten Key

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userText = input.value;
  appendMessage("Du", userText, "user");
  input.value = "";

  appendMessage("Friedrich", "Denke nach...", "bot");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Du bist Friedrich, ein freundlicher AI-Concierge in einer Kunsthalle. Beantworte Fragen zum Gemälde 'Wanderer über dem Nebelmeer' von Caspar David Friedrich in einfacher Sprache." },
        { role: "user", content: userText }
      ]
    })
  });

  const data = await response.json();
  const botReply = data.choices?.[0]?.message?.content || "Fehler bei der Antwort.";
  removeLastBotMessage();
  appendMessage("Friedrich", botReply, "bot");
});

function appendMessage(name, text, cls) {
  const div = document.createElement("div");
  div.classList.add("message", cls);
  div.innerHTML = `<strong>${name}:</strong> ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLastBotMessage() {
  const messages = chatBox.querySelectorAll(".bot");
  if (messages.length) chatBox.removeChild(messages[messages.length - 1]);
}
