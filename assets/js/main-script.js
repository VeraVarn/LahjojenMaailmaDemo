/////// Slider

class ProductSlider {
    constructor(containerSelector, movePerLarge = 25.34, maxMoveLarge = 101.36) {
        this.container = document.querySelector(containerSelector);
        this.products = this.container.querySelectorAll('.product');
        this.movePer = movePerLarge;
        this.maxMove = maxMoveLarge;
        this.position = 0; // Initial position of the slider

        this.updateMovementValues();
        window.addEventListener('resize', () => this.updateMovementValues());
    }

    updateMovementValues() {
        if (window.innerWidth <= 425) {
            this.movePer = 100.4;
            this.maxMove = (this.products.length - 1) * 100;
        } else if (window.innerWidth <= 768) {
            this.movePer = 50.36;
            this.maxMove = (this.products.length - 2) * 100;
        } else {
            this.movePer = 25.34;
            this.maxMove = 101.36;
        }
    }

    right() {
        this.position += this.movePer;
        if (this.position > this.maxMove) this.position = this.maxMove;
        this.updateProductPositions();
    }

    left() {
        this.position -= this.movePer;
        if (this.position < 0) this.position = 0;
        this.updateProductPositions();
    }

    updateProductPositions() {
        for (const product of this.products) {
            product.style.transform = `translateX(-${this.position}%)`;
        }
    }
}

// Initialize sliders for different sections on the page

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainers = document.querySelectorAll('.product-slider');

    sliderContainers.forEach((container) => {
        const slider = new ProductSlider(`#${container.id}`);

        const leftArrow = container.querySelector('.slider-arrows span:first-child');
        const rightArrow = container.querySelector('.slider-arrows span:last-child');

        if (leftArrow && rightArrow) {
            leftArrow.addEventListener('click', () => slider.left());
            rightArrow.addEventListener('click', () => slider.right());
        }
    });
});


/////// Current year

document.addEventListener("DOMContentLoaded", function () {
    var year = new Date().getFullYear();
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = year;
    }
});


/////// Language button

const languageButton = document.querySelector('.language-button');
const dropdownMenu = document.querySelector('.header-switch-language-dropdown');
const menuItems = document.querySelectorAll('.header-switch-language-dropdown .header-menu-item');

function setDefaultActiveLanguage(language) {
    menuItems.forEach(item => item.classList.remove('active'));
    const activeItem = Array.from(menuItems).find(item => item.textContent.trim() === language);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setDefaultActiveLanguage('English');
});

if (languageButton && dropdownMenu) {
    languageButton.addEventListener('click', () => {
        const isDropdownOpen = dropdownMenu.style.display === 'block';
        dropdownMenu.style.display = isDropdownOpen ? 'none' : 'block';
    });
}

window.addEventListener('click', (event) => {
    if (!event.target.matches('.language-button') && !event.target.matches('.header-menu-item')) {
        dropdownMenu.style.display = 'none';
    }
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        dropdownMenu.style.display = 'none';
    });
});


/////// Mobile menu toggle

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const mobileMenuItems = document.querySelector('.mobile-menu-items');

    if (toggleButton && mobileMenuItems) {
        toggleButton.addEventListener('click', function () {
            console.log("Toggle button clicked");
            mobileMenuItems.classList.toggle('active'); // Toggle visibility of the mobile menu
        });
    }
});


//////// Product filter

const products = [
    { name: "Pajamas", category: "Apparel", brand: "Brand", price: 59, image: "assets/images/pajamas.jpg" },
    { name: "Glassware", category: "Home", brand: "Brand", price: 13, image: "assets/images/glassware.jpg" },
    { name: "Jewerly", category: "Accessories", brand: "Brand", price: 150, image: "assets/images/jewerly.jpg" },
    { name: "Mug", category: "Home", brand: "Brand", price: 15, image: "assets/images/mug.jpg" },
    { name: "Knife", category: "Home", brand: "Brand", price: 60, image: "assets/images/knife.jpg" },
    { name: "Kettle", category: "Home", brand: "Brand", price: 80, image: "assets/images/kettle.jpg" },
    { name: "Dress", category: "Apparel", brand: "Brand", price: 55, image: "assets/images/dress.jpg" },
    { name: "Gloves", category: "Accessories", brand: "Brand", price: 62, image: "assets/images/gloves.jpg" },
    { name: "Leather bag", category: "Accessories", brand: "Brand", price: 360, image: "assets/images/bag.jpg" },
    { name: "Scarf", category: "Accessories", brand: "Brand", price: 40, image: "assets/images/scarf.jpg" }
];

const displayProducts = (filteredProducts) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    filteredProducts.forEach(product => {
        const productItem = document.createElement('product-area');
        productItem.classList.add('product');
        productItem.innerHTML = `
            <div class="product-img-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            </div>
            <div class="product-info"
            <div class="product-title">${product.name}</div>
            <div class="product-name"><b>${product.brand}</b></div>
            <div class="price">${product.price}€</div>
            <button class="product-link-button">Visit here to buy</button>
            </div>
        `;
        productList.appendChild(productItem);
    });
};

displayProducts(products);

document.getElementById('search-bar').addEventListener('input', (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredProducts = filterProducts(searchText);
    displayProducts(filteredProducts);
});

const categoryFilters = document.querySelectorAll('.category-filter');
categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        const searchText = document.getElementById('search-bar').value.toLowerCase();
        const filteredProducts = filterProducts(searchText);
        displayProducts(filteredProducts);
    });
});

document.getElementById('min-price').addEventListener('input', () => {
    const searchText = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = filterProducts(searchText);
    displayProducts(filteredProducts);
});

document.getElementById('max-price').addEventListener('input', () => {
    const searchText = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = filterProducts(searchText);
    displayProducts(filteredProducts);
});

function filterProducts(searchText) {
    const minPrice = parseFloat(document.getElementById('min-price').value);
    const maxPrice = parseFloat(document.getElementById('max-price').value);

    const activeCategories = Array.from(categoryFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchText);
        const matchesCategory = activeCategories.length === 0 || activeCategories.includes(product.category);
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });
}