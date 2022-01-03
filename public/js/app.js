console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  message1.textContent = 'loading...'
  message2.textContent = ''
  
  const location = search.value

  fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        message1.textContent = ''
        message2.textContent = data.error
        return console.log(data.error);
      }
      message1.textContent = data.location
      message2.textContent = data.weatherMessage
      console.log(data);
    })
  })
})