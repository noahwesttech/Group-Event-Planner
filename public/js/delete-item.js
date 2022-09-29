const deleteFormHandler = async (event) => {
  event.preventDefault();
  
  const eventId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/item/${id}`, {
      method: "DELETE",
  });

  if (response.ok) {
    document.location.replace(`/api/event/${eventId}`);
  } else {
    alert(response.statusText);
  }
  } else {
    console.log('No data-id');
  }
};

const delBtns = document.querySelectorAll('.del-btn');

delBtns.forEach(delBtn => {
  delBtn.addEventListener("click", deleteFormHandler);
});
