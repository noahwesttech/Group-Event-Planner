async function editFormHandler(event) {
  event.preventDefault();

  const item = document.querySelector('input[name="item_text"]').value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/event/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      event_id: id,
      item,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/home");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".form-container")
  .addEventListener("submit", editFormHandler);
