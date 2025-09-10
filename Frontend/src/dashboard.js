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

(notesBox.innerHTML = localStorage.getItem(STORAGE_KEY)), "";

notesBox.addEventListener("input", () => {
  localStorage.setItem(STORAGE_KEY, notesBox.innerHTML);
});

export async function getTasks() {
  const response = await fetch(`${backendUrl}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
}
