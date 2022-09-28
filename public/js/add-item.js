const newFormHandler = async (event) => {
  event.preventDefault();

  const item = document.querySelector('input[name="item_text"]').value;


  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/item/${id}`, {
      method: "POST",
      body: JSON.stringify({
        item,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (response.ok) {
      document.location.replace(`/api/event/${id}`);
    } else {
      alert(response.statusText);
    }
  } else {
    console.log('No data-id');
  }
};

document
  .querySelector(".form-container")
  .addEventListener("submit", newFormHandler);
