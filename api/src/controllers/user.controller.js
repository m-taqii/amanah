import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { createUser, findUserByEmail, findUserByPhone } from "../repositories/user.repo.js";

export async function register(req, res) {
  const { name, email, password, phone, address, role, profilePicture } = req.body;

  try {
    const cleanEmail = email?.trim().toLowerCase();
    const cleanPhone = phone?.trim();

    if (!name?.trim() || !cleanEmail || !password || !cleanPhone || !address?.trim()) {
      return res.status(400).json({ message: "Name, email, phone, password, and address are required" });
    }

    if (cleanEmail) {
      const existingUserByEmail = await findUserByEmail(cleanEmail);
      if (existingUserByEmail.length > 0) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
    }
    if (cleanPhone) {
      const existingUserByPhone = await findUserByPhone(cleanPhone);
      if (existingUserByPhone.length > 0) {
        return res.status(400).json({ message: "User with this phone number already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name: name?.trim(),
      email: cleanEmail,
      password: hashedPassword,
      phone: cleanPhone,
      address,
      role: role || 'donor',
      profilePicture,
    });
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const { password: _, ...rest } = user[0];

    return res.status(201).json({ message: "User created successfully", user: rest, token });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  const { email, phone, identifier, password, role } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    let user = [];
    const rawIdentifier = (identifier || email || phone || "").trim();

    if (!rawIdentifier) {
      return res.status(400).json({ message: "Email or phone number is required" });
    }

    if (rawIdentifier.includes("@")) {
      user = await findUserByEmail(rawIdentifier.toLowerCase());
    } else {
      user = await findUserByPhone(rawIdentifier);
      if ((!user || user.length === 0)) {
        // Also try digits only in case formatted with dashes/spaces/+92
        const digits = rawIdentifier.replace(/\D/g, "");
        if (digits.length >= 10 && digits !== rawIdentifier) {
          user = await findUserByPhone(digits);
        }
      }
    }

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found with provided email or phone" });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const { password: _, ...rest } = user[0];

    return res.status(200).json({ message: "Login successful", user: rest, token });
  } catch (error) {
    console.error("Login error:", error);
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