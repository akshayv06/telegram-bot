require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

// Utility function to send Telegram messages
const sendMessage = async (chatId, text) => {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error("Telegram bot token is missing in .env!");
  }

  try {
    const response = await axios.post(
      `${TELEGRAM_API}/sendMessage`,
      { chat_id: chatId, text },
      { timeout: 5000 }
    );
    return response.data;
  } catch (err) {
    // Throw error with Telegram API response if available
    throw new Error(
      err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message
    );
  }
};

// Telegram route
app.post("/api/telegram", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.chat?.id || !message.text) {
    return res.status(400).json({ error: "Invalid request", message: "chat.id and text are required" });
  }

  try {
    const result = await sendMessage(message.chat.id, message.text);
    res.json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ error: "telegram_error", message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
