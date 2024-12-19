const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { create, getAll, getOne, update, remove } = require('../controllers/notesController');

router.post('/', verifyToken, create);
router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getOne);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

module.exports = router;