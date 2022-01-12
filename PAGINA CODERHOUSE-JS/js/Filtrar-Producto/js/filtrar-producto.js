
const items = document.getElementById("items");
const search = document.getElementById("search");
const template = document.getElementById("producto-template").content
const fraagment = document.createDocumentFragment();
const ProductoBuscados = [];

search.onkeyup= (e)=>{
    // console.log(ObtenerData());
    if(e.target.matches("#search")){
        if(e.key === "Enter" ){
            ObtenerData(e.target.value);

        }
    }
}


// Permite  tarjetear el titulo
items.addEventListener("click",e=>{
    addCarrito(e)
})

const ObtenerData = async(busqueda)=>{    
    try{

        const res = await fetch("../../api.json");
        const data = await res.json();
        // pintarTemplate(data);
        // Es una funcion predicado es decir que son funciones que hace descarte por cada condicion que hacen
       const filtrados =  data.filter(producto2=>producto2.title.toLocaleUpperCase().includes(busqueda.toLocaleUpperCase()));      
        pintarTemplate(filtrados)   //se llama pintar template lo que yo quiero buscar y filtrar por categoria que es el titulo
        data.forEach(element=>{
           ProductoBuscados.push(element.title); 
        let resultado1 = ProductoBuscados.map(function(producto){
                    if(producto.title === element.title) return producto;
                    return{
                        ...producto, //para usarlo en el arreglo copia y no en el original
                        title: element.title
                    }
             })
            console.log(resultado1)
    
            // console.log(resultado)
        });

        // console.log(ProductoBuscados)
    }
    catch(error){

        console.log(error);
    }
}


// pintar tarjeta
const pintarTemplate =data=>{
    // console.log(data);
     data.forEach(producto=>{

        template.querySelector("h3").textContent = producto.id; 
        template.querySelector("h5").textContent = producto.title;
        template.querySelector("p").textContent = producto.precio;
        template.querySelector('img').setAttribute("src",producto.img);
        // En forma dinamica tiene que agregarse el titulo como llaveunica acediendo el objeto a json
        template.querySelector("h5").dataset.title = producto.title;
        const clone = template.cloneNode(true);
        fraagment.appendChild(clone)         
     
     })

       items.appendChild(fraagment)
    

}


const addCarrito = e =>{
    console.log(e.target.classList.contains("title"))
}


// FOOTER
const itemsFooter = document.getElementById("items-footer");
const templateFooter = document.getElementById("footer-template").content
const cardFooter = document.getElementById("card-footer");
const fragmentFooter = document.createDocumentFragment()
let lenguajes = "html,js,css";





const PintarFooter = ()=>{

    template.queryselector("title-lenguaje").textContent =`Lenguaje${lenguajes}`;
    const clone = template.cloneNode(true);
    fragmentFooter.appendChild(clone);
    itemsFooter.appendChild(fragmentFooter);
}