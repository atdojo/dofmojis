const dofmojiContainer = document.getElementById("dofmojis")
const dofmojiSearch = document.getElementById("search")

function search(searchText) {
    for(const child of dofmojiContainer.children) {
        const name = child.querySelector(".dofmoji-name").innerText
        if(name.toLowerCase().includes(searchText.toLowerCase())) {
            child.classList.remove("d-none")
        } else {
            child.classList.add("d-none")
        }
    }
}

function createDofmojiElement(dofmoji) {
    const container = document.createElement("div")
    container.classList.add("dofmoji-container")

    // dofmoji
    const imgElement = document.createElement("img")
    imgElement.classList.add("dofmoji")
    imgElement.src = dofmoji.url
    imgElement.alt = dofmoji.name + " dofmoji"
    container.appendChild(imgElement)
    imgElement.onclick = async (e) => {
        const url = e.target.src
        const img = await fetch(url)
        const blob = await img.blob()
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob,
                })
            ])
            e.target.src = "check.svg"
        } catch(err) {
            e.target.src = "close.svg"
        }
        e.target.classList.add("disabled")

        setTimeout(() => {
            e.target.src = url
            e.target.classList.remove("disabled")
        }, 600)
    }

    // below dofmoji contaienr 
    const belowDofmojiContainer = document.createElement("div")
    belowDofmojiContainer.classList.add("dofmoji-content")
    const nameElement = document.createElement("div")
    nameElement.classList.add("dofmoji-name")   
    nameElement.innerText = dofmoji.name
    belowDofmojiContainer.appendChild(nameElement)
    container.appendChild(belowDofmojiContainer)

    return container
}

;(async () => {
    const dofmojis = await fetch("dofmojis.json").then(res => res.json())
    const fragment = document.createDocumentFragment()
    for(const dofmoji of dofmojis) {
        fragment.appendChild(createDofmojiElement(dofmoji))
    }
    dofmojiContainer.append(fragment)

    dofmojiSearch.addEventListener("input", (e) => {
        search(e.target.value)
    })
    
    dofmojiSearch.focus()
})()