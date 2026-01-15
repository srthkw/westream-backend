import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/utils/db.js";
connectDB();
import app from "./src/app.js";
import audioRoutes from "./src/routes/audioRoutes.js";
import { initCloudinary } from "./src/utils/cloudinary.js";
initCloudinary();

const PORT = process.env.PORT || 5000;

app.use("/audio", audioRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
