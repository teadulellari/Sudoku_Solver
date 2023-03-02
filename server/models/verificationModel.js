import mongoose from "mongoose";

const verificationSchema = mongoose.Schema ({
    UUID: { type: String, required: true},
    date: {type: Date, required: true},
    userId: { type: String, required: true}
});

const VerificatinModel = mongoose.model('VerificatinModel', verificationSchema);

export default VerificatinModel;