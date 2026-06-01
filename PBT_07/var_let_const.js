// Đoạn 1: Kiểm chứng var hoisting
console.log("--- Đoạn 1 ---");
console.log(x); // Kết quả: undefined
var x = 5;

// Đoạn 2: Kiểm chứng let TDZ
console.log("--- Đoạn 2 ---");
try {
    console.log(y);
    let y = 10;
} catch (error) {
    console.log("Lỗi:", error.name); // ReferenceError
}

// Đoạn 3: Kiểm chứng const reassign
console.log("--- Đoạn 3 ---");
try {
    const z = 15;
    z = 20;
} catch (error) {
    console.log("Lỗi:", error.name); // TypeError
}

// Đoạn 4: Kiểm chứng const với Object/Array
console.log("--- Đoạn 4 ---");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

// Đoạn 5: Kiểm chứng Block Scope
console.log("--- Đoạn 5 ---");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a); // 2
}
console.log("Outside block:", a); // 1