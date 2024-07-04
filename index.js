// Have to use type=module on the script tag in index.html for this to work(import)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'


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



//list the database items on the screen; onVlue is constantly updating the information
onValue(itemsInDB, function(snapshot){

    if (snapshot.exists()){     //This checks to make sure that there is not a null in the DB, which would throw an error

        let itemsArray = Object.entries(snapshot.val())  //convert object into an array; getting the values


        clearShoppingListEl()

        for(let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]

            addItemToList(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = 'No Items Here Yet!'
    }
})

 function addItemToList(item) {
    // shoppingListEl.innerHTML += `<li>${value}</li>`

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")    //creating the list el
    newEl.textContent = itemValue                   //having the text content equal the value 

    shoppingListEl.append(newEl)                //append newEl to the parent el, shoppingListEl(the<ul>)

    // Remove the item from the screen and DB
    newEl.addEventListener('dblclick', function(){
        let locationOfItemsInDB = ref(database, `items/${itemID}`) //must have precise path to db

        remove(locationOfItemsInDB)
    })


 }

 function clearInputField() {
    inputFieldEl.value = ''         
 }

 function clearShoppingListEl() {
    shoppingListEl.innerHTML = ''
 }

