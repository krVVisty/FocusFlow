// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(express.json());

// ------------------------------
// CORS configuration
// ------------------------------
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:5173,https://focusflow-sp7n.onrender.com"
)
  .split(",")
  .map((s) => s.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Postman, curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS policy: origin not allowed"));
    },
  })
);

// ------------------------------
// Supabase client
// ------------------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ------------------------------
// Routes
// ------------------------------

// Root endpoint – sanity check
app.get("/", (req, res) => {
  res.send("FocusFlow backend is running 🚀");
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get calendar events
app.get("/calendar", async (req, res) => {
  try {
    const { data, error } = await supabase.from("calendar_events").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Error fetching calendar events:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get notes for a specific user
app.get("/notes/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from("user_notes")
      .select("*")
      .eq("user_id", userId);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(`Error fetching notes for user ${userId}:`, err.message);
    res.status(400).json({ error: err.message });
  }
});

// Save/update notes for a specific user
app.post("/notes/:userId", async (req, res) => {
  const { userId } = req.params;
  const { content } = req.body;
  try {
    const { data, error } = await supabase
      .from("user_notes")
      .upsert({ user_id: userId, content })
      .select();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(`Error saving notes for user ${userId}:`, err.message);
    res.status(400).json({ error: err.message });
  }
});

// ------------------------------
// Start server
// ------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
