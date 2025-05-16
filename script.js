let basicInput = "";

function press(value) {
  basicInput += value;
  document.getElementById("basic-display").value = basicInput;
}

function calculate() {
  try {
    basicInput = eval(basicInput).toString();
    document.getElementById("basic-display").value = basicInput;
  } catch (e) {
    document.getElementById("basic-display").value = "Error";
    basicInput = "";
  }
}

function clearDisplay() {
  basicInput = "";
  document.getElementById("basic-display").value = "";
}

function switchTab(id) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

let scientificInput = "";

function sciPress(value) {
  scientificInput += value;
  document.getElementById("scientific-display").value = scientificInput;
}

function calculateScientific() {
  try {
    // Automatically close any unclosed brackets
    let open = (scientificInput.match(//g) || []).length;
    let close = (scientificInput.match(//g) || []).length;
    scientificInput += ")".repeat(open - close);

    scientificInput = eval(scientificInput).toString();
    document.getElementById("scientific-display").value = scientificInput;
  } catch (e) {
    document.getElementById("scientific-display").value = "Error";
    scientificInput = "";
  }
}

function clearScientific() {
  scientificInput = "";
  document.getElementById("scientific-display").value = "";
}

const units = {
  length: ["meter", "kilometer", "mile", "inch", "foot"],
  weight: ["gram", "kilogram", "pound", "ounce"],
  temperature: ["celsius", "fahrenheit", "kelvin"]
};

const conversionFactors = {
  length: {
    meter: 1,
    kilometer: 0.001,
    mile: 0.000621371,
    inch: 39.3701,
    foot: 3.28084
  },
  weight: {
    gram: 1,
    kilogram: 0.001,
    pound: 0.00220462,
    ounce: 0.035274
  }
};

function renderUnitOptions() {
  const type = document.getElementById("unit-type").value;
  const fromSelect = document.getElementById("from-unit");
  const toSelect = document.getElementById("to-unit");

  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  units[type].forEach(unit => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = unit;
    option1.text = option2.text = unit;
    fromSelect.appendChild(option1);
    toSelect.appendChild(option2);
  });
}

function convertUnit() {
  const type = document.getElementById("unit-type").value;
  const from = document.getElementById("from-unit").value;
  const to = document.getElementById("to-unit").value;
  const value = parseFloat(document.getElementById("unit-input").value);

  let result;

  if (type === "temperature") {
    result = convertTemperature(value, from, to);
  } else {
    const base = value / conversionFactors[type][from];
    result = base * conversionFactors[type][to];
  }

  document.getElementById("unit-result").innerText = `Result: ${result.toFixed(4)} ${to}`;
}

function convertTemperature(value, from, to) {
  if (from === to) return value;

  let celsius;

  if (from === "fahrenheit") celsius = (value - 32) * (5 / 9);
  else if (from === "kelvin") celsius = value - 273.15;
  else celsius = value;

  if (to === "fahrenheit") return celsius * (9 / 5) + 32;
  if (to === "kelvin") return celsius + 273.15;
  return celsius;
}

// Call this once on page load to populate initial options
renderUnitOptions();

function renderFinanceForm() {
  const tool = document.getElementById("finance-tool").value;
  const form = document.getElementById("finance-form");
  form.innerHTML = "";
  document.getElementById("finance-result").innerText = "";

  let html = "";
  if (tool === "emi") {
    html = `
      <input id="loan" type="number" placeholder="Loan Amount" />
      <input id="rate" type="number" placeholder="Annual Interest Rate (%)" />
      <input id="tenure" type="number" placeholder="Tenure (months)" />
      <button onclick="calculateEMI()">Calculate EMI</button>
    `;
  } else if (tool === "discount") {
    html = `
      <input id="original" type="number" placeholder="Original Price" />
      <input id="discount" type="number" placeholder="Discount (%)" />
      <button onclick="calculateDiscount()">Calculate</button>
    `;
  } else if (tool === "gst") {
    html = `
      <input id="amount" type="number" placeholder="Base Amount" />
      <input id="gst" type="number" placeholder="GST Rate (%)" />
      <button onclick="calculateGST()">Calculate</button>
    `;
  } else if (tool === "interest") {
    html = `
      <input id="principal" type="number" placeholder="Principal Amount" />
      <input id="rate" type="number" placeholder="Rate (%)" />
      <input id="time" type="number" placeholder="Time (years)" />
      <button onclick="calculateInterest()">Calculate</button>
    `;
  }

  form.innerHTML = html;
}

function calculateEMI() {
  const P = parseFloat(document.getElementById("loan").value);
  const R = parseFloat(document.getElementById("rate").value) / 12 / 100;
  const N = parseInt(document.getElementById("tenure").value);

  const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  document.getElementById("finance-result").innerText = `Monthly EMI: ₹${emi.toFixed(2)}`;
}

function calculateDiscount() {
  const original = parseFloat(document.getElementById("original").value);
  const discount = parseFloat(document.getElementById("discount").value);
  const final = original - (original * discount) / 100;
  document.getElementById("finance-result").innerText = `Discounted Price: ₹${final.toFixed(2)}`;
}

function calculateGST() {
  const amount = parseFloat(document.getElementById("amount").value);
  const gst = parseFloat(document.getElementById("gst").value);
  const total = amount + (amount * gst) / 100;
  document.getElementById("finance-result").innerText = `Total with GST: ₹${total.toFixed(2)}`;
}

function calculateInterest() {
  const P = parseFloat(document.getElementById("principal").value);
  const R = parseFloat(document.getElementById("rate").value);
  const T = parseFloat(document.getElementById("time").value);
  const interest = (P * R * T) / 100;
  document.getElementById("finance-result").innerText = `Simple Interest: ₹${interest.toFixed(2)}`;
}

// Initialize default finance tool
renderFinanceForm();

function calculateAge() {
  const dob = new Date(document.getElementById("dob").value);
  const today = new Date();

  if (isNaN(dob.getTime())) {
    document.getElementById("age-result").innerText = "Please select a valid date of birth.";
    return;
  }

  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  document.getElementById("age-result").innerText = `You are ${age} years old.`;
}

function calculateDateDifference() {
  const date1 = new Date(document.getElementById("date1").value);
  const date2 = new Date(document.getElementById("date2").value);

  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    document.getElementById("date-diff-result").innerText = "Please select both dates.";
    return;
  }

  const diff = Math.abs(date2 - date1);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("date-diff-result").innerText = `Difference: ${days} day(s).`;
}

function calculateBMI() {
  const weight = parseFloat(document.getElementById("bmi-weight").value);
  const height = parseFloat(document.getElementById("bmi-height").value) / 100;

  if (!weight || !height) {
    document.getElementById("bmi-result").innerText = "Please enter valid weight and height.";
    return;
  }

  const bmi = weight / (height * height);
  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 24.9) category = "Normal weight";
  else if (bmi < 29.9) category = "Overweight";
  else category = "Obese";

  document.getElementById("bmi-result").innerText = `Your BMI is ${bmi.toFixed(2)} (${category}).`;
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("currency-amount").value);
  const from = document.getElementById("currency-from").value;
  const to = document.getElementById("currency-to").value;

  if (!amount || amount <= 0) {
    document.getElementById("currency-result").innerText = "Enter a valid amount.";
    return;
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = amount * rate;

    document.getElementById("currency-result").innerText =
      `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (err) {
    document.getElementById("currency-result").innerText =
      "Error fetching currency data.";
  }
}

/* Container styling */
#geometry-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

/* Label */
label[for="shape"] {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
}

/* Dropdown */
#shape {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  font-size: 16px;
}

/* Input fields dynamically added */
#inputs input {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 15px;
}

/* Button */
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Result display */
.result {
  margin-top: 15px;
  padding: 10px;
  background-color: #e6ffe6;
  border: 1px solid #aaffaa;
  border-radius: 6px;
  font-weight: bold;
  color: #2d702d;
}


function toggleTheme() {
  const body = document.body;
  const checkbox = document.getElementById("theme-toggle");

  if (checkbox.checked) {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }
}

// Load theme on page load
window.onload = () => {
  const avedTheme = localStorage.getItem("theme");
  const checkbox = document.getElementById("theme-toggle");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    checkbox.checked = true;
  }
};

function toggleTheme() {
  const body = document.body;
  const checkbox = document.getElementById("theme-toggle");

  if (checkbox.checked) {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  }
}

// Save calculation to history
function saveToHistory(calculation) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(calculation);
  if (history.length > 20) history.pop(); // limit to last 20 entries
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

// Display history on page
function renderHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.style.cursor = "pointer";
    li.onclick = () => reuseCalculation(item);
    historyList.appendChild(li);
  });
}

// Clear history
function clearHistory() {
  localStorage.removeItem("calcHistory");
  renderHistory();
}

// Reuse clicked history calculation
function reuseCalculation(calculation) {
  // For simplicity, put calculation string in basic calculator input
  const basicInput = document.getElementById("basic-input");
  if (basicInput) {
    basicInput.value = calculation;
  }
}

// Initial render on page load
window.onload = () => {
  renderHistory();
  // Also load theme if implemented previously
  const savedTheme = localStorage.getItem("theme");
  const checkbox = document.getElementById("theme-toggle");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (checkbox) checkbox.checked = true;
  }
};

function calculateBasic() {
  try {
    const input = document.getElementById("basic-input");
    const resultDiv = document.getElementById("basic-result");
    const expression = input.value;
    const result = eval(expression);

    if (result === undefined) {
      resultDiv.innerText = "Invalid expression";
      return;
    }

    resultDiv.innerText = result;
    saveToHistory(expression + " = " + result);
  } catch {
    document.getElementById("basic-result").innerText = "Error in expression";
  }
}

saveToHistory("Description: " + result);
