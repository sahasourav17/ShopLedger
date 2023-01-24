// Initialize an empty array to store the inventory items
let inventory = [];

// Function to load the inventory from local storage
function loadInventory() {
    // Check if there is any data in local storage
    if (localStorage.getItem("inventory")) {
        inventory = JSON.parse(localStorage.getItem("inventory"));
        // Loop through the inventory items and add them to the table
        for (let i = 0; i < inventory.length; i++) {
            addInventoryRow(inventory[i]);
        }
    }
}

// Function to add an item to the inventory
function addItem() {
    // Get the values from the form inputs
    let itemName = document.getElementById("itemName").value;
    let itemQuantity = document.getElementById("itemQuantity").value;
    let itemPrice = document.getElementById("itemPrice").value;

    if (itemName && itemPrice && itemQuantity){
        // Create an object to store the item data
        let item = {
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice
        };

        // Add the item to the inventory array
        inventory.push(item);

        // Add the item to the table
        addInventoryRow(item);

        // Save the inventory to local storage
        localStorage.setItem("inventory", JSON.stringify(inventory));

        // Clear the form inputs
        document.getElementById("itemName").value = "";
        document.getElementById("itemQuantity").value = "";
        document.getElementById("itemPrice").value = "";
    }
    else {
        alert("Please fill all the fields")
    }
}

// Function to add a row to the inventory table
function addInventoryRow(item) {
    // Get the inventory table
    let table = document.getElementById("inventoryTable");

    // Create a new row
    let row = table.insertRow();

    // Insert the item data into the new row
    let nameCell = row.insertCell(0);
    let quantityCell = row.insertCell(1);
    let priceCell = row.insertCell(2);
    let actionsCell = row.insertCell(3);

    nameCell.innerHTML = item.name;
    quantityCell.innerHTML = item.quantity;
    priceCell.innerHTML = item.price;
    actionsCell.innerHTML = `
    <button onclick="editItem(this)">Edit</button>  
    <button id = "del" onclick="deleteItem(this)">Delete</button>
    `;
}

// Function to edit an item
function editItem(button) {
    // Get the row that contains the item data
    let row = button.parentNode.parentNode;

    // Get the item data from the row
    let itemName = row.cells[0].innerHTML;
    let itemQuantity = row.cells[1].innerHTML;
    let itemPrice = row.cells[2].innerHTML;

    // Insert the item data into the form inputs
    document.getElementById("itemName").value = itemName;
    document.getElementById("itemQuantity").value = itemQuantity;
    document.getElementById("itemPrice").value = itemPrice;

    // Remove the item from the inventory array
    let index = inventory.findIndex(i => i.name === itemName);
    inventory.splice(index, 1);

    // Remove the item from the table
    row.remove();

    // Save the inventory
    localStorage.setItem("inventory", JSON.stringify(inventory));
}


// Function to delete an item
function deleteItem(button) {
    // Get the row that contains the item data
    let row = button.parentNode.parentNode;

    // Get the item name
    let itemName = row.cells[0].innerHTML;

    // Remove the item from the inventory array
    let index = inventory.findIndex(i => i.name === itemName);
    inventory.splice(index, 1);

    // Remove the item from the table
    row.remove();

    // Save the inventory to local storage
    localStorage.setItem("inventory", JSON.stringify(inventory));
}



// barcode scan

function scanBarcode() {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanViewport')   
      },
      decoder: {
        readers: ["code_128_reader"]
      }
    }, function(err) {
        if (err) { console.log(err); return }
        Quagga.start();
    });
  }

  Quagga.onDetected(function(result) {
    let barcode = result.codeResult.code;
  console.log(barcode);
  //Add barcode to inventory and update the local storage
  let item = {
  name: barcode,
  quantity: 1,
  price: 0
  };
  inventory.push(item);
  addInventoryRow(item);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  Quagga.stop();
  });