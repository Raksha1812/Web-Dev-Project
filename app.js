// Firebase Part


console.log(firebase)

const auth = firebase.auth();
const whenSignedIn = document.getElementById('whenSignedIn');
// const whenSignedOut = document.getElementById('whenSignedOut');
const whenSignedOuttwo = document.getElementById('whenSignedOuttwo');
const whenSignedIn2 = document.getElementById('whenSignedIn2');
// const whenSignedIncoup = document.getElementById('container');


const signInBtn = document.getElementById('signInBtn');

const signOutBtn = document.getElementById('signOutBtn');


const container = document.createElement("div")

const provider = new firebase.auth.GoogleAuthProvider();


signInBtn.onclick = () => {
    auth.signInWithPopup(provider);
    userDetails.hidden = '';
}

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedIn2.hidden = false;
        // whenSignedOut.hidden = true;
        whenSignedOuttwo.hidden = true;

        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p> <img style='padding: 20px; border-radius: 50%;' src='${user.photoURL}'>`;
        
        container.classList.add("container")
        document.body.appendChild(container)

        const todos = document.createElement("div")
        todos.classList.add("todo")
        container.appendChild(todos)

        const h1 = document.createElement("h1")
        h1.textContent = "🧠 To do list 📃"
        todos.appendChild(h1)

        const p = document.createElement("p")
        p.textContent = "⛅ What do you want to get done today?"
        todos.appendChild(p)

        const form = document.createElement("form")
        todos.appendChild(form)

        const getValue = document.createElement("div")
        getValue.classList.add("get-value")
        form.appendChild(getValue)

        const input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("placeholder", "👉 Enter task")
        getValue.appendChild(input)

        const description = document.createElement("input")
        description.setAttribute("type", "text")
        description.setAttribute("placeholder", "📃 Description")
        getValue.appendChild(description)

        const printData = document.createElement("div")
        printData.classList.add("print-data")
        form.appendChild(printData)

        const sumTask = document.createElement("span")
        printData.appendChild(sumTask)

        const sumTaskChecked = document.createElement("span")
        printData.appendChild(sumTaskChecked)

        const sumTaskUnchecked = document.createElement("span")
        printData.appendChild(sumTaskUnchecked)

        const br = document.createElement("br")
        form.appendChild(br)

        const button = document.createElement("button")
        button.setAttribute("id", "button")
        button.textContent = "Submit"
        form.appendChild(button)

        const listTodo = document.createElement("div")
        listTodo.classList.add("list-todo")
        container.appendChild(listTodo)

        const todo = document.createElement("ul")
        todo.setAttribute("id", "todo")
        listTodo.appendChild(todo)

        form.addEventListener("submit", (event) => {
            event.preventDefault()
            addTodo()
        })

        let todoList = []

        const editBtn = (index) => {
            let newTitleEdit = prompt("New title? ✅")
            let newDescEdit = prompt("New description? ✅")

            if (newTitleEdit == null && newDescEdit == null) return alert("Canceled edit ✅")
            else if (newTitleEdit != null && newDescEdit == null) {
                newDescEdit = todoList[index].desc
                todoList[index].text = newTitleEdit
                localStorage.setItem("todos", JSON.stringify(todoList))
            } else if (newTitleEdit == null && newDescEdit != null) {
                newTitleEdit = todoList[index].text
                todoList[index].desc = newDescEdit
                localStorage.setItem("todos", JSON.stringify(todoList))
            }

            if (newTitleEdit == "" && newDescEdit == "") {
                alert("No value fill in Title and Desciption. Old Value will return 💘")
            } else {
                todoList[index].text = newTitleEdit
                todoList[index].desc = newDescEdit
                localStorage.setItem("todos", JSON.stringify(todoList))
            }

            render()
        }

        const deleteBtn = (index) => {
            todoList.splice(index, 1)
            localStorage.setItem('todos', JSON.stringify(todoList))
            getDataList()
            render()
        }

        const addTodo = () => {
            const newTodo = input.value
            const newDesc = description.value

            if (!newTodo && !newDesc)
                return alert("No value: title and description for your task! ❌")
            else if (!newTodo)
                return alert("No value: title task! ❌")
            else if (!newDesc)
                return alert("No value: description ❌")

            todoList = JSON.parse(localStorage.getItem("todos")) || []
            for (let i = 0; i < todoList.length; i++) {
                if (todoList[i].text.toLocaleLowerCase() == newTodo.toLocaleLowerCase() && todoList[i].desc.toLocaleLowerCase() == newDesc.toLocaleLowerCase()) {
                    alert("Title and description available ❗")
                    input.value = ""
                    description.value = ""
                    return null
                } else if (todoList[i].text.toLocaleLowerCase() == newTodo.toLocaleLowerCase()) {
                    alert("Title available ❗")
                    input.value = ""
                    return null
                } else if (todoList[i].desc.toLocaleLowerCase() == newDesc.toLocaleLowerCase()) {
                    alert("Description available ❗")
                    description.value = ""
                    return null
                }
            }

            todoList.push({
                text: newTodo,
                desc: newDesc,
                completed: false
            })

            localStorage.setItem("todos", JSON.stringify(todoList))

            input.value = ""
            description.value = ""

            getDataList()
            render()
        }

        const getDataList = () => {
            let countTrue = 0;
            let countFalse = 0;

            for (let i = 0; i < todoList.length; i++)
                if (todoList[i].completed == true)
                    countTrue++
                else if (todoList[i].completed == false)
                    countFalse++

            sumTask.innerHTML = `${"Total task: " + "<b>" + todoList.length + "</b>" + "<br />"}`
            sumTaskChecked.innerHTML = `${"Task checked: " + "<b>" + countTrue + "</b>" + "<br />"}`
            sumTaskUnchecked.innerHTML = `${"Task unchecked: " + "<b>" + countFalse + "</b>"}`
        }

        const render = () => {
            todo.innerHTML = null
            todoList = JSON.parse(localStorage.getItem("todos")) || []

            for (let i = 0; i < todoList.length; i++) {
                let li = document.createElement("li")
                li.classList.add("todolist")

                let titleText = document.createElement("p")
                li.appendChild(titleText)
                titleText.innerHTML = `${"▪ " + todoList[i].text}`

                todo.appendChild(li)

                let textDesc = document.createElement("p")
                textDesc.classList.add("desc")
                textDesc.innerHTML = `${todoList[i].desc}`
                todo.appendChild(textDesc)

                let div = document.createElement("div")
                div.classList.add("tools")

                let edit = document.createElement("span")
                edit.style.cursor = "pointer"
                edit.textContent = "🖋"
                edit.setAttribute("onclick", "editBtn(" + i + ")")
                div.appendChild(edit)

                let text = document.createTextNode("X")
                let btn = document.createElement("button")
                btn.classList.add("delBtn")
                btn.setAttribute("onclick", "deleteBtn(" + i + ")")
                btn.appendChild(text)
                div.appendChild(btn)

                let checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.style.cursor = "pointer"
                div.appendChild(checkbox)

                li.appendChild(div)

                if (todoList[i].completed == true) {
                    titleText.classList.add("completed")
                    titleText.classList.remove("uncompleted")
                    textDesc.classList.add("completed")
                    textDesc.classList.remove("uncompleted")
                    checkbox.checked = todoList[i].completed
                } else if (todoList[i].completed == false) {
                    titleText.classList.add("uncompleted")
                    titleText.classList.remove("completed")
                    textDesc.classList.add("uncompleted")
                    textDesc.classList.remove("completed")
                    checkbox.checked = todoList[i].completed
                }

                checkbox.addEventListener("click", (event) => {
                    todoList[i].completed = event.target.checked
                    if (todoList[i].completed) {
                        titleText.classList.add("completed")
                        titleText.classList.remove("uncompleted")
                        textDesc.classList.add("completed")
                        textDesc.classList.remove("uncompleted")
                        checkbox.checked = todoList[i].completed
                    } else {
                        titleText.classList.add("uncompleted")
                        titleText.classList.remove("completed")
                        textDesc.classList.add("uncompleted")
                        textDesc.classList.remove("completed")
                        checkbox.checked = todoList[i].completed
                    }
                    getDataList()
                    localStorage.setItem('todos', JSON.stringify(todoList))
                })
            }
        }

        (() => {
            render()
            getDataList()
        })()
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedIn2.hidden = true;
        // whenSignedOut.hidden = false;
        whenSignedOuttwo.hidden = false;
        userDetails.innerHTML = '';
    }
});

const db = firebase.firestore();

const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');

let thingsRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
    if (user) {
        thingsRef = db.collection('things')

        createThing.onclick = () => {

            const { serverTimestamp } = firebase.firestore.FieldValue;
            thingsRef.add({
                uid: user.uid,
                createdAt: serverTimestamp()
            });
        }

        // Query
        unsubscribe = thingsRef
            .where('uid', '==', user.uid)
            .orderBy('createdAt') // Requires a query
            .onSnapshot(querySnapshot => {

                // Map results to an array of li elements

                const items = querySnapshot.docs.map(doc => {
                    const time = doc.data().createdAt;

                    var d = time.toDate().toLocaleDateString();
                    var t = time.toDate().toLocaleTimeString();

                    console.log(t);

                    return `<li>Date: ${d} Time: ${t}</li>`

                });

                thingsList.innerHTML = items.join('');

            });

    } else {
        // Unsubscribe when the user signs out
        unsubscribe && unsubscribe();
    }
});


//This function runs everytime the auth state changes. Use to verify if the user is logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("USER LOGGED IN");
    } else {
        // No user is signed in.
        console.log("USER NOT LOGGED IN");
    }
});
