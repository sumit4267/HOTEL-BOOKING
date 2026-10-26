import User from "../models/User.js";
import { clerkClient } from "@clerk/express";

export const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      }); 
    }

    let user = await User.findById(userId);

    // Agar webhook nahi chala aur user DB me nahi hai, toh Clerk se fetch karke auto-create karein
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);
      user = await User.create({
        _id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        username: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
        image: clerkUser.imageUrl || "",
        role: "user",
        recentSearchedCities: []
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Protect middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};