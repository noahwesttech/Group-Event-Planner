const deleteFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/item/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      event_id: id,
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
};

document
  .querySelector(".delete-btn")
  .addEventListener("click", deleteFormHandler);
