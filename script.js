/* =========================
   THRIFTY PRODUCT DATABASE
========================= */

const products = [

  {
    id:1,
    name:"Essential Overshirt",
    category:"Unisex",
    price:3499,
    badge:"NEW",
    image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=90",
    secondImage:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=90"
  },

  {
    id:2,
    name:"Heavyweight Tee",
    category:"Men",
    price:1899,
    badge:"BEST SELLER",
    image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=90",
    secondImage:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=90"
  },

  {
    id:3,
    name:"Studio Trousers",
    category:"Women",
    price:3299,
    badge:"NEW",
    image:"https://images.unsplash.com/photo-1506629905607-d9c36dbe0f24?auto=format&fit=crop&w=1000&q=90",
    secondImage:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=90"
  },

  {
    id:4,
    name:"Form Knit",
    category:"Unisex",
    price:2799,
    image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=90",
    secondImage:"https://images.unsplash.com/photo-1583743814966-8936f37f4f33?auto=format&fit=crop&w=1000&q=90"
  },

  {
    id:5,
    name:"Relaxed Denim",
    category:"Men",
    price:3999,
    image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=90",
    secondImage:"https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=90"
  },

  {
    id:6,
    name:"Soft Tailored Shirt",
    category:"Women",
    price:2999,
    image:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=90",
    secondImage:"https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=1000&q=90"
  },

  {
    id:7,
    name:"Minimal Hoodie",
    category:"Unisex",
    price:3199,
    badge:"BEST SELLER",
    image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=90",
    secondImage:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=90"
  },

  {
    id:8,
    name:"Daily Cargo",
    category:"Men",
    price:3699,
    image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=90",
    secondImage:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=90"
  }

];


/* =========================
   STATE
========================= */

let cart =
  JSON.parse(localStorage.getItem("thriftyCart")) || [];

let wishlist =
  JSON.parse(localStorage.getItem("thriftyWishlist")) || [];


/* =========================
   HELPERS
========================= */

const $ = selector =>
  document.querySelector(selector);

const money = value =>
  "₹" + value.toLocaleString("en-IN");


/* =========================
   PRODUCT CARD
========================= */

function createProductCard(product){

  const liked =
    wishlist.includes(product.id);

  return `

    <article
      class="product-card reveal"
      data-id="${product.id}"
    >

      <div
        class="product-image"
        onclick="openProduct(${product.id})"
      >

        ${
          product.badge
            ? `<span class="product-badge">
                ${product.badge}
              </span>`
            : ""
        }

        <button
          class="wishlist-button ${liked ? "active" : ""}"
          onclick="
            event.stopPropagation();
            toggleWishlist(${product.id})
          "
        >
          ${liked ? "♥" : "♡"}
        </button>

        <img
          src="${product.image}"
          data-second="${product.secondImage}"
          alt="${product.name}"
          loading="lazy"
        >

      </div>


      <div class="product-info">

        <div>

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.category}
          </p>

        </div>

        <span class="product-price">
          ${money(product.price)}
        </span>


        <button
          class="quick-add"
          onclick="
            event.stopPropagation();
            addToCart(${product.id})
          "
        >
          QUICK ADD +
        </button>

      </div>

    </article>

  `;
}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(){

  const featured =
    products.slice(0,4);

  const newArrivals =
    products.slice(2,8);

  const best =
    products.filter(
      product =>
        product.badge === "BEST SELLER"
    );

  $("#featuredProducts").innerHTML =
    featured.map(createProductCard).join("");

  $("#newProducts").innerHTML =
    newArrivals.map(createProductCard).join("");

  $("#bestProducts").innerHTML =
    best.map(createProductCard).join("");

  setupProductHover();

  observeReveal();
}


/* =========================
   PRODUCT HOVER IMAGE
========================= */

function setupProductHover(){

  document
    .querySelectorAll(".product-card")
    .forEach(card => {

      const image =
        card.querySelector("img");

      if(!image) return;

      card.addEventListener(
        "mouseenter",
        () => {

          const temporary =
            image.src;

          image.src =
            image.dataset.second;

          image.dataset.second =
            temporary;

        }
      );

      card.addEventListener(
        "mouseleave",
        () => {

          const temporary =
            image.src;

          image.src =
            image.dataset.second;

          image.dataset.second =
            temporary;

        }
      );

    });

}


/* =========================
   CART
========================= */

function addToCart(id){

  const existing =
    cart.find(item => item.id === id);

  if(existing){

    existing.quantity++;

  }else{

    cart.push({
      id:id,
      quantity:1
    });

  }

  saveState();

  showToast(
    "ADDED TO YOUR BAG"
  );

  openDrawer("cartDrawer");
}


