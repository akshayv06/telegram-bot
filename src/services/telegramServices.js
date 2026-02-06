const axios = require("axios");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

const sendMessage = async (chatId, text) => {
  try {
    await axios.post(
      `${TELEGRAM_API}/sendMessage`,
      {
        chat_id: chatId,
        text
      },
      { timeout: 5000 }
    );
  } catch (err) {
    console.error("Telegram send failed:", err.response?.data || err.message);
  }
};

module.exports = { sendMessage };
