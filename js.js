const list = document.querySelector(".contact-list");

let contacts = [
  {
    contactName: "Sereen Rizik ",
    contactPhone: "0542345678",
    contactEmail: "sereenrizik@gmail.com",
    contactAddrerss: "Israel",
    contactText: "Hello my name is Sereen Rizik",
    contactImage: "./images/sereen.jpg",
  },
  {
    contactName: "Jan Mike ",
    contactPhone: "0534657894",
    contactEmail: "JanMike123@gmail.com",
    contactAddrerss: "Israel",
    contactText: "Hello my name is Jan Mike!",
    contactImage: "./images/Jan.jpg",
  },
  {
    contactName: "Steve Martin",
    contactPhone: "0552356789",
    contactEmail: "stevomartin@gmail.com",
    contactAddrerss: "Israel",
    contactText: "Hello my name is Steve Martin",
    contactImage: "./images/Steve.jpg",
  },
];

contacts.forEach((contact) => addContactToList(contact));

function addContactToList(contact) {
  const liItem = document.createElement("li");
  liItem.className = `flex `;
  liItem.id = contact.contactPhone;
  liItem.innerHTML = `
    <div class="flex">
      <img src='${contact.contactImage}' alt="contact image" class="contact-img"/>
      <span>${contact.contactName}</span>
    </div>
    <div class="flex">
      <button class="icon" onclick="info('${contact.contactPhone}')">
        <i class="fa-solid fa-info"></i>
      </button>
      <button class="icon" onclick="editUser('${contact.contactPhone}')">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="icon" onclick="deleteUser('${contact.contactPhone}')">
        <i class="fa-solid fa-user-minus"></i>
      </button>
    </div>
      `;
  list.appendChild(liItem);
}

function deleteAllContacts() {
  contacts = [];
  list.innerHTML = "";
}

function deleteUser(contactNumber) {
  contacts = contacts.filter(
    (contact) => contact.contactPhone !== contactNumber
  );
  document.getElementById(`${contactNumber}`).remove();
}

function info(contactNumber) {
  openModal();

  let contact = contacts.find(
    (contact) => contact.contactPhone === contactNumber
  );

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

function editUser(contactNumber) {
  openModal();
  let contact = contacts.find(
    (contact) => contact.contactPhone === contactNumber
  );

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
              <button class="input-btn" onclick="save(event,'${contactNumber}')">Save</button>
            </div>
          </div>
      </form>
  `;

  const div = document.querySelector("#modal-container");
  div.innerHTML = editHTML;
}

function save(e, contactNumber) {
  e.preventDefault();
  const contact = contacts.filter(
    (contact) => contact.contactPhone === contactNumber
  )[0];

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

  const contactInHTML = document.getElementById(`${contactNumber}`);
  contactInHTML.id = contact.contactPhone;
  contactInHTML.innerHTML = `
     <div class="flex">
      <img src='${contact.contactImage}' alt="contact image" class="contact-img"/>
      <span>${contact.contactName}</span>
    </div>
    <div class="flex">
      <button class="icon" onclick="info('${contact.contactPhone}')">
        <i class="fa-solid fa-info"></i>
      </button>
      <button class="icon" onclick="editUser('${contact.contactPhone}')">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="icon" onclick="deleteUser('${contact.contactPhone}')">
        <i class="fa-solid fa-user-minus"></i>
      </button>
    </div>
  `;
  document.getElementById("myModal").style.display = "none";
}

function openModal() {
  document.getElementById("myModal").style.display = "flex";
}

function closeModal(event) {
  if (
    event.target === document.getElementById("closeModalBtn") ||
    event.target === document.getElementById("myModal")
  )
    document.getElementById("myModal").style.display = "none";
}

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

function saveNewUser(e) {
  e.preventDefault();
  const contactNameItem = document.getElementById("name");
  const contactNumberItem = document.getElementById("number");
  const contactEmailItem = document.getElementById("email");
  const contactAddrerssItem = document.getElementById("addrerss");
  const contactFreeTextItem = document.getElementById("text");
  const contactImgItem = document.getElementById("image");

  if (contactNameItem.value == "" || contactNumberItem.value == "") {
    alert("Cant continue without a contact name or number");
  } else {
    const contact = {
      contactName: contactNameItem.value,
      contactPhone: contactNumberItem.value,
      contactEmail: contactEmailItem.value,
      contactAddrerss: contactAddrerssItem.value,
      contactText: contactFreeTextItem.value,
      contactImage: contactImgItem.value,
    };

    contacts.push(contact);
    addContactToList(contact);
    document.getElementById("myModal").style.display = "none";
  }
}
