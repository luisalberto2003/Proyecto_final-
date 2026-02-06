import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import plantsRoutes from "./routes/plants.routes.js";
import userPlantsRoutes from "./routes/userPlants.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/plants", plantsRoutes);
app.use("/api/user-plants", userPlantsRoutes);

export default app;