function removeFromCart(id){

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveState();
}


function changeQuantity(id, amount){

  const item =
    cart.find(
      item => item.id === id
    );

  if(!item) return;

  item.quantity += amount;

  if(item.quantity <= 0){

    removeFromCart(id);

  }else{

    saveState();

  }

}


/* =========================
   WISHLIST
========================= */

function toggleWishlist(id){

  if(wishlist.includes(id)){

    wishlist =
      wishlist.filter(
        item => item !== id
      );

    showToast(
      "REMOVED FROM WISHLIST"
    );

  }else{

    wishlist.push(id);

    showToast(
      "SAVED TO WISHLIST"
    );

  }

  saveState();

  renderProducts();

}


/* =========================
   UPDATE UI
========================= */

function updateUI(){

  const cartCount =
    cart.reduce(
      (total,item) =>
        total + item.quantity,
      0
    );

  const total =
    cart.reduce(
      (sum,item) => {

        const product =
          products.find(
            p => p.id === item.id
          );

        return sum +
          product.price *
          item.quantity;

      },
      0
    );


  $("#cartCount").textContent =
    cartCount;

  $("#drawerCartCount").textContent =
    cartCount;


  $("#wishlistCount").textContent =
    wishlist.length;

  $("#drawerWishlistCount").textContent =
    wishlist.length;


  $("#subtotal").textContent =
    money(total);


  /* CART ITEMS */

  if(cart.length === 0){

    $("#cartItems").innerHTML = `
      <div style="
        padding:60px 0;
        color:#777;
      ">
        Your bag is currently empty.
      </div>
    `;

  }else{

    $("#cartItems").innerHTML =

      cart.map(item => {

        const product =
          products.find(
            p => p.id === item.id
          );

        return `

          <div class="cart-item">

            <img
              src="${product.image}"
              alt="${product.name}"
            >

            <div>

              <h4>
                ${product.name}
              </h4>

              <small>
                ${product.category}
                ·
                ${money(product.price)}
              </small>

              <div class="quantity">

                <button
                  onclick="
                    changeQuantity(
                      ${product.id},
                      -1
                    )
                  "
                >
                  −
                </button>

                ${item.quantity}

                <button
                  onclick="
                    changeQuantity(
                      ${product.id},
                      1
                    )
                  "
                >
                  +
                </button>

              </div>

            </div>

            <button
              class="remove-item"
              onclick="
                removeFromCart(
                  ${product.id}
                )
              "
            >
              REMOVE
            </button>

          </div>

        `;

      }).join("");

  }


  /* SHIPPING */

  const progress =
    Math.min(
      total / 5000 * 100,
      100
    );

  $("#shippingProgress")
    .style.width =
      progress + "%";


  if(total >= 5000){

    $("#shippingText").textContent =
      "Complimentary shipping unlocked.";

  }else{

    $("#shippingText").textContent =
      `Add ${money(5000-total)}
       for complimentary shipping.`;

  }


  /* WISHLIST */

  const wishlistProducts =
    wishlist
      .map(id =>
        products.find(
          p => p.id === id
        )
      )
      .filter(Boolean);


  if(!wishlistProducts.length){

    $("#wishlistItems").innerHTML = `
      <p style="
        padding-top:30px;
        color:#777;
      ">
        Nothing saved yet.
      </p>
    `;

  }else{

    $("#wishlistItems").innerHTML =
      wishlistProducts.map(product => `

        <div
          class="search-result"
          onclick="
            openProduct(${product.id})
          "
        >

          <img
            src="${product.image}"
            alt="${product.name}"
          >

          <div>

            <b>
              ${product.name}
            </b>

            <p>
              ${money(product.price)}
            </p>

          </div>

        </div>

      `).join("");

  }

}


/* =========================
   SAVE
========================= */

function saveState(){

  localStorage.setItem(
    "thriftyCart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "thriftyWishlist",
    JSON.stringify(wishlist)
  );

  updateUI();
}


/* =========================
   PRODUCT MODAL
========================= */

function openProduct(id){

  const product =
    products.find(
      p => p.id === id
    );

  if(!product) return;


  $("#modalContent").innerHTML = `

    <div class="modal-product">

      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <div class="modal-product-info">

        <p class="eyebrow">
          ${product.category}
          / THRIFTY
        </p>

        <h2>
          ${product.name}
        </h2>

        <div class="modal-price">
          ${money(product.price)}
        </div>

        <p class="modal-description">

          A refined everyday essential designed
          around clean proportions, comfortable
          movement and timeless wearability.

        </p>

        <div class="size-title">
          SELECT SIZE
        </div>

        <div class="sizes">

          ${["XS","S","M","L","XL"]
            .map(
              (size,index) => `

                <button
                  class="${index === 2 ? "selected" : ""}"
                  onclick="
                    selectSize(this)
                  "
                >
                  ${size}
                </button>

              `
            ).join("")}

        </div>

        <button
          class="checkout-button"
          onclick="
            addToCart(${product.id});
            closeProduct();
          "
        >
          ADD TO BAG ↗
        </button>

      </div>

    </div>

  `;


  $("#productModal")
    .classList.add("active");

  document.body.classList.add("lock");

}


