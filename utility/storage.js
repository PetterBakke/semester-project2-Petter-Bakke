const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
   return getFromStorage(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if(!value) {
    return [];
  }

  return JSON.parse(value);
}