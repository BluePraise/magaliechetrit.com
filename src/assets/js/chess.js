/* ============================================
   PRIVACY CHESS - COMPLETE IMPLEMENTATION
   No external dependencies, no tracking, no server
   ============================================ */

const PIECES = {
  k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙',
  K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟'
};

// Initial board setup (standard chess starting position)
const INITIAL_FEN = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

let board = [];
let turn = 'white';
let selectedSquare = null;
let moveHistory = [];
let castling = { K: true, Q: true, k: true, q: true };
let enPassantTarget = null;
let halfMoveClock = 0;
let fullMoveNumber = 1;
let lastMoveSquares = null;

/* ========== HELPER FUNCTIONS ========== */

function isUpperCase(str) { return str === str.toUpperCase() && str !== ''; }
function isLowerCase(str) { return str === str.toLowerCase() && str !== ''; }

function getPieceColor(piece) {
  if (!piece) return null;
  return isUpperCase(piece) ? 'white' : 'black';
}

function isValidPos(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8; }

function copyBoard(src) {
  return src.map(row => [...row]);
}

/* ========== MOVEMENT LOGIC ========== */

function getPseudoLegalMoves(r, c, checkCastling = true) {
  const piece = board[r][c];
  if (!piece || getPieceColor(piece) !== turn) return [];

  const moves = [];
  const isWhite = getPieceColor(piece) === 'white';
  const type = piece.toLowerCase();

  // Sliding pieces (Rook, Bishop, Queen)
  const directions = {
    'r': [[0, 1], [0, -1], [1, 0], [-1, 0]],
    'b': [[1, 1], [1, -1], [-1, 1], [-1, -1]],
    'q': [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
  };

  if (type === 'r' || type === 'b' || type === 'q') {
    for (const [dr, dc] of directions[type] || []) {
      let nr = r + dr, nc = c + dc;
      while (isValidPos(nr, nc)) {
        const target = board[nr][nc];
        if (target === '') {
          moves.push([nr, nc]);
        } else if (getPieceColor(target) !== getPieceColor(piece)) {
          moves.push([nr, nc]);
          break;
        } else {
          break;
        }
        nr += dr; nc += dc;
      }
    }
  }

  // Knight
  if (type === 'n') {
    const knightMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
    for (const [dr, dc] of knightMoves) {
      const nr = r + dr, nc = c + dc;
      if (isValidPos(nr, nc)) {
        const target = board[nr][nc];
        if (target === '' || getPieceColor(target) !== getPieceColor(piece)) {
          moves.push([nr, nc]);
        }
      }
    }
  }

  // Pawn
  if (type === 'p') {
    const dir = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;

    // Forward move
    if (isValidPos(r + dir, c) && board[r + dir][c] === '') {
      moves.push([r + dir, c]);
      // Double push from start
      if (r === startRow && board[r + dir * 2][c] === '') {
        moves.push([r + dir * 2, c]);
      }
    }

    // Captures
    for (const dc of [-1, 1]) {
      const nr = r + dir, nc = c + dc;
      if (isValidPos(nr, nc)) {
        const target = board[nr][nc];
        if (target && getPieceColor(target) !== getPieceColor(piece)) {
          moves.push([nr, nc]);
        }
        // En passant
        if (enPassantTarget && nr === enPassantTarget[0] && nc === enPassantTarget[1]) {
          moves.push([nr, nc]);
        }
      }
    }
  }

  // King
  if (type === 'k') {
    for (const dr of [-1, 0, 1]) {
      for (const dc of [-1, 0, 1]) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr, nc = c + dc;
        if (isValidPos(nr, nc)) {
          const target = board[nr][nc];
          if (target === '' || getPieceColor(target) !== getPieceColor(piece)) {
            moves.push([nr, nc]);
          }
        }
      }
    }

    // Castling (only if checking legal moves)
    if (checkCastling && !isInCheck(turn)) {
      const row = isWhite ? 7 : 0;
      if (r === row && c === 4) {
        // Kingside
        if (castling[isWhite ? 'K' : 'k']) {
          if (board[row][5] === '' && board[row][6] === '' &&
            !isSquareAttacked(row, 5, !turn) && !isSquareAttacked(row, 6, !turn)) {
            moves.push([row, 6]);
          }
        }
        // Queenside
        if (castling[isWhite ? 'Q' : 'q']) {
          if (board[row][1] === '' && board[row][2] === '' && board[row][3] === '' &&
            !isSquareAttacked(row, 3, !turn) && !isSquareAttacked(row, 2, !turn)) {
            moves.push([row, 2]);
          }
        }
      }
    }
  }

  // Filter out moves that leave king in check
  return moves.filter(([nr, nc]) => {
    const saved = copyBoard(board);
    makeMoveInternal(r, c, nr, nc);
    const inCheck = isInCheck(turn);
    restoreBoard(saved);
    return !inCheck;
  });
}

