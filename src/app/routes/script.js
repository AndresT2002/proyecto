var productos=[];
  var total=0;
  
  function add(product,price,type){
    var producto={
      id:product,
      precio:price,
      tipo:type,
      
    }
      console.log(product,price);
      productos.push(producto);
      total=total +price ;
      console.log(productos)
    document.getElementById("checkout").innerHTML= `Pagar $${total}`
    
    
  }
 
  module.exports=productos;