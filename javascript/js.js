"use strict";
// רשימת הקשרים
const list = document.querySelector(".contact-list");

let contacts = [
  {
    contactID: "1",
    contactName: "Sereen Rizik ",
    contactPhone: "0542345678",
    contactEmail: "sereenrizik@gmail.com",
    contactAddrerss: "Israel",
    contactText: "Hello my name is Sereen Rizik",
    contactImage: "./images/sereen.jpg",
  },
  {
    contactID: "2",
    contactName: "Aws Fawarsy ",
    contactPhone: "0551346785",
    contactEmail: "Awssoooo@gmail.com",
    contactAddrerss: "Israel",
    contactText: "Hello my name is Aws Fawarsy!",
    contactImage: "./images/Aws.jpg",
  },
  {
    contactID: "3",
    contactName: "Jan Mike ",
    contactPhone: "0534657894",
    contactEmail: "JanMike123@gmail.com",
    contactAddrerss: "Israel",
    contactText: "Hello my name is Jan Mike!",
    contactImage: "./images/Jan.jpg",
  },
  {
    contactID: "4",
    contactName: "Steve Martin",
    contactPhone: "0552356789",
    contactEmail: "stevomartin@gmail.com",
    contactAddrerss: "Israel",
    contactText: "Hello my name is Steve Martin",
    contactImage: "./images/Steve.jpg",
  },
];

// הצגת כל הקשרים
const renderContacts = () => {
  list.innerHTML = "";
  contacts.sort((a, b) => a.contactName.localeCompare(b.contactName));
  contacts.forEach((contact) => addContactToList(contact));
};

renderContacts();

// הוספת קשר לרשימה
function addContactToList(contact) {
  const liItem = document.createElement("li");
  liItem.className = `flex ${contact.contactID} `;
  liItem.innerHTML = `
    <div class="flex">
      <img src='${contact.contactImage}' alt="contact image" class="contact-img"/>
      <div class="flex-info">
      <span class="info-span">${contact.contactName}</span>
      <span class="info-span">${contact.contactPhone}</span>
      </div>
    </div>
    <div class="flex">
      <button class="icon" onclick="info('${contact.contactID}')">
        <i class="fa-solid fa-info"></i>
      </button>
      <button class="icon" onclick="editUser('${contact.contactID}')">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="icon" onclick="deleteUser('${contact.contactID}')">
        <i class="fa-solid fa-user-minus"></i>
      </button>
    </div>
      `;
  list.appendChild(liItem);
}

// מחיקת כל הקשרים
function deleteAllContacts() {
  if (confirm("Are you sure you want to delete all")) {
    contacts = [];
    list.innerHTML = "<h1>No Contacts In Phone Book</h1>";
  }
}

// מחיקת קשר לפי מזהה
function deleteUser(id) {
  contacts = contacts.filter((contact) => contact.contactID !== id);
  document.getElementsByClassName(`${id}`)[0].remove();

  if (contacts.length === 0) {
    list.innerHTML = "<h1>No Contacts In Phone Book</h1>";
  }
}

// הצגת פרטי קשר
function info(id) {
  openModal();
  let contact = contacts.find((contact) => contact.contactID === id);

  const infoHTML = `
  <h1>Contact info: ${contact.contactName}</h1>
  <img src='${contact.contactImage}' alt="contact image" class="contact-img"/>
  <div class="info">
  <div><span class="spaninfo">Contact Name:</span> ${contact.contactName}</div>
  <div><span class="spaninfo">Contact Phone Number:</span> ${contact.contactPhone}</div>
  <div><span class="spaninfo">Contact Email:</span> ${contact.contactEmail}</div>
  <div><span class="spaninfo">Contact Address:</span> ${contact.contactAddrerss}</div>
  <div><span class="spaninfo">Contact Free Text:</span> ${contact.contactText}</div>
  </div>
  `;

  const div = document.querySelector("#modal-container");
  div.innerHTML = infoHTML;
}

// חיפוש קשרים לפי שם
const search = document.querySelector("#search");
const contactList = document.querySelector(".contact-list");

search.addEventListener("input", (e) => {
  const filteredList = contacts.filter((contact) => {
    return contact.contactName
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
  });

  contactList.innerHTML = "";
  filteredList.forEach((contact) => addContactToList(contact));
});

