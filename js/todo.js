const LS_DATE = "date";
const LS_TODO = "todos";
window.TASKID = 0;

var date = new Date();
var notyf = new Notyf({
    duration: 3500,
    dismissible: true,
    ripple: true,
    position: {
        x: 'center',
        y: 'top',
    }
});

function initLocalStorage() {
    // So initialize it with an empty todo and the current day
    localStorage.setItem(LS_DATE, date.getDate().toString());
    localStorage.setItem(LS_TODO, JSON.stringify([]));
}

// Get item from the local storage
function getLsItem(item) {
    var lsItem = JSON.parse(localStorage.getItem(item));
    return lsItem ? lsItem : []
}

// Set item in the local storage
function setLsItem(item, value) {
    return localStorage.setItem(item, JSON.stringify(value));
}

// Create a new task in the DOM and in the local storage 
function createNewTask(tskText, tskChecked = false, isNewTask = true) {
    ++window.TASKID
    // Create the parent li 
    var li = document.createElement("li");
    var t = document.createTextNode(tskText);
    li.appendChild(t);

    // Create the close span
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    // Append the click event to hide the checked task
    span.addEventListener("click", function (e) {
        var prntLi = this.parentElement;
        var items = getLsItem(LS_TODO).filter(o => o && o.id != prntLi.getAttribute("data-id"));
        setLsItem(LS_TODO, items);
        prntLi.remove();
    })
    li.appendChild(span);
    li.setAttribute("data-id", window.TASKID);
    if (tskChecked) {
        li.classList.add("checked");
    }

    document.getElementById("TdList").appendChild(li);

    if (!isNewTask) {
        return
    }

    var itemsTd = getLsItem(LS_TODO);
    itemsTd.push({
        "id": window.TASKID,
        "checked": tskChecked,
        "text": tskText,
    });
    setLsItem(LS_TODO, itemsTd);
}

// Check if the local storage is empty
// Check if we are passed the past day
if (localStorage.length == 0 || localStorage.getItem(LS_DATE) != date.getDate()) {
    initLocalStorage()
}

var savedItems = JSON.parse(localStorage.getItem(LS_TODO));
savedItems = !savedItems ? [] : savedItems;

window.addEventListener("load", function () {
    // Add the existing elemts to the todos
    var itemsTd = getLsItem(LS_TODO);
    itemsTd.forEach(item => {
        item && createNewTask(item.text, item.checked, false);
    });
});

// Create a new list item and Add it to the local storage
var addbtn = document.getElementById("add");
addbtn.addEventListener("click", function () {
    notyf.dismissAll();
    var titre = document.getElementById("titre");
    if (!titre.value) {
        notyf.error('Please fill up the title!');
        titre.classList.add("missed-value");
    } else {
        var inputValue = titre.value.trim();
        createNewTask(inputValue);
        titre.value = "";
        titre.classList.remove("missed-value");
        notyf.success('Task added successfully!');
    }
});

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('.todo-box ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        var items = getLsItem(LS_TODO);
        items.map(o => {
            if (o && o.id == ev.target.getAttribute("data-id")) {
                return o.checked = ev.target.classList.contains("checked")
            }
        });
        setLsItem(LS_TODO, items);
    }
}, false);