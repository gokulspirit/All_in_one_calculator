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
  onst amount = parseFloat(document.getElementById("currency-amount").value);
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

const shapeSelect = document.getElementById("shape");
const inputsDiv = document.getElementById("inputs");
const resultDiv = document.getElementById("result");

// Define input fields needed per shape
const shapeInputs = {
  circle: [{ label: "Radius (r)", id: "r" }],
  triangle: [
    { label: "Side a", id: "a" },
    { label: "Side b", id: "b" },
    { label: "Side c", id: "c" },
    { label: "Base", id: "base" },
    { label: "Height", id: "height" }
  ],
  square: [{ label: "Side", id: "side" }],
  rectangle: [
    { label: "Length", id: "length" },
    { label: "Width", id: "width" }
  ],
  pentagon: [{ label: "Side (regular pentagon)", id: "side" }],
  hexagon: [{ label: "Side (regular hexagon)", id: "side" }],
  octagon: [{ label: "Side (regular octagon)", id: "side" }],
  ellipse: [
    { label: "Semi-major axis (a)", id: "a" },
    { label: "Semi-minor axis (b)", id: "b" }
  ],
  sphere: [{ label: "Radius (r)", id: "r" }],
  cube: [{ label: "Side", id: "side" }],
  cuboid: [
    { label: "Length", id: "length" },
    { label: "Width", id: "width" },
    { label: "Height", id: "height" }
  ],
  cylinder: [
    { label: "Radius (r)", id: "r" },
    { label: "Height (h)", id: "h" }
  ],
  cone: [
    { label: "Radius (r)", id: "r" },
    { label: "Height (h)", id: "h" },
    { label: "Slant height (l)", id: "l" }
  ],
  pyramid: [
    { label: "Base side", id: "baseSide" },
    { label: "Slant height", id: "slantHeight" },
    { label: "Height", id: "height" }
  ],
};

function renderInputs() {
  const shape = shapeSelect.value;
  inputsDiv.innerHTML = "";
  resultDiv.innerHTML = "";

  if (!shape || !shapeInputs[shape]) return;

  shapeInputs[shape].forEach(({ label, id }) => {
    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", id);
    labelEl.textContent = label;

    const inputEl = document.createElement("input");
    inputEl.type = "number";
    inputEl.min = "0";
    inputEl.id = id;
    inputEl.placeholder = `Enter ${label.toLowerCase()}`;
    inputEl.required = true;

    inputsDiv.appendChild(labelEl);
    inputsDiv.appendChild(inputEl);
  });
}

function calculate() {
  const shape = shapeSelect.value;
  resultDiv.innerHTML = "";

  if (!shape) {
    resultDiv.textContent = "Please select a shape.";
    return;
  }

  const values = {};
  for (const { id } of shapeInputs[shape]) {
    const input = document.getElementById(id);
    if (!input || input.value === "" || Number(input.value) <= 0) {
      resultDiv.textContent = `Please enter valid positive number for ${id}.`;
      return;
    }
    values[id] = parseFloat(input.value);
  }

  let resText = "";

  const π = Math.PI;

  switch (shape) {
    case "circle": {
      const r = values.r;
      const area = π * r * r;
      const circumference = 2 * π * r;
      resText = `Area: ${area.toFixed(2)}\nCircumference: ${circumference.toFixed(2)}`;
      break;
    }
    case "triangle": {
      const { a, b, c, base, height } = values;
      const areaBaseHeight = 0.5 * base * height;
      const s = (a + b + c) / 2;
      let areaHeron;
      if (a + b > c && b + c > a && a + c > b) {
        areaHeron = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      } else {
        areaHeron = NaN;
      }
      resText = `Area (base & height): ${areaBaseHeight.toFixed(2)}\n`;
      resText += isNaN(areaHeron) ? "Invalid triangle sides for Heron's formula." : `Area (Heron's formula): ${areaHeron.toFixed(2)}`;
      break;
    }
    case "square": {
      const side = values.side;
      const area = side * side;
      const perimeter = 4 * side;
      resText = `Area: ${area.toFixed(2)}\nPerimeter: ${perimeter.toFixed(2)}`;
      break;
    }
    case "rectangle": {
      const { length, width } = values;
      const area = length * width;
      const perimeter = 2 * (length + width);
      resText = `Area: ${area.toFixed(2)}\nPerimeter: ${perimeter.toFixed(2)}`;
      break;
    }
    case "pentagon": {
      const side = values.side;
      const area = (5 / 4) * side * side * (1 / Math.tan(π / 5));
      const perimeter = 5 * side;
      resText = `Area: ${area.toFixed(2)}\nPerimeter: ${perimeter.toFixed(2)}`;
      break;
    }
    case "hexagon": {
      const side = values.side;
      const area = (3 * Math.sqrt(3) / 2) * side * side;
      const perimeter = 6 * side;
      resText = `Area: ${area.toFixed(2)}\nPerimeter: ${perimeter.toFixed(2)}`;
      break;
    }
    case "octagon": {
      const side = values.side;
      const area = 2 * (1 + Math.sqrt(2)) * side * side;
      const perimeter = 8 * side;
      resText = `Area: ${area.toFixed(2)}\nPerimeter: ${perimeter.toFixed(2)}`;
      break;
    }
    case "ellipse": {
      const { a, b } = values;
      const area = π * a * b;
      const perimeter = π * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      resText = `Area: ${area.toFixed(2)}\nPerimeter (approx.): ${perimeter.toFixed(2)}`;
      break;
    }
    case "sphere": {
      const r = values.r;
      const surfaceArea = 4 * π * r * r;
      const volume = (4 / 3) * π * r * r * r;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    case "cube": {
      const side = values.side;
      const surfaceArea = 6 * side * side;
      const volume = side * side * side;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    case "cuboid": {
      const { length, width, height } = values;
      const surfaceArea = 2 * (length * width + length * height + width * height);
      const volume = length * width * height;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    case "cylinder": {
      const { r, h } = values;
      const surfaceArea = 2 * π * r * (r + h);
      const volume = π * r * r * h;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    case "cone": {
      const { r, h, l } = values;
      const surfaceArea = π * r * (r + l);
      const volume = (1 / 3) * π * r * r * h;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    case "pyramid": {
      const { baseSide, slantHeight, height } = values;
      const baseArea = baseSide * baseSide;
      const perimeter = 4 * baseSide;
      const surfaceArea = baseArea + 0.5 * perimeter * slantHeight;
      const volume = (1 / 3) * baseArea * height;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    default:
      resText = "Calculation not available.";
  }

  resultDiv.textContent = resText;
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
