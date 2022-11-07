import mongoose from "mongoose";
import { IAddEmployee } from "../interface/Employee";

const commentSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    comment: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const addEmployeeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    comment: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const NewEmployee = mongoose.model<IAddEmployee>(
  "AddEmployee",
  addEmployeeSchema
);

export default NewEmployee;
