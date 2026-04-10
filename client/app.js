const API = "http://localhost:3000";

/* -------------------- TIPS -------------------- */
const tips = [
  "Use public transport (your wallet will thank you 😅)",
  "Eat less meat (the cows are tired 😂)",
  "Save electricity (Eskom is watching 👀)"
];

const tipsElement = document.getElementById("tips");
if (tipsElement) {
  tipsElement.textContent =
    tips[Math.floor(Math.random() * tips.length)];
}

/* -------------------- REGISTER -------------------- */
async function register() {
  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.message || "Registered successfully");
  } catch (error) {
    console.error("Register error:", error);
    alert("Server not responding");
  }
}

/* -------------------- LOGIN (FIXED) -------------------- */
async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    if (!data.user || !data.user.email) {
      alert("Login error: invalid user data from server");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful ✅");

    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("Login error:", error);
    alert("Server error. Make sure backend is running on port 3000");
  }
}