function makeMoveInternal(fromR, fromC, toR, toC) {
  const piece = board[fromR][fromC];
  board[toR][toC] = piece;
  board[fromR][fromC] = '';

  // Handle en passant capture
  if (piece.toLowerCase() === 'p' && fromC !== toC && board[toR][toC] === piece) {
    board[fromR][toC] = '';
  }

  // Handle castling
  if (piece.toLowerCase() === 'k' && Math.abs(toC - fromC) === 2) {
    if (toC === 6) { // Kingside
      board[fromR][5] = board[fromR][7];
      board[fromR][7] = '';
    } else if (toC === 2) { // Queenside
      board[fromR][3] = board[fromR][0];
      board[fromR][0] = '';
    }
  }
}

function restoreBoard(saved) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board[i][j] = saved[i][j];
    }
  }
}

function isSquareAttacked(r, c, byWhite) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece && getPieceColor(piece) === (byWhite ? 'white' : 'black')) {
        const moves = getPseudoLegalMoves(i, j, false);
        if (moves.some(([mr, mc]) => mr === r && mc === c)) {
          return true;
        }
      }
    }
  }
  return false;
}

function isInCheck(color) {
  let kingR, kingC;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece === (color === 'white' ? 'K' : 'k')) {
        kingR = r; kingC = c;
        break;
      }
    }
  }
  if (kingR === undefined) return true;
  return isSquareAttacked(kingR, kingC, color === 'white');
}

function hasLegalMoves(color) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && getPieceColor(piece) === color) {
        if (getPseudoLegalMoves(r, c, true).length > 0) return true;
      }
    }
  }
  return false;
}

function allPiecesCaptured(color) {
  let count = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && getPieceColor(piece) === color && piece.toLowerCase() !== 'k') {
        count++;
      }
    }
  }
  return count === 0;
}

/* ========== GAME STATE MANAGEMENT ========== */

function makeMove(fromR, fromC, toR, toC) {
  const piece = board[fromR][fromC];
  const captured = board[toR][toC];
  const pieceType = piece.toLowerCase();

  // Save state for undo
  moveHistory.push({
    from: [fromR, fromC],
    to: [toR, toC],
    piece: piece,
    captured: captured,
    enPassantTarget: enPassantTarget,
    castling: { ...castling },
    turn: turn,
    halfMoveClock: halfMoveClock,
    fullMoveNumber: fullMoveNumber
  });

  // Update castling rights
  if (pieceType === 'k') {
    if (getPieceColor(piece) === 'white') { castling.K = false; castling.Q = false; }
    else { castling.k = false; castling.q = false; }
  }
  if (pieceType === 'r') {
    if (fromR === 7 && fromC === 0) castling.Q = false;
    if (fromR === 7 && fromC === 7) castling.K = false;
    if (fromR === 0 && fromC === 0) castling.q = false;
    if (fromR === 0 && fromC === 7) castling.k = false;
  }
  if (pieceType === 'p' || pieceType === 'r') {
    halfMoveClock = 0;
  } else if (captured) {
    halfMoveClock = 0;
  } else {
    halfMoveClock++;
  }

  // Make the move internally first
  makeMoveInternal(fromR, fromC, toR, toC);

  // Handle en passant capture
  if (pieceType === 'p' && fromC !== toC && board[toR][toC] === piece) {
    board[fromR][toC] = '';
    moveHistory[moveHistory.length - 1].enPassantCapture = [fromR, toC];
  }

  // Handle castling rook movement
  if (pieceType === 'k' && Math.abs(toC - fromC) === 2) {
    if (toC === 6) { // Kingside
      board[fromR][5] = board[fromR][7];
      board[fromR][7] = '';
    } else if (toC === 2) { // Queenside
      board[fromR][3] = board[fromR][0];
      board[fromR][0] = '';
    }
  }

  // Pawn promotion (auto-queen for simplicity)
  if (pieceType === 'p' && (toR === 0 || toR === 7)) {
    board[toR][toC] = getPieceColor(piece) === 'white' ? 'Q' : 'q';
    moveHistory[moveHistory.length - 1].promotion = true;
  }

  // Set en passant target
  if (pieceType === 'p' && Math.abs(toR - fromR) === 2) {
    enPassantTarget = [(fromR + toR) / 2, fromC];
  } else {
    enPassantTarget = null;
  }

  // Track last move squares
  lastMoveSquares = [fromR, fromC, toR, toC];

  // Switch turn
  turn = turn === 'white' ? 'black' : 'white';
  if (turn === 'white') fullMoveNumber++;
  selectedSquare = null;

  renderBoard();
  updateStatus();
  updateMovesDisplay();
}

