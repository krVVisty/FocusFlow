document.addEventListener("DOMContentLoaded", () => {
  const subjectsBtn = document.querySelector(".Subjects");
  const calendarBtn = document.querySelector(".Calendar");
  const quizBtn = document.querySelector(".quizzes");

  if (subjectsBtn)
    subjectsBtn.addEventListener("click", () => {
      // (window.location.href = "../Subjects/subjects.html"),
      window.open("https://www.bbc.co.uk/bitesize/subjects", "_blank");
    });

  if (calendarBtn)
    calendarBtnBtn.addEventListener("click", () => {
      window.location.href = "../Calendar/calendar.html";
    });

  if (quizBtn)
    quizBtn.addEventListener("click", () => {
      alert("Quiz page coming soon!");
    });
});
