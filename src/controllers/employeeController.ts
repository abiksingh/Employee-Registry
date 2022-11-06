import Employee from "../models/employeeModel";
import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import asyncHandler from "express-async-handler";
import NewEmployee from "../models/newEmployeeModel";

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
  return res.json(await NewEmployee.find({}));
});

const addEmployees = asyncHandler(async (req: Request, res: any) => {
  const { username, email, firstName, lastName, role, address } = req.body;

  const employeeExist = await NewEmployee.findOne({ email });

  if (employeeExist) {
    res.status(400);
    throw new Error("Employee already exists");
  }

  const employee = await NewEmployee.create({
    username,
    email,
    firstName,
    lastName,
    role,
    address,
  });

  if (employee) {
    res.status(201).json({
      _id: employee._id,
      username: employee.username,
      email: employee.email,
      firstName: employee.firstName,
      lastName: employee.lastName,
      role: employee.role,
      address: employee.address,
    });
  } else {
    res.status(400);
    throw new Error("Invalid employee data");
  }
});

const editEmployees = asyncHandler(async (req: Request, res: any) => {
  const { username, email, firstName, lastName, role, address } = req.body;

  const employee = await NewEmployee.findById(req.params.id);

  if (employee) {
    employee.username = username;
    employee.email = email;
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.role = role;
    employee.address = address;

    const updatedEmployee = await employee.save();

    res.json({
      _id: updatedEmployee._id,
      name: updatedEmployee.username,
      email: updatedEmployee.email,
      firstName: updatedEmployee.firstName,
      lastName: updatedEmployee.lastName,
      role: updatedEmployee.role,
      address: updatedEmployee.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await NewEmployee.findById(req.params.id);

  if (employee) {
    await employee.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerEmployee,
  authEmployee,
  getEmployees,
  addEmployees,
  editEmployees,
  deleteEmployee,
};
