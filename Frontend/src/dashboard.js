document.addEventListener("DOMContentLoaded", () => {
  const subjectsBtn = document.querySelector(".Subjects");
  const deadlinesBtn = document.querySelector(".Deadline.Days");
  const quizBtn = document.querySelector(".quizzes");

  if (subjectsBtn)
    subjectsBtn.addEventListener("click", () => {
      // (window.location.href = "../Subjects/subjects.html"),
      window.open("https://www.bbc.co.uk/bitesize/subjects", "_blank");
    });

  if (deadlinesBtn)
    deadlinesBtn.addEventListener("click", () => {
      window.location.href = "../Calendar/calendar.html";
    });

  if (quizBtn)
    quizBtn.addEventListener("click", () => {
      alert("Quiz page coming soon!");
    });
});
