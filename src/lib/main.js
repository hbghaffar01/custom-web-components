import "../components/button.js";
import "../components/input.js";
import { registerUser, loginUser } from "../utils/apiUtils.js";

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("show-register")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector(".login").classList.add("hidden");
      document.querySelector(".register").classList.remove("hidden");
    });

  document
    .getElementById("show-login")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector(".register").classList.add("hidden");
      document.querySelector(".login").classList.remove("hidden");
    });

  const getValue = (inputElement) => {
    const input = inputElement
      ? inputElement.shadowRoot.querySelector("input")
      : null;
    return input ? input.value : "";
  };

  const setValue = (inputElement, value) => {
    const input = inputElement
      ? inputElement.shadowRoot.querySelector("input")
      : null;
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event("input"));
    } else {
      console.error("Input element not found.");
    }
  };

  const showError = (formId, message) => {
    const errorElement = document.getElementById(`${formId}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  };

  const hideError = (formId) => {
    const errorElement = document.getElementById(`${formId}-error`);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  };

  document
    .querySelector(".register .submitBtn")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const usernameInput = document.querySelector("#register-username");
      const emailInput = document.querySelector("#register-email");
      const passwordInput = document.querySelector("#register-password");

      const username = getValue(usernameInput);
      const email = getValue(emailInput);
      const password = getValue(passwordInput);

      hideError("register");

      try {
        await registerUser(username, email, password);

        setValue(usernameInput, "");
        setValue(emailInput, "");
        setValue(passwordInput, "");

        document.querySelector(".register").classList.add("hidden");
        document.querySelector(".login").classList.remove("hidden");
      } catch (error) {
        console.error("Registration failed:", error);
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          let errorMessage = "";
          if (errorData.username) errorMessage += `${errorData.username} `;
          if (errorData.email) errorMessage += `${errorData.email} `;
          if (errorData.password) errorMessage += `${errorData.password} `;
          showError("register", errorMessage.trim());
        } else {
          showError("register", "An unexpected error occurred.");
        }
      }
    });

  document
    .querySelector(".login custom-button")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const usernameOrEmailInput = document.querySelector("#login-username");
      const passwordInput = document.querySelector("#login-password");

      const usernameOrEmail = getValue(usernameOrEmailInput);
      const password = getValue(passwordInput);

      let username = "";
      let email = "";

      if (usernameOrEmail.includes("@")) {
        email = usernameOrEmail;
      } else {
        username = usernameOrEmail;
      }

      hideError("login");

      try {
        const loginResponse = await loginUser(username, email, password);
        localStorage.setItem("token", loginResponse.token);
        localStorage.setItem("user", JSON.stringify(loginResponse.user));

        setValue(usernameOrEmailInput, "");
        setValue(passwordInput, "");

        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          let errorMessage = "";
          if (errorData.username || errorData.email) errorMessage += `${errorData.username || errorData.email} `;
          if (errorData.password) errorMessage += `${errorData.password} `;
          showError("login", errorMessage.trim());
        } else {
          showError("login", "An unexpected error occurred.");
        }
      }
    });

  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "/dashboard";
  }
});
