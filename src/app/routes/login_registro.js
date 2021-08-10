const connection = require("../../config/db");
const app = require("../../config/server");
const bcryptjs = require("bcryptjs");




module.exports=app =>{
    
    app.get('/',(req,res)=>{
        if(req.session.loggedin){
            console.log(req.session.username);
            res.render("../views/index.ejs",{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.render('../views/index.ejs',{
                login:false,
                name:"Por favor inicie sesion"
            })
        }
        
    })
    app.get('/carrito',(req,res)=>{
        if(req.session.loggedin){
            console.log(req.session.username);
            res.render("../views/checkout.ejs",{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.render('../views/index.ejs',{
                login:false,
                name:"Por favor inicie sesion"
            })
        }
        
    })



    app.get('/losproductos',(req,res)=>{
        if(req.session.loggedin){
            
            connection.query('SELECT *FROM productos',(err,result)=>{
                
                connection.query('SELECT *FROM esencias',(err,resultados)=>{
                    
                    connection.query('SELECT *FROM presentaciones',(err,resultados_presentaciones)=>{
                    res.render("../views/losproductos.ejs",{
                        inventario:result,
                        esencias:resultados,
                        presentaciones:resultados_presentaciones,
                        login:true,
                       name:req.session.username,
                       rol:req.session.rol,
                       
                    })
                })
            })
                 
             })
        }else{
            res.redirect("/")
        }
        
        
    })

    app.get('/config',(req,res)=>{
    
        if(req.session.rol==="administrador"){
            res.render('../views/configadmin.ejs',{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.redirect("/")
        }
        
    })

    app.get('/agregaradmin',(req,res)=>{
        if(req.session.rol==="administrador"){
            res.render('../views/agregaradmin.ejs')
        }else{
            
        }
        
    })

    app.get('/eliminaradmin',(req,res)=>{
        if(req.session.rol==="administrador"){
            res.render('../views/eliminaradmin.ejs')
        }else{
            res.redirect("/")
        }
        
    })


    app.get('/formulario',(req,res)=>{
        res.render('../views/formulario.ejs')
    })

    
    app.get('/Ordenes',(req,res)=>{
        res.render('../views/ordenes.ejs'),{
            
        }
    })


    app.get('/infoclientes',(req,res)=>{
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            connection.query('SELECT *FROM cliente',(err,result)=>{
                console.log(result)
                 res.render("../views/infoclientes.ejs",{
                     clientes:result,
                     login:true,
                    name:req.session.username,
                    rol:req.session.rol
                 })
             })
        }else{
            res.redirect("/")
        }
        
        
    })

    app.get('/inventario',(req,res)=>{
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            connection.query('SELECT *FROM productos',(err,result)=>{
                connection.query('SELECT *FROM presentaciones',(err,results)=>{
                
                connection.query('SELECT *FROM esencias',(err,resultados)=>{
                    console.log(resultados)
                    res.render("../views/inventario.ejs",{
                        inventario:result,
                        esencias:resultados,
                        results:results,
                        login:true,
                       name:req.session.username,
                       rol:req.session.rol
                    })
                 })
             })
            }) 
        }else{
            res.redirect("/")
        }
        
        
    })
    app.get('/inventario_presentaciones',(req,res)=>{
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            
                connection.query('SELECT *FROM presentaciones',(err,results)=>{
                    res.render("../views/inventario_presentaciones.ejs",{
                        results:results,
                        login:true,
                        name:req.session.username,
                        rol:req.session.rol
                    })
                 })
             
        }else{
            res.redirect("/")
        }
        
        
    })

    app.get('/inventario_esencias',(req,res)=>{
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            
                
                
                connection.query('SELECT *FROM esencias',(err,resultados)=>{
                    console.log(resultados)
                    res.render("../views/inventario_esencias.ejs",{
                        
                        esencias:resultados,
                        
                        login:true,
                       name:req.session.username,
                       rol:req.session.rol
                    })
                 })
             
            
        }else{
            res.redirect("/")
        }
        
        
    })
    app.get('/inventario_aceites',(req,res)=>{
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            connection.query('SELECT *FROM productos',(err,result)=>{
                    res.render("../views/inventario_aceites.ejs",{
                        inventario:result,
                        
                        login:true,
                       name:req.session.username,
                       rol:req.session.rol
                    })
                 
            }) 
        }else{
            res.redirect("/")
        }
        
        
    })
    

    app.get("/delete/:codigo_producto", (req,res) => {
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            login:true
            const id_elem = req.params.codigo_producto;
            connection.query("DELETE FROM productos WHERE codigo_producto = ?", [id_elem], (err, result) => {
                if(err){
                    res.send(err);
                } else {
                    connection.query("SELECT * FROM productos", (err, results) => {
                   
                        if(err){
                            res.send(err);
                        } else {
                            res.render("../views/inventario_aceites.ejs", {
                                inventario: results,
                                
                                alert:true,
                                login:true,
                                rol:req.session.rol,
                                ruta: "inventario_aceites"
                                
                            });
                        }
                    })
                
                }
            })
        }else{
            res.redirect("/")
        }
        
    })
    app.get("/deletepresentacion/:id", (req,res) => {
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            login:true
            const id_elem = req.params.id;
            connection.query("DELETE FROM presentaciones WHERE id = ?", [id_elem], (err, result) => {
                if(err){
                    res.send(err);
                } else {
                    connection.query("SELECT * FROM presentaciones", (err, results) => {
                    
                        if(err){
                            res.send(err);
                        } else {
                            res.render("../views/inventario_presentaciones.ejs", {
                                results:results,
                                alert:true,
                                login:true,
                                rol:req.session.rol,
                                ruta: "inventario_presentaciones"
                                
                            });
                        }
            })
                }
            })
        }else{
            res.redirect("/")
        }
        
    })

    app.get("/deleteesencia/:id", (req,res) => {
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            login:true
            const id_elem = req.params.id;
            connection.query("DELETE FROM esencias WHERE id = ?", [id_elem], (err, result) => {
                if(err){
                    res.send(err);
                } else {
                    
                        connection.query('SELECT *FROM esencias',(err,resultados)=>{
                        if(err){
                            res.send(err);
                        } else {
                            res.render("../views/inventario_esencias.ejs", {
                                
                                esencias:resultados,
                                alert:true,
                                login:true,
                                rol:req.session.rol,
                                ruta: "inventario_esencias"
                                
                            });
                        }
                    })
                
                }
            })
        }else{
            res.redirect("/")
        }
        
    })



    app.post("/edit/:codigo_producto", (req,res) => {
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            const id_elem = req.params.codigo_producto;
            const { nombre_producto,cantidad,valor_unidad,descripcion} = req.body
            console.log(req.body);
            connection.query("UPDATE productos SET nombre_producto = ?, cantidad = ?, valor_unidad =?, descripcion=? WHERE codigo_producto = ?", [nombre_producto, cantidad,valor_unidad,descripcion, id_elem], (err, result) => {
                if(err){
                    res.send(err);
                } else {
                    res.redirect("/inventario_aceites");
                }
            })
        }else{
            res.redirect("/")
        }
        
    })


    app.post("/editesencia/:id", (req,res) => {
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            const id_esencia = req.params.id;
            const { nombre_esencia} = req.body
            console.log(req.body);
            connection.query("UPDATE esencias SET nombre_esencia = ? WHERE id = ?", [nombre_esencia, id_esencia], (err, result) => {
                if(err){
                    res.send(err);
                } else {
                    res.redirect("/inventario_esencias");
                }
            })
        }else{
            res.redirect("/")
        }
        
    })

    app.post("/editpresentacion/:id", (req,res) => {
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            const id_presentacion = req.params.id;
            const { tipo_presentacion,precio_presentacion} = req.body
            
            console.log(req.body);
            connection.query("UPDATE presentaciones SET tipo_presentacion = ?, precio = ? WHERE id = ?", [tipo_presentacion, precio_presentacion,id_presentacion], (err, result) => {
                if(err){
                    res.send(err);
                } else {
                    res.redirect("/inventario_presentaciones");
                }
            })
        }else{
            res.redirect("/")
        }
        
    })



    app.post("/inventario", (req,res) => {
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            let productos2=JSON.parse(localStorage.getItem('carrito')) || [];
            console.log(productos2)
            const {nombre,cantidad,precio,descripcion} = req.body;
            connection.query("INSERT INTO productos SET ?", {
                nombre_producto: nombre,
                cantidad: cantidad,
                valor_unidad:precio,
                descripcion:descripcion
            }, (error, results) => {
                if(error){
                    res.send(error);
                } else {
                    res.redirect("/inventario_aceites")
                }
            })
        }else{
            res.redirect("/")
        }
        
    })


    app.post("/esencia", (req,res) => {
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            const {nombre_esencia} = req.body;
            connection.query("INSERT INTO esencias SET ?", {
                nombre_esencia: nombre_esencia,
                
            }, (error, results) => {
                if(error){
                    res.send(error);
                } else {
                    res.redirect("/inventario_esencias")
                }
            })
        }else{
            res.redirect("/")
        }
        
    })
    
      
    app.post("/generar_orden", (req,res) => {
        if(req.session.rol==="cliente" ){

            var id_ultimo_array
            var el_id

            let id=parseInt(req.session.id_element)
            console.log(id)
            var {direccion,datos} = req.body;
            if(direccion===''){
                direccion="Recoger en tienda"
            }
            console.log(req.body)
            
            connection.query("INSERT INTO detalle_facturas SET ?", {
                id_clientes:id
            })
            
                
            

           

            let datos_finales=JSON.parse(datos)
            let total=0
            console.log(datos_finales)
            for(let i=0; i<datos_finales.length; i++) {
                console.log(datos_finales[i].id)
                console.log(datos_finales[i].precio)
                console.log((datos_finales[i].tipo))
                total +=datos_finales[i].precio
                console.log(total)
                if(datos_finales[i].tipo==="Aceite Esencial"){
                    let id_producto=parseInt(datos_finales[i].id)

                    connection.query('SELECT MAX(id_facturas) AS id FROM detalle_facturas',async(error,resultaados) =>{
                        if(error){
                        throw error;
                           
                        } else{
                            id_ultimo_array=resultaados[0]
                            console.log(id_ultimo_array.id)
                            el_id=parseInt(id_ultimo_array.id)
                            connection.query("UPDATE detalle_facturas SET id_producto = ? ,total=?,direccion_entrega=? WHERE id_facturas = ?", [id_producto,total,direccion, el_id], (err, result) => {
                        
                            })
                            }
                        })
                   
                    
                }
                
                if(datos_finales[i].tipo==="esencia"){
                    let id_esencia=parseInt(datos_finales[i].id)
                    connection.query('SELECT MAX(id_facturas) AS id FROM detalle_facturas',async(error,resultaados) =>{
                        if(error){
                        throw error;
                           
                        } else{
                            id_ultimo_array=resultaados[0]
                            console.log(id_ultimo_array.id)
                            el_id=parseInt(id_ultimo_array.id)
                            connection.query("UPDATE detalle_facturas SET id_esencia = ? ,total=?,direccion_entrega=? WHERE id_facturas = ?", [id_esencia,total,direccion, el_id], (err, result) => {
                        
                            })
                            }
                        })
                   
                }

                if(datos_finales[i].tipo==="presentaciones"){
                    let id_presentacion=parseInt(datos_finales[i].id)
                    connection.query('SELECT MAX(id_facturas) AS id FROM detalle_facturas',async(error,resultaados) =>{
                        if(error){
                        throw error;
                           
                        } else{
                            id_ultimo_array=resultaados[0]
                            console.log(id_ultimo_array.id)
                            el_id=parseInt(id_ultimo_array.id)
                            connection.query("UPDATE detalle_facturas SET id_presentacion = ?,total=? ,direccion_entrega=?WHERE id_facturas = ?", [id_presentacion,total,direccion, el_id], (err, result) => {
                        
                            })
                            }
                        })
                    
                    
                    
                }

                


            }
            res.redirect('/Ordenes')
            
        }else{
            res.redirect("/")
        }
        
    })


    app.post("/presentaciones", (req,res) => {
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            const {tipo_presentacion,precio_presentacion} = req.body;
            connection.query("INSERT INTO presentaciones SET ?", {
                tipo_presentacion:tipo_presentacion,
                precio:precio_presentacion,
                
            }, (error, results) => {
                if(error){
                    res.send(error);
                } else {
                    res.redirect("/inventario_presentaciones")
                }
            })
        }else{
            res.redirect("/")
        }
        
    })

    app.get('/registro',(req,res)=>{
        res.render('../views/registro.ejs')
    })



    app.get('/configvendedor',(req,res)=>{
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            res.render('../views/configvendedor.ejs',{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.redirect("/")
        }
        
    })


    app.get('/fragancias',(req,res)=>{
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            res.render('../views/fragancias.ejs',{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.redirect("/")
        }
        
    })


    app.get('/pedidos',(req,res)=>{
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            res.render('../views/pedidos.ejs',{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.redirect("/")
        }
        
    })


    app.get('/esencias',(req,res)=>{
        if(req.session.rol==="administrador" || req.session.rol==="vendedor"){
            res.render('../views/esencias.ejs',{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.redirect("/")
        }
        
    })

    app.get('/acercade', function(req, res, next) {
        if(req.session.loggedin){
            console.log(req.session.username);
            res.render("../views/acercade.ejs",{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.render('../views/acercade.ejs',{
                login:false,
                name:"Por favor inicie sesion"
            })
        }
    });
      
    app.get('/productos', function(req, res, next) {
        if(req.session.loggedin){
            console.log(req.session.username);
            res.render("../views/productos.ejs",{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.render('../views/productos.ejs',{
                login:false,
                name:"Por favor inicie sesion"
            })
        }
    });
    
      
    app.get('/politicas', function(req, res, next) {
        if(req.session.loggedin){
            console.log(req.session.username);
            res.render("../views/politicas.ejs",{
                login:true,
                name:req.session.username,
                rol:req.session.rol
            })
        }else{
            res.render('../views/politicas.ejs',{
                login:false,
                name:"Por favor inicie sesion"
            })
        }
    });

    app.get('/logout',(req,res)=>{
        
        req.session.destroy(()=>{
            res.redirect("/")
        })
    })


   

    

    app.post('/registro', async (req,res)=>{
        
        console.log(req.body);
        
        const {username,pass,nombres,apellidos,telefono,email,verificar_pass}=req.body;
        console.log(username);
        
        let passwordHaash = await bcryptjs.hash(pass,8);
        connection.query("INSERT INTO cliente SET ?",{
            username: username,
            pass:passwordHaash,
            nombre:nombres,
            apellido:apellidos,
            telefono:telefono,
            email:email,
        }, async(error,results)=>{
            if (error ){
                res.render("../views/registro.ejs",{
                    alert: false,
                    alertTitle: "Error",
                    alertMessage: "Error",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./registro"
                   })
            }else{
                if(pass===verificar_pass){
                res.render("../views/registro.ejs",{
                    alert: true,
                    alertTitle: "Registro Exitoso",
                    alertMessage: "¡Registro exitoso!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./formulario"
                   })
            }else{
                res.render("../views/registro.ejs",{
                    alert: false,
                    alertTitle: "Error",
                    alertMessage: "Error",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./registro"
                   })
            }
                
                
            }
        })
    })

    app.post('/agregaradmin', async (req,res)=>{
        
        console.log(req.body);
        
        const {username,pass,nombres,apellidos,telefono,email}=req.body;
        console.log(username);
        let passwordHaash = await bcryptjs.hash(pass,8);
        connection.query("INSERT INTO administrador SET ?",{
            username: username,
            pass:passwordHaash,
            nombre:nombres,
            apellido:apellidos,
            telefono:telefono,
            email:email,
        }, async(error,results)=>{
            if (error){
                res.render("../views/agregaradmin.ejs",{
                    alert: false,
                    alertTitle: "Error",
                    alertMessage: "Error",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./agregaradmin"
                   })
            }else{
                res.render("../views/agregaradmin.ejs",{
                    alert: true,
                    alertTitle: "Registro Exitoso",
                    alertMessage: "¡Registro exitoso!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./agregaradmin"
                   })
                
            }
        })
    })




    app.post('/eliminaradmin', async (req,res)=>{
        
        console.log(req.body);
        
        const {username}=req.body;
        console.log(username);
        
        connection.query("DELETE FROM administrador WHERE ?",{
            username: username,
        }, async(error,results)=>{
            if (error){
                res.render("../views/eliminaradmin.ejs",{
                    alert: false,
                    alertTitle: "Error",
                    alertMessage: "Error",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./eliminaradmin"
                   })
            }else{
                res.render("../views/eliminaradmin.ejs",{
                    alert: true,
                    alertTitle: "Usuario eliminado",
                    alertMessage: "Usuario eliminado",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta:"./eliminaradmin"
                   })
                
            }
        })
    })

app.post('/auth',async (req,res)=>{
    const {username,pass,rol}=req.body;
    console.log(rol);
    if(rol=="admin"){
                if(username&&pass){
                    connection.query('SELECT * FROM administrador WHERE username = ? AND pass=?',[username,pass],async(error,results) =>{
                        if(results.length===0){
                           res.render('../views/formulario.ejs',{
                               alert:true,
                               alertTitle:"Usuario y/o password incorrectos",
                               alertMessage:"Usuario y/o password incorrectos",
                               alertIcon:"error",
                               showConfirmButton:true,
                               timer:1500,
                               ruta:'formulario'
                           })
                           
                        } else{
                            req.session.rol=results[0].rol;
                            req.session.loggedin=true;
                            req.session.username=results[0].username
                            console.log(req.session.username);
                            console.log(results[0].username)
                            res.render('../views/formulario.ejs',{
                                alert:true,
                                alertTitle:"Conexion Exitosa",
                                alertMessage:"Login Correcto",
                                alertIcon:"success",
                                showConfirmButton:false,
                                timer:1500,
                                ruta:'config'
                            });
                            }
                        }
                    )}
            }

            if(rol=="vendedor"){
                if(username&&pass){
                    connection.query('SELECT * FROM vendedor WHERE username = ? AND pass=?',[username,pass],async(error,results) =>{
                        if(results.length===0){
                           res.render('../views/formulario.ejs',{
                               alert:true,
                               alertTitle:"Usuario y/o password incorrectos",
                               alertMessage:"Usuario y/o password incorrectos",
                               alertIcon:"error",
                               showConfirmButton:true,
                               timer:1500,
                               ruta:'formulario'
                           })
                           
                        } else{
                            req.session.loggedin=true;
                            req.session.rol=results[0].rol;
                            req.session.username=results[0].username
                            console.log(req.session.username);
                            console.log(results[0].username)
                            res.render('../views/formulario.ejs',{
                                alert:true,
                                alertTitle:"Conexion Exitosa",
                                alertMessage:"Login Correcto",
                                alertIcon:"success",
                                showConfirmButton:false,
                                timer:1500,
                                ruta:'configvendedor'
                            });
                            }
                        }
                    )}
            }




    let passwordHaash= await bcryptjs.hash(pass,8);
    if(username&&pass){
        connection.query('SELECT * FROM cliente WHERE username = ?',[username],async(error,results) =>{
            if(results.length===0 || !(await bcryptjs.compare(pass,results[0].pass))){
               res.render('../views/formulario.ejs',{
                   alert:true,
                   alertTitle:"Usuario y/o password incorrectos",
                   alertMessage:"Usuario y/o password incorrectos",
                   alertIcon:"error",
                   showConfirmButton:true,
                   timer:1500,
                   ruta:'formulario'
               })

            } else{
                req.session.loggedin=true;
                req.session.username=results[0].username
                req.session.rol=results[0].rol;
                req.session.id_element=results[0].id_element
                res.render('../views/formulario.ejs',{
                    alert:true,
                    alertTitle:"Conexion Exitosa",
                    alertMessage:"Login Correcto",
                    alertIcon:"success",
                    showConfirmButton:false,
                    timer:1500,
                    ruta:'losproductos'
                });
                }
            }
        )}
            
    })
    
}


