export function loggingOut() {
  // localStorage.clear(user, token);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}