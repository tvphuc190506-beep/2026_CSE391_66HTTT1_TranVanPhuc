// Khai báo mảng chứa ít nhất 12 sản phẩm thuộc 4 categories chuẩn hóa yêu cầu
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://via.placeholder.com/200", rating: 4.5, inStock: true },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://via.placeholder.com/200", rating: 4.8, inStock: true },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", image: "https://via.placeholder.com/200", rating: 4.3, inStock: true },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", image: "https://via.placeholder.com/200", rating: 4.6, inStock: false },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", image: "https://via.placeholder.com/200", rating: 4.4, inStock: true },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://via.placeholder.com/200", rating: 4.7, inStock: true },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", image: "https://via.placeholder.com/200", rating: 4.1, inStock: true },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://via.placeholder.com/200", rating: 4.2, inStock: true },
    { id: 9, name: "Pixel 9 Pro", price: 29990000, category: "phone", image: "https://via.placeholder.com/200", rating: 4.7, inStock: true },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", image: "https://via.placeholder.com/200", rating: 4.5, inStock: false },
    { id: 11, name: "Logitech MX Master", price: 2500000, category: "accessory", image: "https://via.placeholder.com/200", rating: 4.6, inStock: true },
    { id: 12, name: "Surface Pro 9", price: 24000000, category: "tablet", image: "https://via.placeholder.com/200", rating: 4.4, inStock: true }
];

let cartCount = 0;
let selectedCategory = "all";

const catalogGrid = document.getElementById("catalogGrid");
const searchBar = document.getElementById("searchBar");
const cartBadge = document.getElementById("cartBadge");

// Function render toàn bộ danh sách thẻ card sản phẩm ra DOM bằng createElement
function renderProducts() {
    catalogGrid.innerHTML = "";
    
    let list = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchBar.value.toLowerCase());
        const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
        return matchesSearch && matchesCat;
    });

    const sortVal = document.getElementById("sortDropdown").value;
    if (sortVal === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortVal === "price-desc") list.sort((a, b) => b.price - a.price);

    list.forEach(p => {
        const col = document.createElement("div");
        col.className = "col";
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${p.image}" class="card-img-top" alt="${p.name}" style="cursor:pointer;" onclick="viewDetail(${p.id})">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold fs-6">${p.name}</h5>
                    <p class="text-danger fw-bold m-0">${p.price.toLocaleString()}đ</p>
                    <p class="small text-muted mb-3">Đánh giá: ${p.rating} ⭐</p>
                    <button class="btn btn-primary btn-sm mt-auto w-100 btn-add-cart" data-id="${p.id}" ${!p.inStock ? "disabled" : ""}>
                        ${p.inStock ? "Thêm giỏ hàng" : "Hết hàng"}
                    </button>
                </div>
            </div>
        `;
        catalogGrid.appendChild(col);
    });
}

// Lắng nghe sự kiện click bộ lọc danh mục ngành hàng
document.getElementById("categoryFilters").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        document.querySelectorAll("#categoryFilters button").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        selectedCategory = e.target.dataset.category;
        renderProducts();
    }
});

// Event Delegation xử lý bấm nút thêm vào giỏ hàng loạt
catalogGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add-cart")) {
        cartCount++;
        cartBadge.textContent = cartCount;
    }
});

// Hàm hiển thị hộp thoại modal thông tin chi tiết sản phẩm xem nhanh
function viewDetail(id) {
    const p = products.find(prod => prod.id === id);
    document.getElementById("modalTitle").textContent = p.name;
    document.getElementById("modalBody").innerHTML = `
        <img src="${p.image}" class="img-fluid rounded mb-3" style="max-height:200px;">
        <h4 class="text-danger fw-bold">${p.price.toLocaleString()}đ</h4>
        <p class="text-muted">Ngành hàng: <span class="badge bg-secondary">${p.category.toUpperCase()}</span></p>
        <p>Trạng thái kho: ${p.inStock ? "🟢 Còn hàng kinh doanh" : "🔴 Tạm hết hàng"}</p>
    `;
    const myModal = new bootstrap.Modal(document.getElementById("productModal"));
    myModal.show();
}

// Bật tắt Dark Mode đổi màu nền giao diện body toàn trang
document.getElementById("toggleDarkMode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

searchBar.addEventListener("input", renderProducts);
document.getElementById("sortDropdown").addEventListener("change", renderProducts);

renderProducts();