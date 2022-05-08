var date = new Date();
var itemsTd = JSON.parse(localStorage.getItem("todos"));

// Check if the local storage is empty
if (localStorage.length == 0) {
    // So initialize it with an empty todo and the current day
    localStorage.setItem("date", date.getDate().toString());
    localStorage.setItem("todos", JSON.stringify(""));
    itemsTd = JSON.parse(localStorage.getItem("todos"));
}

// Check if we are passed the past day
if (localStorage.getItem("date") != date.getDate()) {
    // Then clear it
    localStorage.setItem("todos", JSON.stringify(""));
    localStorage.setItem("date", date.getDate().toString());
}

// Add the existing elemts to the todos
for (var i = 0; i < itemsTd.length; i++) {
    console.log(itemsTd);
    var li = document.createElement("li");
    var inputValue = itemsTd[i];
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById("TdList").appendChild(li);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
}

for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}


var addbtn = document.getElementById("add");

document.addEventListener("load", function () {

});

// Create a new list item and Add it to the local storage
addbtn.addEventListener("click", function () {
    var titre = document.getElementById("titre");
    if (!titre.value) {
        alert("Veuillez entrer un titre");
    } else {
        var li = document.createElement("li");
        var inputValue = document.getElementById("titre").value;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        document.getElementById("TdList").appendChild(li);

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }

        var itemsTd = JSON.parse(localStorage.getItem("todos"));
        itemsTd[itemsTd.length] = titre.value;
        localStorage.setItem("todos", JSON.stringify(itemsTd));
        titre.value = "";
    }
});

// Create a "close" button and append it to each list item
var myNodelist = document.querySelectorAll("#TdList li");
for (var i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
for (var i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.a
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('.todo-box ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);