import { connectionDatabase } from './connection';
import {database} from '../interface/database.interface'

  export function getAllData(dataIn:database,resultData) {
    const {table} = dataIn
    const QUERY = 'SELECT * FROM ' + table;
    connectionDatabase.query(QUERY, resultData);
  }

  export function getSpesifikData(dataIn:database,resultData){
    const {table,id} = dataIn
    const QUERY = 'SELECT * FROM ' + table + ' WHERE id='+id;
    // console.log(QUERY)
    connectionDatabase.query(QUERY, resultData);
  }

  export function deleteData(dataIn:database,resultData){
     const {table,id} = dataIn
     const QUERY = 'DELETE FROM '+table+' WHERE id='+id
    connectionDatabase.query(QUERY, resultData);
    }

    export function defaultExecution(dataIn:database,resultData){
      const{query,data}=dataIn
      connectionDatabase.query(query,data, resultData);
    }

    export function getDataOptions(dataIn:database,resultData){
      const {query} = dataIn
      connectionDatabase.query(query,resultData)
    }

