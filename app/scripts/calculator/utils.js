export function* objectEntries(obj){
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

export function findSmallestButGreaterThan(array, greaterThan){
    return array.reduce(function(a,b){
        if( a <= greaterThan){ return b < greaterThan ? greaterThan : b; }
        if(a > b && b > greaterThan){ return b; }
        return a;
    });
}