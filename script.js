const productContainer = document.getElementById('product')
const cartContainer = document.getElementById('cart')
const cart = JSON.parse(localStorage.getItem('cart')) || []
const total = document.getElementById('total')

const updateLs = () =>{
  localStorage.setItem('cart',JSON.stringify(cart))

}
const fetchProducts = () => {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => displayProducts(products))
}

const displayProducts = (products) => {
  products.forEach(product => {
    let card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
  
  <img src="${product.image}" class="card-img-top">
  <div class="card-body">
    <h5 class="fs-5">${product.category}</h5>
    <h5 class="card-title">${product.title.slice(0,18)}</h5>
    <h5>${product.price}$</h5>
  
  </div>
  <button class="btn btn-success m-2">Add To Cart</button>
  
  
  `
  productContainer.appendChild(card)

  card.querySelector('.btn').addEventListener('click',()=>{
      addToCart(product)
  })

  });

}

const addToCart = (product) =>{

    let index = cart.findIndex(item =>item.id==product.id)

    if(index==-1){
      product.quantity=1;
      cart.push(product)

    }else{
      product.quantity++
      
    }
    updateLs()
    displayCart()
   
}

const displayCart = ()  =>{
  cartContainer.innerHTML=""
  cart.forEach((product,index)=>{
    let row = document.createElement('div')
    row.classList.add('row')
    row.innerHTML = `
    
    <div class="col-4 gap-2 flex-column">
          <img src="${product.image}" alt="">
          <span class="fs-5">Quantity:${product.quantity}</span>
        </div>
              <div class="col-4 gap-2">
                <button class="btn btn-primary" onclick="decreaseQuantity(${index})">-</button>
                <span class="fs-5">${(product.price * product.quantity).toFixed(3)}$</span>

                <button class="btn btn-primary" onclick="increaseQuantity(${index})">+</button>
              </div>
              <div class="col-4">
               <button class="btn btn-danger" onclick="removeItem(${index})">Remove</button>
              </div>
    
    
    `
    cartContainer.appendChild(row)
  })
  total.innerHTML =  `Total Price: ${calculateTotalPrice()}$`
}

const removeItem = (index) =>{
    cart.splice(index,1)
    updateLs()
    displayCart()
    
}

const increaseQuantity = (index) =>{
   cart[index].quantity++
   updateLs()
   displayCart()
}

const decreaseQuantity = (index) =>{
  
  if(cart[index].quantity>1){
    cart[index].quantity--
    updateLs()
    displayCart()
  }
  
}

const calculateTotalPrice = () => {
  let totalPrice = 0;
 cart.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  return parseFloat(totalPrice.toFixed(3));
};

fetchProducts()
displayCart()