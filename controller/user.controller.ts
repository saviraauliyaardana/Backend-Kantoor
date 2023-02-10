import { dataInput } from "../database/inputData";
import { defaultExecution, deleteData, getAllData, getSpesifikData } from "../database/getData";
import { Request, Response } from "express";

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

const tableOne = "users"
export const GetDataUser = async (req:Request,res:Response):Promise<any>=>{
    await getAllData({table:tableOne},
        (err, results, fields) => {
      if (results) return res.status(200).send(results)
      else return res.status(401).send(err);
    })
}

export const GetDataUserSpesifik=async(req:Request,res:Response)=>{
    const uid = req.params.uid
    if(!uid) return res.status(401).send("No data In")
    //lofika jika body ada
  await getSpesifikData({table:tableOne,id: uid},
        (err, results, fields) => {
      if (results) return res.status(200).send(results)
      else return res.status(401).send(err);
    })
}


export const InputDataUser=async(req:Request,res:Response)=>{
    if(!req.body.name) return res.status(401).send("No data In")
    //lofika jika body ada
    const {name,
        price,
        latitude,
        longitude,
        description,
        location} = req.body
    const query = `INSERT INTO gedungs (name,price,latitude,longtitude,description,location,created_at) VALUES(?,?,?,?,?,?,?)  `
    const dataIn = [name,price,latitude,longitude,description,location,today]

    dataInput({query:query,data:dataIn}, (err, results) => {
    if (results){ 
        console.log('Rows affected:', results.affectedRows);
        return res.status(200).send("data inputed")}
    else return res.status(401).send(err);})
}

export const EditDataUser = async(req:Request,res:Response):Promise<any>=>{
    if(!req.body.id) return res.status(401).send("No data In")
    //lofika jika body ada
    const {name,price,latitude,longitude,description,location,id} = req.body
    const query = 'UPDATE gedungs SET `name` = ?, `price` = ?,`latitude` = ?,`longitude` = ?,`description` = ?,`location` = ?, `updated_at` = ? WHERE `id` = ? '
    const dataIn = [name,price,latitude,longitude,description,location,today,id]
   
    dataInput({query:query,data:dataIn}, (err, results) => {
    if (results){ 
        console.log('Rows affected:', results.affectedRows);
        return res.status(200).send("data Edited")}
    else return res.status(401).send(err);})
}

export const deletedataUser = async(req:Request,res:Response)=>{
    const uid = req.params.uid
    if(!uid) return res.status(401).send("No data In")
    //lofika jika body ada
    await deleteData({table:tableOne,id: uid},(err, results, fields) => {
      if (results) {
        console.log(results)
        return res.status(200).send(results)}
      else {
        console.log(err)
        return res.status(401).send(err)};
        })
}

export const login = async(req:Request,res:Response)=>{
    const{email,password} = req.body
  
    if(!email && !password)return res.status(401).send("No data In")
    const query = 'SELECT * FROM users WHERE `email`=? AND `password`=?'
    const dataIn = [email,password]
    await defaultExecution({query:query,data:dataIn},  (err, results, fields) => {
      if (results) return res.status(200).send(results)
      else return res.status(401).send(err);
        })
}

export const ResetPassword = async(req:Request,res:Response):Promise<any>=>{
    const uid = req.params.uid
    if(!uid) return res.status(401).send("No data In")
    //lofika jika body ada
    const {
      password,
      newpassword
    } = req.body
    
    const query = 'UPDATE users SET `password` = ?, `new_password` = ?,`updated_at`=? WHERE `id` = ? '
    const dataIn = [newpassword,newpassword,today,uid]
    

    dataInput({query:query,data:dataIn}, (err, results) => {
    if (results){ 
        console.log('Rows affected:', results.affectedRows);
        return res.status(200).send("data Edited")}
    else { 
      console.log(err)
      return res.status(401).send(err);
    }})
}