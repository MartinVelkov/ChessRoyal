interface ChessPiece {
    image: string;
    position: any; // Assuming position is of a specific type
    type: string;
    team: 'b' | 'w';
    possibleMoves: number[];
}

export function invertChessboard(data: ChessPiece[]): ChessPiece[] {
    const invertedChessboard: ChessPiece[] = [];
    
    for (let i = data.length - 1; i >= 0; i--) {
        const piece = data[i];
        if (piece && piece.image && piece.type && piece.team && piece.possibleMoves) {
            const invertedPiece: ChessPiece = {
                image: piece.image,
                position: piece.position,
                type: piece.type,
                team: piece.team === 'b' ? 'w' : 'b',
                possibleMoves: piece.possibleMoves
            };
            invertedChessboard.push(invertedPiece);
        } else {
            console.error(`Invalid chess piece at index ${i}`);
        }
    }
    
    return invertedChessboard;
}