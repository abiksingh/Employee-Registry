import Employee from "../models/employeeModel";
import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import asyncHandler from "express-async-handler";

const registerEmployee = asyncHandler(async (req: any, res: any) => {
  const { name, email, password } = req.body;

  const employeeExist = await Employee.findOne({ email });

  if (employeeExist) {
    res.status(400);
    throw new Error("Employee already exists");
  }

  const employee = await Employee.create({
    name,
    email,
    password,
  });

  if (employee) {
    res.status(201).json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      token: generateToken(employee._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid employee data");
  }
});

const authEmployee = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email });

  if (employee && (await employee.matchPassword(password))) {
    res.json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      token: generateToken(employee._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getEmployees = asyncHandler(async (req: Request, res: any) => {
  return res.json(await Employee.find({}).select("-password"));
});

export { registerEmployee, authEmployee, getEmployees };
