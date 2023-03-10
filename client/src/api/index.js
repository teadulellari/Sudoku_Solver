import axios from "axios";

const API = axios.create({
  baseUrl: "http://localhost:5001",
  withCredentials: true,
});

export const checkSudoku = (gridVal) =>
  API.post("http://localhost:5001/api/check", gridVal);
export const solveSudoku = (gridVal) =>
  API.post("http://localhost:5001/api/solve", gridVal);
export const signUp = (data) =>
  API.post("http://localhost:5001/api/signup/email", data);
export const logIn = (data) =>
  API.post("http://localhost:5001/api/login", data);
export const verifyUser = (uuid) =>
  API.get(`http://localhost:5001/api/verify/${uuid}`);
export const checkSessionValidity = () =>
  API.get(`http://localhost:5001/api/checkSession/`);
export const checkUser = (encodedEmail) =>
  API.get(`http://localhost:5001/api/checkUser?email=${encodedEmail}`);
export const recoverPass = (id, data) =>
  API.post("http://localhost:5001/api/recoverPassword", { id, data });
