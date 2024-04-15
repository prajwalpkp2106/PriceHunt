

async function addToWishList(button) {
  const productCard = button.closest(".bg-white");
  const productName = productCard.querySelector("h2").textContent;
  const productUrl = (productCard.querySelector("a")).getAttribute("href");
  const productPrice = parseFloat(
    productCard
      .querySelector(".text-purple-500")
      .textContent.replace(/₹|,/g, "", "")
  );
  console.log(productName,productUrl,productPrice);
  const response = await fetch('/add-to-wishlist', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productName,
            url: productUrl,
            price: productPrice,
            
        }) 
    });
    console.log(response);
    if (response.ok) {
        const data = await response.json();
        const productId = data.productId; 
        const WishListItem = document.createElement("div");
        WishListItem.classList.add(
          "bg-white",
          "rounded-lg",
          "shadow-md",
          "p-4",
          "mb-4"
        );
        
        WishListItem.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-lg font-semibold">${productName}</h2>
                <div class="flex items-center">
                    <button onclick="removeWishListItem(this)" data-product-id="${productId}" class="text-red-500 mr-2">Remove</button>
                </div>
            </div>
            <a href="${productUrl}" target="_blank">View Product</a>
            <p class="text-gray-600">₹${productPrice.toFixed(2)}</p>
        `;
    
        const WishListContainer = document.querySelector("#WishListContainer");
        WishListContainer.appendChild(WishListItem);
    
        
      } else {
        window.location.href = '/users/login';
      }
}

function removeWishListItem(button) {
  const WishListItem = button.closest(".bg-white");
  const productId = button.dataset.productId
  const productPrice = parseFloat(
    WishListItem.querySelector("p").textContent.replace("₹", "")
  );
  fetch(`/add-to-wishlist/${productId}`, {
    method: 'DELETE'
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
       
        WishListItem.remove();
    }).catch(error => {
        console.error('Error deleting product:', error);
    });
}

function toggleWishListVisibility() {
  const WishList = document.querySelector(".bg-white.fixed");
  WishList.classList.toggle("hidden");
}

function sortProductsByCategory(category) {
  const productGrid = document.getElementById("productGrid");
  const products = [...productGrid.children];

  products.forEach((product) => {
    if (category === "" || product.dataset.category === category) {
      product.style.display = "block"; 
    } else {
      product.style.display = "none"; 
    }
  });
}

function sortProductsByPrice(order) {
  const productGrid = document.getElementById("productGrid");
  const products = [...productGrid.children];

  if (order === "asc") {
    products.sort((a, b) => {
      const priceA = parseFloat(
        a.querySelector(".text-purple-500").innerText.replace(/₹|,/g, "") 
      );
      const priceB = parseFloat(
        b.querySelector(".text-purple-500").innerText.replace(/₹|,/g, "") 
      );
      return priceA - priceB;
    });
  } else if (order === "desc") {
    products.sort((a, b) => {
      const priceA = parseFloat(
        a.querySelector(".text-purple-500").innerText.replace(/₹|,/g, "") 
      );
      const priceB = parseFloat(
        b.querySelector(".text-purple-500").innerText.replace(/₹|,/g, "") 
      );
      return priceB - priceA;
    });
  }

  productGrid.innerHTML = "";

  products.forEach((product) => {
    productGrid.appendChild(product);
  });
}



function openPopup() {
  console.log('hi');
  document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
  document.getElementById('popup').classList.add('hidden');
}