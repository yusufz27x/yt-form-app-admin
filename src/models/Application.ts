import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema({
    formID: {
        type: Schema.ObjectId,
        required: false,
    },
    answers: {
        type: [String],
        required: true,
    }

}, { timestamps: true });

const ApplicationsModel = mongoose.models.ApplicationsModel || mongoose.model("applications", applicationSchema);
export default ApplicationsModel;
