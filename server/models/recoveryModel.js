import mongoose from "mongoose";

const recoverySchema = mongoose.Schema({
  UUID: {type: String, require: true},
  date:{type: Date, require: true},
  id: { type: String, require: true}
});

const RecoveryModel = mongoose.model('RecoveryModel', recoverySchema);

export default RecoveryModel;