document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const registerButton = document.getElementById('register-btn');
    const loginButton = document.getElementById('login-btn');
    const messageDiv = document.getElementById('message');
    const authForm = document.getElementById('auth-form');
    const securePage = document.getElementById('secure-page');
    const welcomeUserSpan = document.getElementById('welcome-user');
    const logoutButton = document.getElementById('logout-btn');

    //show a message
    function showMessage(text, isError = true) {
        messageDiv.textContent = text;
        messageDiv.style.color = isError ? 'red' : 'green';
    }

    //register a user
    function registerUser(username, password) {
        const users = JSON.parse(localStorage.getItem('users') || "{}");
        if (users[username]) {
            showMessage("Username already taken.", true);
            return false;
        }
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        showMessage("Registration successful!", false);
        return true;
    }

    //login a user
    function loginUser(username, password) {
       const users = JSON.parse(localStorage.getItem('users') || "{}");

        if (users[username] && users[username] === password) {
            localStorage.setItem('loggedInUser', username);
            return true; // Login success
        }
        showMessage('Login failed. Incorrect username or password.', true);
        return false;
    }

    //check if the user is logged in.
    function checkLoginStatus(){
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
           displaySecurePage(loggedInUser);
           return true;
        }
        return false
    }

    //display secured page
    function displaySecurePage(username) {
        authForm.style.display = 'none';
        securePage.style.display = 'block';
        welcomeUserSpan.textContent = username;
    }
    
    //logout the user
    function logoutUser(){
        localStorage.removeItem('loggedInUser');
        authForm.style.display = 'block';
        securePage.style.display = 'none';
        showMessage("");
    }

     // Check if the user is already logged in when the page loads
     if(checkLoginStatus()){
        
     }

    
    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        if(registerUser(username, password)){
             usernameInput.value = '';
             passwordInput.value = '';
        }
    });

    loginButton.addEventListener('click', (e) => {
         e.preventDefault();
         const username = usernameInput.value;
         const password = passwordInput.value;
         if(loginUser(username, password)){
            displaySecurePage(username);
         }
    });

    logoutButton.addEventListener('click', () => {
        logoutUser();
    });
});