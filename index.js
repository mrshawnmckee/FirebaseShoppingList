import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'


// Have to use type=module on the script tag in index.html for this to work(import)



const appSettings = {
    // This is an object which holds the url of the database
    databaseURL: 'https://playground-86af1-default-rtdb.firebaseio.com/'
}

//This connects the project to the project that contains the database
const app = initializeApp(appSettings)
const database = getDatabase(app)
// ref needs two arguments, the database being used(in this case database variable) and the reference should be called(in ths case items)
const itemsInDB = ref(database, 'items')

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')

addButtonEl.addEventListener('click', function(){
    let inputValue = inputFieldEl.value
    // push adds the value to the database, through the itemsInDB ref module and the push
    push(itemsInDB, inputValue)     
    console.log(`${inputValue} added to the list`)
})
console.log(app)