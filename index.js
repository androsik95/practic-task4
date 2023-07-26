

const drawUsers = (data,employeeTable) => {
  employeeTable.innerHTML = `<thead>
        <tr>
          <td> </td>
          <td>Name</td>
          <td>Surname</td>
          <td>Salary</td>
          <td> work start</td>
        </tr>
      </thead>
      `;



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


const init = () => {
  let data = [];
  const submit = document.querySelector("#submit");
  const employeeTable = document.querySelector("#employeeTable");
  const deleteAll = document.querySelector("#deleteAll");

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
};

init();