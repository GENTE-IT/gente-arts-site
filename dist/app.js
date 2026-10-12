const products=window.GENTE_PRODUCTS;
const grid=document.querySelector('#productGrid');
const filters=[...document.querySelectorAll('.filter')];
const searchInput=document.querySelector('#searchInput');
const modal=document.querySelector('#productModal');
const cartDrawer=document.querySelector('#cartDrawer');
const cartScrim=document.querySelector('#cartScrim');
const cartCount=document.querySelector('#cartCount');
const cartItems=document.querySelector('#cartItems');
const cartEmpty=document.querySelector('#cartEmpty');
const cartFooter=document.querySelector('#cartFooter');
const cartTotal=document.querySelector('#cartTotal');
const toast=document.querySelector('#toast');
let activeFilter='all';
let activeProduct=null;
let cart=JSON.parse(localStorage.getItem('genteArtsCart')||'[]').filter(id=>products.some(p=>p.id===id));

const money=value=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(value);

function renderProducts(){
  const term=searchInput.value.trim().toLowerCase();
  const visible=products.filter(p=>(activeFilter==='all'||p.category===activeFilter)&&(`${p.name} ${p.label}`.toLowerCase().includes(term)));
  grid.innerHTML=visible.map(p=>`<article class="product-card reveal visible" data-product="${p.id}" tabindex="0" aria-label="Ver ${p.name}">
    <div class="product-visual"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-badge">${p.label}</span><button class="quick-add" data-add="${p.id}" aria-label="Añadir ${p.name} al carrito">＋</button></div>
    <div class="product-body"><div><p class="product-meta">${p.number}</p><h3>${p.name}</h3></div><div class="product-price">${money(p.price)}<small>PAGO ÚNICO</small></div></div>
  </article>`).join('');
  document.querySelector('#emptyState').hidden=visible.length>0;
}

function openModal(id){
  const p=products.find(item=>item.id===id);if(!p)return;activeProduct=p;
  document.querySelector('#modalImage').src=p.image;document.querySelector('#modalImage').alt=p.name;
  document.querySelector('#modalNumber').textContent=p.number;document.querySelector('#modalCategory').textContent=p.label;
  document.querySelector('#modalTitle').textContent=p.name;document.querySelector('#modalDescription').textContent=p.description;
  document.querySelector('#modalPrice').textContent=money(p.price);document.querySelector('#modalFeatures').innerHTML=p.features.map(f=>`<li>${f}</li>`).join('');
  modal.hidden=false;document.body.classList.add('locked');modal.querySelector('.icon-close').focus();
}
function closeModal(){modal.hidden=true;document.body.classList.remove('locked');activeProduct=null}

function addToCart(id){if(!cart.includes(id))cart.push(id);saveCart();showToast('AÑADIDO AL CARRITO')}
function removeFromCart(id){cart=cart.filter(item=>item!==id);saveCart()}
function saveCart(){localStorage.setItem('genteArtsCart',JSON.stringify(cart));renderCart()}
function renderCart(){
  cartCount.textContent=cart.length;
  const selected=cart.map(id=>products.find(p=>p.id===id)).filter(Boolean);
  cartItems.innerHTML=selected.map(p=>`<article class="cart-item"><img src="${p.image}" alt=""><div><p>${p.label}</p><h3>${p.name}</h3><strong>${money(p.price)}</strong></div><button class="remove-item" data-remove="${p.id}" aria-label="Quitar ${p.name}">×</button></article>`).join('');
  cartEmpty.hidden=selected.length>0;cartFooter.hidden=selected.length===0;cartTotal.textContent=money(selected.reduce((sum,p)=>sum+p.price,0));
}
function openCart(){cartDrawer.classList.add('open');cartDrawer.setAttribute('aria-hidden','false');cartScrim.hidden=false;document.body.classList.add('locked');document.querySelector('#cartClose').focus()}
function closeCart(){cartDrawer.classList.remove('open');cartDrawer.setAttribute('aria-hidden','true');cartScrim.hidden=true;document.body.classList.remove('locked')}
function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}

filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));button.classList.add('active');activeFilter=button.dataset.filter;renderProducts()}));
searchInput.addEventListener('input',renderProducts);
grid.addEventListener('click',event=>{const add=event.target.closest('[data-add]');if(add){event.stopPropagation();addToCart(add.dataset.add);return}const card=event.target.closest('[data-product]');if(card)openModal(card.dataset.product)});
grid.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.matches('[data-product]')){event.preventDefault();openModal(event.target.dataset.product)}});
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeModal));
document.querySelector('#modalAdd').addEventListener('click',()=>{if(activeProduct){addToCart(activeProduct.id);closeModal();openCart()}});
document.querySelector('#cartTrigger').addEventListener('click',openCart);document.querySelector('#cartClose').addEventListener('click',closeCart);cartScrim.addEventListener('click',closeCart);document.querySelector('[data-close-cart]').addEventListener('click',closeCart);
cartItems.addEventListener('click',event=>{const button=event.target.closest('[data-remove]');if(button)removeFromCart(button.dataset.remove)});
document.querySelector('#checkoutButton').addEventListener('click',()=>showToast('CHECKOUT DE TEBEX · PRÓXIMAMENTE'));
document.querySelector('#notifyForm').addEventListener('submit',event=>{event.preventDefault();document.querySelector('#formNote').textContent='Gracias. Te avisaremos cuando la colección esté lista.';event.target.reset()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(!modal.hidden)closeModal();else closeCart()}});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelector('#allCount').textContent=String(products.length).padStart(2,'0');
renderProducts();renderCart();
