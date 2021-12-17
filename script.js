const Modal = {
    open(){
        //Abrir Modal
        document
        .querySelector('.modal-overlay')
        .classList
        .add('active')
    },
    close(){
        // fechar o Modal
        document
        .querySelector('.modal-overlay')
        .classList
        .remove('active')
    }
}

//classList.toogle()


const transactions = [
    {
        id:1,
        description: 'luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id:2,
        description: 'website',
        amount: 200000,
        date: '20/01/2021',
    },
    {
        id:1,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
]

const Transaction = {
    all: transactions,

    add(transaction){
        Transaction.all.push(transaction)
        App.reload()

    },
    incomes(){
        let income = 0
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            }
        })

        return income;
    },
    expenses(){
        let expense = 0
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;
            }
        })

        return expense;
    },
    total(){
        return Transaction.incomes() + Transaction.expenses();

    }
}

const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)

    },
    innerHTMLTransaction(transaction){

        const CSSclass = transaction.amount > 0 ? "income": "expense" 

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `

            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt=""Remover transação>
            </td>
            `

            return html
    },

    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: 'currency',
            currency: "BRL"
        })

        return signal + value
    }
}

const App = {
    init(){

        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
        
    },
    reload(){
        DOM.clearTransactions()
        App.init()

    },
}

App.init()

Transaction.add({
    id:39,
    description: 'A',
    amount: 200,
    date: '23/01/2021'
})