function populateUFs() {

    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {

                ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
            }

        })
}


populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option>Selecione a Cidade</option>';
    citySelect.disabled = true



    fetch(url)
        .then(res => res.json())

        .then(cities => {

            for (city of cities) {
                citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de Coleta
//pegar todos os li's

const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=intens]")

let selectedItens = []

function handleSelectedItem(event) {

    //adicionar ou remover uma classe com javascript

    const itemLi = event.target


    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id



    const alreadySelected = selectedItens.findIndex(item => {
        const itemFound = item == itemId //isso será atrue ou false
        return itemFound

    })

    if (alreadySelected >= 0) {
        const filteredItens = selectedItens.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItens = filteredItens

    } else {
        selectedItens.push(itemId)
    }


    collectedItens.value = selectedItens





}