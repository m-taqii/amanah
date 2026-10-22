import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { createUser, findUserByEmail, findUserByPhone } from "../repositories/user.repo.js";

export async function register(req, res) {
  const { name, email, password, phone, address, role, profilePicture } = req.body;

  try {
    const existingUserByEmail = await findUserByEmail(email);
    if (existingUserByEmail.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingUserByPhone = await findUserByPhone(phone);
    if (existingUserByPhone.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashedPassword, phone, address, role, profilePicture });
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const { password: _, ...rest } = user[0];

    return res.status(201).json({ message: "User created successfully", user: rest, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const { password: _, ...rest } = user[0];

    return res.status(200).json({ message: "Login successful", user: rest, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMe(req, res) {
    try {
        const user = await findUserById(req.user.id);

        const { password: _, ...rest } = user[0];
        
        return res.status(200).json({ message: "User found successfully", user: rest });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}