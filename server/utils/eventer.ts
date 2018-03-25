export class Eventer{
    private _events: {};

    /**
     * @param {String?} bookmark
     */
    constructor(){
        this._events = {};
    }
    on(name, func){
        this._create(name);
        this._events[name].push(func)
    }

    public emit(name, data){
        this._create(name);
        this._events[name].forEach(f=>f(data))
    }

    off(name, func){
        if(this._events[name]){
            if(func){
                while (-1<this._events[name].indexOf(func)){
                    this._events[name].splice(this._events[name].indexOf(func), 1)
                }
            }else{
                this._events[name].length = 0;
            }
        }
    }

    get events(){
        return this._events
    }


    destroy(){
        Object.keys(this._events).forEach(name=>{
            delete this._events[name]
        })
    }

    private _create(name){
        !this._events[name] && (this._events[name] = []);
    }
}