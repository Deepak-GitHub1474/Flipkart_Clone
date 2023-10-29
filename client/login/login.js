const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;
  
  const userData = {
    email: email,
    password: userPassword,
  };

  await loginUser(userData);
});

const loginUser = async (payload) => {
  try {
    const resp = await fetch("http://127.0.0.1:8081/login", {
      method: "POST",
      credentials: 'include',
      redirect: 'follow',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    // console.log(data); // Check the response data in the console

    if (data.message === 'Login successfully') {
      window.location.href = "http://127.0.0.1:5500/client/homepage/index.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};