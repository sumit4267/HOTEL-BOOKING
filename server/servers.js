import express from "express"
import "dotenv/config";
import cors from "cors" ;

import { clerkMiddleware} from '@clerk/express';
import clerkWebhook from "./controllers/clerkWebhook.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import connectDB from "./configs/db.js";





connectDB();
connectCloudinary();
const app = express()
app.use(cors()) // Enable Cross-Origin Resource Sharing
 
// middleware
app.use(express.json())
app.use(clerkMiddleware())


// API to listen to Clerk Webhooks
app.use("/api/clerk",clerkWebhook)



app.get('/',(req, res) => res.send("API is working fine sumit"))
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Servers running on port ${PORT}`));


