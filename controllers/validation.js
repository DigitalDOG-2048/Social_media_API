const { Validator, ValidationError } = require('jsonschema');

const addPostSchema = require("../schemas/post.json").definitions.addPost;
const updatePostSchema = require("../schemas/post.json").definitions.updatePost;


const makeKoaValidetor = (schema, resource) => {
    const v = new Validator();
    const validationOptions = {
        throwError: true,
        propertyName: resource
    };


    const handler = async (ctx, next) => {
        const body = ctx.request.body;

        try {
            v.validate(body, schema, validationOptions);
            await next();
        } catch (error) {
            if (error instanceof ValidationError) {
                console.error(error);
                ctx.status = 400
                ctx.body = error;
            } else {
                throw error;
            }
        }
    }
    return handler;
}


exports.validateAddPost = makeKoaValidetor(addPostSchema, 'addPost');

