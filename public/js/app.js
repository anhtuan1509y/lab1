console.log('Client side javscript file is loaded.');
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message.textContent = "loading ..."

    fetch('/weather?address=' + location).then((response) =>{
        response.json().then((data) =>{
            if(data.error) {
                message.textContent = data.error
            } else {{
                console.log(data.forecast.temperature);
                message.textContent = data.forecast.temperature,
                message.textContent = data.forecast.summary
            }}
        })
    })
})
