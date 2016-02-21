import Buttons from 'calculator/constant/Buttons';

export default {
    toolbar:{
        title:{},
        historyButton: {
            anchor: 'right'
        }
    },
    expression:{},
    answer: {},
    rows:[
        {
            buttons:[Buttons.MC, Buttons.MR, Buttons.M_PLUS, Buttons.M_MINUS, Buttons.MS, Buttons.M_HISTORY]
        },
        {
            buttons: [Buttons.PERCENT, Buttons.SQRT, Buttons.SQUARED, Buttons.FRAC]
        },
        {
            buttons: [Buttons.CE, Buttons.C, Buttons.BACKSPACE, Buttons.DIVIDE],
            className: 'main'
        },
        {
            buttons: [Buttons.SEVEN, Buttons.EIGHT, Buttons.NINE, Buttons.TIMES],
            className: 'main'
        },
        {
            buttons: [Buttons.FOUR, Buttons.FIVE, Buttons.SIX, Buttons.MINUS],
            className: 'main'
        },
        {
            buttons: [Buttons.ONE, Buttons.TWO, Buttons.THREE, Buttons.PLUS],
            className: 'main'
        },
        {
            buttons: [Buttons.PLUS_MINUS, Buttons.ZERO, Buttons.DECIMAL, Buttons.EQUAL],
            className: 'main'
        }
    ]
};