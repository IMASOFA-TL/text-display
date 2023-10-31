function kanjiToEmoji(text) {
    emojidata.forEach(x => {
        text = text.replace(new RegExp(x.kanji, "g"), x.emoji)
    });
    return text;
}

function emojiToKanji(text) {
    emojidata.forEach(x => {
        text = text.replace(new RegExp(x.emoji, "g"), x.kanji)
    });
    return text;
}

function replaceKtEText(textArea) 
{
    let text = textArea.value;
    textArea.value = kanjiToEmoji(text);
}
function replaceEtKText(textArea) 
{
    let text = textArea.value;
    textArea.value = emojiToKanji(text);
}