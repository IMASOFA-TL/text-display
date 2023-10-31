function createBox() {
    const box = document.createElement("div");
    box.className = "linebreaker_box";

    const divMaxWidth = document.createElement("div");
    divMaxWidth.innerText = "Max width: ";
    const maxWidth = document.createElement("input");
    maxWidth.type = "number";
    maxWidth.min = "64";
    maxWidth.value = "464";
    divMaxWidth.appendChild(maxWidth);

    const divTextArea = document.createElement("div");
    const textArea = document.createElement("textarea");
    textArea.cols = 80;
    textArea.rows = 20;
    divTextArea.appendChild(textArea);

    const divButtons = document.createElement("div");
    const linebreak = document.createElement("button");
    linebreak.innerText = "Linebreak";
    linebreak.onclick = () => replaceLineBreakText(textArea, maxWidth);

    const unlinebreak = document.createElement("button");
    unlinebreak.innerText = "Unlinebreak";
    unlinebreak.onclick = () => replaceUnLineBreakText(textArea);

    const kte = document.createElement("button");
    kte.innerText = "Change Kanji to Emoji";
    kte.onclick = () => replaceKtEText(textArea);

    const etk = document.createElement("button");
    etk.innerText = "Change Emoji to Kanji";
    etk.onclick = () => replaceEtKText(textArea);
    divButtons.appendChild(linebreak);
    divButtons.appendChild(unlinebreak);
    divButtons.appendChild(kte);
    divButtons.appendChild(etk);

    box.appendChild(divMaxWidth);
    box.appendChild(divTextArea);
    box.appendChild(divButtons);

    document.getElementById("container").appendChild(box);
}

function deleteBox() {
    const container = document.getElementById("container");
    const last = container.lastElementChild;
    if (last) {
        container.removeChild(last);
    }
}

createBox();