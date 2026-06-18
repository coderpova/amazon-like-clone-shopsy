/* ===================================================================
   shopzy — demo e-commerce clone
   Plain HTML/CSS/JS practice project. All product data below is
   placeholder/dummy data for learning purposes.
=================================================================== */

/* ---------- DUMMY PRODUCT DATA ---------- */
const CATEGORIES = [
  { id: "electronics", label: "Electronics", emoji: "🎧", color: "#FDE9D9" },
  { id: "fashion",     label: "Fashion",     emoji: "👕", color: "#E6F2FF" },
  { id: "home",        label: "Home & Kitchen", emoji: "🍳", color: "#E8F8EE" },
  { id: "books",       label: "Books",       emoji: "📚", color: "#FBEFFF" },
  { id: "beauty",      label: "Beauty",      emoji: "💄", color: "#FFF0F0" },
];

const PRODUCTS = [
  { id:1, title:"Wireless Over-Ear Headphones, 40h Battery, ANC", cat:"electronics", emoji:"🎧", price:2499, mrp:4999, rating:4.3, reviews:12834, prime:true, deal:true },
  { id:2, title:"Smart Fitness Band with Heart Rate Monitor", cat:"electronics", emoji:"⌚", price:1799, mrp:2999, rating:4.1, reviews:8341, prime:true, deal:true },
  { id:3, title:"Portable Bluetooth Speaker, Waterproof", cat:"electronics", emoji:"🔊", price:1299, mrp:2199, rating:4.4, reviews:5210, prime:true, deal:false },
  { id:4, title:"65W Fast Charging USB-C Power Adapter", cat:"electronics", emoji:"🔌", price:699, mrp:1199, rating:4.2, reviews:3022, prime:false, deal:false },
  { id:5, title:"27-inch Full HD Monitor, 75Hz", cat:"electronics", emoji:"🖥️", price:9999, mrp:13999, rating:4.5, reviews:1542, prime:true, deal:false },
  { id:6, title:"Mechanical Keyboard, RGB Backlit", cat:"electronics", emoji:"⌨️", price:2199, mrp:3499, rating:4.3, reviews:2876, prime:true, deal:true },

  { id:7, title:"Men's Slim Fit Casual Shirt", cat:"fashion", emoji:"👔", price:599, mrp:1299, rating:4.0, reviews:4521, prime:true, deal:false },
  { id:8, title:"Women's Running Shoes, Lightweight", cat:"fashion", emoji:"👟", price:1499, mrp:2999, rating:4.3, reviews:6789, prime:true, deal:true },
  { id:9, title:"Unisex Denim Jacket", cat:"fashion", emoji:"🧥", price:1799, mrp:2999, rating:4.1, reviews:1203, prime:false, deal:false },
  { id:10, title:"Classic Analog Wrist Watch", cat:"fashion", emoji:"⌚", price:899, mrp:1999, rating:4.2, reviews:3344, prime:true, deal:false },
  { id:11, title:"Leather Wallet for Men", cat:"fashion", emoji:"👛", price:449, mrp:899, rating:4.0, reviews:2210, prime:true, deal:false },

  { id:12, title:"Non-Stick Cookware Set, 5 Pieces", cat:"home", emoji:"🍳", price:1899, mrp:3499, rating:4.4, reviews:3987, prime:true, deal:true },
  { id:13, title:"Memory Foam Pillow, Pack of 2", cat:"home", emoji:"🛏️", price:799, mrp:1499, rating:4.2, reviews:2654, prime:true, deal:false },
  { id:14, title:"Stainless Steel Water Bottle, 1L", cat:"home", emoji:"🧴", price:349, mrp:699, rating:4.5, reviews:7765, prime:true, deal:false },
  { id:15, title:"LED Desk Lamp with USB Charging Port", cat:"home", emoji:"💡", price:649, mrp:1199, rating:4.1, reviews:1432, prime:false, deal:true },

  { id:16, title:"The Art of Clear Thinking — Paperback", cat:"books", emoji:"📘", price:299, mrp:499, rating:4.6, reviews:9821, prime:true, deal:false },
  { id:17, title:"Atomic Habits for Students — Paperback", cat:"books", emoji:"📗", price:349, mrp:599, rating:4.7, reviews:15032, prime:true, deal:true },
  { id:18, title:"Data Structures Made Easy — Reference Guide", cat:"books", emoji:"📙", price:399, mrp:699, rating:4.5, reviews:4210, prime:true, deal:false },

  { id:19, title:"Vitamin C Face Serum, 30ml", cat:"beauty", emoji:"🧪", price:499, mrp:899, rating:4.3, reviews:6011, prime:true, deal:true },
  { id:20, title:"Herbal Shampoo & Conditioner Combo", cat:"beauty", emoji:"🧴", price:399, mrp:699, rating:4.2, reviews:3320, prime:true, deal:false },
  { id:21, title:"Matte Lipstick Set, 4 Shades", cat:"beauty", emoji:"💄", price:599, mrp:999, rating:4.4, reviews:2987, prime:false, deal:false },
];

