import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password Is Correct!" });
    } else {
      const token = jwt.sign(
        { email: existUser.email, id: existUser._id },
        "test",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ result: existUser, token });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something Goes Wrong!" });
  }
};
export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(404).json({ message: "User already exist!" });
    if (password !== confirmPassword) {
      return res.status(404).json({ message: "Password not match!" });
    }
    const hashPassword = await bcryptjs.hash(password, 12);
    const result = await User.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    return res.status(200).json({ result, token });
  } catch (error) {
    return res.status(500).json({ message: "Something Goes Wrong!" });
  }
};
