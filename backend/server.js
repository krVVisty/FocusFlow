// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root endpoint for testing
app.get("/", (req, res) => {
  res.send("FocusFlow backend is running 🚀");
});

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
