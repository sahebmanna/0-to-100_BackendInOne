import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
//import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = asyncHandler(async (req, res) => {
  // 1. get user details from frontend,
  // 2. Validate details -not Empty,
  // 3. Check user already exist,
  // 4. check for image and check for avatar,
  // 5. upload then into cloudinary,
  // 6. Create user object ,create entry in DB,
  // 7. Remove password and refresh-token from response,
  // 8. Check for user creation,
  // 9. Return response,

  //get user details from frontend,
  const { password, fullname, email, UserName } = req.body;
  console.log("email", email); //this for checking which type of data bare
  console.log("user-name", UserName); //this for checking which type of data bare

  // Validate details -not Empty,
  if (
    [password, fullname, email, UserName].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //Check user already exist,

  const existingUser = User.findOne({ $or: [{ UserName }, { email }] });

  if (existingUser) {
    throw new ApiError(409, "User already exist");
  }

  //check for image and check for avatar,
  //express by default req.body deta hai,lakin mai yeha route pa middleware use kia hai so middleware vi kuch access deta hai i mean req ke andar aur kuch fields add karta hai,using muter we can access files...

  const avatarLocalPath = req.file.avatar[0]?.path;
  const coverImageLocalPath = req.file.covareImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
    email,
    userName: userName.toLowerCase(),
  });

  // Remove password and refresh-token from response,
  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "internel swerver error while usre registered");
  }

  // Return response,

  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User registered successfully"));
});

export { registerUser };
