import { database } from "../interface/database.interface";
import { connectionDatabase } from "./connection";

export function dataInput(dataIn:database,logicIn){
  const {query,data} = dataIn
  connectionDatabase.execute(query,data,logicIn)
}