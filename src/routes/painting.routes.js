const express = require('express');
const paintingController = require('../controllers/painting.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/paintings', paintingController.getPaintings);
router.get('/paintings/:id', paintingController.getPaintingByID);

//With middlewares
router.post('/paintings', authMiddleware, paintingController.addPainting);
router.delete('/paintings/:id', authMiddleware, paintingController.deletePainting);
router.put('/paintings/:id', authMiddleware, paintingController.updatePainting);

module.exports = router;