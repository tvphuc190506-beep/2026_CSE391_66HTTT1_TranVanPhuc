const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

// 1. Lọc sản phẩm còn hàng (stock > 0)
const getInStock = list => list.filter(p => p.stock > 0);

// 2. Lọc theo danh mục và khoảng giá
const filterProducts = (list, cat, min, max) => list.filter(p => p.category === cat && p.price >= min && p.price <= max);

// 3. Sắp xếp theo giá tăng hoặc giảm dần
const sortByPrice = (list, order = "asc") => [...list].sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);

// 4. Tìm sản phẩm rẻ nhất của mỗi danh mục ngành hàng
const cheapestByCategory = list => list.reduce((acc, p) => {
    if (!acc[p.category] || p.price < acc[p.category].price) {
        acc[p.category] = p;
    }
    return acc;
}, {});

// 5. Tính tổng giá trị kho hàng (price x stock)
const totalInventoryValue = list => list.reduce((sum, p) => sum + (p.price * p.stock), 0);

// 6. Tạo mảng định dạng chuỗi tiền tệ VNĐ hiển thị
const formatProductList = list => list.map(p => ({
    name: p.name,
    formattedPrice: p.price.toLocaleString("vi-VN") + "đ"
}));

// 7. Tính điểm rating đánh giá trung bình toàn kho
const averageRating = list => list.length === 0 ? 0 : parseFloat((list.reduce((sum, p) => sum + p.rating, 0) / list.length).toFixed(2));

// 8. Tìm kiếm sản phẩm theo keyword (Không phân biệt hoa thường)
const searchProducts = (list, keyword) => {
    const key = keyword.toLowerCase();
    return list.filter(p => p.name.toLowerCase().includes(key));
};

// --- KHU VỰC CHẠY KIỂM THỬ ĐẦU RA CONSOLE ---
console.log("=== 1. SẢN PHẨM CÒN HÀNG ===");
console.log(getInStock(products).length + " sản phẩm.");

console.log("\n=== 2. LỌC ĐIỆN THOẠI TỪ 15 - 25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== 3. SẮP XẾP GIÁ GIẢM DẦN (XEM 2 MẪU ĐẦU) ===");
console.log(sortByPrice(products, "desc").slice(0, 2));

console.log("\n=== 4. SẢN PHẨM RẺ NHẤT MỖI DANH MỤC ===");
console.log(cheapestByCategory(products));

console.log("\n=== 5. TỔNG GIÁ TRỊ TOÀN KHO HÀNG ===");
console.log(totalInventoryValue(products).toLocaleString("vi-VN") + "đ");

console.log("\n=== 6. ĐỊNH DẠNG DANH SÁCH ĐẦU ===");
console.log(formatProductList(products).slice(0, 2));

console.log("\n=== 7. ĐIỂM RATING TRUNG BÌNH LỚP ===");
console.log(averageRating(products));

console.log("\n=== 8. TÌM KIẾM KEYWORD 'pad' ===");
console.log(searchProducts(products, "pad"));