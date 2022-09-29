const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document
    .querySelector('input[name="event-input"]')
    .value.trim();
  const date = document.querySelector('input[name="event-date"]').value.trim();
  const location = document
    .querySelector('input[name="event-location"]')
    .value.trim();
  const description = document
    .querySelector('textarea[name="event-desc"]')
    .value.trim();
  const inviteEmailsAsString = document
    .querySelector('input[name="invite-email"]')
    .value.trim();

  let inviteEmailsAsArray = [];

  if (inviteEmailsAsString) {
    inviteEmailsAsArray = inviteEmailsAsString.split(" ");
  }

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log('title:', title);
  console.log('id:', id);
  console.log('description:', description);
  console.log('emails:', inviteEmailsAsArray);
  const response = await fetch(`/api/event/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      event_id: id,
      event_title: title,
      event_location: location,
      event_date: date,
      event_description: description,
      invite_emails: inviteEmailsAsArray,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace(`/api/event/${id}`);
  } else {
    alert(response.statusText);
    console.log(response);
  }
};

document
  .querySelector(".submit-btn")
  .addEventListener("click", editFormHandler);
