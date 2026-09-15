// Seleciona os elementos do Formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    // Obtém o valor atual do input e remove os caracteres não numéricos
    let value = amount.value.replace(/\D/g, "")
    
    // Transforma o valor em centavos (exemplo: 150/100 = 1.5).
    value = Number(value) / 100

    // Atualiza o valor do input.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Formata o valor no Padrão BRL 
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}

// Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }    

    // Chama a Função que irá adicionar o item na lista
    expenseAdd(newExpense)
}

//Adiciona um novo item na lista.
function expenseAdd(newExpense) {
    try {
      // Cria o elemento para adicionar o item (li) na lista (ul).
      const expenseItem = document.createElement("li")
      expenseItem.classList.add("expense")
      
      // Cria o ícone da categoria.
      const expenseIcon = document.createElement("img")
      expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
      expenseIcon.setAttribute("alt", newExpense.category_name)

      // Cria a info da despesa.
      const expenseInfo = document.createElement("div")
      expenseInfo.classList.add("expense-info")

      // Cria o nome da despesa
      const expenseName = document.createElement("strong")
      expenseName.textContent = newExpense.expense

      // Cria a categoria da despesa.
      const expenseCategory = document.createElement("span")
      expenseCategory.textContent = newExpense.category_name

      // Adiciona nome e categoria na div nas informações da despesa.
      expenseInfo.append(expenseCategory, expenseName)

      // Cria o valor da despesa.
      expenseAmount = document.createElement("span")
      expenseAmount.classList.add("expense-amount")
      expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

      // Cria o ícone de remover.
      const removeIcon = document.createElement("img")
      removeIcon.classList.add("remove-icon")
      removeIcon.setAttribute("src", "img/remove.svg")
      removeIcon.setAttribute("alt", "Remover")

      // Adiciona as informações no item.
      expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

      // Adiciona o item na lista.
      expenseList.append(expenseItem)

      // Atualiza os totais.
      updateTotals()

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas")
        console.log(error)
    }
}

// Atualiza os totais.
function updateTotals() {
    try {
        // Recuperra todos os itens (li) da lista (ul).
        const items = expenseList.children

        //Atualiza a quantidade de itens na lista.
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "Despesas" : "Despesa"} `

        //Variavel para incremetar o total.
        let total = 0

        //Percorre cada item (li) da lista (ul).
        for (let item = 0; item < items,length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")
        }
    } catch (error) {
        console.log(error)
        alert("Não possível atualizar os totais")
    }
}