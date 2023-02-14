
import axios from 'axios';

const API = axios.create({ baseUrl: 'http://localhost:5000' });

export const checkSudoku = (gridVal) => API.post('http://localhost:5000/api/check', gridVal);
export const solveSudoku = (gridVal) => API.post('http://localhost:5000/api/solve', gridVal);

