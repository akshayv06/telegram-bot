const express = require("express");
const connectDB = require("./config/db");
const telegramRoutes = require("./routes/webHookRoutes");
const { startCronJobs } = require("./services/cronService");

const app = express();
connectDB(); // connect to MongoDB

app.use(express.json());
app.use("/api", telegramRoutes); // your POST /api/telegram route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startCronJobs(); // cron job starts automatically
});
