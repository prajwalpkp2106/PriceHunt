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

function acceptInput() {
  let targetprice = document.querySelector("#targetprice").value;
  console.log("Accepted price:", targetprice);
  if(targetprice<=200){

  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomPrices(initialPrice, minChange, maxChange) {
  const prices = [{ "date": "OCT", "price": initialPrice }];
  const months = ["JUL","AUG","OCT","SEPT","NOV", "DEC", "JAN", "FEB", "MAR", "APR"];
  let currentPrice = initialPrice;

  for (let i = 0; i < months.length; i++) {
      const randomChange = getRandomInt(minChange, maxChange);
      const change = Math.random() < 0.5 ? randomChange : -randomChange;
      currentPrice += change;
      prices.push({ "date": months[i], "price": currentPrice });
  }
  return prices;
}

// function openPopup1(button) {

//   document.getElementById('popup').classList.remove('hidden');
//   const WishListItem = button.closest(".bg-white");
//   const productPrice = parseFloat(
//      WishListItem.querySelector("#productPrice").textContent.replace(/₹|,/g, "") 
//   );
//   console.log("Product price:", productPrice);

//           // Get the 2D context of the canvas element
//           const ctx = document.getElementById('myChart').getContext('2d');
//           // Fetch data from API
//           // fetch('./price_history.json')
  
//           //     .then(response => response.json())
//           //     .then(data => {
//                   // Extract labels and data from API response
//                   const initialPrice = productPrice;
//                   const minChange = -20; // Minimum decrease
//                   const maxChange = 30;
//                   const data=generateRandomPrices(initialPrice, minChange, maxChange);
//                   const labels = data.map(item => item.date);
//                   const prices = data.map(item => item.price);
  
//                   // Create a new Chart instance with fetched data
//                   new Chart(ctx, {
//                       type: 'line',
//                       data: {
//                           labels: labels,
//                           datasets: [{
//                               label: 'Price History',
//                               data: prices,
//                               borderColor: 'rgba(75, 192, 192, 1)',
//                               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                           }]
//                       },
//                       options: {
//                           responsive: false,
//                           layout: {
//                               padding: {
//                                   left: 50,
//                                   right: 0,
//                                   top: 50,
//                               },
//                           },
//                       },
//                   });
//               // })
//               // .catch(error => console.error('Error:', error));

// }

function openPopup1(button) {
  // Open a new window
  const popupWindow = window.open('', 'Popup Window', 'width=600,height=400');

  // Write HTML content to the popup window
  popupWindow.document.write(`
      <div id="popup" class="hidden fixed top-1/2 left-1/2 flex justify-center items-center">
          <div class="bg-white rounded-lg shadow-md p-8">
              <div>
                  <canvas id="myChart" aria-label="chart" role="img" width="500" height="200"></canvas>
              </div>
              <button onclick="closePopup1()" class="absolute top-0 right-0 bg-white rounded-full p-2" id="closebtn">X</button>
          </div>
      </div>
  `);

  // Make the popup window visible
  popupWindow.document.getElementById('popup').classList.remove('hidden');

  // Generate the chart in the popup window
  const productPrice = parseFloat(
      button.closest(".bg-white").querySelector("#productPrice").textContent.replace(/₹|,/g, "")
  );
  const initialPrice = productPrice;
  const minChange = -20; // Minimum decrease
  const maxChange = 30;
  const data = generateRandomPrices(initialPrice, minChange, maxChange);
  const labels = data.map(item => item.date);
  const prices = data.map(item => item.price);
  const ctx = popupWindow.document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Price History',
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }]
      },
      options: {
          responsive: false,
          layout: {
              padding: {
                  left: 50,
                  right: 0,
                  top: 50,
              },
          },
      },
  });
}

function closePopup1() {
  // Close the popup window
  window.close();
}
function openPopup() {
  console.log('hi');
  document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
  document.getElementById('popup').classList.add('hidden');
}