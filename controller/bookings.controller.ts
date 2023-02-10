import { dataInput } from "../database/inputData";
import { getAllData, getDataOptions } from "../database/getData";
import { generateString } from "../logic/createdId";
import { Request, Response } from "express";

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

const tableOne = "bookings"
export const GetDataBookings = async (req:Request,res:Response):Promise<any>=>{
  const query = `SELECT bookings.booking_code,bookings.price,bookings.total_booking,bookings.phone,bookings.status,bookings.name,gedungs.name AS nama_gedung,bookings.booking_code,bookings.check_in,bookings.check_out,bookings.id
                FROM bookings
                LEFT JOIN gedungs ON bookings.id_gedung=gedungs.id
                ORDER BY gedungs.name`
    await getDataOptions({query:query},
        (err, results, fields) => {
      if (results) return res.status(200).send(results)
      else return res.status(401).send(err);
    })
}

export const InputDataBookings= async(req:Request,res:Response)=>{
    if(!req.body.name) return res.status(401).send("No data In")
    //lofika jika body ada
    const {check_in,
           check_out,
           name,
           phone,
           price,
           totalBooking,
           gedung} = req.body
   const query = `INSERT INTO bookings (id_user,name,booking_code,created_at,status,check_in,check_out,id_gedung,price,total_booking,phone) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
   const query2 = 'SELECT id FROM users WHERE `name` = ?'
    dataInput({query:query2,data:[name]},(err, results) => {
      let id
      if (results){ 
        results.forEach(element => {
          id = element.id
          // console.log(id)
        });
        if(!id) {
          console.log(err)
          return res.status(401).send("Name not found")
        };
        const dataIn = [id,name,generateString(12),today,0,check_in,check_out,gedung,price,totalBooking,phone]
        dataInput({query:query,data:dataIn}, (err, results) => {
          if (results){ 
            console.log('Rows affected:', results.affectedRows);
            return res.status(200).send("data inputed")}
          else{ 
            console.log(err)
            return res.status(401).send(err);
          }
        })
        // return res.status(200).send("data inputed")
      }
      else{ 
        console.log(err)
        return res.status(401).send(err);}})
}

export const EditDataBookings = async(req:Request,res:Response)=>{
  const uid = req.params.uid
    if(!req.params.uid) return res.status(401).send("No data In")
    //logika jika body ada
    const {check_in,
           check_out,
           name,
           price,
           id,
           totalBooking} = req.body
    const query = 'UPDATE bookings SET `check_in` = ?,`total_booking`=?, `check_out` = ?,`price`= ? WHERE `id` = ? '
    const dataIn = [check_in,totalBooking,check_out,price,uid]
  //  console.log(req.body,uid)
    dataInput({query:query,data:dataIn}, (err, results) => {
      if (results){ 
        console.log('Rows affected:', results.affectedRows);
        return res.status(200).send("data Edited")}
      else{ 
        console.log(err)
        return res.status(401).send(err);}})
}