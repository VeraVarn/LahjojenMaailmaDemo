/*////// Slider

let span = document.getElementsByTagName('span');
let product = document.getElementsByClassName('product');

let l = 0; // Initial position of the slider
let movePer = 25; // Default move percentage for large screens
let maxMove = 100; // Default maximum move for large screens

const updateMovementValues = () => {
    // Set default values for large screens (>= 768px width)
    movePer = 25.34; 
    maxMove = 101.36;

    // For small screens (< 425px width), update movement values
    if (window.innerWidth <= 425) {
        movePer = 100.4; // Move one product at a time
        maxMove = 702.8; // Maximum move distance for 8 products
    } 
    // For medium screens (< 768px width), update movement values
    else if (window.innerWidth <= 768) {
        movePer = 50.36; // Move two products at a time
        maxMove = 302.16; // Maximum move distance for 8 products
    }
};

// Initialize movement values when the page loads
updateMovementValues();

// Update movement values on window resize
window.addEventListener('resize', updateMovementValues);

let right_mover = () => {
    l = l + movePer; // Increase the current position
    if (l > maxMove) { l = maxMove; } // Prevent moving beyond max limit
    for (const i of product) {
        i.style.left = '-' + l + '%'; // Update product position
    }
};

let left_mover = () => {
    l = l - movePer; // Decrease the current position
    if (l < 0) { l = 0; } // Prevent moving below 0
    for (const i of product) {
        i.style.left = '-' + l + '%'; // Update product position
    }
};

// Event listeners for the arrow buttons
span[1].onclick = () => { right_mover(); };
span[0].onclick = () => { left_mover(); };


/////// Current year

document.addEventListener("DOMContentLoaded", function () {
    var year = new Date().getFullYear();
    document.getElementById("year").textContent = year;
  });

/////// Language button

// Get references to the button and dropdown elements
const languageButton = document.querySelector('.language-button');
const dropdownMenu = document.querySelector('.header-switch-language-dropdown');
const menuItems = document.querySelectorAll('.header-menu-item');

// Toggle the dropdown visibility and active state when the button is clicked
languageButton.addEventListener('click', () => {
    const isDropdownOpen = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isDropdownOpen ? 'none' : 'block';

    // Toggle the active class on the button based on dropdown state
    languageButton.classList.toggle('active', !isDropdownOpen);
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (!event.target.matches('.language-button') && !event.target.matches('.header-menu-item')) {
        dropdownMenu.style.display = 'none';
        languageButton.classList.remove('active'); // Remove active state when clicking outside
    }
});

// Set the active language and close the dropdown when a menu item is clicked
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove the active class from all items
        menuItems.forEach(i => i.classList.remove('active'));
        // Add the active class to the clicked item
        item.classList.add('active');
        // Close the dropdown and update the button state
        dropdownMenu.style.display = 'none';
        languageButton.classList.remove('active'); // Remove active state from the button
    });
});

/////// Mobile menu toggle

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const mobileMenuItems = document.querySelector('.mobile-menu-items');

    toggleButton.addEventListener('click', function () {
        mobileMenuItems.classList.toggle('active'); // Toggle visibility of the mobile menu
    });
});

/////// Fetch header and footer

/*document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Load header content from a separate HTML file
    fetch('header.html')
        .then(response => response.text())
        .then(data => header.innerHTML = data);

    // Load footer content from a separate HTML file
    fetch('footer.html')
        .then(response => response.text())
        .then(data => footer.innerHTML = data);
});*/


