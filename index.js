

const drawUsers = (data,employeeTable) => {
  employeeTable.innerHTML = ``;


  data.forEach((item) => {
    employeeTable.innerHTML += `
          <tbody>
          <tr class="users" id="${item.id}" >
          <td><input type="checkbox" id="check"/> </td>
          <td>${item.name}</td>
          <td>${item.surname}</td>
          <td>${item.salary}$</td>
          <td>${item.wordDate}</td>
          </tr>
          </tbody>
          `;
  });
  const deleteAll = document.querySelector("#deleteAll");
  deleteAll.style.display = "block";
  const deleteBtn = document.querySelector("#deleteBtn");
  deleteBtn.style.display = "block";
  const edit = document.querySelector("#edit");
  edit.style.display = "block";
};


const submitHandler = () => {
  const name = document.querySelector("#name");
  const surname = document.querySelector("#surname");
  const salary = document.querySelector("#salary");
  const wordDate = document.querySelector("#wordDate");

 

  const person = {
    id: Date.now(),
    name: name.value,
    surname: surname.value,
    salary: salary.value,
    wordDate: wordDate.value,
  };
  return person;
};
const toggleModal = (data, event) => {
  const modalWrapper = document.querySelector(".modalWrapper");
  modalWrapper.classList.toggle("toggleModal");

  const editBtn = document.querySelector("#editBtn");
  editBtn.removeEventListener("click", editBtnHandler);
  editBtn.addEventListener("click", () => editBtnHandler(data, event));
};

const editBtnHandler = (data, event) => {
  const employeeTable = document.querySelector("#employeeTable");
  const cardIndex = data.findIndex((item) => item.id === event.id);

  data.splice(cardIndex, 1, {
    id: event.id,
    name: editName.value,
    surname: editSurname.value,
    salary: editSalary.value,
    wordDate: editWordDate.value,
  });

  toggleModal(data, event);
  drawUsers(data, employeeTable);
};

const getSelectedPersonId = (employeeTable) => {
  const checkboxes = employeeTable.querySelectorAll(
    ".users input[type='checkbox']:checked"
  );
  let selectedCardId = null;

  checkboxes.forEach((checkbox) => {
    if (checkboxes) {
      selectedCardId = +checkbox.closest(".users").id;
    }
  });

  return selectedCardId;
};

const deletePersons = (data, employeeTable) => {
  const checkboxes = employeeTable.querySelectorAll(
    "tbody .users input[type='checkbox']"
  );

  const rowsToDelete = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const row = checkbox.closest(".users");
      rowsToDelete.push(row);
    }
  });

  rowsToDelete.forEach((row) => {
    const id = row.getAttribute("id");
    data = data.filter((person) => person.id !== parseInt(id));
  });

  return data;}


const init = () => {
  let data = [];
  const submit = document.querySelector("#submit");
  const employeeTable = document.querySelector("#employeeTable");
  const deleteAll = document.querySelector("#deleteAll");
  const deleteBtn = document.querySelector("#deleteBtn");
  const closeBtn = document.querySelector("#closeBtn");
  const edit = document.querySelector("#edit");
  
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    const person = submitHandler();
    if (person) {
      data.push(person);
      drawUsers(data, employeeTable);
    }
  });


  deleteAll.addEventListener("click", () => {
    data = [];
    drawUsers(data, employeeTable);
  });
  deleteBtn.addEventListener("click", () => {
    data = deletePersons(data, employeeTable);
    drawUsers(data, employeeTable);
  });

  edit.addEventListener("click", () => {
    const cardId = getSelectedPersonId(employeeTable);
    const event = data.find((item) => item.id === cardId);

    toggleModal(data, event);

    editName.value = event.name;
    editSurname.value = event.surname;
    editSalary.value = event.salary;
    editWordDate.value = event.wordDate;
  });

  employeeTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit")) {
      editHandler(event, data);
    }
  });

  closeBtn.addEventListener("click", () => {
    toggleModal();
  });
};

init();