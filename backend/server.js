// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS configuration
const allowed = (
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:5173,https://focusflow-sp7n.onrender.com"
)
  .split(",")
  .map((s) => s.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow no-origin (Postman, curl) and same-origin
      if (!origin) return callback(null, true);
      if (allowed.includes(origin)) return callback(null, true);
      return callback(new Error("CORS policy: origin not allowed"));
    },
  })
);

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Endpoint: get all tasks
app.get("/tasks", async (req, res) => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Endpoint: get calendar events
app.get("/calendar", async (req, res) => {
  const { data, error } = await supabase.from("calendar_events").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Endpoint: get notes for a specific user
app.get("/notes/:userId", async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from("user_notes")
    .select("*")
    .eq("user_id", userId);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Endpoint: save/update notes for a specific user
app.post("/notes/:userId", async (req, res) => {
  const { userId } = req.params;
  const { content } = req.body;
  const { data, error } = await supabase
    .from("user_notes")
    .upsert({ user_id: userId, content })
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
