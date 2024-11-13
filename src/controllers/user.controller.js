import { User } from "../models/user.models.js";
import { apiError } from "../utils/ApiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const signUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All fields aree required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new apiError(400, "User already Exist");
  }

  try {
    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new apiError(400, "Something went wrong while registering a user");
    }

    return res
      .status(200)
      .json(new apiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    console.log("User creation Failed", error);
    throw new apiError(500, "Something went wrong, user registration failed");
  }
});

export const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    const error = new apiError(400, "Invalid Credential");
    return res.status(400).json(error.toJSON());
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new apiError(400, "Invalid email or password");
      return res.status(400).json(error.toJSON());
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      const error = new apiError(400, "Password didn't match");
      return res.status(400).json(error.toJSON());
    }

    return res
      .status(200)
      .json(new apiResponse(200, user, "Login successfully"));
  } catch (error) {
    console.log("Login Failed!", error);
    const err = new apiError(500, "Login failed due to an internal error");
    return res.status(500).json(err.toJSON());
  }
});

export const register = (req, res) => {
  res.render("register");
};

export const Login = (req, res) => {
  res.render("login");
};
