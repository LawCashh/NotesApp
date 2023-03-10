// this is a javascript file
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
 content: {
   type: String,
   required: true,
 },
});

const note = mongoose.model("Note", noteSchema);
export const schema = note.schema;
export default note;
