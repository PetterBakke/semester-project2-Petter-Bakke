import {displayMessage} from "../components/displayMessage.js";
import { saveToken } from "../utility/storage.js";
import { saveUser } from "../utility/storage.js";
import { baseUrl } from "./baseUrl.js";

const form = document.querySelector(".loginForm");
const username = document.querySelector("#Username");
const password = document.querySelector("#Password");
const message = document.querySelector(".message-container");

form.addEventListener("submit" , submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if(usernameValue.length === 0 || passwordValue.length === 0) {
    displayMessage("warning", "Invalid values", ".message-container");
  }

  doLogin(usernameValue, passwordValue)
}

async function doLogin(username, password) {
  const url = `${baseUrl}auth/local`;

  const data = JSON.stringify({identifier: username, password: password});

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if(json.user) {
      displayMessage("Success", "Successfully logged in", ".message-container")

      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "/";
    }

    if(json.error) {
      displayMessage("warning", "Invalid login details", ".message-container");
    }

    console.log(json);
  } catch(error) {
    console.log(error);
  }
};