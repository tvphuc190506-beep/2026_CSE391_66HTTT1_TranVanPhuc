document.getElementById("startBtn").addEventListener("click", function() {
    // 1. Máy tính tự động sinh ngẫu nhiên số bí mật từ 1 đến 100
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    const maxAttempts = 7;
    const guessedNumbers = []; // Mảng theo dõi lịch sử số đã đoán tránh trùng lặp

    alert("Hệ thống đã sinh số bí mật từ 1 đến 100 thành công! Bạn có tối đa 7 lượt để thử.");

    while (attempts < maxAttempts) {
        let userInput = prompt(`Lượt thứ ${attempts + 1}/${maxAttempts}. Nhập số bạn đoán (1-100):`);
        
        // Nhấn nút Cancel thì dừng trò chơi ngay lập tức
        if (userInput === null) {
            alert("Bạn đã bỏ cuộc giữa chừng!");
            return;
        }

        const guess = parseInt(userInput);

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào (Chỉ chấp nhận số nằm trong khoảng 1-100)
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Lỗi: Vui lòng chỉ nhập số nguyên hợp lệ trong khoảng từ 1 đến 100!");
            continue;
        }

        // Kiểm tra kịch bản nếu người dùng nhập trùng lặp lại số cũ đã đoán trước đó
        if (guessedNumbers.includes(guess)) {
            alert(`Cảnh báo: Con số [${guess}] này bạn đã đoán rồi! Thử số khác xem sao.`);
            continue;
        }

        // Lưu con số mới vào lịch sử theo dõi mảng danh sách
        guessedNumbers.push(guess);
        attempts++;

        // Kiểm tra xử lý logic phản hồi kết quả trò chơi
        if (guess === secretNumber) {
            alert(`Đúng rồi! Chúc mừng bạn đã chiến thắng! Bạn đoán trúng sau ${attempts} lần.`);
            return;
        } else if (guess > secretNumber) {
            alert("Thấp hơn một chút! Con số bạn vừa nhập lớn quá.");
        } else {
            alert("Cao hơn một chút! Con số bạn vừa nhập nhỏ quá.");
        }
    }

    // Kết thúc hết lượt đoán mà chưa trúng
    alert(`Rất tiếc, bạn đã hết lượt chơi! Thua cuộc. Đáp án chính xác là: ${secretNumber}`);
});