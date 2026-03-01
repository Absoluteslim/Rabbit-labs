// Overthinking Machine
// Small, framework-free interaction for GitHub Pages.

const promptEl = document.getElementById("prompt");
const inputEl = document.getElementById("thought");
const responseEl = document.getElementById("response");

// Core response pool (15+ lines).
const coreLines = [
  "You might be here for an answer, but maybe also for a pause.",
  "Some thoughts feel heavy because they are carrying unfinished stories.",
  "If you stay with a question long enough, it often becomes kinder.",
  "Attention can be a form of healing when it is gentle.",
  "Not every uncertainty is a problem; some are invitations.",
  "You are allowed to breathe before deciding what this means.",
  "Clarity tends to arrive after urgency leaves the room.",
  "A quiet sentence can hold more truth than a loud conclusion.",
  "Sometimes the mind loops because it wants witness, not judgment.",
  "You may not need certainty tonight, only honesty.",
  "The question may be less 'what now' and more 'what matters.'",
  "Even doubt can be evidence that you care deeply.",
  "You can move slowly and still be moving.",
  "What returns to your attention is asking to be listened to.",
  "There is no shame in being in between answers.",
  "A thoughtful pause is still a meaningful action."
];

/**
 * Build context-aware lines based on message length + current time.
 * @param {string} text user input
 * @returns {string[]} merged set of possible responses
 */
function getContextLines(text) {
  const hour = new Date().getHours();
  const isLateNight = hour >= 23 || hour < 5;
  const isShort = text.length <= 18;

  const lines = [];

  if (isShort && isLateNight) {
    lines.push("Few words, late hour. Let the rest wait until morning light.");
    lines.push("Short thought, midnight mind. Keep the conclusion soft.");
  } else if (isShort) {
    lines.push("Short message, clear signal. You already know part of the truth.");
    lines.push("Brief words can still point to deep places.");
  } else if (isLateNight) {
    lines.push("Long message, late night. Be gentle with what feels absolute right now.");
    lines.push("You wrote a lot at this hour; that sounds like care, not chaos.");
  } else {
    lines.push("Long message, daylight mind. You are sorting, not spiraling.");
    lines.push("Detail is a form of patience; your mind is trying to be precise.");
  }

  return lines;
}

/** Pick one random entry from an array. */
function randomLine(lines) {
  return lines[Math.floor(Math.random() * lines.length)];
}

/**
 * Show response with fade transition.
 * - Heading fades out after the first Enter.
 * - Existing response fades out before new content fades in.
 */
function showResponse() {
  const text = inputEl.value.trim();
  if (!text) return;

  promptEl.classList.add("is-hidden");

  responseEl.classList.remove("is-visible");
  responseEl.classList.add("is-hidden");

  const lines = [...coreLines, ...getContextLines(text)];

  window.setTimeout(() => {
    responseEl.textContent = randomLine(lines);
    responseEl.classList.remove("is-hidden");
    responseEl.classList.add("is-visible");
  }, 180);
}

inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showResponse();
    inputEl.select();
  }
});
