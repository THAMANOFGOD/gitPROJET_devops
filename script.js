// script.js - logique simple pour afficher produits et panier
document.addEventListener('DOMContentLoaded', ()=> {
  const products = [
    { id: "p1", title:"T-shirt Classique", desc:"Coton bio, coupe unisexe", price:19.99 },
    { id: "p2", title:"Jean Slim", desc:"Jean stretch confortable", price:49.99 },
    { id: "p3", title:"Veste Trench", desc:"Imperméable, coupe moderne", price:89.99 },
    { id: "p4", title:"Robe Été", desc:"Légère et fluide", price:39.99 },
    { id: "p5", title:"Pull Col Roulé", desc:"Laine douce", price:59.99 },
    { id: "p6", title:"Sneakers", desc:"Semelle confortable", price:69.99 }
  ];

  const grid = document.getElementById('productsGrid');
  const cartBtn = document.getElementById('cartBtn');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.getElementById('closeCart');
  const cartItemsDiv = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  let cart = {};

  function renderProducts(){
    products.forEach(p => {
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `
        <div class="img">Photo</div>
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="meta">
          <div class="price">${p.price.toFixed(2)} €</div>
          <button data-id="${p.id}" class="addBtn">Ajouter</button>
        </div>
      `;
      grid.appendChild(el);
    });
  }

  function updateCartUI(){
    // count
    const count = Object.values(cart).reduce((s,i)=>s+i.qty,0);
    cartCount.textContent = count;
    // items
    cartItemsDiv.innerHTML = '';
    let total = 0;
    for(const id in cart){
      const item = cart[id];
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div>
          <div style="font-weight:600">${item.title}</div>
          <div style="font-size:13px;color:var(--muted)">${item.price.toFixed(2)} €</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button data-op="dec" data-id="${id}">-</button>
          <div>${item.qty}</div>
          <button data-op="inc" data-id="${id}">+</button>
        </div>
      `;
      cartItemsDiv.appendChild(row);
      total += item.price * item.qty;
    }
    cartTotal.textContent = total.toFixed(2);
  }

  // Event: add product
  grid.addEventListener('click', (e)=>{
    if(e.target.matches('.addBtn')){
      const id = e.target.dataset.id;
      const prod = products.find(p=>p.id===id);
      if(!cart[id]) cart[id] = {...prod, qty:0};
      cart[id].qty += 1;
      updateCartUI();
    }
  });

  // Cart modal open/close
  cartBtn.addEventListener('click', ()=> {
    cartModal.setAttribute('aria-hidden','false');
    updateCartUI();
  });
  closeCart.addEventListener('click', ()=> cartModal.setAttribute('aria-hidden','true'));

  // cart items buttons
  cartItemsDiv.addEventListener('click',(e)=>{
    const id = e.target.dataset.id;
    const op = e.target.dataset.op;
    if(!id) return;
    if(op === 'inc') cart[id].qty += 1;
    if(op === 'dec') {
      cart[id].qty -= 1;
      if(cart[id].qty <= 0) delete cart[id];
    }
    updateCartUI();
  });

  checkoutBtn.addEventListener('click', ()=>{
    if(Object.keys(cart).length === 0){
      alert('Votre panier est vide.');
      return;
    }
    // Simuler commande
    alert('Merci pour votre commande ! (simulation)');
    cart = {};
    updateCartUI();
    cartModal.setAttribute('aria-hidden','true');
  });

  // init
  renderProducts();
  document.getElementById('year').textContent = new Date().getFullYear();
});