function selectSize(button){

  button
    .parentElement
    .querySelectorAll("button")
    .forEach(
      btn =>
        btn.classList.remove("selected")
    );

  button.classList.add("selected");

}


function closeProduct(){

  $("#productModal")
    .classList.remove("active");

  document.body.classList.remove("lock");

}


$("#productModal")
  .addEventListener(
    "click",
    event => {

      if(
        event.target.id ===
        "productModal"
      ){

        closeProduct();

      }

    }
  );


/* =========================
   DRAWERS
========================= */

function openDrawer(id){

  document
    .querySelectorAll(".drawer")
    .forEach(drawer =>
      drawer.classList.remove("active")
    );

  $("#" + id)
    .classList.add("active");

  $("#backdrop")
    .classList.add("active");

  document.body.classList.add("lock");

}


function closeAllDrawers(){

  document
    .querySelectorAll(".drawer")
    .forEach(drawer =>
      drawer.classList.remove("active")
    );

  $("#backdrop")
    .classList.remove("active");

  document.body.classList.remove("lock");

}


/* =========================
   SEARCH
========================= */

$("#searchInput")
  .addEventListener(
    "input",
    event => {

      const query =
        event.target.value
          .toLowerCase()
          .trim();


      const results =
        products.filter(product =>

          (
            product.name +
            " " +
            product.category
          )
            .toLowerCase()
            .includes(query)

        );


      $("#searchResults").innerHTML =

        results.map(product => `

          <div
            class="search-result"
            onclick="
              openProduct(${product.id})
            "
          >

            <img
              src="${product.image}"
              alt="${product.name}"
            >

            <div>

              <b>
                ${product.name}
              </b>

              <p>
                ${product.category}
                ·
                ${money(product.price)}
              </p>

            </div>

          </div>

        `).join("");

    }
  );


/* =========================
   CATEGORY FILTER
========================= */

function filterProducts(category){

  const filtered =
    products.filter(
      product =>
        product.category === category
    );


  $("#newProducts").innerHTML =
    filtered.map(createProductCard).join("");

  setupProductHover();

  observeReveal();

}


/* =========================
   MOBILE MENU
========================= */

function openMobileMenu(){

  $("#mobileMenu")
    .classList.add("active");

  document.body.classList.add("lock");

}


function closeMobileMenu(){

  $("#mobileMenu")
    .classList.remove("active");

  document.body.classList.remove("lock");

}


/* =========================
   TOAST
========================= */

let toastTimer;

function showToast(message){

  const toast =
    $("#toast");

  toast.textContent =
    message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(
      () =>
        toast.classList.remove("show"),
      1800
    );

}


/* =========================
   CHECKOUT
========================= */

function checkout(){

  if(cart.length === 0){

    showToast(
      "YOUR BAG IS EMPTY"
    );

    return;

  }

  showToast(
    "CHECKOUT READY — CONNECT PAYMENT GATEWAY"
  );

}


/* =========================
   NEWSLETTER
========================= */

$("#newsletterForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();

      showToast(
        "YOU'RE ON THE LIST."
      );

      event.target.reset();

    }
  );


/* =========================
   HEADER SCROLL
========================= */

window.addEventListener(
  "scroll",
  () => {

    $("#header")
      .classList.toggle(
        "scrolled",
        window.scrollY > 60
      );


    const heroImage =
      document.querySelector(
        ".hero-image img"
      );

    if(heroImage){

      const scale =
        1.04 +
        Math.min(
          window.scrollY / 9000,
          .04
        );

      heroImage.style.transform =
        `scale(${scale})
         translateY(${window.scrollY * .04}px)`;

    }

  },
  {
    passive:true
  }
);


/* =========================
   SCROLL REVEAL
========================= */

function observeReveal(){

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if(entry.isIntersecting){

            entry.target
              .classList.add("visible");

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold:.08
      }
    );


  document
    .querySelectorAll(
      ".reveal:not(.visible)"
    )
    .forEach(element =>
      observer.observe(element)
    );

}


/* =========================
   INITIALIZE
========================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {
        $("#loader")
          .classList.add("hide");
      },
      700
    );

    renderProducts();

    updateUI();

    observeReveal();

  }
);