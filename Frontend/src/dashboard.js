// Frontend/src/dashboard.js

// Get backend URL from .env (Vite requires VITE_ prefix)
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const subjectsBtn = document.querySelector(".Subjects");
  const calendarBtn = document.querySelector(".Calendar");
  const quizBtn = document.querySelector(".quizzes");
  const notesContainer = document.querySelector(".editable");

  // Temporary user ID (can be dynamic later)
  const userId = 1;

  // ------------------------------
  // Event Listeners
  // ------------------------------
  if (subjectsBtn) {
    subjectsBtn.addEventListener("click", () => {
      window.open("https://www.bbc.co.uk/bitesize/subjects", "_blank");
    });
  }

  if (calendarBtn) {
    calendarBtn.addEventListener("click", fetchCalendar);
  }

  if (quizBtn) {
    quizBtn.addEventListener("click", () => {
      alert("Quiz page coming soon!");
    });
  }

  // ------------------------------
  // Notes (backend)
  // ------------------------------
  if (notesContainer) {
    const STORAGE_KEY = "notesContent";
    notesContainer.innerHTML =
      localStorage.getItem(STORAGE_KEY) || "<p>Notes:</p>";

    notesContainer.addEventListener("input", () => {
      localStorage.setItem(STORAGE_KEY, notesContainer.innerHTML);
    });
  }

  // ------------------------------
  // Functions to fetch data
  // ------------------------------

  async function fetchTasks() {
    try {
      const response = await fetch(`${backendUrl}/tasks`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      console.log("Tasks:", data);
      // TODO: render tasks in frontend
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function fetchCalendar() {
    try {
      const response = await fetch(`${backendUrl}/calendar?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch calendar");
      const data = await response.json();
      alert(
        "Calendar Events:\n" + data.map((ev) => `• ${ev.title}`).join("\n")
      );
    } catch (err) {
      console.error("Error fetching calendar:", err);
      alert("Cannot fetch calendar data. Check backend.");
    }
  }

  async function fetchNotes() {
    if (!notesContainer) return;

    try {
      const response = await fetch(`${backendUrl}/notes/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch notes");
      const data = await response.json();

      notesContainer.innerHTML =
        "<p>Notes:</p>" + data.map((note) => `<p>${note.content}</p>`).join("");
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // ------------------------------
  // Initial load
  // ------------------------------
  fetchTasks();
  fetchCalendar();
  fetchNotes();
});
