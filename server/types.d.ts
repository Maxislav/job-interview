interface TableInterface {
    id: string,
    type: tableType,
    name: string,
    players: number,
    maxPlayers: number
}

type tableType = "CIRCLE" | "SQUARE"