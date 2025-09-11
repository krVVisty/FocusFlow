// Frontend/src/dashboard.js

// Get backend URL from .env (Vite requires VITE_ prefix)
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const subjectsBtn = document.querySelector(".Subjects");
  const calendarBtn = document.querySelector(".Calendar");
  const notesContainer = document.querySelector(".editable");

  // ------------------------------
  // Event Listeners
  // ------------------------------
  if (subjectsBtn) {
    subjectsBtn.addEventListener("click", () => {
      window.open("https://www.bbc.co.uk/bitesize/subjects", "_blank");
    });
  }

  async function fetchCalendar() {
    try {
      const res = await fetch(`${backendUrl}/calendar`);
      if (!res.ok) throw new Error("Failed to fetch calendar");
      const data = await res.json();
      alert(
        "Calendar Events:\n" + data.map((ev) => `• ${ev.title}`).join("\n")
      );
    } catch (err) {
      console.error("Error fetching calendar:", err);
      alert("Cannot fetch calendar data. Check backend.");
    }
  }

  if (calendarBtn) {
    calendarBtn.addEventListener("click", fetchCalendar);
  }

  // ------------------------------
  // Notes (localStorage)
  // ------------------------------
  if (notesContainer) {
    const STORAGE_KEY = "notesContent";
    notesContainer.innerHTML =
      localStorage.getItem(STORAGE_KEY) || "<p>Notes:</p>";

    notesContainer.addEventListener("input", () => {
      localStorage.setItem(STORAGE_KEY, notesContainer.innerHTML);
    });
  }
});
