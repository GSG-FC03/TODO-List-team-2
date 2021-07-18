let tasks = [];

// Get all element that we want to make something on it
const themeSwitcher = document.getElementById("checkbox");
const lists = document.getElementById("lists");
const listOfChecked = document.getElementById("listOfChecked");
const updateTaskbtn = document.getElementById("updateTask");
const addLabel = document.getElementById("addLabel");
const enterLabel = document.getElementById("enterLabel");
const plus = document.getElementById("plus");
const inputLabel = document.getElementById("inputLabel");
const save = document.getElementById("save");
const uncheckSection = document.getElementById("uncheckSection");
const checkedSection = document.getElementById("checkedSection");
const uncheck = document.getElementById("uncheck");
const checked = document.getElementById("checked");
const formTask = document.getElementById("formTask");
let getTime = document.getElementById("getTime");
let getDate = document.getElementById("getDate");
let SaveTAndD = document.getElementById("SaveTAndD");
let postDate = document.getElementById("postDate");
let postTime = document.getElementById("postTime");
const addTask = document.getElementById("addTask");
const add = document.getElementById("add");
const close = Array.from(document.querySelectorAll(".closee"));
const model = Array.from(document.querySelectorAll(".bgOfOnBoarding , .addbackground"));
const start = document.getElementById("start");
const name = document.getElementById("name");
const nameInput = document.getElementById("nameInput");

// Show onboarding popup;
if (sessionStorage.getItem("popState") !== "shown") {
  window.addEventListener("load", function () {
    model[0].style.display = "block";
    sessionStorage.setItem("popState", "shown");
  });
}

// Get the name of user
start.addEventListener("click", () => {
  name.textContent = `Hi ${
    nameInput.value === "" ? "Unknown" : nameInput.value
  }`;
  closeTab();
});

// Close the all popup
close[0].addEventListener("click", closeTab);
close[1].addEventListener("click", closeTab);

function closeTab() {
  model[0].style.display = "none";
  model[1].style.display = "none";
}
// Light and dark mode
const themeSwitcher = document.getElementById("checkbox");
themeSwitcher.onclick = function () {
  let dark = Array.from(
    document.querySelectorAll(
      ".list , .label , .borderDark , .select-selected , .lineBelow , .below"
    )
  );
  let listDark = Array.from(document.querySelectorAll(".list"));
  let checkk = Array.from(document.querySelectorAll('input[type="checkbox"]'));
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let switchToTheme;

  switchToTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", switchToTheme);

  dark.forEach((el) => {
    el.classList.toggle("noborder");
  });

  checkk.forEach((el) => {
    el.classList.toggle("noborder");
    if (getComputedStyle(el).border == "0px none rgb(13, 22, 29)")
      el.style.border = "1px solid #e6e6e6";
    else el.style.border = "none";
  });
};

// Add event to addTask button
addTask.addEventListener("click", () => {
  createTask();
  closeTab();
});

// Show addTask page
add.addEventListener("click", () => {
  updateTaskbtn.style.display = "none"
  addTask.style.display = "block";
  showAddTaskPage();
});

function showAddTaskPage() {
  title.value = ""
  desc.value = ''
  model[1].style.display = "block";
}

// Create task and storage it in localStorage 
function createTask() {
  let title = document.getElementById("title");
  let desc = document.getElementById("desc");
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  let label = document.getElementById("label");
  let clr = document.querySelector("input[name=\"color\"]:checked");
  let selectedDate = date.options[date.selectedIndex].text;
  let selectedTime = time.options[time.selectedIndex].text;
  let selectedLabel = label.options[label.selectedIndex].text;

  if (selectedDate == 'Pick a date') {
    selectedDate = getDate.value;
  }
  if (selectedTime == 'Pick a time') {
    selectedTime = getTime.value;
  }

  let task = {
    title: `${title.value}`,
    desc: `${desc.value}`,
    time: `${selectedTime}`,
    date: `${selectedDate}`,
    label: `${selectedLabel}`,
    color: `${clr.value}`
  }

  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  render(lists, tasks);
}