// עריכת קשר
function editUser(id) {
  openModal();
  let contact = contacts.find((contact) => contact.contactID === id);

  let editHTML = `
  <h1>Edit Contact ${contact.contactName}</h1>
  <form class="form-edit">
        <div>
            <div class="formIt">
              <label for"name" class="info-label">Contact Name:</label>
              <input type="text" value='${contact.contactName}' id="name"/>
            </div>
          
            <div class="formIt">
              <label for="number" class="info-label">Contact Number:</label>
              <input type="number" value='${contact.contactPhone}' id="number" />
            </div>
        
            <div class="formIt">
              <label for"name" class="info-label">Contact Email:</label>
              <input type="text" value='${contact.contactEmail}' id="email"/>
            </div>

            <div class="formIt">
              <label for"name" class="info-label">Contact Address:</label>
              <input type="text" value='${contact.contactAddrerss}' id="address"/>
            </div>

            <div class="formIt">
              <label for"name" class="info-label">Contact Free Text:</label>
              <textarea id="text">${contact.contactText}</textarea>
            </div>

            <div class="formIt">
              <label for="image" class="info-label">Contact Image:</label>
              <input type="text" value='${contact.contactImage}' id="image"/>
            </div>
          
            <div class="formIt">
              <button class="input-btn" onclick="save(event,'${id}')">Save</button>
            </div>
          </div>
      </form>
  `;

  const div = document.querySelector("#modal-container");
  div.innerHTML = editHTML;
}

// שמירת שינויים בקשר
function save(e, id) {
  e.preventDefault();
  const contact = contacts.filter((contact) => contact.contactID === id)[0];

  const contactNameItem = document.getElementById("name");
  const contactNumberItem = document.getElementById("number");
  const contactEmailItem = document.getElementById("email");
  const contactAddressItem = document.getElementById("address");
  const contactFreeText = document.getElementById("text");
  const contactImgItem = document.getElementById("image");

  contact.contactName = contactNameItem.value;
  contact.contactPhone = contactNumberItem.value;
  contact.contactEmail = contactEmailItem.value;
  contact.contactAddrerss = contactAddressItem.value;
  contact.contactText = contactFreeText.value;
  contact.contactImage = contactImgItem.value;

  renderContacts();

  document.getElementById("myModal").style.display = "none";
}

// פתיחת מודל
function openModal() {
  document.getElementById("myModal").style.display = "flex";
}

// סגירת מודל
function closeModal(event) {
  if (
    event.target === document.getElementById("closeModalBtn") ||
    event.target === document.getElementById("myModal")
  )
    document.getElementById("myModal").style.display = "none";
}

// הוספת קשר חדש
function add() {
  openModal();

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <h1>Add a new Contact</h1>
 <form class="form-add">
  <div>
      <div class="formIt">
        <label for"name" class="info-label">Contact Name:</label>
        <input type="text"  id="name"/>
      </div>
    
      <div class="formIt">
        <label for="number" class="info-label">Contact Number:</label>
        <input type="number" id="number" />
      </div>
    
      <div class="formIt">
        <label for="address" class="info-label">Contact Email:</label>
        <input type="text" id="email" />
      </div>

      <div class="formIt">
        <label for"name" class="info-label">Contact Address:</label>
        <input type="text" id="addrerss"/>
      </div>

      <div class="formIt">
        <label for"name" class="info-label">Contact Free Text:</label>
        <textarea id="text"></textarea>
      </div>

  
      <div class="formIt">
        <label for="image" class="info-label">Contact Image:</label>
        <input type="text" id="image"/>
      </div>
    
      <div class="formIt">
        <button class="input-btn" onclick="saveNewUser(event)">Save</button>
      </div>
    </div>
  </form>
  `;
}

// שמירת קשר חדש
function saveNewUser(e) {
  e.preventDefault();
  const contactNameItem = document.getElementById("name");
  const contactNumberItem = document.getElementById("number");
  const contactEmailItem = document.getElementById("email");
  const contactAddrerssItem = document.getElementById("addrerss");
  const contactFreeTextItem = document.getElementById("text");
  const contactImgItem = document.getElementById("image");

  if (checkName(contactNameItem.value)) {
    const contact = {
      contactID: `${contacts.length + 1}`,
      contactName: contactNameItem.value,
      contactPhone: contactNumberItem.value,
      contactEmail: contactEmailItem.value,
      contactAddrerss: contactAddrerssItem.value,
      contactText: contactFreeTextItem.value,
      contactImage: contactImgItem.value,
    };

    contacts.push(contact);
    renderContacts();
    document.getElementById("myModal").style.display = "none";
  } else {
    alert("Phone or Name used!");
  }
}

// בדיקת אם שם קשר קיים
function checkName(name) {
  let contact = contacts.find((contact) => contact.contactName.includes(name));
  if (contact) return false;

  return true;
}

// הוספת אפקט ריחוף על פריטי קשר
document.querySelectorAll("li").forEach(function (li) {
  li.addEventListener("mouseover", function () {
    this.classList.add("hovered");
  });

  li.addEventListener("mouseout", function () {
    this.classList.remove("hovered");
  });
});
