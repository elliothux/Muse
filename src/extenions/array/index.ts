
interface Array<T> {
    remove(arg: T): T[];
}


Array.prototype.remove = function<T> (arg: T): T[] {
    let i;
    if (typeof arg === 'number')
        i = arg;
    else
        for (i = 0; i < this.length; ++i)
            if (this[i] === arg) break;
    return i ?
        this.slice(0, i).concat(this.slice(i+1, this.length)) : this
};
