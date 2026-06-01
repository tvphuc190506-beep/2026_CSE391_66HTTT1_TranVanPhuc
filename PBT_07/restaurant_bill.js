function inHoaDon(danhSachMon, coTip = false) {
    let tongCong = 0;

    // 1. Tính toán giá trị thô sơ ban đầu của tổng tiền hóa đơn
    for (let i = 0; i < danhSachMon.length; i++) {
        tongCong += danhSachMon[i].gia * danhSachMon[i].soLuong;
    }

    // 2. Tính toán tỷ lệ giảm giá dựa theo mốc quy đổi đề bài quy định
    let phanTramGiam = 0;
    if (tongCong > 1000000) {
        phanTramGiam = 0.15; // Giảm 15% tổng tiền nếu đơn vượt 1 triệu
    } else if (tongCong > 500000) {
        phanTramGiam = 0.10; // Giảm 10% tổng tiền nếu đơn vượt 500k
    }

    // Kiểm tra ưu đãi bổ sung đặc biệt 5% riêng nếu ăn vào ngày Thứ 3 (Wednesday)
    const homNay = new Date();
    if (homNay.getDay() === 3) {
        phanTramGiam += 0.05;
    }

    const tienGiamGia = tongCong * phanTramGiam;
    const tienSauGiam = tongCong - tienGiamGia;

    // 3. Tính toán các khoản phụ phí phát sinh đi kèm hệ thống
    const vat = tienSauGiam * 0.08; // Phụ phí thuế VAT 8%
    const tip = coTip ? tienSauGiam * 0.05 : 0; // Phụ phí tiền Tip 5% nếu kích hoạt

    const thanhToan = tienSauGiam + vat + tip;

    // 4. In chuỗi định dạng văn bản hóa đơn mô phỏng giao diện mẫu căn dòng
    console.log("======================================");
    console.log("||         HÓA ĐƠN NHÀ HÀNG         ||");
    console.log("======================================");
    
    for (let i = 0; i < danhSachMon.length; i++) {
        const item = danhSachMon[i];
        const line = `${i + 1}. ${item.ten.padEnd(10)} x${item.soLuong}  @${(item.gia/1000)}k = ${(item.gia * item.soLuong / 1000)}k`;
        console.log(`|| ${line.padEnd(34)} ||`);
    }
    
    console.log("--------------------------------------");
    console.log(`|| Tổng cộng:       ${tongCong.toLocaleString().padStart(12)}đ ||`);
    console.log(`|| Giảm giá (${(phanTramGiam * 100)}%):   ${tienGiamGia.toLocaleString().padStart(12)}đ ||`);
    console.log(`|| VAT (8%):         ${vat.toLocaleString().padStart(12)}đ ||`);
    console.log(`|| Tip (5%):         ${tip.toLocaleString().padStart(12)}đ ||`);
    console.log("--------------------------------------");
    console.log(`|| THANH TOÁN:       ${thanhToan.toLocaleString().padStart(12)}đ ||`);
    console.log("======================================");
}

// Khởi chạy dữ liệu mẫu đầu vào kiểm thử chính xác
const orderList = [
    { ten: "Phở bò", gia: 65000, soLuong: 2 },
    { ten: "Trà đá", gia: 5000, soLuong: 3 },
    { ten: "Bún chả", gia: 55000, soLuong: 1 }
];

// Tiến hành gọi hàm in hóa đơn ra màn hình console (có phụ phí Tip)
inHoaDon(orderList, true);