function undoMove() {
  if (moveHistory.length === 0) return;
  const last = moveHistory.pop();

  // Restore all state
  board[last.from[0]][last.from[1]] = last.piece;
  board[last.to[0]][last.to[1]] = last.captured;

  // Undo en passant capture
  if (last.enPassantCapture) {
    board[last.enPassantCapture[0]][last.enPassantCapture[1]] =
      last.piece.toLowerCase() === 'p' ? (last.turn === 'white' ? 'p' : 'P') : '';
  }

  // Undo castling
  if (last.piece.toLowerCase() === 'k' && Math.abs(last.to[1] - last.from[1]) === 2) {
    const row = last.from[0];
    if (last.to[1] === 6) { // Kingside
      board[row][7] = board[row][5];
      board[row][5] = '';
    } else if (last.to[1] === 2) { // Queenside
      board[row][0] = board[row][3];
      board[row][3] = '';
    }
  }

  // Restore all other state
  enPassantTarget = last.enPassantTarget;
  castling = last.castling;
  turn = last.turn;
  halfMoveClock = last.halfMoveClock;
  fullMoveNumber = last.fullMoveNumber;
  lastMoveSquares = null;
  selectedSquare = null;

  renderBoard();
  updateStatus();
  updateMovesDisplay();
}

/* ========== BOARD RENDERING ========== */

function renderBoard() {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';

  const validMoves = selectedSquare ? getPseudoLegalMoves(selectedSquare[0], selectedSquare[1]) : [];

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const square = document.createElement('div');
      square.className = 'square' + ((r + c) % 2 === 0 ? ' light' : ' dark');
      square.dataset.r = r;
      square.dataset.c = c;

      // Highlight selected square
      if (selectedSquare && selectedSquare[0] === r && selectedSquare[1] === c) {
        square.classList.add('selected');
      }

      // Highlight last move
      if (lastMoveSquares &&
        ((lastMoveSquares[0] === r && lastMoveSquares[1] === c) ||
          (lastMoveSquares[2] === r && lastMoveSquares[3] === c))) {
        square.classList.add('last-move');
      }

      // Show valid moves
      if (validMoves.some(([vr, vc]) => vr === r && vc === c)) {
        if (board[r][c] !== '') {
          square.classList.add('capture-move');
        } else {
          square.classList.add('valid-move');
        }
      }

      // Render piece
      const piece = board[r][c];
      if (piece) {
        square.textContent = PIECES[piece] || piece;
      }

      square.onclick = () => handleSquareClick(r, c);
      boardEl.appendChild(square);
    }
  }
}

function handleSquareClick(r, c) {
  const clickedPiece = board[r][c];
  const clickedColor = getPieceColor(clickedPiece);

  // If clicking on own piece, select it
  if (clickedPiece && clickedColor === turn) {
    if (selectedSquare && selectedSquare[0] === r && selectedSquare[1] === c) {
      // Deselect if clicking same square
      selectedSquare = null;
    } else {
      selectedSquare = [r, c];
    }
    renderBoard();
    return;
  }

  // If we have a selected piece, try to move there
  if (selectedSquare) {
    const [sr, sc] = selectedSquare;
    const validMoves = getPseudoLegalMoves(sr, sc);
    if (validMoves.some(([vr, vc]) => vr === r && vc === c)) {
      makeMove(sr, sc, r, c);
    } else {
      // Invalid move, deselect
      selectedSquare = null;
      renderBoard();
    }
  }
}

/* ========== STATUS & MOVE DISPLAY ========== */

function updateStatus() {
  const statusEl = document.getElementById('status');
  let status = (turn.charAt(0).toUpperCase() + turn.slice(1)) + "'s turn";

  // Check for game end conditions
  if (!hasLegalMoves(turn)) {
    if (isInCheck(turn)) {
      status = `Checkmate! ${turn === 'white' ? 'Black' : 'White'} wins!`;
    } else {
      status = 'Stalemate! Draw.';
    }
  } else if (isInCheck(turn)) {
    status += ' (Check!)';
  } else if (allPiecesCaptured(turn)) {
    status = `${turn.charAt(0).toUpperCase() + turn.slice(1)} has no pieces remaining!`;
  }

  statusEl.textContent = status;
}

