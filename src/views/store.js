import { setProductoActivo } from "../../main"
import { handleGetProductLocalStorage } from "../persistence/localStorage"
import { abrirPopUp }  from "../../main"

export const handleGetProductsToStore = ()=>{
    const products = handleGetProductLocalStorage()
    handleRenderList(products)
}

export const handleRenderList = (productosIn) =>{
    const hamburguesas = productosIn.filter((el)=>el.categoria === "hamburguesa")
    const papas = productosIn.filter((el)=>el.categoria === "papa")
    const gaseosas = productosIn.filter((el)=>el.categoria === "gaseosa")

    const renderProductGroup = (producto,title)=>{
        if(producto.length>0){
            const productoHTML = producto.map((producto,index)=>{
                return `
                <div id= "product-${producto.categoria}-${index}" class="containerTargetItem" >
                    <img src="${producto.imagen}" alt="hamburguesa clasica">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                </div>`
            })
            return`
            
            <section class="secctionStore">
            <h2>${title}</h2>
            <div class="containerProductStore">
            ${productoHTML.join("")}
            </div>
            </section>
            `
        }else{
            return ""
        }

        
    }
    //renderizar
    const appContainer = document.getElementById("card");
    if (appContainer) {
        // Limpia el contenido existente y renderiza
        appContainer.innerHTML = `
        ${renderProductGroup(hamburguesas, "Hamburguesas")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosas")}
        `;
    } else {
        console.error('El contenedor con id "card" no existe en el DOM.');
    }

    //añaden los eventos de manera dinamica
    const addEvents = (productosIn)=>{
        if(productosIn){
            productosIn.forEach((element, index) => {
                const productContainer = document.getElementById(
                    `product-${element.categoria}-${index}`
                )
                productContainer.addEventListener("click", ()=>{
                    setProductoActivo(element)
                    abrirPopUp();
                })
            });
        }
    }
    addEvents(hamburguesas)
    addEvents(papas)
    addEvents(gaseosas)
}