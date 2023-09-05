//module for mssql
var sql = require("mssql");

// config for your database
var config = {	
    user: 'home',	
    password: '123456',	
    server: 'FS01', 	
    database: 'SportLeague',	
    options: {	
        encrypt: false,	
        cryptoCredentialsDetails: {	
            minVersion: 'TLSv1'                                     	
        }	
    }  	
};    	

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}
