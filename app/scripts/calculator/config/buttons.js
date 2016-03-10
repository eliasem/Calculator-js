

export default {
    'HISTORY' : { 'html': '<span class="icon icon-history">', 'class': 'history',
        actions:{
            'toggle': { actionName: 'ToggleClass', actionArgs: ["&history", "displayNone"]}
        }
    },
    'MC' : { 'html': 'MC', 'class': 'mc' },
    'MR' : { 'html': 'MR', 'class': 'mr' },
    'M_PLUS' : { 'html': 'M+', 'class': 'm-plus' },
    'M_MINUS' : { 'html': 'M-', 'class': 'm-minus' },
    'MS' : { 'html': 'MS', 'class': 'ms' },
    'M_STACK' : { 'html': 'M <div class="triangle down">', 'class': 'm-stack',
        actions:{
            'toggle': { actionName: 'ToggleClass', actionArgs: ["&memoryStack", "displayNone"]}
        }
    },
    'PERCENT' : { 'html': '%', 'class': 'percent' },
    'SQRT' : { 'html': '&radic;', 'class': 'sqrt' },
    'SQUARED' : { 'html': '<span class="math">x</span><sup>2</sup>', 'class': 'squared' },
    'FRAC' : { 'html': '1/<span class="math">x</span>', 'class': 'frac' },
    'CE' : { 'html': 'CE', 'class': 'ce' },
    'C' : { 'html': 'C', 'class': 'c' },
    'BACKSPACE' : { 'html': '<span class="icon icon-backspace">', 'class': 'backspace' },
    'DIVIDE' : { 'html': '&divide;', 'class': 'divide',
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'SEVEN' : { 'html': '7', 'class': 'number-7',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "7"] }
        },
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'EIGHT' : { 'html': '8', 'class': 'number-8',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "8"] }
        },
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'NINE' : { 'html': '9', 'class': 'number-9',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "9"] }
        },
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'TIMES' : { 'html': '&times;', 'class': 'times',
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'FOUR' : { 'html': '4', 'class': 'number-4',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "4"] }
        },
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'FIVE' : { 'html': '5', 'class': 'number-5',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "5"] }
        },
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'SIX' : { 'html': '6', 'class': 'number-6',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "6"] }
        },
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'MINUS' : { 'html': '-', 'class': 'minus',
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'ONE' : { 'html': '1', 'class': 'number-1',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "1"] }
        },
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'TWO' : { 'html': '2', 'class': 'number-2',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "2"] }
        },
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'THREE' : { 'html': '3', 'class': 'number-3',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "3"] }
        },
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'PLUS' : { 'html': '+', 'class': 'plus',
        calculations: {
            'add': { calculationName: 'AddToStack' }
        }
    },
    'PLUS_MINUS' : { 'html': '&plusmn;', 'class': 'plus-minus' },
    'ZERO' : { 'html': '0', 'class': 'number-0',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "0"] }
        }
    },
    'DECIMAL' : { 'html': '.', 'class': 'decimal',
        actions: {
            'print': { actionName: 'PrintToScreen', actionArgs: ["&answer", "."] }
        }
    },
    'EQUAL' : { 'html': '=', 'class': 'equal' }
};

