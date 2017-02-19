

export default {
    'HISTORY' : { 'html': '<span class="icon icon-history">', 'class': 'history',
        'actions':{
            'toggle': { 'actionName': 'ToggleClass', 'actionArgs': ['&history', 'displayNone']}
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'MC' : { 'html': 'MC', 'class': 'mc disabled',
        'actions':{
            'memoryClear': { 'actionName': 'MemoryClear', 'actionArgs': ['&memoryManager']}
        },
        'changes':{
            'toggleDisableWhenEmpty': { 'changeName': 'ToggleDisableWhenEmpty', 'on': '&memoryManager'},
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'MR' : { 'html': 'MR', 'class': 'mr disabled',
        'actions': {
            'memoryRestore': { 'actionName': 'MemoryRestore', 'actionArgs': ['&tokenManager', '&memoryManager']}
        },
        'changes':{
            'toggleDisableWhenEmpty': { 'changeName': 'ToggleDisableWhenEmpty', 'on': '&memoryManager'},
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'M_PLUS' : { 'html': 'M+', 'class': 'm-plus',
        'actions': {
            'memoryPlus': { 'actionName': 'MemoryPlus', 'actionArgs': ['&tokenManager', '&memoryManager']}
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'M_MINUS' : { 'html': 'M-', 'class': 'm-minus',
        'actions': {
            'memoryMinus': { 'actionName': 'MemoryMinus', 'actionArgs': ['&tokenManager', '&memoryManager']}
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'MS' : { 'html': 'MS', 'class': 'ms',
        'actions': {
            'memorySave': { 'actionName': 'MemorySave', 'actionArgs': ['&tokenManager', '&memoryManager']}
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'M_STACK' : { 'html': 'M <div class="triangle down">', 'class': 'm-stack',
        'actions':{
            'toggle': { 'actionName': 'ToggleClass', 'actionArgs': ['&memoryStack', 'displayNone']}
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'PERCENT' : { 'html': '%', 'class': 'percent',
        'calculations': {
            'percent': { 'calculationName': 'Percent' }
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'SQRT' : { 'html': '&radic;', 'class': 'sqrt',
        'calculations': {
            'sqrt': { 'calculationName': 'Sqrt' }
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'SQUARED' : { 'html': '<span class="math">x</span><sup>2</sup>', 'class': 'squared',
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'FRAC' : { 'html': '<sup>1</sup>/<span class="math">x</span>', 'class': 'frac',
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'CE' : { 'html': 'CE', 'class': 'ce',
        'calculations': {
            'clear': { 'calculationName': 'ClearLastTokens' }
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'C' : { 'html': 'C', 'class': 'c',
        'calculations': {
            'clear': { 'calculationName': 'ClearTokens' }
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'BACKSPACE' : { 'html': '<span class="icon icon-backspace">', 'class': 'backspace',
        'calculations': {
            'backspace': { 'calculationName': 'Backspace' }
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'DIVIDE' : { 'html': '&divide;', 'class': 'divide', 'mathSymbol': '&divide;',
        'calculations': {
            'add': { 'calculationName': 'AddArithmeticToken' }
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'SEVEN' : { 'html': '7', 'class': 'number-7', 'mathSymbol': '7',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        }
    },
    'EIGHT' : { 'html': '8', 'class': 'number-8', 'mathSymbol': '8',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        }
    },
    'NINE' : { 'html': '9', 'class': 'number-9', 'mathSymbol': '9',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        }
    },
    'TIMES' : { 'html': '&times;', 'class': 'times', 'mathSymbol': '&times;',
        'calculations': {
            'add': { 'calculationName': 'AddArithmeticToken' }
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'FOUR' : { 'html': '4', 'class': 'number-4', 'mathSymbol': '4',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        }
    },
    'FIVE' : { 'html': '5', 'class': 'number-5', 'mathSymbol': '5',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        }
    },
    'SIX' : { 'html': '6', 'class': 'number-6', 'mathSymbol': '6',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        }
    },
    'MINUS' : { 'html': '-', 'class': 'minus', 'mathSymbol': '-',
        'calculations': {
            'add': { 'calculationName': 'AddArithmeticToken' }
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'ONE' : { 'html': '1', 'class': 'number-1', 'mathSymbol': '1',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        }
    },
    'TWO' : { 'html': '2', 'class': 'number-2', 'mathSymbol': '2',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        }
    },
    'THREE' : { 'html': '3', 'class': 'number-3', 'mathSymbol': '3',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        }
    },
    'PLUS' : { 'html': '+', 'class': 'plus', 'mathSymbol': '+',
        'calculations': {
            'add': { 'calculationName': 'AddArithmeticToken' }
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'PLUS_MINUS' : { 'html': '&plusmn;', 'class': 'plus-minus',
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'ZERO' : { 'html': '0', 'class': 'number-0', 'mathSymbol': '0',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        }
    },
    'DECIMAL' : { 'html': '.', 'class': 'decimal', 'mathSymbol': '.',
        'calculations': {
            'add': { 'calculationName': 'AddNumberToken' }
        },
        'changes':{
            'toggleDisableWhenInvalid': { 'changeName': 'ToggleDisableWhenInvalid', 'on': '&tokenManager'}
        }
    },
    'EQUAL' : { 'html': '=', 'class': 'equal',
        'calculations': {
            'evaluate': { 'calculationName': 'Evaluate' }
        }
    }
};

