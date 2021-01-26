import type AudioContextElement from "./audio-context"
import * as events from "../events"

export default class OscillatorNodeElement extends HTMLElement {
	static tagName = "oscillator-node"
	// shadow: ShadowRoot = this.attachShadow({mode: "closed"})
	audioContextElement: AudioContextElement = this.closest<AudioContextElement>(
		"audio-context"
	)!
	node: OscillatorNode = this.audioContextElement.audioContext.createOscillator()
	activeConnection: HTMLElement
	ready: boolean = false

	static get observedAttributes() {
		return ["frequency", "connect", "type", "id"]
	}

	get type() {
		return this.getAttribute("type")
	}

	set type(value: string | null) {
		if (value) {
			this.setAttribute("type", value)
		} else {
			this.removeAttribute("type")
		}
	}

	get connectionTarget() {
		return this.getAttribute("connect")
	}

	set connectionTarget(value: string | null) {
		if (value) {
			this.setAttribute("connect", value)
		} else {
			this.removeAttribute("connect")
		}
	}

	get frequency() {
		return Number(this.getAttribute("frequency"))
	}

	set frequency(value: number) {
		this.setAttribute("frequency", value.toString())
	}

	attributeChangedCallback(
		name: string,
		oldValue: string | null,
		newValue: string | null
	) {
		if (name == "frequency") {
			this.node.frequency.value = this.frequency
		} else if (name == "connect") {
			// this.dispatchEvent(events.disconnect(oldValue))
			// this.dispatchEvent(events.connect(this.connectionTarget))
		} else if (name == "id") {
			// this.dispatchEvent(events.unregister(oldValue))
			// this.dispatchEvent(events.register(newValue))
		} else if (name == "type") {
			this.node.type = this.type || "sine"
		}
	}

	connectedCallback() {
		this.node.start()
		this.dispatchEvent(events.register(this.id))
		this.dispatchEvent(events.connect(this.connectionTarget))
		this.ready = true
	}
}
