const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const userName = document.getElementById("username").value;
  const userPassword = document.getElementById("password").value;
  const userData = {
    username: userName,
    password: userPassword,
  };

  await loginUser(userData);
});

const loginUser = async (payload) => {
  try {
    const resp = await fetch("https://flipkart-5cw9.onrender.com/login", {
      method: "POST",
      credentials: 'include',
      redirect: 'follow',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    // console.log(data); // Check the response data in the console
    window.location.href = "http://127.0.0.1:5500/client/homepage/index.html";
  } catch (error) {
    console.log(error.message);
  }
};
