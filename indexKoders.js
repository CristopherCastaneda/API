/**
 * Tarea: 
 * En el endpoint de enlistar koders, recibir modulo como query params
 * y regresar todos los koders que tengan ese modulo
 * 
 * []
 */

 const express = require("express")
 const fs = require("fs") // Callback
 const fsPromise = require("fs/promises") // Promises
 const app = express()

// Endpoints koders
// recurso/identicador -> koders

/**
 * 1 - PATH PARAM -> identificadores -> modifican la ruta del lado de back
 * /recurso/identificador -> /koders/:id
 * 2 - QUERY PARAM -> no cambian la ruta
 * ?ciudad=Gdl&municipio=
 */
 app.get("/koders", async (request, response) => {
    console.log("request", request)
  
    const { query } = request
    console.log("modulo", query.modulo)
    const db = await fsPromise.readFile("koders.json", "utf8") 
    const parsedDB = JSON.parse(db)
    response.json(parsedDB.koders)
  })
  
  // Recibir un koder en especifico con el id
  app.get("/koders/:id", async (request, response) => {
    // Path params
    const { params } = request
  
    // DB
    const db = await fsPromise.readFile("koders.json", "utf8")
    const parsedDB = JSON.parse(db)
  
    // Filtramos para encontrar al koder con identiciador 2
    const foundKoder = parsedDB.koders.filter((koder) => koder.id === Number(params.id))
  
    // Respondemos
    response.json(foundKoder[0])
  })
  
  app.listen(8080, () => {
    console.log("Server is listening ...")
  })
  
  app.get("/koders", async (request, response) => {
    const { query } = request
    const db = await fsPromise.readFile("koders.json", "utf8")
    const parsedDB = JSON.parse(db)
  
    const foundKoder = parsedDB.koders.filter((koder) => koder.modulo === query.modulo)
    console.log(foundKoder)
  
    response.json(foundKoder[0])
  })
  
  app.listen(8080, () => {
    console.log("Server is listening ...")
  })