/*////// Simple product filter and search

// Sample product data
const products = [
    { name: "T-shirt", category: "Apparel" },
    { name: "Cap", category: "Accessories" },
    { name: "Mug", category: "Home" },
    { name: "Jacket", category: "Apparel" },
    { name: "Scarf", category: "Accessories" },
    { name: "Plate Set", category: "Home" },
    { name: "Sweater", category: "Apparel" },
    { name: "Belt", category: "Accessories" },
    { name: "Cushion", category: "Home" },
    { name: "Socks", category: "Apparel" },
    { name: "Sunglasses", category: "Accessories" },
    { name: "Lamp", category: "Home" },
    { name: "Jeans", category: "Apparel" },
    { name: "Keychain", category: "Accessories" },
    { name: "Vase", category: "Home" },
    { name: "Shoes", category: "Apparel" },
    { name: "Gloves", category: "Accessories" },
    { name: "Clock", category: "Home" },
    { name: "Hat", category: "Apparel" },
    { name: "Wallet", category: "Accessories" },
    { name: "Picture Frame", category: "Home" },
    { name: "Hoodie", category: "Apparel" },
    { name: "Bracelet", category: "Accessories" },
    { name: "Rug", category: "Home" },
    { name: "Shorts", category: "Apparel" },
    { name: "Watch", category: "Accessories" },
    { name: "Candle", category: "Home" },
    { name: "Tank Top", category: "Apparel" },
    { name: "Necklace", category: "Accessories" },
    { name: "Curtains", category: "Home" }
];

// Function to display products
const displayProducts = (filteredProducts) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Clear previous products

    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <div class="product-title">${product.name}</div>
            <div class="product-category">${product.category}</div>
        `;
        productList.appendChild(productItem);
    });
};

// Initial display of all products
displayProducts(products);

// Event listener for the search bar
document.getElementById('search-bar').addEventListener('input', (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );
    displayProducts(filteredProducts);
});

// Event listeners for the category filters
const categoryFilters = document.querySelectorAll('.category-filter');
categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        const activeFilters = Array.from(categoryFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const filteredProducts = products.filter(product =>
            activeFilters.length === 0 || activeFilters.includes(product.category)
        );

        displayProducts(filteredProducts);
    });
});

console.log(filteredProducts);*/

/////// Slider

let span = document.getElementsByTagName('span');
let product = document.getElementsByClassName('product');

let l = 0; // Initial position of the slider
let movePer = 25; // Default move percentage for large screens
let maxMove = 100; // Default maximum move for large screens

const updateMovementValues = () => {
    // Set default values for large screens (>= 768px width)
    movePer = 25.34; 
    maxMove = 101.36;

    // For small screens (< 425px width), update movement values
    if (window.innerWidth <= 425) {
        movePer = 100.4; // Move one product at a time
        maxMove = (products.length - 1) * 100; // Maximum move distance for products
    } 
    // For medium screens (< 768px width), update movement values
    else if (window.innerWidth <= 768) {
        movePer = 50.36; // Move two products at a time
        maxMove = (products.length - 2) * 100; // Maximum move distance for products
    }
};

// Initialize movement values when the page loads
updateMovementValues();

// Update movement values on window resize
window.addEventListener('resize', updateMovementValues);

let right_mover = () => {
    l += movePer; // Increase the current position
    if (l > maxMove) { l = maxMove; } // Prevent moving beyond max limit
    for (const i of product) {
        i.style.left = '-' + l + '%'; // Update product position
    }
};

let left_mover = () => {
    l -= movePer; // Decrease the current position
    if (l < 0) { l = 0; } // Prevent moving below 0
    for (const i of product) {
        i.style.left = '-' + l + '%'; // Update product position
    }
};

// Event listeners for the arrow buttons
if (span[1]) {
    span[1].onclick = right_mover;
}
if (span[0]) {
    span[0].onclick = left_mover;
}


/////// Current year

document.addEventListener("DOMContentLoaded", function () {
    var year = new Date().getFullYear();
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = year;
    }
});

/////// Language button

// Get references to the button and dropdown elements
const languageButton = document.querySelector('.language-button');
const dropdownMenu = document.querySelector('.header-switch-language-dropdown');
const menuItems = document.querySelectorAll('.header-menu-item');

