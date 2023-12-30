const express = require ('express');

const {findAllBlog, createBlog, findByIdBlog, updateBlog, deleteBlog} = require('../controllers/BlogController');

const router = express.Router();

router.route('/').get(findAllBlog).post(createBlog);
router.route('/:id').get(findByIdBlog).put(updateBlog).delete(deleteBlog);

module.exports = router;