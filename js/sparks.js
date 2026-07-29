const sparks = [
    {
        text: "What if music was the main mechanic?",
        source: "Anatta",
    },
    {
        text: "How could we make bias hilarious?",
        source: "Xenoarchaeology Internship",
    },
    {
        text: "Why isn't anyone making games about knitting and crochet?",
        source: "Wool Island",
    },
    {
        text: "Do you realize you're going mad?",
        source: "<s>Mad Hatter</s> Living Through Static",
    },
    {
        text: "What is <strong>wrong</strong> with this world?!",
        source: "The Human Model",
    },
    {
        text: "How many ideas fit into five minutes of gameplay?",
        source: "The Fire",
    },
];

const sparkText = document.querySelector(".spark-text");
const sparkSource = document.querySelector(".spark-source");

if (sparkText && sparkSource) {
    const randomIndex = Math.floor(Math.random() * sparks.length);
    const currentSpark = sparks[randomIndex];

    sparkText.innerHTML = `“${currentSpark.text}”`;
    sparkSource.innerHTML = currentSpark.source
        ? `— ${currentSpark.source}`
        : "";
}
