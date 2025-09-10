document.addEventListener("DOMContentLoaded", () => {
  const subjectsBtn = document.querySelector(".Subjects");
  const calendarBtn = document.querySelector(".Calendar");
  const quizBtn = document.querySelector(".quizzes");

  if (subjectsBtn)
    subjectsBtn.addEventListener("click", () => {
      window.open("https://www.bbc.co.uk/bitesize/subjects", "_blank");
    });

  if (calendarBtn)
    calendarBtn.addEventListener("click", () => {
      window.location.href = "../Calendar/calendar.html";
    });

  if (quizBtn)
    quizBtn.addEventListener("click", () => {
      alert("Quiz page coming soon!");
    });
});

  
  const notesBox = document.getElementById("notes-box");
  const STORAGE_KEY = "notesContent";

  notesBox.innerHTML = localStorage.getItem(STORAGE_KEY), "";

  notesBox.addEventListener("input", () => {
    localStorage.setItem(STORAGE_KEY, notesBox.innerHTML);
  });

 const notesBox = document.getElementById("notes-box");

  async function loadNotes() {
    try {
      const res = await fetch("/api/notes");
      if (!res.ok) throw new Error("Failed to load notes");
      const data = await res.json();
      notesBox.innerHTML = data.content || "";
    } catch (err) {
      console.error("Error loading notes:", err);
      notesBox.innerHTML = "";
    }
  }

  async function saveNotes() {
    try {
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: notesBox.innerHTML })
      });
    } catch (err) {
      console.error("Error saving notes:", err);
    }
  }

 
  notesBox.addEventListener("input", () => {
    saveNotes();
  });

 
  loadNotes();
