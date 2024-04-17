const fs = require('fs');


    console.log("running graph.js");
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

// Example input
const initialPrice = 52090;
const minChange = -20; // Minimum decrease
const maxChange = 30; // Maximum increase

// Generate random prices


// Convert to JSON string
const prices = generateRandomPrices(initialPrice, minChange, maxChange);
const jsonData = JSON.stringify(prices, null, 2);

// Write to file
fs.writeFile('price_history.json', jsonData, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('JSON file created successfully!');
});
