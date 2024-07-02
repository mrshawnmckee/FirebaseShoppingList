// Have to use type=module on the script tag in index.html for this to work(import)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'


const appSettings = {    // This is an object which holds the url of the database
    databaseURL: 'https://playground-86af1-default-rtdb.firebaseio.com/'
}


const app = initializeApp(appSettings)  //connects the project to the DB
const database = getDatabase(app)
const itemsInDB = ref(database, 'items')    //ref needs two params, Db being used and what the ref in the DB should be called

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')

addButtonEl.addEventListener('click', function(){
    let inputValue = inputFieldEl.value
    // push adds the value to the database, through the itemsInDB ref module and the push
    push(itemsInDB, inputValue)     

    clearInputField()

})

//list the database items on the screen
onValue(itemsInDB, function(snapshot){
    let itemsArray = Object.values(snapshot.val())  //convert on=bject into an array
    clearShoppingListEl()
    for(let i = 0; i < itemsArray.length; i++) {
        addItemToList(itemsArray[i])
    }
})

 function addItemToList(value) {
    shoppingListEl.innerHTML += `<li>${value}</li>`
 }

 function clearInputField() {
    inputFieldEl.value = ''         
 }

 function clearShoppingListEl() {
    shoppingListEl.innerHTML = ''
 }

