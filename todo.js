let tasks = [];
let tasksChecked = [];
let itemLabels = [];

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
let recentAndReverse = document.getElementById("recentAndReverse");
let filter = document.getElementById("filter");

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
// open the input to write new label
addLabel.addEventListener("click", openAndCloseAddLabel)

function openAndCloseAddLabel() {
  plus.classList.toggle("plus");
  enterLabel.classList.toggle("block");
  inputLabel.focus();
  inputLabel.value = ''
}

// Get the label that created by the user and put it in select label
let labelsData = localStorage.getItem('itemLabels');
itemLabels = JSON.parse(labelsData)
save.addEventListener("click", () => {
  let valueOfLabel = inputLabel.value;
  let label = document.getElementById("label");
  let opt = document.createElement('option');
  opt.appendChild(document.createTextNode(valueOfLabel));
  opt.value = valueOfLabel;
  label.appendChild(opt);
  itemLabels.push(valueOfLabel)
  localStorage.setItem('itemLabels', JSON.stringify(itemLabels))
  openAndCloseAddLabel();
})

// Light and dark mode
themeSwitcher.onclick = function () {
  let dark = Array.from(
    document.querySelectorAll(
      ".list , .label , .borderDark , .select-selected , .lineBelow , .below"
    )
  );
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
  let selectedDate = date.options[date.selectedIndex].value;
  let selectedTime = time.options[time.selectedIndex].value;
  let selectedLabel = label.options[label.selectedIndex].text;

  if (selectedDate == 'Pick a date') {
    selectedDate = formatDate(getDate);
  }
  if (selectedTime == 'Pick a time') {
    selectedTime = formatTime(getTime);
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
// Format Date
function formatDate(dateFormat) {
  let d = new Date(dateFormat.value),
    mo = new Intl.DateTimeFormat("en", {
      month: "short",
    }).format(d),
    da = new Intl.DateTimeFormat("en", {
      day: "2-digit",
    }).format(d);
  getDateFormat = `${da}-${mo}`;
  return getDateFormat;
}
// Format Time
function formatTime(timeFormat) {
  let timeformat = timeFormat.value.split(":"),
    hours = timeformat[0],
    minutes = timeformat[1],
    ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

if (localStorage.getItem('itemLabels') === null) {
  itemLabels = [];
} else {
  itemLabels = JSON.parse(localStorage.getItem('itemLabels'));
}
label = document.getElementById("label");
itemLabels.forEach(el => {
  let opt = document.createElement('option');
  opt.appendChild(document.createTextNode(el));
  label.appendChild(opt);
})

// Put all the tasks in lists DOM
function render(typeOflist, typeOfArray) {
  postTandD.style.display = "none"
  removeTasks()
  let index = 0;
  let order = 0;

  typeOfArray.forEach(t => {
    let list = document.createElement("li");
    list.className = 'list';
    list.setAttribute('data-index', order++);
    list.style.backgroundColor = `${t.color}`;
    let nameAndTrash = document.createElement("div");
    nameAndTrash.className = 'nameAndTrash';

    let desc = document.createElement("p");
    desc.setAttribute('onclick', "updateTask(this)");
    desc.className = 'desc';
    desc.appendChild(document.createTextNode(`${t.desc}`));

    let labelsAndCheck = document.createElement("div");
    labelsAndCheck.className = 'labelsAndCheck';

    let nameOfTask = document.createElement("h1");
    nameOfTask.className = 'nameOfTask';
    nameOfTask.appendChild(document.createTextNode(`${t.title}`));

    let trash = document.createElement("img");
    trash.className = 'trash';
    trash.setAttribute("src", "assets‏/trash.svg");
    trash.setAttribute('data-index', index++);
    trash.addEventListener('click', deleteTask);

    nameAndTrash.appendChild(nameOfTask);
    nameAndTrash.appendChild(trash);

    let labels = document.createElement("div");
    labels.className = 'labels';

    let checkbox = document.createElement("input");
    checkbox.className = 'checkbox';
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener('click', moveCheckedTask)
    if (typeOflist.getAttribute("id") == "listOfChecked") {
      checkbox.setAttribute("checked", "")
      checkbox.style.pointerEvents = "none"
    }

    labelsAndCheck.appendChild(labels);
    labelsAndCheck.appendChild(checkbox);

    let timeAndDate = document.createElement("div");
    timeAndDate.className = 'label';

    let wordLabel = document.createElement("div");
    wordLabel.className = 'label';

    labels.appendChild(timeAndDate);
    labels.appendChild(wordLabel);

    let alarm = document.createElement("img");
    alarm.className = 'alarm';
    alarm.setAttribute("src", "assets‏/alarmclock.svg");

    let dataAndTime = document.createElement("span");
    dataAndTime.className = 'dataAndTime';
    dataAndTime.className = 'word';
    dataAndTime.appendChild(document.createTextNode(`${t.date}` + ', ' + `${t.time}`));

    timeAndDate.appendChild(alarm);
    timeAndDate.appendChild(dataAndTime);

    let labelSpan = document.createElement("span");
    labelSpan.className = 'labelSpan';
    labelSpan.className = 'word';
    labelSpan.appendChild(document.createTextNode(`${t.label}`));
    wordLabel.appendChild(labelSpan);

    list.appendChild(nameAndTrash);
    list.appendChild(desc);
    list.appendChild(labelsAndCheck);

    typeOflist.insertBefore(list, typeOflist.childNodes[0]);
  });

  let dark = Array.from(document.querySelectorAll(".list , .label , .borderDark , input[checkbox] , .lineBelow , .below"));
  let currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    dark.forEach(el => {
      if (!el.classList.contains("noborder"))
        el.classList.add("noborder");
    })
  }

  if (Array.isArray(typeOfArray) && typeOfArray.length) {} else {
    createNoTasks()
  }
}

// Remove All Tasks From Lists
function removeTasks() {
  let child = lists.lastElementChild;
  let childs = listOfChecked.lastElementChild;
  while (child) {
    lists.removeChild(child);
    child = lists.lastElementChild;
  }
  while (childs) {
    listOfChecked.removeChild(childs);
    childs = listOfChecked.lastElementChild;
  }
}

// LoadTasks from localStorge
function loadTasks() {
  let taskData = localStorage.getItem("tasks");
  tasks = JSON.parse(taskData);
  if (!(Array.isArray(tasks) && tasks.length)) {
    tasks = [];
    return;
  }
  render(lists, tasks);
}
window.onload = loadTasks;

// Delete Task from localStorge
function deleteTask(e) {
  let index = this.dataset.index;
  let tyList = this.parentElement.parentElement.parentElement;
  this.parentElement.parentElement.style.animation = "delete 0.5s";
  if (tyList.getAttribute("id") == "lists") {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTimeout(() => {
        render(lists, tasks);
    }, 400);
  }
  if (tyList.getAttribute("id") == "listOfChecked") {
    tasksChecked.splice(index, 1);
    localStorage.setItem("tasksChecked", JSON.stringify(tasksChecked));
    setTimeout(() => {
        render(listOfChecked, tasksChecked);
    }, 400);
  }
}

// Show Update Task
let ObjTask;

function updateTask(ele) {
  "use strict"
  postTandD.style.display = "none"
  addTask.style.display = "none";
  updateTaskbtn.style.display = "block"
  ele = ele.parentElement;
  showAddTaskPage()
  let order = ele.dataset.index;

  ObjTask = tasks[order];
  let titleObj = ObjTask.title;
  let descObj = ObjTask.desc;
  let dateObj = ObjTask.date;
  let timeObj = ObjTask.time;
  let labelObj = ObjTask.label;
  let colorObj = ObjTask.color;

  if (dateObj == 'None' || dateObj == 'Today' || dateObj == 'Tomorrow') {} else {
    postDate.textContent = dateObj;
    postTandD.style.display = "flex"
  }

  if (timeObj == 'None' || timeObj == 'Morning' || timeObj == "Afternoon" || timeObj == 'Evening' || timeObj == 'Night') {} else {
    postTime.textContent = timeObj;
    postTandD.style.display = "flex"
  }

  let title = document.getElementById("title");
  let desc = document.getElementById("desc");
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  let label = document.getElementById("label");

  title.value = titleObj;
  desc.value = descObj;
  let dateOptions = Array.from(date.options);
  let timeOptions = Array.from(time.options);
  let labelOptions = Array.from(label.options);
  let clr = document.querySelectorAll("input[name=\"color\"]");

  dateOptions.forEach(opt => {
    opt.removeAttribute("selected");
    if (opt.value == `${dateObj}`) {
      opt.setAttribute("selected", "");
    }
  })

  timeOptions.forEach(opt => {
    opt.removeAttribute("selected");
    if (opt.value == `${timeObj}`) {
      opt.setAttribute("selected", "");
    }
  })

  labelOptions.forEach(opt => {
    opt.removeAttribute("selected");
    if (opt.value == `${labelObj}`) {
      opt.setAttribute("selected", "");
    }
  })

  clr.forEach(opt => {
    opt.removeAttribute("checked")
    if (opt.value == `${colorObj}`) {
      opt.setAttribute("checked", "");
    }
  })
}

// Update Task button(Edit Task)
updateTaskbtn.addEventListener('click', () => {
  if (updateChanges(ObjTask)) {
    closeTab();
  } else {
    console.log(ObjTask.desc)
    console.log(desc.value)
    ObjTask.title = title.value;
    ObjTask.desc = desc.value;
    ObjTask.date = date.options[date.selectedIndex].text;
    ObjTask.time = time.options[time.selectedIndex].text;
    ObjTask.label = label.options[label.selectedIndex].text;
    ObjTask.color = document.querySelector("input[name=\"color\"]:checked").value;
    localStorage.setItem('tasks', JSON.stringify(tasks))
    render(lists, tasks);
    closeTab();
  }
})

// Update changes on object task
function updateChanges(ObjTask) {
  if (ObjTask.title == title.value && ObjTask.desc == desc.value && date.options[date.selectedIndex].text == ObjTask.date &&
    time.options[time.selectedIndex].text == ObjTask.time && label.options[label.selectedIndex].text == ObjTask.label &&
    document.querySelector("input[name=\"color\"]:checked").value == ObjTask.color) {
    return true
  } else {
    return false
  }
}
// Add event on buttons (todo, done)
checked.addEventListener('click', getCheckedTasks)
uncheck.addEventListener('click', getUncheckedTasks)

function moveCheckedTask(e) {
  let index = this.parentElement.parentElement.dataset.index;
  let itemList = tasks[index];
  let listChildren = Array.from(lists.children);

  listChildren.forEach(el => {
    if (el.getAttribute("data-index") == index)
      el.classList.add("move");
  })

  setTimeout(() => {
    tasksChecked.push(itemList)
    tasks.pop(itemList)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("tasksChecked", JSON.stringify(tasksChecked));
    render(lists, tasks);
  }, 400)
}

// Get checked Tasks from localStorage
function getCheckedTasks() {
  checked.classList.add("wordActive")
  uncheck.classList.remove("wordActive")
  uncheckSection.style.display = "none"
  checkedSection.style.display = "block"
  let taskData = localStorage.getItem("tasksChecked");
  tasksChecked = JSON.parse(taskData);
  if (!(Array.isArray(tasksChecked) && tasksChecked.length)) {
    tasksChecked = [];
    return;
  }
  render(listOfChecked, tasksChecked);
}

// Get Unchecked Tasks from localStorage
function getUncheckedTasks() {
  checked.classList.remove("wordActive")
  uncheck.classList.add("wordActive")
  checkedSection.style.display = "none"
  uncheckSection.style.display = "block"
  let taskData = localStorage.getItem("tasks");
  tasks = JSON.parse(taskData);
  if (!(Array.isArray(tasks) && tasks.length)) {
    tasks = [];
    return;
  }
  render(lists, tasks);
}

// Sort data
recentAndReverse.addEventListener("click", e => {
  if (e.target.textContent == "Reverse") {
    let reverseTasks = tasks.reverse();
    render(lists, reverseTasks);
  } else {
    let reverseTasks = tasks.reverse();
    render(lists, reverseTasks);
  }
});

// Filter data
filter.addEventListener("click", e => {
  switch (e.target.textContent) {
    case "Today":
      let filteredTask = tasks.filter(el => el.date === "Today")
      render(lists, filteredTask);
      break;
    case "Tomorrow":
      let filteredTom = tasks.filter(el => el.date === "Tomorrow")
      render(lists, filteredTom);
      break;
    case "Doing":
      let filteredDoing = tasks.filter(el => el.label === "Doing")
      render(lists, filteredDoing);
      break;
    case "Morning":
      let filteredMorning = tasks.filter(el => el.time === "Morning")
      render(lists, filteredMorning);
      break;
    case "Afternoon":
      let filteredAfternoon = tasks.filter(el => el.time === "Afternoon")
      render(lists, filteredAfternoon);
      break;
    case "Evening":
      let filteredEvening = tasks.filter(el => el.time === "Evening")
      render(lists, filteredEvening);
      break;
    case "Night":
      let filteredNight = tasks.filter(el => el.time === "Night")
      render(lists, filteredNight);
      break;
    default:
      render(lists, tasks);
  }
});

// For input certain date or time in add task page
date.addEventListener("change", () => {
  if (date.options[date.selectedIndex].value == "Pick a date") {
    getDate.style.display = "block";
    SaveTAndD.style.display = "flex";
  }
});

time.addEventListener("change", () => {
  if (time.options[time.selectedIndex].value == "Pick a time") {
    getTime.style.display = "block";
    SaveTAndD.style.display = "flex";
  }
});

SaveTAndD.addEventListener("click", () => {
  if (date.options[date.selectedIndex].value == "Pick a date") {
    getDate.style.display = "none";
    SaveTAndD.style.display = "none";
    postDate.textContent = formatDate(getDate);
    let postTandD = document.getElementById("postTandD");
    postTandD.style.display = "flex";
  }
  if (time.options[time.selectedIndex].value == "Pick a time") {
    getTime.style.display = "none";
    SaveTAndD.style.display = "none";
    postTime.textContent = formatTime(getTime);
    postTandD.style.display = "flex";
  }
});


// Custom select
var x, i, j, l, ll, selectElement, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selectElement = x[i].getElementsByTagName("select")[0];
  ll = selectElement.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
        create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selectElement.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
            and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
    except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
//edit the content of task
document.addEventListener("click", closeAllSelect);


// Create text after delete all tasks
function createNoTasks() {
  let name = document.createElement("li");
  name.setAttribute("id", "noTask");
  let msg = document.createTextNode(
    "No Tasks To Show, Add a new task to get things in order"
  );
  name.appendChild(msg);
  name.className = "no-tasks-message";
  lists.appendChild(name);
}