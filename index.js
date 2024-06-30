import { add } from '../functions.js'
// Have to use type=module on the script tag in index.html for this to work(import)

const appSettings = {
    // This is an object which holds the url of the database
    databaseURL: 'https://playground-86af1-default-rtdb.firebaseio.com/'
}

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')

addButtonEl.addEventListener('click', function(){
    let inputValue = inputFieldEl.value
    console.log(inputValue)
})
console.log( )