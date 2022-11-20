const baseUrl = "https://jsonplaceholder.typicode.com/posts";
import axios from "axios";

export const authService = {
  login,
};

export function register({ email, username, password, confirmPassword }) {
  const data = {
    username,
    email,
    password1: password,
    password2: confirmPassword,
  };
  return fetch(`${baseUrl}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

function login({ email, password }) {
  return axios.post(`${baseUrl}`, { email: email, password: password });
}
