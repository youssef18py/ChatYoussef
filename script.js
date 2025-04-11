const chat = document.getElementById("chat");
const sendBtn = document.getElementById("send");
const userInput = document.getElementById("user-input");
const themeBtn = document.getElementById("theme-btn");

const API_KEY = "AIzaSyCB1LBViBCJCOdCaVrIRm-i4Lurn_MqgN8";
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "حدث خطأ في الاستجابة.";
    appendMessage("bot", reply);
  } catch (err) {
    appendMessage("bot", "تعذر الاتصال بالخدمة. تأكد من اتصالك بالإنترنت.");
  }
}

function appendMessage(role, text) {
  const div = document.createElement("div");
  div.className = `message ${role}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") sendMessage();
});

// تبديل الثيم
themeBtn.addEventListener("click", function () {
  if (document.body.classList.contains("light-theme")) {
    document.body.classList.remove("light-theme");
    themeBtn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.add("light-theme");
    themeBtn.textContent = "☀️";
    localStorage.setItem("theme", "light");
  }
});

// تحميل الثيم المحفوظ
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
  themeBtn.textContent = "☀️";
}
