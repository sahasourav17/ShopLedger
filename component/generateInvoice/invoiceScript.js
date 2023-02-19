// loading inventory
function loadInventory() {
  let inventory = localStorage.getItem("inventory");
  if (inventory) {
    inventory = JSON.parse(inventory);
    // console.log(inventory);
    for (let i = 0; i < inventory.length; i++) {
      //   addInventoryRow(inventory[i]);
      if (inventory[i].quantity > 0) {
        addInventoryRow(inventory[i]);
      }
    }
  }
  window.onscroll = function () {
    window.scrollTo(0, 0);
  };
}

function addInventoryRow(item) {
  let table = document.getElementById("inventoryTable");
  let row = table.insertRow();

  let nameCell = row.insertCell(0);
  let quantityCell = row.insertCell(1);
  let priceCell = row.insertCell(2);
  let actionsCell = row.insertCell(3);

  nameCell.innerHTML = item.name;
  quantityCell.innerHTML = item.quantity;
  priceCell.innerHTML = item.price;
  actionsCell.innerHTML = `
    <button onclick="addToInvoice(this)">+</button>  
    `;
}

let totalAmount = 0;
function addToInvoice(button) {
  let inventoryRowData = button.parentNode.parentNode;

  // clicked item details
  let itemName = inventoryRowData.cells[0].innerHTML;
  let itemQuantity = inventoryRowData.cells[1].innerHTML;
  let itemPrice = inventoryRowData.cells[2].innerHTML;

  let qtyInput = prompt("Enter quantity");

  invoiceTable = document.getElementById("invoiceTable");

  let row = invoiceTable.insertRow();
  let nameCell = row.insertCell(0);
  let quantityCell = row.insertCell(1);
  let priceCell = row.insertCell(2);

  let price = qtyInput * itemPrice;
  totalAmount += price;
  //   console.log(price);

  nameCell.innerHTML = itemName;
  quantityCell.innerHTML = qtyInput;
  priceCell.innerHTML = price;
  //   console.log(totalAmount);

  //   making changes to the inventory table wrt the invoice
  let inventory = JSON.parse(localStorage.getItem("inventory"));

  //   console.log("before", inventory);
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].name == nameCell.innerText) {
      console.log(inventory[i].quantity);
      inventory[i].quantity = inventory[i].quantity - qtyInput;
    }
  }

  //   localStorage.removeItem("inventory");
  console.log(inventory);

  localStorage.setItem("inventory", JSON.stringify(inventory));
  //   inventoryRowData.remove();

  //   loadInventory();

  // total payable amount
  let amountPayable = document.getElementById("amountPayable");
  amountPayable.innerHTML = `Total Amount to be paid: ${totalAmount}`;
}

function printInvoice() {
  addSale(totalAmount, (totalAmount * 0.3).toFixed(0));
  let divContents = document.getElementById("invoice-items").innerHTML;
  let a = window.open("", "", "height=500, width=500");
  a.document.write("<html><body style='text-align:center;'>");
  a.document.write("<h3 >M/S Ananda Fashion</h3>");
  a.document.write("<p>Dipa Mansion Market, Hajiganj, Chandpur</p>");
  a.document.write(divContents);
  a.document.write("</body></html>");
  a.document.close();
  a.print();
}

function addSale(total, profit) {
  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  let date = new Date().toLocaleDateString();
  let sale = {
    date: date,
    total: total,
    profit: profit,
  };
  //   console.log(sale);

  sales.push(sale);
  //   console.log(sales);

  localStorage.setItem("sales", JSON.stringify(sales));
}
