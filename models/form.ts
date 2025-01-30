import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    formTitle: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.models.Form || mongoose.model("Form", formSchema);

export default Form;
