const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" }
];

// Khởi tạo các biến lưu trữ thống kê dữ liệu tổng hợp
let reportTable = "STT | Tên      | TB    | Xếp loại\n-----------------------------------\n";
let totalMath = 0, totalPhysics = 0, totalCs = 0;
let highestStudent = students[0], lowestStudent = students[0];

// Khởi tạo biến đếm số lượng phân loại danh mục học sinh
const rankCount = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };

// Các biến lưu trữ xử lý điểm trung bình giới tính nam nữ (Bonus)
let maleSum = 0, maleCount = 0;
let femaleSum = 0, femaleCount = 0;

// Khởi chạy vòng lặp xử lý dữ liệu qua mảng
for (let i = 0; i < students.length; i++) {
    const sv = students[i];
    
    // 1. Công thức tính điểm trung bình môn học cụ thể
    const dtb = parseFloat((sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3).toFixed(1));
    
    // 2. Phân loại thứ bậc học lực
    let xepLoai = "";
    if (dtb >= 8.0) xepLoai = "Giỏi";
    else if (dtb >= 6.5) xepLoai = "Khá";
    else if (dtb >= 5.0) xepLoai = "Trung bình";
    else xepLoai = "Yếu";

    // Cập nhật tăng số đếm xếp loại tương ứng
    rankCount[xepLoai]++;

    // 3. Nối chuỗi tạo giao diện bảng kết quả
    reportTable += `${i + 1}   | ${sv.name.padEnd(8)} | ${dtb.toFixed(1)}   | ${xepLoai}\n`;

    // Cộng dồn điểm phục vụ tính trung bình môn cả lớp
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCs += sv.cs;

    // 5. Tìm sinh viên có điểm trung bình cao nhất / thấp nhất hệ thống
    const currentHighestDtb = highestStudent.math * 0.4 + highestStudent.physics * 0.3 + highestStudent.cs * 0.3;
    const currentLowestDtb = lowestStudent.math * 0.4 + lowestStudent.physics * 0.3 + lowestStudent.cs * 0.3;

    if (dtb > currentHighestDtb) highestStudent = sv;
    if (dtb < currentLowestDtb) lowestStudent = sv;

    // 7. Thống kê điểm theo hệ phân loại giới tính (Bonus)
    if (sv.gender === "M") {
        maleSum += dtb;
        maleCount++;
    } else {
        femaleSum += dtb;
        femaleCount++;
    }
}

// In ra các màn hình kết quả thống kê
console.log("--- BẢNG KẾT QUẢ XẾP LOẠI ---");
console.log(reportTable);

console.log("--- THỐNG KÊ SỐ LƯỢNG XẾP LOẠI ---");
for (const rank in rankCount) {
    console.log(`${rank}: ${rankCount[rank]} SV`);
}

console.log("\n--- THÀNH TÍCH ĐỈNH CAO ---");
console.log(`SV Điểm Cao Nhất: ${highestStudent.name}`);
console.log(`SV Điểm Thấp Nhất: ${lowestStudent.name}`);

console.log("\n--- TRUNG BÌNH MÔN TOÀN LỚP ---");
console.log(`Toán: ${(totalMath / students.length).toFixed(2)}`);
console.log(`Vật Lý: ${(totalPhysics / students.length).toFixed(2)}`);
console.log(`Tin Học: ${(totalCs / students.length).toFixed(2)}`);

console.log("\n--- THỐNG KÊ BONUS THEO GIỚI TÍNH ---");
console.log(`Điểm TB Sinh viên Nam: ${(maleSum / maleCount).toFixed(2)}`);
console.log(`Điểm TB Sinh viên Nữ: ${(femaleSum / femaleCount).toFixed(2)}`);