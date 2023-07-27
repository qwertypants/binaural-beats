import "./style.css";

// @ts-ignore
const Tone = globalThis.Tone;
// Create two oscillators
let osc1 = new Tone.Oscillator(440, "sine").toDestination();
let osc2 = new Tone.Oscillator(444, "sine").toDestination();

// Start both oscillators
function startOscillators() {
  osc1.start();
  osc2.start();
}

// Stop both oscillators
function stopOscillators() {
  osc1.stop();
  osc2.stop();
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <section class="h-screen max-w-4xl mx-auto pt-20">
    <div class="flex content-between justify-around">
      <label>
        <span id="left"></span>
        <input type="range" class="-rotate-90" id="freq1" name="freq1" min="20" max="20000" value="440" step="5">
      </label>
      
      <label>
        <span id="right"></span>
        <input type="range" class="-rotate-90" id="freq2" name="freq2" min="20" max="20000" value="444" step="5">
      </label>
    </div>
    <footer>
      <button id="startButton">Start</button>
      <button id="stopButton">Stop</button>
    </footer>
  </section>
`;
// Update the frequency of the oscillators when the user changes the input fields
document.getElementById("freq1")!.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement;
  const value = target?.value;
  osc1.frequency.value = value;
  document.getElementById("left")!.innerHTML = value;
});
document.getElementById("freq2")!.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement;
  const value = target?.value;
  osc2.frequency.value = value;
  document.getElementById("right")!.innerHTML = value;
});

// Start and stop the oscillators when the user clicks the buttons
document
  .getElementById("startButton")!
  .addEventListener("click", startOscillators);
document
  .getElementById("stopButton")!
  .addEventListener("click", stopOscillators);
