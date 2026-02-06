const express = require("express");
const connectDB = require("./config/db");
const telegramRoutes = require("./routes/webHookRoutes");
const { startCronJobs } = require("./services/cronService"); // ✅ correct import

const app = express();
connectDB();

app.use(express.json());
app.use("/api", telegramRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startCronJobs(); // ✅ call the correct function
});
