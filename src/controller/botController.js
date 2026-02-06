const User = require("../models/User");
const { sendMessage } = require("../services/telegramServices");

/**
 * Handles incoming Telegram messages
 * Supports commands:
 *  - ENABLE : start joke delivery
 *  - DISABLE : stop joke delivery
 *  - FREQUENCY <n> : set joke frequency in minutes
 */
const handleMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.chat || !message.text) {
      return res.status(400).json({ error: "Invalid Telegram message payload" });
    }

    const chatId = message.chat.id;
    const text = message.text.trim().toUpperCase();

    // Fetch or create the user
    let user = await User.findOne({ chatId });
    if (!user) {
      user = new User({
        chatId,
        isEnabled: false,
        frequency: 1,
      });
    }

    // Handle commands
    if (text === "ENABLE") {
      user.isEnabled = true;
      await sendMessage(chatId, " Joke delivery enabled!");
    } else if (text === "DISABLE") {
      user.isEnabled = false;
      await sendMessage(chatId, "⏸️ Joke delivery paused!");
    } else if (text.startsWith("FREQUENCY")) {
      const parts = text.split(" ");
      const n = parseInt(parts[1], 10);
      if (isNaN(n) || n <= 0) {
        await sendMessage(chatId, " Invalid frequency! Use: FREQUENCY <minutes>");
      } else {
        user.frequency = n;
        await sendMessage(chatId, ` Frequency updated to ${n} minute(s)!`);
      }
    } else {
      await sendMessage(chatId, " I only understand commands: ENABLE, DISABLE, FREQUENCY <n>");
    }

    await user.save();
    res.sendStatus(200); // Telegram expects 200 OK
  } catch (error) {
    console.error("handleMessage error:", error);
    res.sendStatus(500);
  }
};

module.exports = { handleMessage };
