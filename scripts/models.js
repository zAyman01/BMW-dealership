document.querySelectorAll('.show').forEach(button => {
    button.addEventListener('click', () => {
        const extraImages = button.parentElement.querySelector('.extra-images');
        if (extraImages) {
            const isVisible = extraImages.style.display === 'block';
            extraImages.style.display = isVisible ? 'none' : 'block';
            button.querySelector('span').textContent = isVisible ? 'Show More' : 'Show Less';
        }
    });
});