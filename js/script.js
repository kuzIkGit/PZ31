// Практическая работа №31: cookies и localStorage

const noteField = document.querySelector("#note-field");
const nameField = document.querySelector("#name-field");
const greeting = document.querySelector("#greeting");
const status = document.querySelector("#status");
const saveNoteButton = document.querySelector("#save-note");
const deleteNoteButton = document.querySelector("#delete-note");
const saveNameButton = document.querySelector("#save-name");
const forgetNameButton = document.querySelector("#forget-name");
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie =
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}
function getCookie(name) {
  const prefix = `${encodeURIComponent(name)}=`;
  const item = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix));
  return item ? decodeURIComponent(item.slice(prefix.length)) : "";
}
function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; max-age=0; path=/; SameSite=Lax`;
}
const savedNote = localStorage.getItem("pz31-note");
if (savedNote !== null) {
  noteField.value = savedNote;
}
const savedName = getCookie("pz31-name");
if (savedName !== "") {
  greeting.textContent = `Привет, ${savedName}!`;
  nameField.value = savedName;
}
saveNoteButton.addEventListener("click", () => {
  const note = noteField.value.trim();
  if (note === "") {
    status.textContent = "Введите текст заметки — пустая заметка не сохранена.";
    return;
  }
  localStorage.setItem("pz31-note", note);
  status.textContent = "Заметка сохранена в localStorage.";
});
deleteNoteButton.addEventListener("click", () => {
  localStorage.removeItem("pz31-note");
  noteField.value = "";
  status.textContent = "Заметка удалена.";
});
saveNameButton.addEventListener("click", () => {
  const name = nameField.value.trim();
  if (name === "") {
    status.textContent = "Введите имя.";
    return;
  }
  setCookie("pz31-name", name, 7);
  greeting.textContent = `Привет, ${name}!`;
  status.textContent = "Имя сохранено в cookie на 7 дней.";
});
forgetNameButton.addEventListener("click", () => {
  deleteCookie("pz31-name");
  nameField.value = "";
  greeting.textContent = "Привет, студент!";
  status.textContent = "Сохранённое имя удалено.";
});