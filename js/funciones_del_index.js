document.addEventListener("DOMContentLoaded", () => 
    {
    const productosContainer = document.querySelector("#productos-container");
  
   
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const pageInfo = document.getElementById("page-info");
  
    
    let currentPage = 1;
    const limit = 20;
    let totalProductos = 0;
  
  
    function fetchProductos(page) 
    {

      const skip = (page - 1) * limit;
  
      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then((response) => response.json())
        .then((data) => {
          totalProductos = data.total;
          const productos = data.products;
  
          
          productosContainer.innerHTML = "";
  
         
          productos.forEach((product) => 
            {
            const cardDiv = document.createElement("div");
            cardDiv.className = "col-md-4";
  
            cardDiv.innerHTML = `
              <div  id="productos-container">
                <img src="${product.thumbnail}"  alt="${product.title}" class="card-img-top">
                <div class="informacion d-grid">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text ">Precio: $${product.price}</p>
                   <div class="btn-container">
                     <button class="button">Comprar</button>
                  </div>
                </div>
              </div>
            `;
  
          
            const botonComprar = cardDiv.querySelector("button");
            botonComprar.addEventListener("click", () => 
              {
              agregarAlCartito(product);
            });
  
          
            productosContainer.appendChild(cardDiv);
          });
  
  
          pageInfo.textContent = `Page ${currentPage}`;          
          prevBtn.disabled = currentPage === 1;
          nextBtn.disabled = (currentPage * limit) >= totalProductos;
  
  
  
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  
    function agregarAlCartito(product) 
    {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.title} ha sido agregado al carrito!`);
    }
  
      prevBtn.addEventListener("click", () => 
        {
        if (currentPage > 1) {
            currentPage--;
            fetchProductos(currentPage);
        }
        });
  

      nextBtn.addEventListener("click", () => 
        {
        if ((currentPage * limit) < totalProductos) 
          {
            currentPage++;
            fetchProductos(currentPage);
        }
        });
  
 
    fetchProductos(currentPage);
  });