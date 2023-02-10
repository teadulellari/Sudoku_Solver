import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/sudoku'});


export const createSudoku = (grid) => API.post('/', grid);
export const checkSudoku = (grid) => API.post('/check', grid);