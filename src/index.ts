// const name = "hkseo",
//     age = 24,
//     gender = "male"

// const sayHi = (name, age, gender?) => { // ?를 파라미터 뒤에 붙이면 옵션이 됨.
//     console.log(`Hello ${name} you are ${age}, ${gender}`)
// }

// sayHi(name, age)

// export { }



const sayHi = (name: string, age: number, gender: string): number => { // 타입 지정 가능, 반환 값 설정.
    console.log(`Hello ${name} you are ${age}, ${gender}`)
    return age;
}

console.log(sayHi("hkseo", 24, "male"))

export { }