"use strict";
// const name = "hkseo",
//     age = 24,
//     gender = "male"
Object.defineProperty(exports, "__esModule", { value: true });
// const sayHi = (name, age, gender?) => { // ?를 파라미터 뒤에 붙이면 옵션이 됨.
//     console.log(`Hello ${name} you are ${age}, ${gender}`)
// }
// sayHi(name, age)
// export {}
//-------------------------------
// const sayHi = (name: string, age: number, gender: string): number => { // 타입 지정 가능, 반환 값 설정.
//     console.log(`Hello ${name} you are ${age}, ${gender}`)
//     return age;
// }
// console.log(sayHi("hkseo", 24, "male"))
// export {}
//-------------------------------
// interface Human {
//     name:string,
//     age:number,
//     gender:string
// }
// const person ={
//     name:"hkseo",
//     gender:"male",
//     age:24
// }
// const sayHi = (human:Human): number => { // 인터페이스를 통해 타입 지정 가능
//     console.log(`Hello ${human.name} you are ${human.age}, ${human.gender}`)
//     return human.age;
// }
// console.log(person)
// export {}
// class Human {  // 클래스를 사용하면 인터페이스와 달리 컴파일 후에도 보임
//     public name: string;
//     public age: number;
//     public gender: string;
//     constructor(name: string, age: number, gender: string) {
//         this.name = name;
//         this.age = age;
//         this.gender = gender;
//     }
// }
// const hk = new Human("hkseo", 24, "male");
// const sayHi = (human: Human): number => { // 인터페이스를 통해 타입 지정 가능
//     console.log(`Hello ${human.name} you are ${human.age}, ${human.gender}`)
//     return human.age;
// }
// console.log(sayHi(hk))
// export {}
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block(0, "2020202020202", "", "first", 123456);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second");
createNewBlock("third");
createNewBlock("forth");
console.log(blockchain);
//# sourceMappingURL=index.js.map