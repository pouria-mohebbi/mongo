import { createUser } from "./dataServices.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const { res, error } = await createUser(data);
    if (res) {
      alert("Benutzer erfolgreich erstellt!");
      form.reset(); 
    } else if (error) {
      alert("Es ist ein Fehler aufgetreten.");
    }
  } catch (err) {
    console.error(err);
    alert("Ein unerwarteter Fehler ist aufgetreten.");
  }
});
const baseURL = "https://api.example.com/users"; 


const createUser = async (userData) => {
  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { res: null, error: errorData };
    }

    const res = await response.json();
    return { res, error: null };
  } catch (error) {
    return { res: null, error };
  }
};


const getAllUser = async () => {
  try {
    const response = await fetch(baseURL);

    if (!response.ok) {
      const errorData = await response.json();
      return { res: null, error: errorData };
    }

    const res = await response.json();
    return { res, error: null };
  } catch (error) {
    return { res: null, error };
  }
};


const deleteUser = async (id) => {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { res: null, error: errorData };
    }

    const res = await response.json();
    return { res, error: null };
  } catch (error) {
    return { res: null, error };
  }
};

export { getAllUser, deleteUser, createUser };
import { createUser } from "./dataServices.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const { res, error } = await createUser(data);

  if (res) {
    alert("Benutzer erfolgreich erstellt!");
    form.reset();
  } else if (error) {
    alert("Es ist ein Fehler aufgetreten.");
    console.error(error);
  }
});
import { getAllUser, deleteUser } from "./dataServices.js";

const cardContainer = document.querySelector(".cardContainer");


function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.width = "18rem";
  card.dataset.id = user._id; 
  const deleteButton = card.querySelector(".delete-but");
  deleteButton.addEventListener("click", async () => {
    const { res, error } = await deleteUser(user._id);
    if (res) {
      card.remove();
      alert("Benutzer erfolgreich gelöscht!");
    } else if (error) {
      alert("Es ist ein Fehler aufgetreten.");
    }
  });

  return card;
}


async function displayUsers() {
  try {
    const { res: users, error } = await getAllUser();
    if (error) {
      console.error(error);
      alert("Fehler beim Abrufen der Benutzerdaten.");
      return;
    }

    
    cardContainer.innerHTML = "";

    users.forEach((user) => {
      const userCard = createUserCard(user);
      cardContainer.appendChild(userCard);
    });
  } catch (err) {
    console.error(err);
    alert("Ein unerwarteter Fehler ist aufgetreten.");
  }
}


displayUsers();