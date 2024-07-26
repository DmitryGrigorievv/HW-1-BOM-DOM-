// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие, иначе она должна быть неактивна.

// Пользователь может записаться на один курс только один раз.

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Если количество участников уже максимально, то пользователь не может записаться, даже если он не записывался ранее.

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при перезагрузке страницы.

// Начальные данные (JSON):

const bdJson = [
  {
    id: 1,
    name: "Йога",
    time: "10:00 - 11:00",
    maxParticipants: 15,
    currentParticipants: 8,
  },
  {
    id: 2,
    name: "Пилатес",
    time: "11:30 - 12:30",
    maxParticipants: 10,
    currentParticipants: 5,
  },
  {
    id: 3,
    name: "Кроссфит",
    time: "13:00 - 14:00",
    maxParticipants: 20,
    currentParticipants: 15,
  },
  {
    id: 4,
    name: "Танцы",
    time: "14:30 - 15:30",
    maxParticipants: 12,
    currentParticipants: 10,
  },
  {
    id: 5,
    name: "Бокс",
    time: "16:00 - 17:00",
    maxParticipants: 8,
    currentParticipants: 6,
  },
];

const scheduledClasses =
  JSON.parse(localStorage.getItem("scheduledClasses")) || bdJson;

function updateLocalStorage() {
  localStorage.setItem("scheduledClasses", JSON.stringify(scheduledClasses));
}

function renderSchedule() {
  const scheduleTableBody = document
    .getElementById("schedule")
    .querySelector("tbody");
  scheduleTableBody.innerHTML = "";

  scheduledClasses.forEach((item) => {
    const row = document.createElement("tr");

    const registerButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    const userRegistered =
      localStorage.getItem(`registered_${item.id}`) !== null;

    if (item.currentParticipants >= item.maxParticipants || userRegistered) {
      registerButton.disabled = true;
    } else {
      registerButton.onclick = () => {
        item.currentParticipants++;
        localStorage.setItem(`registered_${item.id}`, true);
        updateLocalStorage();
        renderSchedule();
      };
    }

    if (!userRegistered) {
      cancelButton.disabled = true;
    } else {
      cancelButton.onclick = () => {
        item.currentParticipants--;
        localStorage.removeItem(`registered_${item.id}`);
        updateLocalStorage();
        renderSchedule();
      };
    }

    registerButton.textContent = "Записаться";
    cancelButton.textContent = "Отменить запись";

    row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.time}</td>
            <td>${item.maxParticipants}</td>
            <td>${item.currentParticipants}</td>
        `;

    row.appendChild(registerButton);
    row.appendChild(cancelButton);

    scheduleTableBody.appendChild(row);
  });
}
window.onload = renderSchedule;
