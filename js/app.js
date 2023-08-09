const products_Db = [
  {
    id: 1,
    title: "Iphone 13 pro max",
    thumbnail: "images/iphone13.jpg",
    price: 998,
    count: 1,
  },
  {
    id: 2,
    title: "MacBook pro M2",
    thumbnail: "images/mackbook.jpg",
    price: 1300,
    count: 1,
  },
  {
    id: 3,
    title: "Ipad Air M1",
    thumbnail: "images/ipadair.jpg",
    price: 1100,
    count: 1,
  },
  {
    id: 4,
    title: "Magic Keyboard",
    thumbnail: "images/magickeyboard.webp",
    price: 700,
    count: 1,
  },
  {
    id: 5,
    title: "Apple Speaker",
    thumbnail: "images/applespeaker.webp",
    price: 800,
    count: 1,
  },
  {
    id: 6,
    title: "Apple Watch Ultra",
    thumbnail: "images/applewatchultra.jpg",
    price: 999,
    count: 1,
  },
  {
    id: 7,
    title: "Apple Watch 6",
    thumbnail: "images/applewathc6.webp",
    price: 1240,
    count: 1,
  },
  {
    id: 8,
    title: "Ipad pro M1",
    thumbnail: "images/ipadpro.webp",
    price: 1200,
    count: 1,
  },
  {
    id: 9,
    title: "Logitec Mx Keys",
    thumbnail: "images/mxkeys.webp",
    price: 650,
    count: 1,
  },
  {
    id: 10,
    title: "Logitec Mx Mini",
    thumbnail: "images/mxkeysmini.webp",
    price: 500,
    count: 1,
  },
  {
    id: 11,
    title: "Magic Mouse",
    thumbnail: "images/magicmouse.webp",
    price: 250,
    count: 1,
  },
];

/* Select All Elements */
const $ = document;
const productsWrapper = $.querySelector(".products-wrapper");
const cartItemsContainer = $.querySelector(".cart-items-container");
const emptyCartText = $.querySelector(".empty-cart");
const tableTitles = $.querySelector(".table-titles");
const totalPriceElem = $.querySelector(".total-price");
const mobileMenuIcon = $.querySelector(".mobile-menu-icon");
const mobileSideBar = $.querySelector(".mobile-sidebar");
const purchesBtn = $.querySelector(".purches-btn");

let userbasketArray = [];

// load last userbasket items that user added to her/his userbasket
window.addEventListener("load", function () {
  userbasketArray = JSON.parse(localStorage.getItem("userBasketItems"));
  if (userbasketArray === null) {
    userbasketArray = [];
  }

  if (userbasketArray.length > 0) {
    emptyCartText.style.display = "none";
    tableTitles.style.display = "grid";
  }

  basketItemGenerator(userbasketArray);
  calcTotalPrice(userbasketArray);
});

mobileMenuIcon.addEventListener("click", function () {
  show_Hide_mobileMenu();
});

purchesBtn.addEventListener("click", function () {
  purchesCartItems();
});

/* Creat all products in our store */
products_Db.forEach(function (productObj) {
  generateAllProducts(productObj);
});

/* generate all product of store */
function generateAllProducts(productObj) {
  // product box element
  let productElem = $.createElement("div");
  productElem.classList.add("product");

  // product title
  let productTitleElem = $.createElement("h3");
  productTitleElem.classList.add("product-title");
  productTitleElem.innerHTML = productObj.title;

  // product image
  let productPicElem = $.createElement("div");
  productPicElem.classList.add("product-pic");
  let productImage = $.createElement("img");
  productImage.setAttribute("src", productObj.thumbnail);
  productPicElem.append(productImage);

  // product details
  let productDetailsElem = $.createElement("div");
  productDetailsElem.classList.add("product-details");
  // product price
  let productPriceElem = $.createElement("p");
  productPicElem.classList.add("product-price");
  productPriceElem.innerHTML = "$ " + productObj.price;
  // product add to cart button
  let addProductBtn = $.createElement("div");
  addProductBtn.classList.add("add-product-btn");
  addProductBtn.innerHTML = "Add to cart";

  /**** set addEventListener to add to cart  button to add product to basket ****/
  addProductBtn.addEventListener("click", function () {
    addToUserBasketArray(productObj.id);
  });
  productDetailsElem.append(productPriceElem, addProductBtn);
  productElem.append(productTitleElem, productPicElem, productDetailsElem);

  // add product to product wrapper
  productsWrapper.append(productElem);
}

/* Add Product to userbasket array */
function addToUserBasketArray(productId) {
  let mainProduct = products_Db.find(function (productObj) {
    return productObj.id === productId;
  });

  let isInCart = userbasketArray.some(function (product) {
    return product.id === productId;
  });

  let existingProductIndex = userbasketArray.findIndex(function (product) {
    return product.id === productId;
  });

  if (isInCart) {
    mainProduct.count++;
    userbasketArray.slice(existingProductIndex, 1, mainProduct);
  } else {
    userbasketArray.push(mainProduct);
  }

  // send to local storage
  sendUserBasketToLocalStorage(userbasketArray);

  if (userbasketArray.length > 0) {
    emptyCartText.style.display = "none";
    tableTitles.style.display = "grid";
  }

  basketItemGenerator(userbasketArray);
  calcTotalPrice(userbasketArray);
}

