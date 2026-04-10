const API = "http://localhost:3000";

// Tips
const tips = [
  "Use public transport  (your wallet will thank you 😅)",
  "Eat less meat  (the cows are tired 😂)",
  "Save electricity  (Eskom is watching 👀)"
];

document.getElementById("tips").textContent =
  tips[Math.floor(Math.random() * tips.length)];

// Register
async function register() {
  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  alert(data.message);
}

// Login
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
}
