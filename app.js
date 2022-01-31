const express = require("express");
const app = express();
const connectDB = require("./db/database");
const eventRoutes = require("./apis/events/routes");
app.use(express.json());
app.use("/api/events", eventRoutes);
connectDB();
app.listen(8000, () => console.log("this app is running on 8000 port"));
