let sales = [];

function addSalesRow(sale) {
    let date = sale.date;
    let total = sale.total;
    let profit = sale.profit;

    let table = document.getElementById("salesReportTable");
    let row = table.insertRow();
    let dateCell = row.insertCell(0);
    let totalCell = row.insertCell(1);
    let totalProfitCell = row.insertCell(2);

    dateCell.innerHTML = date;
    totalCell.innerHTML = total;
    totalProfitCell.innerHTML = profit;
}

function calculateLastMonthTotal() {
    let today = new Date();
    let lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    let lastMonthTotal = 0;
    for (let i = 0; i < sales.length; i++) {
        let sale = sales[i];
        let saleDate = new Date(sale.date);
        if (saleDate >= lastMonth && saleDate <= today) {
            lastMonthTotal += sale.total;
        }
    }
    document.getElementById("totalLastMonth").innerHTML = lastMonthTotal;
}

//function for profit calculation
function calculateLastMonthProfit() {
    let today = new Date();
    let lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    let lastMonthProfit = 0;
    for (let i = 0; i < sales.length; i++) {
        let sale = sales[i];
        let saleDate = new Date(sale.date);
        if (saleDate >= lastMonth && saleDate <= today) {
            lastMonthProfit += sale.total * 0.3;
        }
    }
    document.getElementById("totalProfitLastMonth").innerHTML = lastMonthProfit;
}

function addSale(total, profit) {
    let date = new Date().toLocaleDateString();
    let sale = {
        date: date,
        total: total,
        profit: profit
    };
    sales.push(sale);
    addSalesRow(sale);
    localStorage.setItem("sales", JSON.stringify(sales));
    calculateLastMonthTotal();
}


window.onload = function () {
    let storedSales = localStorage.getItem("sales");
    if (storedSales) {
        sales = JSON.parse(storedSales);
        for (let i = 0; i < sales.length; i++) {
            addSalesRow(sales[i])
        }
    }
    calculateLastMonthTotal();
    calculateLastMonthProfit();
}  