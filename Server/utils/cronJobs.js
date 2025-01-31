const cron = require("node-cron");
const mongoose = require("mongoose");
const Appointment = require("../models/appointmentModel");

// Runs every minute
cron.schedule("*/1 * * * *", async () => {
    console.log("Checking for completed appointments...");
    const currentTime = new Date();

    try {
        // Fetch all appointments where `isCompleted` is false
        const appointments = await Appointment.find({ isCompleted: false });

        for (const appointment of appointments) {
            try {
                const [time, period] = appointment.slotTime.split(" ");
                let [hours, minutes] = time.split(":").map(Number);

                // if (period === "PM" && hours !== 12) hours += 12;
                // if (period === "AM" && hours === 12) hours = 0;

                // Create a valid Date object
                const appointmentDateTime = new Date(appointment.slotDate);
                appointmentDateTime.setHours(hours, minutes, 0, 0);

                // Add 1 hour to check for completion
                const oneHourAfterSlot = new Date(appointmentDateTime.getTime() + 60 * 60 * 1000);

                // Log the calculated times for debugging
                // console.log(`Appointment ID: ${appointment._id}`);
                // console.log(`Appointment DateTime: ${appointmentDateTime}`);
                // console.log(`One Hour After Slot: ${oneHourAfterSlot}`);
                // console.log(`Current Time: ${currentTime}`);

                // Check if the current time exceeds 1 hour after the slot time
                if (currentTime > oneHourAfterSlot) {
                    // Update the appointment to mark it as completed
                    await Appointment.findByIdAndUpdate(
                        appointment._id,
                        { isCompleted: true },
                        { new: true }
                    );
                    console.log(`Marked appointment ${appointment._id} as completed.`);
                } else {
                    console.log(`Appointment ${appointment._id} is not yet completed.`);
                }
            } catch (innerError) {
                console.error(`Error processing appointment ${appointment._id}:`, innerError);
            }
        }

        console.log("Checked and updated completed appointments.");
    } catch (error) {
        console.error("Error updating appointments:", error);
    }
});
