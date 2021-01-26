import {
	ConnectDetail,
	ConnectEvent,
	DisconnectEvent,
	RegisterDetail,
	RegisterEvent,
	UnregisterDetail,
} from "../events"
import parseConnectionTarget from "../get-connection-target"

export default class AudioContextElement extends HTMLElement {
	static tagName = "audio-context"
	// shadow: ShadowRoot = this.attachShadow({mode: "closed"})
	audioContext: AudioContext = new AudioContext()
	namedElements: Record<string, HTMLElement> = {}
	node: AudioNode = this.audioContext.destination
	connections: Record<string, {element: HTMLElement; attr: string}[]> = {}

	connect(event: ConnectEvent) {
		let connectionString = event.detail.connection
		if (connectionString) {
			let [id, attr] = parseConnectionTarget(connectionString)
			if (id && attr) {
				if (this.namedElements[id]) {
					let element = this.namedElements[id]
					event.target.node.connect(element.node[attr])
				} else {
					let conns = (this.connections[id] = this.connections[id] || [])
					conns.push({
						element: event.target,
						attr: attr,
					})
				}
			} else {
				console.info(`didn't understand ${connectionString}`)
			}
		} else {
			event.target.node.connect(event.target.parentElement.node)
		}
	}
	disconnect(event: DisconnectEvent) {}

	register(event: RegisterEvent) {
		if (event.detail.name && event.target) {
			this.namedElements[event.detail.name] = event.target as HTMLElement
			let conns = this.connections[event.detail.name]
			if (conns && conns.length) {
				for (let conn of conns) {
					conn.element.node.connect(event.target.node[conn.attr])
				}
			}
		}
	}

	unregister(event: CustomEvent<UnregisterDetail>) {
		if (event.detail.name && event.target) {
			let element = event.target as HTMLElement
			if (this.namedElements[event.detail.name] == element) {
				delete this.namedElements[event.detail.name]
			} else {
				throw new Error("tried to unregister a name you didn't have????")
			}
		}
	}

	constructor() {
		super()
		// this.shadow.append(...Array.from(this.children))
		this.addEventListener("unregister", this.unregister.bind(this))
		this.addEventListener("register", this.register.bind(this))
		this.addEventListener("disconnect", this.disconnect.bind(this))
		this.addEventListener("connect", this.connect.bind(this))
	}
}
