import { categoriaActiva } from "./main"
import { handleRenderList } from "./src/views/store";

const handleFilterProductByCategory = (categoriaIn)=>{
    const products = handleGetProductLocalStorage()
    switch(categoriaIn){
        case categoriaActiva:
            handleRenderList(products)
            break;
        case "hamburguesa":
        case "papa":
        case "gaseosa":
            const result = products.filter((el)=>el.categoria === categoriaIn)
            handleRenderList(result)
        default:
            break
    }
}

export const renderCategories = ()=>{
    const ulList = document.getElementById("listFilter")
    ulList.innerHTML = `
        <li class="item__categoria" id="Todo">Todos los productos</li>
        <li class="item__categoria" id="Hamburguesas">Hamburguesas</li>
        <li class="item__categoria" id="Papas">Papas</li>
        <li class="item__categoria" id="Gaseosa">Gaseosas</li>
        <li class="item__categoria" id="mayorPrecio">Mayor Precio</li>
        <li class="item__categoria" id="menorPrecio">Menor Precio</li>
    `

    const li
}