const HERO_SLIDES = [
  { title:"Big Summer Sale", sub:"Up to 60% off on electronics", bg:"linear-gradient(120deg,#2C3E50,#4A6580)" },
  { title:"Fashion Refresh", sub:"New arrivals starting ₹399", bg:"linear-gradient(120deg,#6A3093,#A044FF)" },
  { title:"Home Makeover", sub:"Kitchen & home essentials on deal", bg:"linear-gradient(120deg,#11998E,#38EF7D)" },
  { title:"Stock Up on Reads", sub:"Books from ₹299", bg:"linear-gradient(120deg,#B79891,#94716B)" },
];

/* ---------- STATE ---------- */
let cart = {};          // { productId: qty }
let activeFilter = "all";
let searchTerm = "";
let heroIndex = 0;

/* ---------- HELPERS ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const formatINR = (n) => "₹" + n.toLocaleString("en-IN");
const findProduct = (id) => PRODUCTS.find(p => p.id === id);

function starString(rating){
  const full = Math.round(rating);
  return "★★★★★".slice(0,full) + "☆☆☆☆☆".slice(0, 5-full);
}

function showToast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(()=> t.classList.remove("show"), 1800);
}

/* ---------- RENDER: CATEGORY SELECT + DRAWER ---------- */
function renderCategoryOptions(){
  const sel = $("#categorySelect");
  CATEGORIES.forEach(c=>{
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.label;
    sel.appendChild(opt);
  });

  const drawerList = $("#drawerCats");
  drawerList.innerHTML = `<li><a href="#" data-filter="all">All Products</a></li>` +
    CATEGORIES.map(c => `<li><a href="#" data-filter="${c.id}">${c.emoji} ${c.label}</a></li>`).join("");
}

