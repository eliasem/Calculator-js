import ButtonConfig from '../config/buttons';
import Button from '../lib/Button';

let Buttons = {};

for(let b in ButtonConfig){
    if(!ButtonConfig.hasOwnProperty(b)){ continue; }
    Buttons[b] = new Button(ButtonConfig[b]);
}

export default Buttons;