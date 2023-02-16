
import axios from 'axios';

const API = axios.create({ baseUrl: 'http://localhost:5001' });

export const checkSudoku = (gridVal) => API.post('http://localhost:5001/api/check', gridVal);
export const solveSudoku = (gridVal) => API.post('http://localhost:5001/api/solve', gridVal);

