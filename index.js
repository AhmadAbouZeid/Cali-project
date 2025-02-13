// JavaScript for handling login and signup forms with validation

// Select form elements
const formOpenBtn = document.querySelector("#form-open"),
    home = document.querySelector(".home"),
    formContainer = document.querySelector(".form_container"),
    formCloseBtn = document.querySelector(".form_close"),
    signupBtn = document.querySelector("#show-signup"),
    loginBtn = document.querySelector("#show-login"),
    pwShowHide = document.querySelectorAll(".pw_hide"),
    loginForm = document.getElementById("login-form"),
    signupForm = document.getElementById("signup-form"),
    loginEmail = document.getElementById("login-email"),
    loginPassword = document.getElementById("login-password"),
    signupEmail = document.getElementById("signup-email"),
    signupPassword = document.getElementById("signup-password"),
    confirmPassword = document.getElementById("confirm-password");

// Error message elements
const loginEmailError = document.getElementById("login-email-error"),
    loginPasswordError = document.getElementById("login-password-error"),
    signupEmailError = document.getElementById("signup-email-error"),
    signupPasswordError = document.getElementById("signup-password-error"),
    confirmPasswordError = document.getElementById("confirm-password-error");

// Function to disable scrolling
function disableScroll() {
    document.body.style.overflow = "hidden";
}

// Function to enable scrolling
function enableScroll() {
    document.body.style.overflow = "";
}

// Helper functions for validation
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error-message");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error-message");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// Open form and disable scroll (Always show login form first)
formOpenBtn.addEventListener("click", () => {
    home.classList.add("show");
    document.body.classList.add("blur");
    disableScroll();
    formContainer.classList.remove("active"); // Ensure login form is displayed first
});

// Close form and enable scroll
formCloseBtn.addEventListener("click", () => {
    home.classList.remove("show");
    document.body.classList.remove("blur");
    enableScroll();
    clearLoginForm();  // Clear login form when closing
    clearSignupForm(); // Clear signup form when closing
});

// Switch between login and signup forms
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
    document.body.classList.add("blur");
    disableScroll();
});

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
    disableScroll();
});

// Password show/hide toggle
pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let pwFields = icon.parentElement.querySelector("input");
        if (pwFields.type === "password") {
            pwFields.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            pwFields.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

// Signup Validation
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset error messages
    setSuccess(signupEmail);
    setSuccess(signupPassword);
    setSuccess(confirmPassword);

    // Validate inputs
    const emailValue = signupEmail.value.trim();
    const passwordValue = signupPassword.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    if (emailValue === "") {
        setError(signupEmail, "Email is required!");
    } else if (!isValidEmail(emailValue)) {
        setError(signupEmail, "Provide a valid email address!");
    } else {
        setSuccess(signupEmail);
    }

    if (passwordValue === "") {
        setError(signupPassword, "Password is required!");
    } else if (passwordValue.length < 8) {
        setError(signupPassword, "Password must be at least 8 characters!");
    } else {
        setSuccess(signupPassword);
    }

    if (confirmPasswordValue === "") {
        setError(confirmPassword, "Please confirm your password!");
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, "Passwords do not match!");
    } else {
        setSuccess(confirmPassword);
    }

    // If all inputs are valid, proceed with signup
    if (
        emailValue !== "" &&
        isValidEmail(emailValue) &&
        passwordValue !== "" &&
        passwordValue.length >= 8 &&
        confirmPasswordValue !== "" &&
        confirmPasswordValue === passwordValue
    ) {
        // Store user data in localStorage
        localStorage.setItem("userEmail", emailValue);
        localStorage.setItem("userPassword", passwordValue);

        alert("Signup successful! Please login.");
        
        // Close the form and clear fields
        home.classList.remove("show");
        document.body.classList.remove("blur");
        enableScroll();
        clearSignupForm();
        formContainer.classList.remove("active"); // Switch to login form
    }
});

// Login Validation
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset error messages
    setSuccess(loginEmail);
    setSuccess(loginPassword);

    // Validate inputs
    const emailValue = loginEmail.value.trim();
    const passwordValue = loginPassword.value.trim();

    if (emailValue === "") {
        setError(loginEmail, "Email is required!");
    } else {
        setSuccess(loginEmail);
    }

    if (passwordValue === "") {
        setError(loginPassword, "Password is required!");
    } else {
        setSuccess(loginPassword);
    }

    // Retrieve stored user data
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    // Validate login credentials
    if (emailValue === storedEmail && passwordValue === storedPassword) {
        alert("Login successful!");
        home.classList.remove("show"); // Close the form
        document.body.classList.remove("blur");
        enableScroll(); // Allow scrolling
        // Close the form and clear login fields
        home.classList.remove("show");
        document.body.classList.remove("blur");
        enableScroll();
        clearLoginForm();  // Clear login form after successful login
        clearSignupForm(); // Clear signup form as well
    } else if (emailValue !== "" && passwordValue !== "") {
        setError(loginEmail, "Invalid email or password!");
    }
    

    
});

// Function to clear login form inputs
function clearLoginForm() {
    loginEmail.value = "";
    loginPassword.value = "";
}

// Function to clear signup form inputs
function clearSignupForm() {
    signupEmail.value = "";
    signupPassword.value = "";
    confirmPassword.value = "";
}

// Close form and enable scroll (also clears login & signup forms)
formCloseBtn.addEventListener("click", () => {
    home.classList.remove("show");
    document.body.classList.remove("blur");
    enableScroll();
    clearLoginForm();  // Clear login form when closing
    clearSignupForm(); // Clear signup form when closing
});