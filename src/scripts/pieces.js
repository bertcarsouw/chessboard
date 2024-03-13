const ANIMATE_CLASS = 'piece--animate';

const START_POSITIONS = [
    // WHITE
    { location: 'a2', piece: 'wp' },
    { location: 'b2', piece: 'wp' },
    { location: 'c2', piece: 'wp' },
    { location: 'd2', piece: 'wp' },
    { location: 'e2', piece: 'wp' },
    { location: 'f2', piece: 'wp' },
    { location: 'g2', piece: 'wp' },
    { location: 'h2', piece: 'wp' },
    { location: 'a1', piece: 'wr' },
    { location: 'b1', piece: 'wn' },
    { location: 'c1', piece: 'wb' },
    { location: 'd1', piece: 'wq' },
    { location: 'e1', piece: 'wk' },
    { location: 'f1', piece: 'wb' },
    { location: 'g1', piece: 'wn' },
    { location: 'h1', piece: 'wr' },

    // BLACK
    { location: 'a7', piece: 'bp' },
    { location: 'b7', piece: 'bp' },
    { location: 'c7', piece: 'bp' },
    { location: 'd7', piece: 'bp' },
    { location: 'e7', piece: 'bp' },
    { location: 'f7', piece: 'bp' },
    { location: 'g7', piece: 'bp' },
    { location: 'h7', piece: 'bp' },
    { location: 'a8', piece: 'br' },
    { location: 'b8', piece: 'bn' },
    { location: 'c8', piece: 'bb' },
    { location: 'd8', piece: 'bq' },
    { location: 'e8', piece: 'bk' },
    { location: 'f8', piece: 'bb' },
    { location: 'g8', piece: 'bn' },
    { location: 'h8', piece: 'br' },
];

let boardElement;

const removeAllPieces = () => {
    [...document.getElementsByClassName('piece')].forEach((element) => {
        element.remove();
    });
};

const createPieceElement = (piece, location) => {
    const div = document.createElement('div');
    div.classList.add('piece');
    div.innerHTML = `<img src="./assets/${piece}.png" alt="${piece}.png"/>`;

    if (location) {
        div.setAttribute('location', location);
    }

    boardElement.appendChild(div);
};

const setAnimations = (value) => {
    const pieceElements = [...document.getElementsByClassName('piece')];
    pieceElements.forEach((element) => {
        if (value) {
            element.classList.add(ANIMATE_CLASS);
        } else {
            element.classList.remove(ANIMATE_CLASS);
        }
    });
};

const updatePositions = () => {
    [...boardElement.getElementsByClassName('piece')]
        .filter(element => !!element.getAttribute('location'))
        .forEach((element) => {
            const field = document.getElementById(element.getAttribute('location'));
            const fieldDimension = `${boardElement.getBoundingClientRect().height / 8}px`;

            element.style.height = fieldDimension;
            element.style.width = fieldDimension;
            element.style.left = `${field.offsetLeft}px`;
            element.style.top = `${field.offsetTop}px`;
        });
};

const getPieceAtPosition = (position) => {
    const elements = document.querySelectorAll(`[location="${position}"]`);

    return elements.length ? elements[0] : null;
};

const setupNewGame = (id) => {
    boardElement = document.getElementById(id);

    removeAllPieces();

    START_POSITIONS.forEach((item) => {
        createPieceElement(item.piece, item.location);
    });

    updatePositions();
    setAnimations(true);
};

const move = (locationOne, locationTwo) => {
    const pieceOne = getPieceAtPosition(locationOne);
    const pieceTwo = getPieceAtPosition(locationTwo);

    if (pieceOne) {
        pieceOne.setAttribute('location', locationTwo);

        if (pieceTwo) {
            pieceTwo.remove();
        }
    }

    updatePositions()
};

export default {
    setupNewGame,
    move
};