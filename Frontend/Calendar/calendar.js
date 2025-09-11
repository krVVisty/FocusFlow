const daysContainer = document.getElementById("calendar-days");
const monthYearText = document.getElementById("month-year");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const modal = document.getElementById("note-modal");
const modalDate = document.getElementById("modal-date");
const noteText = document.getElementById("note-text");
const saveNoteBtn = document.getElementById("save-note");
const closeModalBtn = document.getElementById("close-modal");

let date = new Date();
let selectedDateKey = "";
let notes = {};

const backendUrl = "http://localhost:4000/calendar";

async function fetchNotes() {
  try {
    const response = await fetch(`${backendUrl}/notes`);
    if (!response.ok) throw new Error("Failed to fetch notes");
    const data = await response.json();
    notes = {}; // reset
    data.forEach((note) => {
      notes[note.id] = note.note;
    });
  } catch (error) {
    console.error("Error loading notes:", error);
  }
}

async function saveNote(dateKey, note) {
  try {
    await fetch(`${backendUrl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: dateKey,
        note: note,
      }),
    });
  } catch (error) {
    console.error("Error saving note:", error);
  }
}

async function renderCalendar() {
  await fetchNotes();

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isThisMonth =
    today.getMonth() === month && today.getFullYear() === year;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthYearText.textContent = `${monthNames[month]} ${year}`;

  daysContainer.innerHTML = "";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayNames.forEach((day) => {
    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = day;
    daysContainer.appendChild(dayEl);
  });

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("date");
    daysContainer.appendChild(empty);
  }

  for (let day = 1; day <= lastDate; day++) {
    const dateEl = document.createElement("div");
    dateEl.classList.add("date");
    dateEl.textContent = day;

    const dateKey = `${year}-${month + 1}-${day}`;

    if (isThisMonth && day === today.getDate()) {
      dateEl.classList.add("today");
    }

    if (notes[dateKey]) {
      const dot = document.createElement("div");
      dot.style.background = "#00bcd4";
      dot.style.width = "6px";
      dot.style.height = "6px";
      dot.style.borderRadius = "50%";
      dot.style.margin = "4px auto 0";
      dateEl.appendChild(dot);
    }

    dateEl.addEventListener("click", () => openNoteModal(year, month + 1, day));
    daysContainer.appendChild(dateEl);
  }
}

function openNoteModal(year, month, day) {
  selectedDateKey = `${year}-${month}-${day}`;
  modalDate.textContent = `Note for ${month}/${day}/${year}`;
  noteText.value = notes[selectedDateKey] || "";
  modal.style.display = "flex";
}

function closeNoteModal() {
  modal.style.display = "none";
  selectedDateKey = "";
  noteText.value = "";
}

saveNoteBtn.addEventListener("click", async () => {
  const content = noteText.value.trim();
  await saveNote(selectedDateKey, content);
  closeNoteModal();
  renderCalendar();
});

closeModalBtn.addEventListener("click", closeNoteModal);

prevBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
