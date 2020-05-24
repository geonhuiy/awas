const switchers = [...document.querySelectorAll(".switcher")];
const registerForm = document.getElementById("formSignup");
const loginForm = document.getElementById("formLogin");
var status = 0;
switchers.forEach((item) => {
  item.addEventListener("click", function () {
    switchers.forEach((item) =>
      item.parentElement.classList.remove("is-active")
    );
    this.parentElement.classList.add("is-active");
  });
});

const register = async (url) => {
  var newUsername = document.getElementById("signup-username").value;
  var newPassword = document.getElementById("signup-password").value;
  var confirmPassword = document.getElementById("signup-confirmpassword").value;
  var payload = {
    username: newUsername,
    password: newPassword,
  };
  if (newPassword != confirmPassword) {
    window.alert("Password does not match!");
  } else {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then(function (data) {
        if (status == 409) {
          window.alert(data);
        } else {
          sessionStorage.setItem("token", data);
          //window.location = "chat.html";
        }
      });
  }
};

const login = async (url) => {
    var loginUsername = document.getElementById("login-username").value;
    var loginPassword = document.getElementById("login-password").value;
    console.log(loginPassword);
    var payload = {
        "username": loginUsername,
        "password": {"$gt":""}
    }
    fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            "username":loginUsername,
            "password":{"$gt":""}
        }),
    })
    .then((response) => {
        status = response.status;
        return response.json();
    })
    .then(function (data) {
        if (status == 401) {
            window.alert(data);
        } else {
            //sessionStorage.setItem("token", data);
            console.log(data)
            //window.location = "chat.html";
        }
    })
}

registerForm.onsubmit = () => {
  register("/user/register");
  return false;
};

loginForm.onsubmit = () => {
    login("/user/login");
    return false;
}
