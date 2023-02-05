import axios from 'axios';

const API = axios.create({ baseUrl: 'http://localhost:3000/sudoku' });


export const createSudoku = (data) => API.post('/sudoku', newSudoku);