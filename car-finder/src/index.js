// Imports your SCSS stylesheet
import "./styles/index.scss";

// Imports car data
import cars from "./data/cars.json";

// DOM elements
const yearSelect = document.getElementById("year");
const makeSelect = document.getElementById("make");
const modelSelect = document.getElementById("model");
const carDetails = document.getElementById("car-details");

// Populate years
const years = [...new Set(cars.map((car) => car.year))];
years.forEach((year) => {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
});

// Handle year selection
yearSelect.addEventListener("change", () => {
  makeSelect.disabled = false;
  makeSelect.innerHTML =
    '<option value="" disabled selected>Select Make</option>';

  const makes = [
    ...new Set(
      cars
        .filter((car) => car.year === parseInt(yearSelect.value))
        .map((car) => car.make)
    ),
  ];

  makes.forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeSelect.appendChild(option);
  });
});

// Handle make selection
makeSelect.addEventListener("change", () => {
  modelSelect.disabled = false;
  modelSelect.innerHTML =
    '<option value="" disabled selected>Select Model</option>';

  const models = [
    ...new Set(
      cars
        .filter(
          (car) =>
            car.year === parseInt(yearSelect.value) &&
            car.make === makeSelect.value
        )
        .map((car) => car.model)
    ),
  ];

  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });
});

// Handle model selection
modelSelect.addEventListener("change", () => {
  const selectedCar = cars.find(
    (car) =>
      car.year === parseInt(yearSelect.value) &&
      car.make === makeSelect.value &&
      car.model === modelSelect.value
  );

  carDetails.textContent = `Selected Car: ${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`;
  console.log(selectedCar);
});
