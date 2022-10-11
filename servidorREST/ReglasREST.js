// .....................................................................
// ReglasREST.js

// .....................................................................
module.exports.cargar = function (servidorExpress, laLogica) {
    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get('/prueba/', function (peticion, respuesta) {
        console.log(" * GET /prueba ")
        respuesta.send("¡Funciona!")
    }) // get /prueba
    // .......................................................
    // GET /dividir?a=<num>&b=<num>
    // .......................................................
    servidorExpress.get(
        '/dividir',
        function (peticion, respuesta) {
            console.log(" * GET /dividir ")
            var a = peticion.query.a
            var b = peticion.query.b
            if (isNaN(a) || isNaN(b) || b == 0) {
                // si a o b no son números, o b es 0
                // no se puede dividir
                // (400 = bad request)
                respuesta.status(400).send(" no puedo dividir ");
                return
            }
            var solucion = { a: a, b: b, division: a / b }
            respuesta.send(JSON.stringify(solucion))
        }) // get /dividir
    //----------------------------------------
    servidorExpress.get(
        '/dni',
        async function (peticion, respuesta) {
            console.log(" * GET /dni ")
            var error = null
            //Llamada a la funcion buscar_muestra() para recoger
            //la muestra introducida en la DB
            try {

                var res = await laLogica.buscarPersonaConDNI("1234A")
            }

            catch (e) {
                error = e
            }


            if (error != null) {
                if (res.length == 0) {
                    // 404: not found
                    respuesta.status(404).send("No encontré la muestra")
                    return
                }
            }
            console.log(res)
            respuesta.send(JSON.stringify(res))
        }) // get /muestra

    //----------------------------------------
    //Medida
    //----------------------------------------
    servidorExpress.get(
        '/fecha',
        async function (peticion, respuesta) {
            console.log(" * GET /fecha ")
            var error = null
            //Llamada a la funcion buscarMedidaConFecha() para recoger
            //la muestra introducida en la DB
            try {

                var res = await laLogica.buscarMedidaConFecha("8/04/22")
            }

            catch (e) {
                error = e
            }


            if (error != null) {
                if (res.length == 0) {
                    // 404: not found
                    respuesta.status(404).send("No encontré la muestra")
                    return
                }
            }
            console.log(res)
            respuesta.send(JSON.stringify(res))
        }) // get /muestra

        //----------------------------------------
    //Medida
    //----------------------------------------
    servidorExpress.get(
        '/medida',
        async function (peticion, respuesta) {
            console.log(" * GET /medida ")
            var error = null
            //Llamada a la funcion buscarMedidaConFecha() para recoger
            //la muestra introducida en la DB
            try {

                var res = await laLogica.buscarMedidaMasReciente()
            }

            catch (e) {
                error = e
            }


            if (error != null) {
                if (res.length == 0) {
                    // 404: not found
                    respuesta.status(404).send("No encontré la muestra")
                    return
                }
            }
            console.log(res)
            respuesta.send(JSON.stringify(res))
        }) // get /muestra




        servidorExpress.post(
            '/alta',
            async function( peticion, respuesta ){
                console.log( " * POST /alta " )
                var datos = JSON.parse(peticion.body)
                console.log( datos.medida )
                console.log( datos.fecha )
                // supuesto procesamiento
                try{
        
                    await laLogica.insertarMedida(datos)
                }
        
                catch (e){
                    error = e
                } 
            }) // post /alta
         // ()




    // .......................................................
    // POST /alta
    // .......................................................
    servidorExpress.post(
        '/alta/:tipoMedida/:medida/:fecha',
        async function( peticion, respuesta ){
            console.log( " * POST /alta " )
            //var datos = JSON.parse(peticion.body)
            console.log( peticion.params.tipoMedida)
            console.log( peticion.params.medida )
            console.log( peticion.params.fecha ) 
            datos = {tipoMedida:peticion.params.tipoMedida, medida:peticion.params.medida, fecha:peticion.params.fecha }
            console.log(datos)
            // supuesto procesamiento
            try{
                await laLogica.insertarMedida(datos)
            }
    
            catch (e){
                error = e
            } 
        }) // post /alta

/*

    // .......................................................
    // POST /alta
    // .......................................................
    servidorExpress.post(
        '/alta',
        async function (peticion, respuesta) {
            console.log(" * POST /alta ")
            var error = null
            var datos = JSON.parse(peticion.body)
            console.log(datos)
            

            try {
                var res = await laLogica.insertarMedida(datos)
            }
            catch (e) {
                error = e
                console.log(error)
            }
            /*
                        // supuesto procesamiento
                        if (datos.dni == "1234A") {
                            respuesta.send("OK")
                        } else {
                            // 404 = not found
                            respuesta.status(404).send("no acertaste con el dni")
                        }
        }) // get /dividir*/
} // ()
// .....................................................................
// .....................................................................