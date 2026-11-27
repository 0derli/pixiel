document.addEventListener("DOMContentLoaded", () => {
        const dateInput = document.querySelector('.bookingForm input[type="date"]');
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    });

    document.querySelector('.bookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        e.target.reset();
    });