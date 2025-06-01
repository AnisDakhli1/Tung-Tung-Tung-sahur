document.addEventListener('DOMContentLoaded', () => {
    // Slider Functionality
    const slider = document.getElementById('product-slider');
    const slides = slider.querySelectorAll('.section__slider');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    let currentSlide = 0;
    let autoPlayInterval;

    const showSlide = (index) => {
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    const nextSlide = () => {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        showSlide(currentSlide);
    };

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();

    // Category Filtering
    const categoryLinks = document.querySelectorAll('.dropdown__panel__list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category');
            slides.forEach(slide => {
                const productCategory = slide.getAttribute('data-product');
                if (category === 'all' || productCategory === category) {
                    slide.style.display = 'flex';
                } else {
                    slide.style.display = 'none';
                }
            });
            showSlide(0); // Reset to first slide
        });
    });

    // Cart Functionality
    const cartCount = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        cartCount.textContent = cartItems.length;
    };

    document.querySelectorAll('.btn[href*="buying_card"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.section__slider').querySelector('h3').textContent;
            cartItems.push({ product, price: product.includes('Key Ring') ? 7 : 25 });
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCartCount();
        });
    });

    updateCartCount();
});