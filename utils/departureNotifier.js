const cron = require("node-cron");
const Ticket = require("../models/Ticket");

const sendNotification = (user, message) => {
  console.log(`Sending notification to ${user.name}: ${message}`);
};

cron.schedule("* * * * *", async () => {
  try {
    const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
    const now = new Date();
    const tickets = await Ticket.find({
      departureTime: { $gte: now, $lte: oneHourFromNow },
    }).populate("user train startStation");

    tickets.forEach((ticket) => {
      const { user, train, departureTime, startStation } = ticket;
      const timeLeft = Math.floor(
        (departureTime.getTime() - now.getTime()) / (60 * 1000)
      );
      const message = `Reminder: Your train (${train.name}) is departing from ${startStation.name} in ${timeLeft} minutes.`;
      sendNotification(user, message);
    });
  } catch (err) {
    console.error("Error sending notifications:", err);
  }
});

module.exports = cron;
