import mongoose from "mongoose";

const sudokuSchema = new mongoose.Schema({
    data: {
        type: [[Number]],
        required: true
      }
});


const SudokuModel = mongoose.model('SudokuModel', sudokuSchema);

export default SudokuModel;




