const newEventFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#event-input").value.trim();
  const date = document.querySelector("#event-date").value.trim();
  const location = document.querySelector("#event-location").value.trim();
  const description = document.querySelector("#event-desc").value.trim();


  const inviteEmailsAsString = document
    .querySelector("#invite-email")
    .value.trim();

  let inviteEmailsAsArray = [];

  // the split function would put an empty string at index 0
  // if nothing was entered into the box by the user. This ensures
  // we only split the string whenever the string has a value.
  if (inviteEmailsAsString) {
    inviteEmailsAsArray = inviteEmailsAsString.split(" ");
  }

  if (title && inviteEmailsAsArray.length > 0) {
    const response = await fetch("/api/event", {
      method: "POST",
      body: JSON.stringify({

        event_title: title,
        event_location: location,
        event_date: date,
        event_description: description,
        invite_emails: inviteEmailsAsArray,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  } else {
    alert(
      "Not enough information. Please fill out the entire form before submitting."
    );
    return;
  }
};

document
  .getElementById("submit-btn")
  .addEventListener("click", newEventFormHandler);
