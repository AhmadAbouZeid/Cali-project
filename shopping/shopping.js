new Swiper('.card-wrapper', {
  loop: true,
spaceBetween: 30,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
      0: {
          slidesPerView: 1
      },
      768: {
          slidesPerView: 2
      },
      1024: {
          slidesPerView: 3
      },
  }

});
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const productBox = event.target.closest(".product-box"); // Ensure it selects the correct container
    addToCart(productBox);
  });
});

const cartContent = document.querySelector(".cart-content");

const addToCart = productBox => {
    // Ensure productBox elements exist
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle){
        alert("this item is already in the cart.");
        return;
      }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `<img src="${productImgSrc}" class="cart-img">
                <div class="cart-detial">
                    <h2 class="cart-product-title">${productTitle}</h2>
                    <span class="cart-price">${productPrice}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart-remove"></i>`;
    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", () =>{
      cartBox.remove();
      updateTotalPrice();
      updateCartCount(-1);
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event =>{
         const numberElement = cartBox.querySelector(".number");
         const decrementButton = cartBox.querySelector("#decrement");
         let quantity = numberElement.textContent;
         if (event.target.id === "decrement" && quantity > 1) {
          quantity--;
          if (quantity === 1) {
              decrementButton.style.color = "#999"; // Corrected line
          }
      } else if (event.target.id === "increment") {
          quantity++;
          decrementButton.style.color = "#333"; // Corrected line
      }
         numberElement.textContent = quantity;

         updateTotalPrice();
    });
    
    updateTotalPrice();

    updateCartCount(1);



};


document.querySelectorAll('.add-cart').forEach(button => {
  button.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent any default behavior
      // Your add to cart logic here
  });
});
const updateTotalPrice = () => {
      const totalPriceElement = document.querySelector(".total-price");
      const cartBoxes = cartContent.querySelectorAll(".cart-box");
      let total = 0;
      cartBoxes.forEach(cartBox => {
         const priceElement = cartBox.querySelector(".cart-price");
         const quantityElement = cartBox.querySelector(".number");
         const price = priceElement.textContent.replace("$","");
         const quantity = quantityElement.textContent;
         total += price * quantity;

      });
      totalPriceElement.textContent = `$${total}`;
};
let cartItemCount = 0;
const updateCartCount = change => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  cartItemCount += change;
  if(cartItemCount > 0){
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount;
  }
  else{
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};
const buyNowBotton = document.querySelector(".btn-buy");
buyNowBotton.addEventListener("click", () => {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  if (cartBoxes.length === 0 ){
    alert("Your Cart is empty.please add items to your cart before buying.");
    return;
  }
  cartBoxes.forEach(cartBox => cartBox.remove());

  cartItemCount = 0;
  updateCartCount(0);
  updateTotalPrice();
  alert("Thank you for your purchase!");

});
const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('transparent'); // Add the transparent class
        } else {
            header.classList.remove('transparent'); // Remove the class when scrolled up
        }
    });
    