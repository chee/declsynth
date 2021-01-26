import type AudioContextElement from "./audio-context"
import * as events from "../events"
import parseConnectionTarget from "../get-connection-target"

export default class GainNodeElement extends HTMLElement {
	static tagName = "gain-node"
	// shadow: ShadowRoot = this.attachShadow({mode: "closed"})
	node: GainNode
	audioContextElement: AudioContextElement
	activeConnection?: HTMLElement
	ready: boolean = false

	static get observedAttributes() {
		return ["gain", "connect", "id"]
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

	get gain() {
		return Number(this.getAttribute("gain"))
	}

	set gain(value: number) {
		this.setAttribute("gain", value.toString())
	}

	attributeChangedCallback(
		name: string,
		oldValue: string | null,
		newValue: string | null
	) {
		if (name == "gain") {
			this.node.gain.value = this.gain
		} else if (name == "connect") {
			this.dispatchEvent(events.disconnect(oldValue))
			this.dispatchEvent(events.connect(newValue))
		} else if (name == "id") {
			this.dispatchEvent(events.unregister(oldValue))
			this.dispatchEvent(events.register(oldValue))
		}
	}

	connect(node: AudioNode, attr?: string) {
		if (attr) {
			node.connect(this.node[attr])
		} else {
			node.connect(this.node)
		}
	}

	constructor() {
		super()
		// this.shadow.append(...Array.from(this.children))
		this.audioContextElement = this.closest<AudioContextElement>(
			"audio-context"
		)!
		if (!this.audioContextElement) {
			throw new Error("must be contained in an audio-context")
		}
		this.node = this.audioContextElement.audioContext.createGain()
	}

	connectedCallback() {
		this.dispatchEvent(events.register(this.id))
		this.dispatchEvent(events.connect(this.connectionTarget))
		this.ready = true
	}
}
