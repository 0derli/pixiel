const filterBtns = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.serviceCard');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filterValue = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filterValue === 'all' || (categories && categories.split(' ').includes(filterValue))) {
                card.style.display = 'flex'; 
            } else {
                card.style.display = 'none';
            }
        });
    });
});