const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class MainController {

    async getAllData(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .query(queries.getAllData)
        //res.send(result.recordset)
        res.render('leagues',{larr:result.recordset})
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async getOneData(req , res){
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .input('LID',sql.Int,req.params.lid)
          .query(queries.getOneData)
        res.json(result.recordset)
        //res.render('list',{larr:result.recordset})
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    //// them - xuat dang form
    async loadNewData(req, res){
      res.render('new')
    }

    async addNewData(req , res){
      try {
        if(req.body.LID != '' && req.body.year != '' && req.body.season != '' && req.body.title != '') {
          const pool = await poolPromise
          const result = await pool.request()
          .input('LID',sql.Int , req.body.LID)
          .input('year',sql.Int , req.body.year)
          .input('season',sql.VarChar,req.body.season)
          .input('title',sql.VarChar,req.body.title)
          .query(queries.addNewData)
          //res.send('Add new league ' + req.body.LID + ' successfully')
          res.redirect('/web/getLeagues')

        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateData(req , res){
      try {
        if(req.body.LID != null && req.body.year != null && req.body.season != null && req.body.title != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('LID',sql.Int , req.body.LID)
          .input('newYear',sql.Int , req.body.year)
          .input('newSeason',sql.VarChar,req.body.season)
          .input('newTitle',sql.VarChar,req.body.title)
          .query(queries.updateData)
          //res.send('Update league ' + req.body.LID + ' successfully')
          res.redirect('/web/getLeagues')
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    //// them - xuat dang form
    async loadUpdateData(req, res){
      var lid = req.params.lid
      try {
        const pool = await poolPromise
        const result = await pool.request()
          .input('LID',sql.Int,req.params.lid)
          .query(queries.getOneData)
        res.render('update',{larr:result.recordset})
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }      
    }

    async deleteData(req , res){
      try {
        if(req.params.lid != null ) {
            const pool = await poolPromise
            const result = await pool.request()
            .input('LID',sql.Int,req.params.lid)
            .query(queries.deleteData)
            //res.send('Delete league ' + req.body.LID + ' successfully')
            res.redirect('/web/getLeagues')
          } else {
            res.send('Please fill LID!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new MainController()
module.exports = controller;