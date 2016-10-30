export default class {
    getReference(referenceString){
        if(referenceString[0] !== '&'){ return; }

        let name = referenceString.substr(1);
        if(this['$' + name]){
            return this['$' + name];
        }
        return this[name];
    }
}