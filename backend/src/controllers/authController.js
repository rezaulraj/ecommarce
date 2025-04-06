import { redis } from "../config/redis.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokens = (userId) => {
  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("JWT secrets are not defined in environment variables.");
  }
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    // this is time formet 7 days
    "EX",
    7 * 24 * 60 * 60
  );
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent xss attacts, cross site scripting attect
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent csrf attact, cross-site request forgery attect
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent xss attacts, cross site scripting attect
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent csrf attact, cross-site request forgery attect
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const signUp = async (req, res) => {
  const { email, password, name, role } = req.body;
  // console.log("body request", req.body);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User alrady exites" });
    }

    const user = await User.create({ name, email, password, role });

    // authentication
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error in Sign Up Controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);

      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);

      res.status(200).json({
        message: `successfully ${user.role} login`,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in login Controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Logout

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    // console.log("refreshToken", refreshToken);
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
      //   console.log("Redis key deleted:", result);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout Controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// refresh token

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storeToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storeToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.json({ message: "Token refresh successfully" });
  } catch (error) {
    console.log("Token resfresh controller error", error.message);
    res.status(500).json({ message: error.message });
  }
};

// get profile

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("Error in getProfile controller", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};
