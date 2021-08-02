// 수퍼 클래스
class Base {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        return `Hi! ${this.name}`;
    }
}

class Derived extends Base {
    sayHi() {
        // __super는 Derived의 sayHi가 바인딩된 객체의 프로토타입을 가리킨다. => super와 같은 기능
        // sayHi는 Derived.prototype에 바인딩되었으므로 __super는 Base.prototype을 가리킨다.
        const __super = Object.getPrototypeOf(Derived.prototype);
        return `${__super.sayHi()} how are you doing?`;
    }
}

const derived = new Derived('Lee');
console.log(derived.sayHi());