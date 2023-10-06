import express from "express";
import trainRoutes from "./routes/trainRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/train", trainRoutes);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));

// "clientId": "client_PGsiuz",
//   "clientSecret": "0166fa2152058f23b5dea8adb74813c6"
