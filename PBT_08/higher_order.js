// 1. Hàm pipe() - Nối chuỗi liên hoàn các xử lý tính toán hàm số
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
}

// 2. Hàm memoize() - Cấu trúc bộ nhớ đệm Cache lưu trữ kết quả thông minh
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
            return cache[key]; // Trả về luôn từ kho lưu trữ nếu gặp lại input cũ
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// 3. Hàm debounce() - Trì hoãn chờ người dùng ngừng thao tác mới thực thi hành động
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId); // Xóa bộ đếm cũ nếu có thao tác mới chen vào
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// --- KHU VỰC CHẠY CHỨNG MINH KẾT QUẢ ĐẦU RA ---
console.log("=== TEST HÀM 1: PIPE ===");
const processValue = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);
console.log(processValue(5)); // Kết quả ra chuỗi chữ: "Kết quả: 20"

console.log("\n=== TEST HÀM 2: MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính toán phức tạp...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000)); // In dòng: Đang tính toán... -> Kết quả
console.log(expensiveCalc(1000000)); // Lấy trực tiếp từ cache, không in lại dòng chữ thông báo

console.log("\n=== TEST HÀM 3: DEBOUNCE (Hành vi bất đồng bộ) ===");
const search = debounce((query) => {
    console.log("Đang tìm kiếm từ khóa:", query);
}, 500);

search("a");
search("ab");
search("abc"); // Chỉ có lệnh cuối cùng này được kích hoạt in ra màn hình sau mốc 500ms