function moveNotation(piece, fromR, fromC, toR, toC, captured, promotion) {
  const cols = 'abcdefgh';
  const pieceChar = piece.toLowerCase() === 'p' ? '' : piece.toUpperCase();
  const captureMark = captured ? 'x' : '';
  const dest = cols[toC] + (8 - toR);
  const promo = promotion ? '=Q' : '';

  return `${pieceChar}${captureMark}${dest}${promo}`;
}

function updateMovesDisplay() {
  const movesEl = document.getElementById('moves');
  movesEl.innerHTML = '<strong>Move List:</strong><br>';

  let moveNum = 1;
  for (let i = 0; i < moveHistory.length; i += 2) {
    const whiteMove = moveHistory[i];
    const blackMove = moveHistory[i + 1];

    let line = `${moveNum}. `;
    line += moveNotation(whiteMove.piece, ...whiteMove.from, ...whiteMove.to,
      whiteMove.captured, whiteMove.promotion) + ' ';
    if (blackMove) {
      line += moveNotation(blackMove.piece, ...blackMove.from, ...blackMove.to,
        blackMove.captured, blackMove.promotion);
    }
    movesEl.innerHTML += line + '<br>';
    moveNum++;
  }
}

/* ========== SAVE/LOAD FUNCTIONALITY ========== */

function generatePGN() {
  let pgn = '[Event "Privacy Chess Game"]\n';
  pgn += '[Date "' + new Date().toISOString().split('T')[0] + '"]\n';
  pgn += '[Site "Local Device"]\n\n';

  let moveStr = '';
  for (let i = 0; i < moveHistory.length; i++) {
    const move = moveHistory[i];
    if (i % 2 === 0) moveStr += Math.floor(i / 2 + 1) + '. ';
    moveStr += moveNotation(move.piece, ...move.from, ...move.to, move.captured, move.promotion) + ' ';
  }

  pgn += moveStr.trim();
  return pgn;
}

function exportGame() {
  const pgn = generatePGN();
  const blob = new Blob([pgn], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chess-game-' + Date.now() + '.pgn';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importGame(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    parseAndLoadPGN(text);
  };
  reader.readAsText(file);
}

function parseAndLoadPGN(pgn) {
  // Extract move strings from PGN
  const lines = pgn.split('\n');
  let moveStrings = '';

  for (const line of lines) {
    if (!line.startsWith('[')) {
      moveStrings += line + ' ';
    }
  }

  // Reset game state
  initGame();

  // Parse moves (simplified parser - handles standard notation)
  const moves = moveStrings.match(/[KQRBN]?[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](=[QRBN])?/g);

  if (!moves) {
    alert('Could not parse moves from this PGN. Make sure it\'s a valid format.');
    return;
  }

  for (const moveNotationStr of moves) {
    findAndExecuteMove(moveNotationStr.trim());
  }
}

function findAndExecuteMove(notation) {
  // Find current player's legal moves
  const legalMoves = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] && getPieceColor(board[r][c]) === turn) {
        const moves = getPseudoLegalMoves(r, c);
        for (const [tr, tc] of moves) {
          legalMoves.push({ from: [r, c], to: [tr, tc], notation: moveNotation(board[r][c], r, c, tr, tc, board[tr][tc] !== '', false) });
        }
      }
    }
  }

  // Try to match notation
  for (const lm of legalMoves) {
    if (lm.notation.includes(notation.slice(-2)) && !notation.includes('=')) {
      makeMove(lm.from[0], lm.from[1], lm.to[0], lm.to[1]);
      return;
    }
  }
}

function initGame() {
  board = INITIAL_FEN.map(row => [...row]);
  turn = 'white';
  moveHistory = [];
  castling = { K: true, Q: true, k: true, q: true };
  enPassantTarget = null;
  halfMoveClock = 0;
  fullMoveNumber = 1;
  selectedSquare = null;
  lastMoveSquares = null;
  renderBoard();
  updateStatus();
  updateMovesDisplay();
}

function resetGame() {
  if (confirm('Start a new game? Current progress will be lost.')) {
    initGame();
  }
}

/* ========== INITIALIZATION ========== */

document.addEventListener('DOMContentLoaded', initGame);
