let activities = JSON.parse(localStorage.getItem("activities")) || [];

function addActivity() {
  const name = document.getElementById("activity").value;
  const co2 = parseFloat(document.getElementById("co2").value);
  const category = document.getElementById("category").value;

  const activity = { name, co2, category };
  activities.push(activity);

  localStorage.setItem("activities", JSON.stringify(activities));
  display();
}

function display() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;

  activities.forEach(a => {
    total += a.co2;
    const li = document.createElement("li");
    li.textContent = `${a.name} - ${a.co2}kg (${a.category})`;
    list.appendChild(li);
  });

  document.getElementById("total").textContent = total;
}

display();