// Toggle the dropdown visibility and active state when the button is clicked
if (languageButton && dropdownMenu) {
    languageButton.addEventListener('click', () => {
        const isDropdownOpen = dropdownMenu.style.display === 'block';
        dropdownMenu.style.display = isDropdownOpen ? 'none' : 'block';

        // Toggle the active class on the button based on dropdown state
        languageButton.classList.toggle('active', !isDropdownOpen);
    });
}

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (!event.target.matches('.language-button') && !event.target.matches('.header-menu-item')) {
        dropdownMenu.style.display = 'none';
        languageButton.classList.remove('active'); // Remove active state when clicking outside
    }
});

// Set the active language and close the dropdown when a menu item is clicked
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove the active class from all items
        menuItems.forEach(i => i.classList.remove('active'));
        // Add the active class to the clicked item
        item.classList.add('active');
        // Close the dropdown and update the button state
        dropdownMenu.style.display = 'none';
        languageButton.classList.remove('active'); // Remove active state from the button
    });
});

/////// Mobile menu toggle

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const mobileMenuItems = document.querySelector('.mobile-menu-items');

    if (toggleButton && mobileMenuItems) {
        toggleButton.addEventListener('click', function () {
            mobileMenuItems.classList.toggle('active'); // Toggle visibility of the mobile menu
        });
    }
});

/////// Fetch header and footer

/*document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Load header content from a separate HTML file
    fetch('header.html')
        .then(response => response.text())
        .then(data => header.innerHTML = data);

    // Load footer content from a separate HTML file
    fetch('footer.html')
        .then(response => response.text())
        .then(data => footer.innerHTML = data);
});*/


/////// Simple product filter and search

// Sample product data
const products = [
    { name: "T-shirt", category: "Apparel" },
    { name: "Cap", category: "Accessories" },
    { name: "Mug", category: "Home" },
    { name: "Jacket", category: "Apparel" },
    { name: "Scarf", category: "Accessories" },
    { name: "Plate Set", category: "Home" },
    { name: "Sweater", category: "Apparel" },
    { name: "Belt", category: "Accessories" },
    { name: "Cushion", category: "Home" },
    { name: "Socks", category: "Apparel" },
    { name: "Sunglasses", category: "Accessories" },
    { name: "Lamp", category: "Home" },
    { name: "Jeans", category: "Apparel" },
    { name: "Keychain", category: "Accessories" },
    { name: "Vase", category: "Home" },
    { name: "Shoes", category: "Apparel" },
    { name: "Gloves", category: "Accessories" },
    { name: "Clock", category: "Home" },
    { name: "Hat", category: "Apparel" },
    { name: "Wallet", category: "Accessories" },
    { name: "Picture Frame", category: "Home" },
    { name: "Hoodie", category: "Apparel" },
    { name: "Bracelet", category: "Accessories" },
    { name: "Rug", category: "Home" },
    { name: "Shorts", category: "Apparel" },
    { name: "Watch", category: "Accessories" },
    { name: "Candle", category: "Home" },
    { name: "Tank Top", category: "Apparel" },
    { name: "Necklace", category: "Accessories" },
    { name: "Curtains", category: "Home" }
];

// Function to display products
const displayProducts = (filteredProducts) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Clear previous products

    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <div class="product-title">${product.name}</div>
            <div class="product-category">${product.category}</div>
        `;
        productList.appendChild(productItem);
    });
};

// Initial display of all products
displayProducts(products);

// Event listener for the search bar
document.getElementById('search-bar').addEventListener('input', (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );
    displayProducts(filteredProducts);
});

// Event listeners for the category filters
const categoryFilters = document.querySelectorAll('.category-filter');
categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        const activeFilters = Array.from(categoryFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const filteredProducts = products.filter(product =>
            activeFilters.length === 0 || activeFilters.includes(product.category)
        );

        displayProducts(filteredProducts);
    });
});

