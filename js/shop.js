// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function fetchProducts(category = 'All') {
  const res = await fetch(`http://localhost:2000/api/products?category=${category}`);
  const products = await res.json(); // รับข้อมูลสินค้าเป็น JSON
  renderProducts(products); // เรียกใช้ฟังก์ชันแสดงสินค้า
}

// ฟังก์ชันในการแสดงสินค้า
function renderProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = ''; // เคลียร์ข้อมูลเก่า

  products.forEach(p => {
    // สร้าง HTML สำหรับแสดงสินค้าแต่ละตัว
    container.innerHTML += `
      <div class="col-md-6 col-lg-3 ftco-animate">
        <div class="product">
          <a href="#" class="img-prod">
            <img class="img-fluid" src="images/${p.image}" alt="${p.name}">
            ${p.discount_price ? `<span class="status">30%</span>` : ''}
            <div class="overlay"></div>
          </a>
          <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="#">${p.name}</a></h3>
            <div class="d-flex">
              <div class="pricing">
                <p class="price">
                  ${p.discount_price ? `<span class="mr-2 price-dc">$${p.price}</span><span class="price-sale">$${p.discount_price}</span>` : `$${p.price}`}
                </p>
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
                <a href="#" class="heart d-flex justify-content-center align-items-center ">
                  <span><i class="ion-ios-heart"></i></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// เมื่อคลิกที่หมวดหมู่ต่างๆ จะดึงข้อมูลสินค้า
document.querySelectorAll('.product-category li a').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const category = e.target.textContent;  // รับค่าหมวดหมู่ที่เลือก
    document.querySelectorAll('.product-category li a').forEach(link => {
      link.classList.remove('active');  // ลบคลาส active จากทุกลิงค์
    });
    btn.classList.add('active');  // เพิ่มคลาส active ให้กับหมวดหมู่ที่เลือก
    fetchProducts(category);  // ดึงข้อมูลสินค้าตามหมวดหมู่
  });
});

// โหลดสินค้าทั้งหมดเมื่อเริ่มหน้า
fetchProducts();  // เริ่มโหลดสินค้าทั้งหมดเมื่อหน้าเว็บโหลด
