export class LocalStorageClass {
    constructor(){}

    public getStorage(text: string){
        //Si localStorage.getItem(text) es null o undefined, devuelve el resultado de la derecha. De lo contrario, devuelve el de la izquierda. Uso de "operador de coalescencia nula".
        const array = JSON.parse(localStorage.getItem(text) ?? "[]");
        return array;
    }
    
    public setStorage(text: string, array: any[]){
        localStorage.setItem(text, JSON.stringify(array));
    }
}

