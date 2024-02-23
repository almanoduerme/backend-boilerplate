import { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const isEmailAllReadyExist = await User.findOne({ email });

    if (isEmailAllReadyExist) {
      res.status(400).json({ status: 400, message: "Email all ready in use" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(200).json({ status: 201, success: true, message: " User created Successfully", user: newUser });
  } catch (error: unknown) {
    console.log(error);

    res.status(400).json({ status: 400, message: error });
  }
};

const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      res.status(404).json({ status: 404, success: false, message: "User not found" });
      return;
    }
    
    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, isUserExist.password);

    if (!validPassword) {
      return res.status(400).send("Invalid Password");
    }

    // Create and assign a token
    const token = jwt.sign({ _id: isUserExist._id, email: isUserExist.email }, process.env.MONGODB_SECRET as string, { expiresIn: "1d" });
    
    // send the response
    res.status(200).json({ status: 200, success: true, message: "Login success!!!!", token: token, user: isUserExist });
  } catch (error: unknown) {
    res.status(400).json({ status: 400, message: error });
  }
}

export { Login, Register };
