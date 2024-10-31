// Toggle Unit Inputs
document.getElementById("us-unit").onclick = function() {
  document.getElementById("us-inputs").classList.remove("d-none");
  document.getElementById("metric-inputs").classList.add("d-none");
};
document.getElementById("metric-unit").onclick = function() {
  document.getElementById("metric-inputs").classList.remove("d-none");
  document.getElementById("us-inputs").classList.add("d-none");
};

// Calculate BMI and Display Health Status
function calculateBMI() {
  const isMetric = document.getElementById("metric-unit").checked;
  let height, weight, bmi;

  if (isMetric) {
    const heightCm = parseFloat(document.getElementById("height-cm").value);
    const weightKg = parseFloat(document.getElementById("weight-kg").value);
    height = heightCm / 100; // Convert height to meters
    weight = weightKg;
  } else {
    const heightFeet = parseFloat(document.getElementById("height-feet").value);
    const heightInches = parseFloat(document.getElementById("height-inches").value) || 0;
    const weightLbs = parseFloat(document.getElementById("weight-lbs").value);
    height = ((heightFeet * 12) + heightInches) * 0.0254; // Convert height to meters
    weight = weightLbs * 0.453592; // Convert weight to kg
  }

  bmi = weight / (height * height);
  document.getElementById("bmi-result").innerText = "BMI: " + bmi.toFixed(1);
  
  // Display health status based on BMI
  let healthMessage = "";
  if (bmi < 18.5) {
    healthMessage = "Your health status is: Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    healthMessage = "Your health status is: Normal";
  } else if (bmi >= 25 && bmi <= 29.9) {
    healthMessage = "Your health status is: Overweight";
  } else {
    healthMessage = "Your health status is: Obesity";
  }
  document.getElementById("health-status").innerText = healthMessage;

  updateChart(bmi);
}

// Clear Inputs and Reset Chart
function clearInputs() {
  document.querySelectorAll("input").forEach(input => input.value = '');
  document.getElementById("bmi-result").innerText = "BMI: ?";
  document.getElementById("health-status").innerText = "";
  if (bmiChart) bmiChart.destroy(); // Destroy previous chart
}

// Update Chart
let bmiChart;
function updateChart(bmi) {
  const ctx = document.getElementById("bmiChart").getContext("2d");
  
  // Destroy existing chart if it exists
  if (bmiChart) bmiChart.destroy();
  
  bmiChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Underweight", "Normal", "Overweight", "Obesity"],
      datasets: [{
        data: [
          bmi < 18.5 ? bmi : 18.5,
          bmi >= 18.5 && bmi <= 24.9 ? bmi : 24.9,
          bmi >= 25 && bmi <= 29.9 ? bmi : 29.9,
          bmi >= 30 ? bmi : 30
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c"],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { position: "top" }
    }
  });
}
