export default function parseConnectionTarget(
	connection: string | null
): [string, string] | [] {
	if (!connection) return []
	let match = connection.match(/^([a-zA-Z0-9_-]+)->([a-zA-Z0-9_]+)/)
	if (!match) {
		throw new Error(`"${connection}" doesn't match the node->attr shape`)
	}
	let [, id, attr] = match
	if (match) {
		return [id, attr]
	} else {
		return []
	}
}
