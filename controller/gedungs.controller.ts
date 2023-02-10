import { dataInput } from "../database/inputData";
import { defaultExecution, deleteData, getAllData, getSpesifikData } from "../database/getData";
import { Request, Response } from "express";

const tableOne = "gedungs"
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

export const GetDataGedungs = async (req:Request,res:Response):Promise<any>=>{
    await getAllData({table:tableOne},
        (err, results, fields) => {
      if (results) return res.status(200).send(results)
      else return res.status(401).send(err);
    })
}
export const GetDataGedungsSpesifik=async(req:Request,res:Response)=>{
    const uid = req.params.uid
    if(!uid) return res.status(401).send("No data In")
    //lofika jika body ada
  await getSpesifikData({table:tableOne,id: uid},
        (err, results, fields) => {
      if (results) return res.status(200).send(results)
      else return res.status(401).send(err);
    })
}
export const InputDataGedungs=async (req:Request,res:Response)=>{
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
    if(!req.body.name) return res.status(401).send("No data In")
    //lofika jika body ada
    const {name,
      price,
      latitude,
      longitude,
      description,
      location,gedung} = req.body
    const query = `INSERT INTO gedungs (name,price,latitude,longitude,description,location,created_at,id_jenis,reviews_id,id_nearby,id_booking) VALUES(?,?,?,?,?,?,?,?,?,?,?)  `
    const dataIn = [name,price,latitude||"null",longitude||"null",description,location,today,gedung,1,1,1]
    
    dataInput({query:query,data:dataIn}, (err, results) => {
      console.log("executed")
      if (results){ 
        console.log('Rows affected:', results.affectedRows);
        return res.status(200).send("data inputed")}
      else{ 
        console.log(err)
        return res.status(401).send(err)}
      })
}

export const EditDataGedungs = async(req:Request,res:Response):Promise<any>=>{
    const id = req.params.uid
    if(!id) return res.status(401).send("No data In")
    //lofika jika body ada
    const {name,
      price,
      latitude,
      longitude,
      description,
      location} = req.body
    const query = 'UPDATE gedungs SET `name` = ?, `price` = ?,`latitude` = ?,`longitude` = ?,`description` = ?,`location` = ?, `updated_at` = ? WHERE `id` = ? '
    const dataIn = [name,price,latitude,longitude,description,location,today,id]
   
    dataInput({query:query,data:dataIn}, (err, results) => {
     if (results){ 
        console.log('Rows affected:', results.affectedRows);
        return res.status(200).set('Access-Control-Allow-Origin', process.env.frontendName).send("data Edited")}
      else return res.status(401).send(err);})
}

export const ReviewGedung = async(req:Request,res:Response)=>{
 const table = "reviews"
 await getAllData({table:table},
        (err, results) => {
      if (results) return res.status(200).send(results)
      else return res.status(401).send(err);
    })
}

export const DeleteReviewGedungs = async(req:Request,res:Response)=>{
  console.log("data exe")
    const uid = req.params.uid
    if(!uid) return res.status(401).send("No data In")
    const table = "reviews"
    //lofika jika body ada
    await deleteData({table:table,id: uid},(err, results, fields) => {
      if (results) return res.status(200).send(results)
      else{ 
        console.log(err)
        return res.status(401).send(err);
}})
}

export const DeleteGedungs = async(req:Request,res:Response)=>{
    const uid = req.params.uid
    if(!uid) return res.status(401).send("No data In")
    //lofika jika body ada
    await deleteData({table:tableOne,id: uid},
        (err, results, fields) => {
      if (results) return res.status(200).send(results)
      else return res.status(401).send(err);
        })
}

export const JenisGedung = async (req:Request,res:Response)=>{
   await getAllData({table:"jenis"},
        (err, results, fields) => {
      if (results) return res.status(200).send(results)
      else return res.status(401).send(err);
    })
}