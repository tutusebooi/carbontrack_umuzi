let currentUser = null;
let activities = [];

// REGISTER
async function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;

  await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  alert("Registered! Now login.");
}

// LOGIN
async function login() {
  const email = document.getElementById("logEmail").value;
  const password = document.getElementById("logPass").value;

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.email) {
    currentUser = data.email;
    activities = data.activities || [];

    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "block";

    display();
  } else {
    alert("Login failed");
  }
}

// ADD ACTIVITY
async function addActivity() {
  const name = document.getElementById("activity").value;
  const co2 = parseFloat(document.getElementById("co2").value);

  const activity = { name, co2 };

  const res = await fetch("http://localhost:3000/activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: currentUser,
      activity
    })
  });

  const data = await res.json();
  activities = data.activities;

  display();
}

// DISPLAY
function display() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;

  activities.forEach(a => {
    total += a.co2;
    const li = document.createElement("li");
    li.textContent = `${a.name} - ${a.co2}`;
    list.appendChild(li);
  });

  document.getElementById("total").textContent = total;
}
