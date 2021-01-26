import AudioContextElement from "./elements/audio-context"
import GainNodeElement from "./elements/gain-node"
import OscillatorNodeElement from "./elements/oscillator-node"

for (let element of [
	AudioContextElement,
	GainNodeElement,
	OscillatorNodeElement,
]) {
	customElements.define(element.tagName, element)
}
