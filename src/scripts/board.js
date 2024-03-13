const ABCDEFGH = 'abcdefgh';

let boardElement;

const BLACK_FIELDS = [
    'aceg'.split('').map(character => '1357'.split('').map(number => `${character}${number}`)).flat(),
    'bdfh'.split('').map(character => '2468'.split('').map(number => `${character}${number}`)).flat()
].flat();

const setup = (id) => {
    boardElement = document.getElementById(id);

    boardElement.innerHTML = Array(64)
        .fill(1)
        .map((one, index) => one + index)
        .map((number, index) => {
            const rowNumber = number % 8 || 8;
            const column = ABCDEFGH.split('')[Math.floor(index / 8)];

            return `${column}${rowNumber}`;
        })
        .sort((one, two) => {
            const numberOne = Number.parseInt(one.charAt(1));
            const numberTwo = Number.parseInt(two.charAt(1));

            if (numberOne !== numberTwo) {
                return numberOne > numberTwo ? -1 : 1;
            }

            const characterOneIndex = ABCDEFGH.indexOf(one.charAt(0));
            const characterTwoIndex = ABCDEFGH.indexOf(two.charAt(0));

            if (characterOneIndex !== characterTwoIndex) {
                return characterTwoIndex > characterOneIndex ? -1 : 1;
            }

            return 0;
        })
        .map((rowAndColumn) => `<div id="${rowAndColumn}" class="field field--${BLACK_FIELDS.includes(rowAndColumn) ? 'black' : 'white'}"></div>`)
        .join('');
};

export default {
    setup,
    parent: () => boardElement
};
