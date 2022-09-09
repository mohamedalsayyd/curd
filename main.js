let user = document.getElementById("user");
let website = document.getElementById("website");
let clientName = document.getElementById("clientName");
let price = document.getElementById("price");
let desc = document.getElementById("desc");
let btnSubmit = document.getElementById("btn-submit");

let mode = "create";

let tmp;

let dataSaver;
if (localStorage.gig != null) {
  dataSaver = JSON.parse(localStorage.gig);
} else {
  dataSaver = [];
}

btnSubmit.onclick = function () {
  let newClient = {
    user: user.value,
    price: price.value,
    website: website.value.toLowerCase(),
    clientName: clientName.value.toLowerCase(),
    desc: desc.value,
  };

  if (
    user.value != "" &&
    price.value != "" &&
    website.value != "" &&
    clientName.value != "" &&
    desc.value != ""
  ) {
    if (mode === "create") {
      dataSaver.push(newClient);
      localStorage.setItem("gig", JSON.stringify(dataSaver));
    } else {
      dataSaver[tmp] = newClient;
      mode = "create";
      btnSubmit.innerHTML = "Create";
    }
    clearData();
  }

  showData();
};

function clearData() {
  user.value = "";
  price.value = "";
  website.value = "";
  clientName.value = "";
  desc.value = "";
}

function showData() {
  let table = " ";
  for (let i = 0; i < dataSaver.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataSaver[i].user} </td>
            <td>${dataSaver[i].price}</td>
            <td>${dataSaver[i].website}</td>
            <td>${dataSaver[i].clientName}</td>
            <td>${dataSaver[i].desc}</td>
            <td><button onclick ="updateData(${i})"id="update">Update</button></td>
            <td><button onclick ="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  // let btnDelete = document.getElementById("deleteAll");
  if (dataSaver.length > 0) {
    btnDelete.innerHTML = `
            <button onclick="deleteAll()">Delete All</button>
            `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

function deleteData(i) {
  dataSaver.splice(i, 1);
  localStorage.gig = JSON.stringify(dataSaver);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataSaver.splice(0);
  showData();
}

function updateData(i) {
  user.value = dataSaver[i].user;
  price.value = dataSaver[i].price;
  website.value = dataSaver[i].website;
  clientName.value = dataSaver[i].clientName;
  desc.value = dataSaver[i].desc;
  btnSubmit.innerHTML = "Update";
  mode = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMode = "clientName";

function getThesearchMode(id) {
  let search = document.getElementById("search");
  if (id == "btn-searchWebsite") {
    searchMode = "websiteName";
    search.placeholder = "Search By Website-Name";
  } else {
    searchMode = "clientName";
    search.placeholder = "Search By Client-Name";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMode == "clientName") {
    for (let i = 0; i < dataSaver.length; i++) {
      if (dataSaver[i].clientName.includes(value)) {
        table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataSaver[i].user} </td>
                    <td>${dataSaver[i].price}</td>
                    <td>${dataSaver[i].website}</td>
                    <td>${dataSaver[i].clientName}</td>
                    <td>${dataSaver[i].desc}</td>
                    <td><button onclick ="updateData(${i})"id="update">Update</button></td>
                    <td><button onclick ="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                `;
      }
    }
  } else {
    for (let i = 0; i < dataSaver.length; i++) {
      if (dataSaver[i].website.includes(value)) {
        table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataSaver[i].user} </td>
                    <td>${dataSaver[i].price}</td>
                    <td>${dataSaver[i].website}</td>
                    <td>${dataSaver[i].clientName}</td>
                    <td>${dataSaver[i].desc}</td>
                    <td><button onclick ="updateData(${i})"id="update">Update</button></td>
                    <td><button onclick ="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
