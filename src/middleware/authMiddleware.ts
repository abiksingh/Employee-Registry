import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";

const protect = expressAsyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded: any = jwt.verify(token, `${process.env.JWT_SECRET}`);

        // console.log(decoded);

        if (req.user) {
          req.user = await User.findById(decoded.id).select("-password");
          next();
        }

        // console.log(req.user);
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
