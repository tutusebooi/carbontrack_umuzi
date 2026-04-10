// Get logged-in user safely
const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.email) {
  alert("User not logged in properly");
  window.location.href = "index.html";
}

// Use safe key
let activities = JSON.parse(localStorage.getItem(`activities_${user.email}`)) || [];

const list = document.getElementById("list");

let chart; // prevent multiple charts

function display() {
  list.innerHTML = "";

  let total = 0;
  let categories = { food: 0, transport: 0, energy: 0 };

  activities.forEach(a => {
    total += a.co2;
    categories[a.category] += a.co2;

    const li = document.createElement("li");
    li.textContent = `${a.name} (${a.category}) - ${a.co2} kg`;
    list.appendChild(li);
  });

  document.getElementById("total").textContent = total;
  document.getElementById("food").textContent = categories.food;
  document.getElementById("transport").textContent = categories.transport;
  document.getElementById("energy").textContent = categories.energy;

  // Weekly
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const weekly = activities
    .filter(a => new Date(a.date) > weekAgo)
    .reduce((sum, a) => sum + a.co2, 0);

  document.getElementById("weekly").textContent = weekly;

  // Insight
  let highest = Object.keys(categories).reduce((a, b) =>
    categories[a] > categories[b] ? a : b
  );

  document.getElementById("insight").textContent =
    `Your highest emissions come from ${highest}`;

  document.getElementById("tip").textContent = getTip(highest);

  drawChart(categories);
}

function addActivity() {
  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value;

  if (!name) {
    alert("Please enter activity name");
    return;
  }

  const co2Values = {
    food: 1.5,
    transport: 2.3,
    energy: 3.0
  };

  const activity = {
    name,
    category,
    co2: co2Values[category],
    date: new Date()
  };

  activities.push(activity);

  // Save correctly
  localStorage.setItem(`activities_${user.email}`, JSON.stringify(activities));

  display();

  document.getElementById("name").value = "";
}

function filterCategory(category) {
  list.innerHTML = "";

  activities
    .filter(a => category === "all" || a.category === category)
    .forEach(a => {
      const li = document.createElement("li");
      li.textContent = `${a.name} (${a.category}) - ${a.co2} kg`;
      list.appendChild(li);
    });
}

function getTip(highest) {
  if (highest === "transport") return "Use public transport 😅 Your car will thank You";
  if (highest === "food") return "Eat less meat 😂 vegetarian is an option";
  if (highest === "energy") return "Save electricity 😭 Eskom will kill You";
}

function drawChart(categories) {
  const ctx = document.getElementById("chart");

  // destroy old chart (IMPORTANT FIX)
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Food", "Transport", "Energy"],
      datasets: [{
        data: [
          categories.food,
          categories.transport,
          categories.energy
        ]
      }]
    }
  });
}

// Load on start
display();
