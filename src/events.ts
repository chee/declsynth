export interface DisconnectDetail {
	connection: string | null
}

export class DisconnectEvent extends CustomEvent<DisconnectDetail> {
	name: "disconnect"
	target: HTMLElement
}

export interface ConnectDetail {
	connection: string | null
}

export class ConnectEvent extends CustomEvent<ConnectDetail> {
	name: "connect"
	target: HTMLElement
}

export interface RegisterDetail {
	name: string | null
}

export class RegisterEvent extends CustomEvent<RegisterDetail> {
	name: "register"
	target: HTMLElement
}

export interface UnregisterDetail {
	name: string | null
}

export class UnregisterEvent extends CustomEvent<UnregisterDetail> {
	name: "unregister"
	target: HTMLElement
}

export function disconnect(connection: string | null) {
	return new DisconnectEvent("disconnect", {
		detail: {
			connection,
		},
		bubbles: true,
		composed: true,
	})
}
export function connect(connection: string | null) {
	return new ConnectEvent("connect", {
		detail: {
			connection,
		},
		bubbles: true,
		composed: true,
	})
}

export function register(name: string | null) {
	return new RegisterEvent("register", {
		detail: {
			name,
		},
		bubbles: true,
		composed: true,
	})
}

export function unregister(name: string | null) {
	return new UnregisterEvent("unregister", {
		detail: {
			name,
		},
		bubbles: true,
		composed: true,
	})
}
