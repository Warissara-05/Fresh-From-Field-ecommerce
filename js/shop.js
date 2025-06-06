// js/script.js

// ฟังก์ชันดึงข้อมูลสินค้าจาก API และแสดงในรูปแบบที่คุณต้องการ
function fetchProducts(category) {
    fetch(`/products/${category}`)
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = ''; // Clear previous products
            products.forEach(product => {
                productContainer.innerHTML += `
                    <div class="col-md-6 col-lg-3 ftco-animate">
                        <div class="product">
                            <a href="#" class="img-prod">
                                <img class="img-fluid" src="images/${product.image}" alt="${product.name}">
                                <div class="overlay"></div>
                            </a>
                            <div class="text py-3 pb-4 px-3 text-center">
                                <h3><a href="#">${product.name}</a></h3>
                                <div class="d-flex">
                                    <div class="pricing">
                                        <p class="price"><span>$${product.discount_price || product.price}</span></p>
                                    </div>
                                </div>
                                <div class="bottom-area d-flex px-3">
                                    <div class="m-auto d-flex">
                                        <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                                            <span><i class="ion-ios-menu"></i></span>
                                        </a>
                                        <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                                            <span><i class="ion-ios-cart"></i></span>
                                        </a>
                                        <a href="#" class="heart d-flex justify-content-center align-items-center">
                                            <span><i class="ion-ios-heart"></i></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Error fetching products:", err));
}

// เพิ่ม event listener สำหรับปุ่มหมวดหมู่
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        fetchProducts(category);
    });
});

// โหลดสินค้าทั้งหมดเมื่อโหลดหน้า
fetchProducts('All');
