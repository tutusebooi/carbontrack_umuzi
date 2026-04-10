const user = JSON.parse(localStorage.getItem("user"));
let activities = JSON.parse(localStorage.getItem(user.email)) || [];

const list = document.getElementById("list");

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
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;

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
  localStorage.setItem(user.email, JSON.stringify(activities));

  display();
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
  if (highest === "transport") return "Use public transport  😅";
  if (highest === "food") return "Eat less meat  😂";
  if (highest === "energy") return "Save electricity  😭";
}

function drawChart(categories) {
  const ctx = document.getElementById("chart");

  new Chart(ctx, {
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

display();
