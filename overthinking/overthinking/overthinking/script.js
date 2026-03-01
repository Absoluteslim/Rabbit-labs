const input = document.getElementById("userInput");
const responseBox = document.getElementById("response");
const question = document.getElementById("question");

const responses = [
  "You’re searching for something you can’t name yet.",
  "You wanted silence, but you typed instead.",
  "Curiosity brought you here. It always does.",
  "You are testing something. Maybe yourself.",
  "This is not random. You chose to be here.",
  "Somewhere, a thought pushed you forward.",
  "You wanted an answer. Or at least a reaction.",
  "You’re avoiding something else, aren’t you?",
  "You’re not here for the interface.",
  "You wanted to see what would happen.",
  "Late night decisions feel heavier, don’t they?",
  "You typed because thinking wasn’t enough.",
  "Even small thoughts leave traces.",
  "You expected something smarter.",
  "And yet, you’re still reading this."
];

function generateResponse(userText) {
  const hour = new Date().getHours();
  let baseResponse = responses[Math.floor(Math.random() * responses.length)];

  // Input length logic
  if (userText.length < 5) {
    baseResponse = "Short thoughts usually hide longer ones.";
  }

  if (userText.length > 40) {
    baseResponse = "That’s not overthinking. That’s excavation.";
  }

  // Late night tone
  if (hour >= 23 || hour < 4) {
    baseResponse = "It’s late. The mind is louder at this hour.";
  }

  return baseResponse;
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const userText = input.value.trim();
    if (!userText) return;

    question.style.opacity = "0";

    const reply = generateResponse(userText);

    responseBox.classList.remove("show");
    responseBox.textContent = reply;

    setTimeout(() => {
      responseBox.classList.add("show");
    }, 200);

    input.value = "";
  }
});
