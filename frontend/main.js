import './style.css';

const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showSpinner();

  const data = new FormData(form);
  const api = import.meta.env.VITE_API;

  const res = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    })
  });

  if (res.ok) {
    const { image } = await res.json();

    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width="512" />`;
  } else {
    const err = await res.text();
    alert(err);
    console.log(err);
  }



  hideSpinner();
});

//loading indicator
function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🎨</span>';
}
function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}