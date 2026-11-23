const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Security middleware
app.use(helmet());

// Cross-origin requests (development configuration)
app.use(cors());

// HTTP request logging
app.use(morgan("dev"));

// Parse incoming JSON requests
app.use(express.json({ limit: "10kb" }));

// Welcome route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Movie Rental Management System API",
        version: "1.0.0"
    });
});

// API health-check route
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Movie Rental API is running successfully",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// Central error handler
app.use((err, req, res, next) => {
    console.error("Application Error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;
