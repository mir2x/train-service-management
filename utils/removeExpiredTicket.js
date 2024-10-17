const cron = require("node-cron");
const Ticket = require("../models/Ticket");

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const expiredTickets = await Ticket.find({
      departureTime: { $lt: now },
    });

    for (const ticket of expiredTickets) {
      await Ticket.deleteOne({ _id: ticket._id });
      console.log(
        `Ticket for user ${ticket.user} on train ${ticket.train} has expired and been removed.`
      );
    }
  } catch (error) {
    console.error(`Error expiring tickets: ${error}`);
  }
});

module.exports = cron;
