const express =  require('express');
const controller = require('../controller/controller')

const router = express.Router();
router.get('/', controller.getAllData)
router.get('/web/getLeagues', controller.getAllData);
router.get('/web/newLeague', controller.loadNewData);
router.post('/web/newLeague' , controller.addNewData);
router.get('/web/updateLeague/:lid',controller.loadUpdateData);
router.post('/web/updateLeague/:lid',controller.updateData);
router.get('/web/deleteLeague/:lid' , controller.deleteData);

module.exports = router;