const delButtonHandler = async (event) => {
    console.log('clicked');
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/event/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert('Failed to delete event');
    }
  } else {
    console.log('No data-id');
  }
};

document.querySelector('.d-btn').addEventListener('click', delButtonHandler);