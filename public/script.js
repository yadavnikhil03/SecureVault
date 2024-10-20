document.getElementById("loginButton").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Fetch the users.json file to validate login
    fetch('users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            if (isValidLogin(users, username, password)) {
                setTimeout(() => {
                    window.location.href = "landing.html"; 
                }, 100);
            } else {
                alert("Invalid username or password");
            }
        })
});

function isValidLogin(users, username, password) {
    return users.some(user => user.username === username && user.password === password);
}

