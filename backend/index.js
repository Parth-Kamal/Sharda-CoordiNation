import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.DB).then(() => console.log("DB connection successful")).catch(err => console.error("DB connection error:", err));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
