const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

//onkeyup event
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //getting user input
    if (userEnteredValue.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}


showTasks(); //Now even if i refresh the task doesn't disappear

// when users clicks on add button
addBtn.onclick = () => {
    let userData = inputBox.value; //getting user input
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) {
        listArr = []; //blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transform json string to js obj
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //js obj to json string
    showTasks(); //calling showtask function
}

// By here we are loading user inputs into localstorage

// Now we need to display it on todo list; to add into ul

function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) {
        listArr = []; //blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transform json string to js obj
    }

    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //changing pending no.of tasks in footer

    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span> </li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete the particular index
    //after removing li again update local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}


//delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = [];
    //after deleting all again update local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}