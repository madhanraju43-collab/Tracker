let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateUI() {

    const list = document.getElementById("transaction-list");
    const balance = document.getElementById("balance");

    list.innerHTML = "";

    let total = 0;

    transactions.forEach((transaction, index) => {

        const li = document.createElement("li");

        li.classList.add(transaction.type);

        li.innerHTML = `
            ${transaction.desc} - ₹${transaction.amount}
            <button class="delete-btn"
            onclick="deleteTransaction(${index})">
            Delete
            </button>
        `;

        list.appendChild(li);

        if(transaction.type === "income"){
            total += Number(transaction.amount);
        }else{
            total -= Number(transaction.amount);
        }
    });

    balance.textContent = `₹${total}`;

    saveData();
}

function addTransaction() {

    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    if(desc === "" || amount === ""){
        alert("Please fill all fields");
        return;
    }

    transactions.push({
        desc,
        amount,
        type
    });

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";

    updateUI();
}

function deleteTransaction(index){
    transactions.splice(index,1);
    updateUI();
}

updateUI();