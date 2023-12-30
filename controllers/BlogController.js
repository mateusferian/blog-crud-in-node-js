const BlogServices = require('../services/BlogService');

exports.findAllBlog = async (req, res) => {
    try {
        const blogs = await BlogServices.findAllBlog();
        console.log('listing blogs:', blogs);
        res.json({ data: blogs, status: 'success' });
    } catch (err) {
        console.error('error when listing blogs:', err);
        res.status(500).json({ error: err.message });
    }
}

exports.createBlog = async (req, res) => {
    try{
        const blog = await BlogServices.createBlog(req.body);
        console.log('creating blogs:', blog);
        res.json({data: blog, status: 'success'});
    }catch(err){
        console.error('error when creating blog:', err);
        res.status(500).json({error: err.message});
    }
};

exports.findByIdBlog = async (req, res) => {
    try {
        const blog = await BlogServices.findByIdBlog(req.params.id);
        validateAndRespond(blog);
        
        res.json({ data: blog, status: 'success' });
        console.log('find blog by id:', req.params.id);
    } catch (err) {

        console.error('error when finding blog by id:', err);
        handleError(err, res);

    }
}; 

exports.updateBlog = async (req, res) => {
    try {
        validateAndRespond(await BlogServices.findByIdBlog(req.params.id));
        const blog = await BlogServices.updateBlog(req.params.id, req.body);

        res.json({ data: blog, status: 'success' });
        console.log('updating blog by id:', req.params.id);
    } catch (err) {

        console.error('error when updating blog by id:', err);
        handleError(err, res);

    }
};

exports.deleteBlog = async (req, res) => {
    try {
        validateAndRespond(await BlogServices.findByIdBlog(req.params.id));
        await BlogServices.deleteBlog(req.params.id);

        res.json({status: 'success' });
        console.log('deleting blog by id:', req.params.id);
    } catch (err) {

        console.error('error when deleting blog by id:', err);
        handleError(err, res);

    }
};

function validateAndRespond(blogExists) {

    if (!blogExists) {
        throw { statusCode: 404, message: 'Blog not found' };
    }

}

function handleError(err, res) {

    if (err.statusCode) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        res.status(500).json({ error: err.message });
    }

}



