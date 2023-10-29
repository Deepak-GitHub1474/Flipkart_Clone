const formSubmit = document.getElementById('submit');

formSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    const userName = document.getElementById('username').value
    const userEmail = document.getElementById('email').value
    const userPassword = document.getElementById('password').value

    if (!userName || !userEmail || !userPassword) {
        alert('All input fields are required')
        return
    }

    const userData = {
        username: userName,
        email: userEmail,
        password: userPassword
    }

    registerUser(userData)
})

const registerUser = async (payload) => {

    try {
        const resp = await fetch('http://127.0.0.1:8081/signup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload)
        })

        const data = await resp.json();
        // console.log(data);
        
        if (data.message === 'User registered successfully') {
            window.location.href = 'http://127.0.0.1:5500/client/login/login.html';
          } else {
            alert(data.message);
          }

    } catch (error) {
        console.log(error.message)
    }
}