/* generate all items in user basket */
function basketItemGenerator(userbasketArray) {
  cartItemsContainer.innerHTML = "";
  userbasketArray.forEach(function (productObj) {
    // cart item row
    let cartItemRowElem = $.createElement("div");
    cartItemRowElem.classList.add("cart-item-row");

    // cart item info
    let cartItemInfoElem = $.createElement("div");
    cartItemInfoElem.classList.add("cart-item-info");

    // cart item thumbnail
    let cartItemThumbnailElem = $.createElement("div");
    cartItemThumbnailElem.classList.add("cart-item-thumbnail");

    let cartItemImageElem = $.createElement("img");
    cartItemImageElem.setAttribute("src", productObj.thumbnail);

    cartItemThumbnailElem.append(cartItemImageElem);

    // cart item name
    let cartItemNameElem = $.createElement("p");
    cartItemNameElem.classList.add("cart-item-name");
    cartItemNameElem.innerHTML = productObj.title;

    cartItemInfoElem.append(cartItemThumbnailElem, cartItemNameElem);

    // cart item price
    let cartItemPriceElem = $.createElement("p");
    cartItemPriceElem.classList.add("cart-item-price");
    cartItemPriceElem.innerHTML = "$ " + productObj.price;

    // cart item quantity wrapper
    let cartItemQuantityWrapper = $.createElement("div");
    cartItemQuantityWrapper.classList.add("cart-item-quantity-wrapper");

    // cart item input number
    let cartItemInputElem = $.createElement("input");
    cartItemInputElem.classList.add("cart-item-input-number");
    cartItemInputElem.setAttribute("type", "number");
    cartItemInputElem.setAttribute("value", productObj.count);
    cartItemInputElem.setAttribute("min", 1);

    cartItemInputElem.addEventListener("change", function (event) {
      productObj.count = event.target.value;

      let productIndex = userbasketArray.findIndex(function (product) {
        return (
          product.title ===
          event.target.parentElement.parentElement.querySelector(
            ".cart-item-name"
          ).innerHTML
        );
      });

      userbasketArray.slice(productIndex, 1, productObj);

      // send to localstorage
      sendUserBasketToLocalStorage(userbasketArray);

      calcTotalPrice(userbasketArray);
    });

    // remove cart item button
    let removeCartItemBtn = $.createElement("div");
    removeCartItemBtn.classList.add("remove-cart-item-btn");
    removeCartItemBtn.innerHTML = "Remove";

    /* remove item with click on remove button */
    removeCartItemBtn.addEventListener("click", function (event) {
      let removedProductIndex = userbasketArray.findIndex(function (product) {
        return (
          product.title ===
          event.target.parentElement.parentElement.querySelector(
            ".cart-item-name"
          ).innerHTML
        );
      });
      event.target.parentElement.parentElement.remove();
      userbasketArray.splice(removedProductIndex, 1);

      // send to local storage
      sendUserBasketToLocalStorage(userbasketArray);

      calcTotalPrice(userbasketArray);
      if (userbasketArray.length === 0) {
        emptyCartText.style.display = "flex";
        tableTitles.style.display = "none";
      }
    });

    cartItemQuantityWrapper.append(cartItemInputElem, removeCartItemBtn);

    cartItemRowElem.append(
      cartItemInfoElem,
      cartItemPriceElem,
      cartItemQuantityWrapper
    );

    cartItemsContainer.append(cartItemRowElem);
  });
}

/* Calculate total price  */
function calcTotalPrice(userbasketArray) {
  let sum = 0;
  userbasketArray.forEach(function (productObj) {
    sum += productObj.price * productObj.count;
  });

  totalPriceElem.innerHTML = "total price is : $ " + sum;
}

// save userbasket array to local storage
function sendUserBasketToLocalStorage(userbasketArray) {
  localStorage.setItem("userBasketItems", JSON.stringify(userbasketArray));
}

/* show and hide mobile menu */
function show_Hide_mobileMenu() {
  mobileSideBar.classList.toggle("show-sidebar");

  if (mobileSideBar.classList.contains("show-sidebar")) {
    mobileMenuIcon.innerHTML = '<i class="bi bi-x-lg"></i>';
  } else {
    mobileMenuIcon.innerHTML = '<i class="bi bi-list"></i>';
  }
}

// purches all items in cart
function purchesCartItems() {
  userbasketArray = [];
  sendUserBasketToLocalStorage(userbasketArray);
  basketItemGenerator(userbasketArray);
  calcTotalPrice(userbasketArray);
  emptyCartText.style.display = "flex";
  tableTitles.style.display = "none";
}
