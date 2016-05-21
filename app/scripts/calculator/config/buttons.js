

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
    'FRAC' : { 'html': '<sup>1</sup>/<span class="math">x</span>', 'class': 'frac' },
    'CE' : { 'html': 'CE', 'class': 'ce' },
    'C' : { 'html': 'C', 'class': 'c' },
    'BACKSPACE' : { 'html': '<span class="icon icon-backspace">', 'class': 'backspace' },
    'DIVIDE' : { 'html': '&divide;', 'class': 'divide', 'mathSymbol': '&divide;',
        calculations: {
            'add': { calculationName: 'AddArithmeticToken' }
        }
    },
    'SEVEN' : { 'html': '7', 'class': 'number-7', 'mathSymbol': '7',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'EIGHT' : { 'html': '8', 'class': 'number-8', 'mathSymbol': '8',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'NINE' : { 'html': '9', 'class': 'number-9', 'mathSymbol': '9',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'TIMES' : { 'html': '&times;', 'class': 'times', 'mathSymbol': '&times;',
        calculations: {
            'add': { calculationName: 'AddArithmeticToken' }
        }
    },
    'FOUR' : { 'html': '4', 'class': 'number-4', 'mathSymbol': '4',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'FIVE' : { 'html': '5', 'class': 'number-5', 'mathSymbol': '5',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'SIX' : { 'html': '6', 'class': 'number-6', 'mathSymbol': '6',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'MINUS' : { 'html': '-', 'class': 'minus', 'mathSymbol': '-',
        calculations: {
            'add': { calculationName: 'AddArithmeticToken' }
        }
    },
    'ONE' : { 'html': '1', 'class': 'number-1', 'mathSymbol': '1',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'TWO' : { 'html': '2', 'class': 'number-2', 'mathSymbol': '2',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'THREE' : { 'html': '3', 'class': 'number-3', 'mathSymbol': '3',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'PLUS' : { 'html': '+', 'class': 'plus', 'mathSymbol': '+',
        calculations: {
            'add': { calculationName: 'AddArithmeticToken' }
        }
    },
    'PLUS_MINUS' : { 'html': '&plusmn;', 'class': 'plus-minus' },
    'ZERO' : { 'html': '0', 'class': 'number-0', 'mathSymbol': '0',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'DECIMAL' : { 'html': '.', 'class': 'decimal', 'mathSymbol': '.',
        calculations: {
            'add': { calculationName: 'AddNumberToken' }
        }
    },
    'EQUAL' : { 'html': '=', 'class': 'equal',
        calculations: {
            'evaluate': { calculationName: 'Evaluate' }
        }
    }
};

