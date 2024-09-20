import { renderCategories } from "./categories"
import { setInLocalStorage } from "./src/persistence/localStorage"
import { handleGetProductsToStore } from "./src/views/store"


renderCategories()
export let categoriaActiva = null

export const setCategoriaActiva = (categoriaIn)=>{
    categoriaActiva = categoriaIn
}

export let productoActivo = null
export const setProductoActivo = (productoIn)=>{
    productoActivo = productoIn
}

handleGetProductsToStore()
//renderCategories()
//***BOTON DE AGREGAR ELEMENTO, ABRE EL POPUP***/
export const abrirPopUp = ()=>{
    const modalPopUp = document.getElementById("modalPopUp")//contenedor en el q se encuentra el POPUP
       modalPopUp.style.display = "flex"

       if(productoActivo){
        const nombre = document.getElementById("input_popUp_producto"),
        imagen = document.getElementById("input_popUp_imagen"),
        precio = document.getElementById("input_popUp_precio"),
        categoria = document.getElementById("select_popUp")

        nombre.value =productoActivo.nombre
        imagen.value = productoActivo.imagen
        precio.value = productoActivo.precio
        categoria.value = productoActivo.categoria

       }
}
const agregarElemento = document.getElementById("agregar_elementos")//boton de agregar elemento

if(agregarElemento){
    agregarElemento.addEventListener("click",abrirPopUp)
}


//***BOTON DE CANCELAR UNA VEZ QUE SE ABRE EL POPUP***/
const cancelarPopUp = document.getElementById("button_popUp_cancelar")//boton para cancelar

if(cancelarPopUp){
    cancelarPopUp.addEventListener("click", ()=>{
        const modalPopUp = document.getElementById("modalPopUp")
         modalPopUp.style.display = "none"
         setProductoActivo()
         resetModal()
    })
}
const resetModal = ()=>{
    const nombre = document.getElementById("input_popUp_producto"),
    imagen = document.getElementById("input_popUp_imagen"),
    precio = document.getElementById("input_popUp_precio"),
    categoria = document.getElementById("select_popUp")

    nombre.value = ""
    imagen.value = ""
    precio.value = 0
    categoria.value = ""

}


const acceptButton = document.getElementById("button_popUp_aceptar")
acceptButton.addEventListener("click",()=>{
    handleSaveOrModyfyElements()
})

//***LOCALSTORAGE***/
const handleSaveOrModyfyElements = ()=>{
    const nombre = document.getElementById("input_popUp_producto").value
    const imagen = document.getElementById("input_popUp_imagen").value
    const precio = document.getElementById("input_popUp_precio").value
    const categoria = document.getElementById("select_popUp").value
    let object = null
    if(productoActivo){
        object = {
            ...productoActivo,
            nombre,
            imagen,
            precio,
            categoria,
        }
    }else{
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categoria,
        };
    }
    
    setInLocalStorage(object);
    handleGetProductsToStore()
}