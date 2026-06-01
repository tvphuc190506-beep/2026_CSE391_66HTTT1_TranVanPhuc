// --- VERSION 1: CLASSIC FIZZBUZZ ---
console.log("=== FIZZBUZZ VERSION 1 (CLASSIC) ===");
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

// --- VERSION 2: CUSTOM DYNAMIC FIZZBUZZ ---
console.log("\n=== FIZZBUZZ VERSION 2 (DYNAMIC) ===");
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = "";
        
        // Quét linh hoạt qua bất kỳ bộ quy tắc mảng nào truyền vào
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }
        
        // Nếu không thỏa mãn bất kỳ quy tắc chia hết nào, in ra con số hiện tại
        console.log(output === "" ? i : output);
    }
}

// Tập hợp cấu hình mảng quy tắc mở rộng theo đề bài yêu cầu
const myRules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

// Khởi chạy kiểm thử hàm linh hoạt nâng cao đến mốc 30 ô
customFizzBuzz(30, myRules);