endPunctuations = [
    "☹",
    "📺",
    "🍴",
    "⏰",
    "🚅",
    "💋",
    "⤵",
    "💄",
    "☀",
    "🤍",
    "⤴",
    "❓",
    "🤨",
    "😆",
    "💓",
    "🤭",
    "🐶",
    "‼",
    "👍",
    "🎤",
    "♨",
    "🆕",
    "⚡",
    "❗",
    "💢",
    "📱",
    "🌙",
    "🚗",
    "😢",
    "🍵",
    "㊙",
    "🐱",
    "👑",
    "💡",
    "✈",
    "✨",
    "💿",
    "🌀",
    "🚋",
    "✉",
    "💔",
    "🏃",
    "🏠",
    "🎵",
    "💨",
    "👊",
    "✌",
    "🏢",
    "💧",
    "🎀",
    ":",
    "😳",
    "🍰",
    "👛",
    "☁",
    "💕",
    "🍙",
    "💦",
    "🎶",
    "❤",
    "🏫",
    "😊",
    "📷",
    "☔",
    "💤",
    "堰",
    "嫩",
    "彎",
    "慊",
    "慫",
    "懦",
    "懾",
    "撻",
    "斂",
    "曩",
    "洟",
    "涕",
    "漓",
    "澆",
    "燧",
    "犢",
    "瑟",
    "竇",
    "簫",
    "綏",
    "綢",
    "羈",
    "羶",
    "羸",
    "羹",
    "翹",
    "耄",
    "耋",
    "聊",
    "聘",
    "聚",
    "聾",
    "艟",
    "艨",
    "蔕",
    "藜",
    "藹",
    "蘊",
    "虧",
    "蠹",
    "褻",
    "諛",
    "赭",
    "跋",
    "蹙",
    "輳",
    "輻",
    "輿",
    "遯",
    "鄙",
    "鑓",
    "鑿",
    "闖",
    "陋",
    "靄",
    "靡",
    "顫",
    "顰",
    "飭",
    "駁",
    "鸞",
    "鹹",
    "黯",
    "鼇",
    "鼎",
    ".",
    "?",
    "!",
    "。",
    "？",
    "！"
];

function isJpText(text) {
    return (text.match(/ /g)||[]).length < 5;
}

function shouldJoin(line) {
    if (line === "") {
        return false;
    }
    const lastChar = line.slice(-1);
    return !endPunctuations.includes(lastChar)
}

function unLineBreakText(text) {
    const joinChar = isJpText(text) ? "" : " ";
    const lines = text.split("\n");
    let newText = "";
    for (const line of lines) {
        newText += line;
        if (shouldJoin(line)) {
            newText += joinChar;
        } else {
            newText += "\n";
        }
    }
    const lastChar = newText.slice(-1);
    if (lastChar === "\n" || lastChar === " ") {
        newText = newText.slice(0, -1);
    }
    return newText;
}

function replaceUnLineBreakText(textInput) 
{
    let text = textInput.value;
    textInput.value = kanjiToEmoji(unLineBreakText(text));
}
