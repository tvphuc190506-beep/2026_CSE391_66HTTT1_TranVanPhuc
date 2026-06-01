function createCart() {
    // Biến private đóng gói bảo mật nội dung bên trong giỏ hàng
    let items = [];

    return {
        // 1. Thêm sản phẩm vào giỏ hàng
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        // 2. Xóa sản phẩm khỏi giỏ hàng theo Id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // 3. Cập nhật số lượng mới của sản phẩm chỉ định
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item && newQuantity > 0) {
                item.quantity = newQuantity;
            }
        },

        // 4. Tính tổng tiền thô chưa chiết khấu khấu
        getTotal() {
            return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },

        // 5. Áp dụng mã giảm giá ưu đãi
        applyDiscount(code) {
            const total = this.getTotal();
            if (code === "SALE10") return total * 0.1;
            return 0;
        },

        // 6. Tính tổng số lượng hàng hóa đang có trong giỏ
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        // 7. Xóa sạch bách giỏ hàng về trạng thái ban đầu
        clearCart() {
            items = [];
        },

        // 8. In hóa đơn định dạng bảng trực quan ra terminal
        printCart() {
            console.log("-----------------------------------------");
            console.log("# | Sản phẩm   | SL | Đơn giá    | Tổng");
            console.log("-----------------------------------------");
            items.forEach((item, index) => {
                const subTotal = item.price * item.quantity;
                console.log(`${index + 1} | ${item.name.padEnd(10)} | ${item.quantity}  | ${item.price.toLocaleString()} | ${subTotal.toLocaleString()}`);
            });
            console.log("-----------------------------------------");
            console.log(`Tổng cộng: ${this.getTotal().toLocaleString()}đ`);
            console.log("-----------------------------------------");
        }
    };
}

// --- KHU VỰC CHẠY TEST THEO ĐỀ BÀI YÊU CẦU ---
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên thành số lượng 2

cart.printCart();

console.log("Sau khi áp mã SALE10, số tiền được giảm là:");
console.log(cart.applyDiscount("SALE10").toLocaleString() + "đ");

console.log("\nTổng số lượng sản phẩm trước khi xóa:");
console.log(cart.getItemCount()); // Kết quả: 4

cart.removeItem(3); // Xóa AirPods Pro ra khỏi giỏ hàng

console.log("Tổng số lượng sản phẩm sau khi xóa:");
console.log(cart.getItemCount()); // Kết quả: 2