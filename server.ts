import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // Mock Water Data Simulation
  let waterUsage = 0.5;
  let leakDetected = false;
  let emergencyMode = false;
  let shortageLevel = 0;

  // Leaderboard Mock Data
  const houseLeaderboard = [
    { id: '1', name: 'Unit 402 (You)', usage: 42, rank: 3 },
    { id: '2', name: 'Unit 105', usage: 38, rank: 1 },
    { id: '3', name: 'Unit 211', usage: 40, rank: 2 },
    { id: '4', name: 'Unit 304', usage: 45, rank: 4 },
  ];

  const campusLeaderboard = [
    { id: 'c1', name: 'West Wing', usage: 1240, rank: 2 },
    { id: 'c2', name: 'East Wing', usage: 980, rank: 1 },
    { id: 'c3', name: 'Central Labs', usage: 2100, rank: 3 },
  ];

  setInterval(() => {
    // Simulate some variance
    const variance = (Math.random() - 0.5) * 0.1;
    waterUsage = Math.max(0.1, waterUsage + variance);

    // Occasional spike simulation
    if (Math.random() > 0.98) {
        waterUsage += 2.0;
        leakDetected = true;
    } else if (leakDetected && Math.random() > 0.7) {
        leakDetected = false;
        waterUsage = 0.5;
    }

    // Random Emergency Check (rare)
    if (Math.random() > 0.995) {
      emergencyMode = !emergencyMode;
      shortageLevel = emergencyMode ? Math.floor(Math.random() * 60) + 20 : 0;
    }

    io.emit("water-telemetry", {
      usage: parseFloat(waterUsage.toFixed(2)),
      timestamp: new Date().toISOString(),
      leakDetected,
      emergencyMode,
      shortageLevel
    });
  }, 2000);

  io.on("connection", (socket) => {
    socket.on("get_leaderboard", (type) => {
      socket.emit("leaderboard_data", type === 'house' ? houseLeaderboard : campusLeaderboard);
    });

    socket.on("shut_off_valve", () => {
      console.log("Tactis: Manual Shut Off Valve Engaged");
      waterUsage = 0.1;
      leakDetected = false;
      io.emit("water-telemetry", {
        usage: waterUsage,
        timestamp: new Date().toISOString(),
        leakDetected,
        emergencyMode,
        shortageLevel
      });
    });
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "AquaGuard Backend" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(` AquaGuard Server running on http://localhost:${PORT}`);
  });
}

startServer();
