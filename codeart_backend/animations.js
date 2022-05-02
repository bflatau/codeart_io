
const flaps = [
    ' ', // BLACK
    'J', // 1
    'B', // 2
    'M', // 3
    'R', // 4
    '$', // 5
    'V', // 6
    'K', // 7
    'A', // 8
    'E', // 9
    'N', // 10
    'O', // 11
    'y', // YELLOW
    '*', // 13
    'g', // GREEN
    'G', // 15
    'I', // 16
    '%', // 17
    'D', // 18
    'L', // 19
    '&', // 20
    '@', // 21
    'C', // 22
    'W', // 23
    'H', // 24
    'Y', // 25
    'w', // WHITE
    'Q', // 27
    'p', // PINK
    'o', // ORANGE
    '!', // 30
    'T', // 31
    'Z', // 32
    'P', // 33
    'F', // 34
    '?', // 35
    'S', // 36
    '#', // 37
    'U', // 38
    'X', // 39
]

const welcome = [
    [6000, [
        '                  ',
        '                  ',
        '                  ',
        '                  ',
        '                  ',
        '                  ',
    ]],
    [300, [
        'p                 ',
        '  WELCOME  TO  p  ',
        ' y                ',
        '    CODE  ART    w',
        '   g          g   ',
        'p       w        y',
    ]],
    [200, [
        'p                 ',
        '  WELCOME  TO  p  ',
        ' y                ',
        '    CODE  ART    w',
        '   g          g   ',
        'p       w        y',
    ], [
        '      1           ',
        '                 1',
        '    1             ',
        '                  ',
        '                  ',
        '          1       ',
    ]],
    [200, [
        'p                 ',
        '  WELCOME  TO  p  ',
        ' y                ',
        '    CODE  ART    w',
        '   g          g   ',
        'p       w        y',
    ], [
        '            1     ',
        '                  ',
        '         1    1   ',
        '                  ',
        '       1          ',
        '   1        1     ',
    ]],
    [200, [
        'p                 ',
        '  WELCOME  TO  p  ',
        ' y                ',
        '    CODE  ART    w',
        '   g          g   ',
        'p       w        y',
    ], [
        '  1               ',
        '                  ',
        '     1      1     ',
        '        1         ',
        '           1      ',
        '1              1  ',
    ]],
    [6000, [
        'p                 ',
        '  WELCOME  TO  p  ',
        ' y                ',
        '    CODE  ART    w',
        '   g          g   ',
        'p       w        y',
    ]],
]
exports.welcome = welcome

function* randomFill(color1, color2, before, after) {
    const state = [
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
    ]
    yield [before, state]

    const toFlip = []
    for (let i = 0; i < 108; i++) {
        toFlip.push(i)
    }

    const colors = ['w', 'y', 'o', 'g', 'p']

    while (toFlip.length > 0) {
        const i = Math.floor(Math.random() * toFlip.length)
        const [index] = toFlip.splice(i, 1)
        const row = Math.floor(index/18)
        const col = index % 18
        state[row][col] = color2 == 'random' ? colors[Math.floor(Math.random()*colors.length)] : color2
        const mask = [
            new Array(18).fill(false),
            new Array(18).fill(false),
            new Array(18).fill(false),
            new Array(18).fill(false),
            new Array(18).fill(false),
            new Array(18).fill(false),
        ]
        mask[row][col] = true
        yield [100, state, mask] 
    }
    yield [after, state]
}

exports.randomFill = randomFill


function* spiral(color1, color2, before, after) {
    const state = [
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
    ]
    yield [before, state]

    let xTravel = 18
    let yTravel = 5
    let dir = 0
    let x = -1
    let y = 0

    while  (xTravel > -1 && yTravel > -1) {
        if (dir == 0 || dir == 2) {
            for (let i = 0; i < xTravel; i++) {
                if (dir == 0) {
                    x++
                } else {
                    x--
                }
                state[y][x] = color2
                yield [50, state]
            }
            xTravel--
        } else {
            for (let i = 0; i < yTravel; i++) {
                if (dir == 1) {
                    y++
                } else {
                    y--
                }
                state[y][x] = color2
                yield [50, state]
            }
            yTravel--
        }
        dir = (dir + 1) % 4
    }
    yield [after, state]
}
exports.spiral = spiral


