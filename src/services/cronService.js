// services/cronService.js
const cron = require("node-cron");
const User = require("../models/User");
const { sendMessage } = require("./telegramServices");
const { getRandomJoke } = require("./jokeServices");

const startCronJobs = () => {
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    const users = await User.find({ isEnabled: true });

    for (const user of users) {
      const due =
        !user.lastSentAt ||
        (now - user.lastSentAt) / 60000 >= user.frequency;

      if (!due) continue;

      const joke = await getRandomJoke();
      await sendMessage(user.chatId, joke);

      user.lastSentAt = now;
      await user.save();
    }
  });

  console.log("🕒 Cron job running every minute");
};

module.exports = { startCronJobs };
