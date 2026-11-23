const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB before starting the server
    await connectDB();

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Movie Rental API running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