function* rain(color1, color2, before, after) {
    const state = [
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
        new Array(18).fill(color1),
    ]
    yield [before, state]
    
    const toStart = []
    for (let i = 0; i < 18; i++) {
        toStart.push(i)
    }

    const framesPerStart = 5

    let i = 0
    while (1) {

        // Move everything down a row
        state[5] = state[4]
        state[4] = state[3]
        state[3] = state[2]
        state[2] = state[1]
        state[1] = state[0].slice(0)
        if (i >= framesPerStart) {
            i = 0;
            const x = Math.floor(Math.random() * toStart.length)
            const [index] = toStart.splice(x, 1)
            state[0][index] = color2
        }

        if (state[5].every((c) => c === color2)) {
            break;
        }
        yield [100, state]

        i++
    }

    yield [after, state]
}
exports.rain = rain

function* testAll() {
    const state = [
        new Array(18).fill(' '),
        new Array(18).fill(' '),
        new Array(18).fill(' '),
        new Array(18).fill(' '),
        new Array(18).fill(' '),
        new Array(18).fill(' '),
    ]
    yield [5000, state]
    for (let i = 0; i < 40; i++) {
        const state = [
            new Array(18).fill(flaps[i]),
            new Array(18).fill(flaps[i]),
            new Array(18).fill(flaps[i]),
            new Array(18).fill(flaps[i]),
            new Array(18).fill(flaps[i]),
            new Array(18).fill(flaps[i]),
        ]
        yield [1500, state]
    }
    yield [5000, state]
}
exports.testAll = testAll

function* sequence1() {
    for (const d of welcome) {
        yield d
    }
    yield [5000, [
        '                  ',
        '                  ',
        '                  ',
        '                  ',
        '                  ',
        '                  ',
    ]]
    for (const d of randomFill('b', 'y', 4000, 1000)) {
        yield d
    }
    for (const d of spiral('y', 'p', 1000, 1000)) {
        yield d
    }
    for (const d of rain('p', 'g', 1000, 6000)) {
        yield d
    }
}
exports.sequence1 = sequence1

function* wheelOfFortune(solution) {
    const state = [ ///was wheel of fortune with 'g' fields
        '                  ',
        '                  ',
        '                  ',
        '                  ',
        '                  ',
        '                  ',
    ]
    yield [6000, state]
    
    // state[5] = (' '.repeat(Math.floor((18 - category.length) / 2)) + category).padEnd(18)

    // yield [4000, state]

    for (let row = 0; row < solution.length; row++) {
        state[row] = state[row].split('').map((v, i) => {
            const scol = i - 2
            if (scol < 0 || scol >= solution[row].length) {
                return v
            }
            return solution[row].split('')[scol] === ' ' ? v : 'w'
        }).join('')
        yield [1000, state]
    }
    
    yield [3000, state]

    const letters = {}
    for (const row of solution) {
        for (const letter of row.split('')) {
            letters[letter] = true
        }
    }
    delete letters[' ']

    const lettersToGuess = [...Object.keys(letters)]
    while (lettersToGuess.length > 0) {
        console.log(lettersToGuess)
        const letter = lettersToGuess.splice(Math.floor(Math.random() * lettersToGuess.length), 1)[0]
        let empty = 0
        for (let row = 0; row < solution.length; row++) {
            state[row] = state[row].split('').map((v, i) => {
                const scol = i - 2
                if (scol < 0 || scol >= solution[row].length) {
                    return v
                }
                const solutionRow = solution[row].split('')
                return solutionRow[scol] === letter ? letter : v
            }).join('')
            empty += state[row].split('w').length - 1
        }
        yield [empty > 10 ? 3000 : 5000, state] //was 8000, now 3000
    }
    yield [5000, state]
}
exports.wheelOfFortune = wheelOfFortune

