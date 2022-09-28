async function newFormHandler(event) {
  event.preventDefault();

  const item = document.querySelector('input[name="item_text"]').value;

  const response = await fetch(`/api/event`, {
    method: "POST",
    body: JSON.stringify({
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
  .addEventListener("submit", newFormHandler);