/* ---------- RENDER: CATEGORY GRID ---------- */
function renderCategoryGrid(){
  const grid = $("#categoryGrid");
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="categoryCard">
      <h3>${c.label}</h3>
      <div class="categoryCard__img" style="background:${c.color}">${c.emoji}</div>
      <a href="#" data-filter="${c.id}">Shop now</a>
    </div>
  `).join("");
}

/* ---------- RENDER: HERO ---------- */
function renderHero(){
  const track = $("#heroTrack");
  track.innerHTML = HERO_SLIDES.map(s => `
    <div class="hero__slide" style="background:${s.bg}">
      <div>
        <h2>${s.title}</h2>
        <p>${s.sub}</p>
        <button class="btn btn--cta" style="width:auto;padding:10px 22px;" data-filter="all">Shop the sale</button>
      </div>
    </div>
  `).join("");

  const dots = $("#heroDots");
  dots.innerHTML = HERO_SLIDES.map((_,i)=> `<span data-i="${i}"></span>`).join("");
  updateHero();
}

function updateHero(){
  $("#heroTrack").style.transform = `translateX(-${heroIndex*100}%)`;
  $$("#heroDots span").forEach((d,i)=> d.classList.toggle("active", i===heroIndex));
}

function shiftHero(dir){
  heroIndex = (heroIndex + dir + HERO_SLIDES.length) % HERO_SLIDES.length;
  updateHero();
}

let heroTimer = setInterval(()=>shiftHero(1), 5000);
function resetHeroTimer(){
  clearInterval(heroTimer);
  heroTimer = setInterval(()=>shiftHero(1), 5000);
}

/* ---------- CARD MARKUP ---------- */
function productCardHTML(p, deal=false){
  const catInfo = CATEGORIES.find(c=>c.id===p.cat);
  return `
    <div class="card ${deal ? 'card--deal' : ''}" data-id="${p.id}">
      ${p.deal ? `<span class="card__badge">Deal</span>` : ""}
      <div class="card__img" style="background:${catInfo.color}">${p.emoji}</div>
      <p class="card__title">${p.title}</p>
      <div class="card__stars">${starString(p.rating)} <span>${p.reviews.toLocaleString("en-IN")}</span></div>
      <div class="card__price">${formatINR(p.price)} <small>${Math.round((1-p.price/p.mrp)*100)}% off</small></div>
      <div class="card__mrp">M.R.P.: ${formatINR(p.mrp)}</div>
      ${p.prime ? `<div class="card__prime">✓ Free Delivery</div>` : `<div style="margin-bottom:8px;"></div>`}
      <button class="card__add" data-add="${p.id}">Add to Cart</button>
    </div>
  `;
}

/* ---------- RENDER: DEALS ROW ---------- */
function renderDeals(){
  const deals = PRODUCTS.filter(p => p.deal);
  $("#dealsRow").innerHTML = deals.map(p => productCardHTML(p, true)).join("");
}

/* ---------- RENDER: CATALOG GRID ---------- */
function renderCatalog(){
  let list = PRODUCTS;

  if (activeFilter === "deal") {
    list = list.filter(p => p.deal);
  } else if (activeFilter !== "all") {
    list = list.filter(p => p.cat === activeFilter);
  }

  if (searchTerm.trim()){
    const t = searchTerm.trim().toLowerCase();
    list = list.filter(p => p.title.toLowerCase().includes(t));
  }

  const titleMap = { all:"Recommended for you", deal:"Today's Deals" };
  $("#catalogTitle").textContent = searchTerm.trim()
    ? `Results for "${searchTerm.trim()}"`
    : (titleMap[activeFilter] || CATEGORIES.find(c=>c.id===activeFilter)?.label || "Products");

  $("#resultCount").textContent = `${list.length} result${list.length!==1?"s":""}`;

  const grid = $("#catalogGrid");
  grid.innerHTML = list.length
    ? list.map(p => productCardHTML(p)).join("")
    : `<p style="padding:30px;color:#666;">No products found. Try a different search or category.</p>`;
}

/* ---------- CART LOGIC ---------- */
function addToCart(id, qty=1){
  cart[id] = (cart[id] || 0) + qty;
  renderCartCount();
  renderCartDrawer();
  const p = findProduct(id);
  showToast(`Added "${p.title.slice(0,40)}${p.title.length>40?'…':''}" to cart`);
}

function setQty(id, qty){
  if (qty <= 0){ delete cart[id]; }
  else { cart[id] = qty; }
  renderCartCount();
  renderCartDrawer();
}

function removeFromCart(id){
  delete cart[id];
  renderCartCount();
  renderCartDrawer();
}

function cartTotalItems(){
  return Object.values(cart).reduce((a,b)=>a+b,0);
}

function cartSubtotal(){
  return Object.entries(cart).reduce((sum,[id,qty]) => {
    const p = findProduct(Number(id));
    return sum + (p ? p.price*qty : 0);
  }, 0);
}

function renderCartCount(){
  $("#cartCount").textContent = cartTotalItems();
}

function renderCartDrawer(){
  const wrap = $("#cartItems");
  const entries = Object.entries(cart);

  if (!entries.length){
    wrap.innerHTML = `<div class="cartEmpty">Your cart is empty.<br>Browse products and add something you like!</div>`;
  } else {
    wrap.innerHTML = entries.map(([id, qty]) => {
      const p = findProduct(Number(id));
      const catInfo = CATEGORIES.find(c=>c.id===p.cat);
      return `
        <div class="cartItem">
          <div class="cartItem__thumb" style="background:${catInfo.color}">${p.emoji}</div>
          <div class="cartItem__info">
            <h5>${p.title}</h5>
            <div class="cartItem__price">${formatINR(p.price)}</div>
            <div class="cartItem__qty">
              <button data-qty="-1" data-id="${p.id}">−</button>
              <span>${qty}</span>
              <button data-qty="1" data-id="${p.id}">+</button>
            </div>
            <button class="cartItem__remove" data-remove="${p.id}">Remove</button>
          </div>
        </div>
      `;
    }).join("");
  }

  $("#cartSubtotal").textContent = formatINR(cartSubtotal());
}

/* ---------- PRODUCT MODAL ---------- */
function openProductModal(id){
  const p = findProduct(id);
  const catInfo = CATEGORIES.find(c=>c.id===p.cat);
  $("#productModalBody").innerHTML = `
    <div class="productModal__img" style="background:${catInfo.color}">${p.emoji}</div>
    <div class="productModal__info">
      <h2>${p.title}</h2>
      <div class="card__stars">${starString(p.rating)} <span>${p.reviews.toLocaleString("en-IN")} ratings</span></div>
      <p style="color:#666;font-size:.9rem;margin-top:10px;">
        Category: ${catInfo.label}. Demo product listing for the shopzy practice clone —
        description text is placeholder content.
      </p>
      <div class="productModal__buy">
        <div class="productModal__price">${formatINR(p.price)} <small style="font-size:.9rem;">${Math.round((1-p.price/p.mrp)*100)}% off</small></div>
        <div class="card__mrp">M.R.P.: ${formatINR(p.mrp)}</div>
        ${p.prime ? `<div class="card__prime">✓ Free Delivery by tomorrow</div>` : ""}
        <div class="qtyRow" style="margin-top:12px;">
          <label for="modalQty">Qty:</label>
          <select id="modalQty">
            ${[1,2,3,4,5].map(n=>`<option value="${n}">${n}</option>`).join("")}
          </select>
        </div>
        <button class="btn btn--cta" id="modalAddBtn" data-add="${p.id}">Add to Cart</button>
        <button class="btn btn--secondary" id="modalBuyBtn" data-buy="${p.id}">Buy Now</button>
      </div>
    </div>
  `;
  $("#productModal").classList.add("open");
  $("#modalOverlay").classList.add("show");
}

function closeProductModal(){
  $("#productModal").classList.remove("open");
  $("#modalOverlay").classList.remove("show");
}

/* ---------- DRAWERS (side menu / cart) ---------- */
function openSideMenu(){
  $("#sideMenu").classList.add("open");
  $("#overlay").classList.add("show");
}
function closeSideMenu(){
  $("#sideMenu").classList.remove("open");
  $("#overlay").classList.remove("show");
}
function openCartDrawer(){
  renderCartDrawer();
  $("#cartDrawer").classList.add("open");
  $("#overlay").classList.add("show");
}
function closeCartDrawer(){
  $("#cartDrawer").classList.remove("open");
  $("#overlay").classList.remove("show");
}

/* ---------- EVENT WIRING ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCategoryOptions();
  renderCategoryGrid();
  renderHero();
  renderDeals();
  renderCatalog();
  renderCartCount();

  // Hero controls
  $("#heroPrev").addEventListener("click", ()=>{ shiftHero(-1); resetHeroTimer(); });
  $("#heroNext").addEventListener("click", ()=>{ shiftHero(1); resetHeroTimer(); });
  $("#heroDots").addEventListener("click", (e)=>{
    const dot = e.target.closest("span");
    if (!dot) return;
    heroIndex = Number(dot.dataset.i);
    updateHero();
    resetHeroTimer();
  });

  // Filter links (subnav, drawer, category grid, hero CTA, deals "see all")
  document.body.addEventListener("click", (e)=>{
    const filterEl = e.target.closest("[data-filter]");
    if (filterEl){
      e.preventDefault();
      activeFilter = filterEl.dataset.filter;
      searchTerm = "";
      $("#searchInput").value = "";
      renderCatalog();
      closeSideMenu();
      document.querySelector(".catalog").scrollIntoView({ behavior:"smooth" });
    }
  });

  // Search
  function runSearch(){
    searchTerm = $("#searchInput").value;
    const cat = $("#categorySelect").value;
    activeFilter = cat;
    renderCatalog();
    document.querySelector(".catalog").scrollIntoView({ behavior:"smooth" });
  }
  $("#searchBtn").addEventListener("click", runSearch);
  $("#searchInput").addEventListener("keydown", (e)=>{ if (e.key === "Enter") runSearch(); });

  // Add to cart (catalog/deals grid, event delegation)
  document.body.addEventListener("click", (e)=>{
    const addBtn = e.target.closest("[data-add]");
    if (addBtn){
      const id = Number(addBtn.dataset.add);
      const qtySelect = document.getElementById("modalQty");
      const qty = (addBtn.id === "modalAddBtn" && qtySelect) ? Number(qtySelect.value) : 1;
      addToCart(id, qty);
      return;
    }
    const buyBtn = e.target.closest("[data-buy]");
    if (buyBtn){
      const id = Number(buyBtn.dataset.buy);
      const qtySelect = document.getElementById("modalQty");
      const qty = qtySelect ? Number(qtySelect.value) : 1;
      addToCart(id, qty);
      closeProductModal();
      openCartDrawer();
      return;
    }
  });

  // Open product modal when a card (not its add button) is clicked
  document.body.addEventListener("click", (e)=>{
    if (e.target.closest("[data-add]") || e.target.closest("[data-buy]")) return;
    const card = e.target.closest(".card");
    if (card) openProductModal(Number(card.dataset.id));
  });

  // Cart qty +/- and remove (delegation inside cart drawer)
  $("#cartItems").addEventListener("click", (e)=>{
    const qtyBtn = e.target.closest("[data-qty]");
    if (qtyBtn){
      const id = Number(qtyBtn.dataset.id);
      const delta = Number(qtyBtn.dataset.qty);
      setQty(id, (cart[id]||0) + delta);
      return;
    }
    const removeBtn = e.target.closest("[data-remove]");
    if (removeBtn){
      removeFromCart(Number(removeBtn.dataset.remove));
    }
  });

  // Checkout (demo only)
  $("#checkoutBtn").addEventListener("click", () => {
    if (!cartTotalItems()){
      showToast("Your cart is empty");
      return;
    }
    showToast(`Demo checkout: ${cartTotalItems()} item(s), total ${formatINR(cartSubtotal())}`);
    cart = {};
    renderCartCount();
    renderCartDrawer();
    closeCartDrawer();
  });

  // Drawers open/close
  $("#menuBtn").addEventListener("click", openSideMenu);
  $("#closeSideMenu").addEventListener("click", closeSideMenu);
  $("#cartBtn").addEventListener("click", openCartDrawer);
  $("#closeCartDrawer").addEventListener("click", closeCartDrawer);
  $("#overlay").addEventListener("click", () => { closeSideMenu(); closeCartDrawer(); });

  // Product modal close
  $("#closeModal").addEventListener("click", closeProductModal);
  $("#modalOverlay").addEventListener("click", closeProductModal);

  // Logo / sign-in / account placeholders just scroll to top or toast
  $("#logoHome").addEventListener("click", (e)=>{
    e.preventDefault();
    activeFilter = "all"; searchTerm = "";
    renderCatalog();
    window.scrollTo({top:0, behavior:"smooth"});
  });
  $("#accountBtn").addEventListener("click", ()=> showToast("Demo only — sign-in is not implemented"));
  $("#ordersBtn").addEventListener("click", ()=> showToast("Demo only — no orders yet"));
  $("#deliverBtn").addEventListener("click", ()=> showToast("Demo only — delivery location is fixed for this clone"));
  $("#langBtn").addEventListener("click", ()=> showToast("Demo only — language switch not implemented"));
  $("#prime").addEventListener("click", (e)=> e.preventDefault());

  // Back to top
  $("#backToTop").addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));
});
