document.querySelector('.bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.querySelector('input[type="text"]').value.trim();
  const contact = form.querySelectorAll('input[type="text"]')[1].value.trim();
  const service = form.querySelector('select').value;
  const date = form.querySelector('input[type="date"]').value;

  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, contact, service, date }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Ошибка отправки');

    alert('Заявка отправлена! Мы свяжемся с вами.');
    form.reset();
  } catch (err) {
    alert(err.message);
  }
});