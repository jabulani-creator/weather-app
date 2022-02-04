
// fetch('http://localhost:3000/weather?address=nairobi').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//         }
       
//     })
// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const MessageOne = document.querySelector('.error')
const MessageTwo = document.querySelector('.success')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    
    MessageOne.textContent = 'Loading ...'
    MessageTwo.textContent =' '
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            // console.log(data.error)
            MessageOne.textContent = data.error
        }else{
            MessageOne.textContent = data.location
            MessageTwo.textContent = data.forecast   
        }
       
    })
})
})