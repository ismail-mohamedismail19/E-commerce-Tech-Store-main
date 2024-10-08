document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("selected");
        t.classList.remove("fw-bold");
        t.classList.add("text-muted");
      });

      contents.forEach((content) => {
        content.classList.remove("visible");
        content.style.display = "none";
      });

      // Show the content associated with the clicked tab
      const targetContentId = tab.getAttribute("data-target");
      const targetContent = document.getElementById(targetContentId);
      if (targetContent) {
        targetContent.style.display = "block";
        setTimeout(() => {
          targetContent.classList.add("visible");
        }, 10);
      }

      tab.classList.add("selected");
      tab.classList.add("fw-bold");
      tab.classList.remove("text-muted");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const dots = document.querySelectorAll(".dot");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const newSrc = dot.getAttribute("data-target");
      mainImage.src = newSrc;

      dots.forEach((d) => d.classList.remove("active"));

      dot.classList.add("active");
    });
  });

  if (dots.length > 0) {
    dots[0].classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const contents = document.querySelectorAll(".product-info .content");

  contents.forEach((content) => {
    content.classList.add("visible");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contents = document.querySelectorAll(".product-info .content");

  contents.forEach((content) => {
    content.classList.add("visible");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const productInfo = document.querySelector(".content-box");

  if (productInfo) {
    productInfo.classList.add("visible");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle) => {
    circle.addEventListener("click", () => {
      circles.forEach((c) => c.classList.remove("selected"));

      circle.classList.add("selected");
    });
  });
});



/* side panel */
document.querySelector('.header-action-btn').addEventListener('click', function() {
  document.getElementById('sidePanel').classList.add('show');
});

document.querySelector('.close-btn').addEventListener('click', function() {
  document.getElementById('sidePanel').classList.remove('show');
});


/* Add to Cart integrate with side panel */

// Function to update the side panel based on localStorage
function updateSidePanel() {
  const sidePanel = document.getElementById('sidePanel');
  if (!sidePanel) return; // Exit if sidePanel is not found

  const itemList = sidePanel.querySelector('.item-list');
  const totalPriceElement = sidePanel.querySelector('.total-price');

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Check if cart is empty
  if (cartItems.length === 0) {
    itemList.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceElement.textContent = '$0.00'; // Set total price to $0.00 when empty
    updateCartBadge(0); // Update badge count to 0
    return; // Exit function early
  }

  // Clear existing items
  itemList.innerHTML = '';

  let subtotal = 0;
  let totalItems = 0;

  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';

    itemElement.innerHTML = `
      <img src="${item.photo}" alt="Item Photo" class="item-photo">
      <div class="item-info">
        <p class="item-name">${item.name}</p>
        <p class="item-price">Price: ${item.price}</p>
        <p class="item-qty">Qty: ${item.qty}</p>
        <p class="item-color">Color: <span class="color-display" style="background-color: ${item.color};"></span></p>
      </div>
      <button class="remove-btn" data-id="${item.id}" aria-label="Remove item">&times;</button>
    `;

    itemList.appendChild(itemElement);

    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    subtotal += price * item.qty;
    totalItems += item.qty; // Count total items
  });

  totalPriceElement.textContent = `$${subtotal.toFixed(2)}`;
  updateCartBadge(totalItems); // Update badge count
}

// Function to update the cart badge
function updateCartBadge(count) {
  const cartBadge = document.getElementById('cartBadge');
  if (cartBadge) {
    cartBadge.textContent = count;
  }
}

// Check if the addToCartBtn exists before adding event listener
const addToCartBtn = document.getElementById('addToCartBtn');
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', function() {
    const qtyInput = document.getElementById('quantityInput');
    const qty = parseInt(qtyInput.value, 10);

    if (qty > 0) {
      const mainImage = document.getElementById('mainImage').src;
      const productTitle = document.querySelector('.product-info h1').textContent.trim();
      const productPrice = document.querySelector('.product-price').textContent.trim();
      const selectedCircle = document.querySelector('.circle-container .circle.selected');
      const selectedColor = selectedCircle ? selectedCircle.classList[1] : '';

      const colorMap = {
        'circle-1': '#4b4d4f',
        'circle-2': '#f2e9dc',
        'circle-3': '#eae8eb'
      };

      const colorCode = colorMap[selectedColor] || '';

      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      const existingItemIndex = cartItems.findIndex(item => item.name === productTitle && item.color === colorCode);

      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].qty += qty;
      } else {
        const newItem = {
          id: Date.now(),
          name: productTitle,
          price: productPrice,
          qty: qty,
          photo: mainImage,
          color: colorCode
        };

        cartItems.push(newItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateSidePanel();
    }
  });
}

// Ensure the side panel is updated on page load
updateSidePanel();

// Handle remove item button clicks
document.getElementById('sidePanel').addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-btn')) {
    const itemId = event.target.getAttribute('data-id');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems = cartItems.filter(item => item.id != itemId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateSidePanel();
  }
});




/* shopping cart page */
// Function to update the cart table based on localStorage
function updateCartPage() {
  const cartTableBody = document.querySelector('.cart-table tbody');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  if (cartItems.length === 0) {
    cartTableBody.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
    return;
  }

  let subtotal = 0;

  // Clear existing items
  cartTableBody.innerHTML = '';

  cartItems.forEach(item => {
    const itemRow = document.createElement('tr');
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    const total = (price * item.qty).toFixed(2);

    // Build color circles dynamically
    const colorCircles = `
      <div class="circle-container">
        <div class="circle circle-1" style="background-color: #4b4d4f; ${item.color === '#4b4d4f' ? '' : 'display: none;'}"></div>
        <div class="circle circle-2" style="background-color: #f2e9dc; ${item.color === '#f2e9dc' ? '' : 'display: none;'}"></div>
        <div class="circle circle-3" style="background-color: #eae8eb; ${item.color === '#eae8eb' ? '' : 'display: none;'}"></div>
      </div>
    `;

    itemRow.innerHTML = `
      <td class="cart-item-info">
        <img src="${item.photo}" alt="Product Image" class="product-image" />
        <p>${item.name}</p>
        ${colorCircles}
      </td>
      <td>${item.price}</td>
      <td>
        <input type="number" value="${item.qty}" class="quantity-input" data-id="${item.id}" min="1" />
      </td>
      <td>${total}</td>
      <td>
        <button class="remove-item" data-id="${item.id}">&#10006;</button>
      </td>
    `;
    cartTableBody.appendChild(itemRow);

    subtotal += parseFloat(total);
  });

  // Update totals and other info if needed
  document.querySelector('.summary-info-row span.order-total').textContent = `$${subtotal.toFixed(2)}`;
}

// Event listener for quantity changes
document.querySelector('.cart-table').addEventListener('input', function(event) {
  if (event.target.classList.contains('quantity-input')) {
    const newQty = parseInt(event.target.value, 10);
    const itemId = event.target.getAttribute('data-id');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id == itemId);

    if (itemIndex > -1 && newQty > 0) {
      cartItems[itemIndex].qty = newQty;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartPage();
    }
  }
});

// Event listener for remove button clicks
document.querySelector('.cart-table').addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-item')) {
    const itemId = event.target.getAttribute('data-id');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id != itemId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartPage();
  }
});

// Initial page load
updateCartPage();
