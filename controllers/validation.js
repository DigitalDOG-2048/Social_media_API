const { Validator, ValidationError } = require('jsonschema');

const addPostSchema = require("../schemas/post.json").definitions.addPost;
const updatePostSchema = require("../schemas/post.json").definitions.updatePost;

const userRegisterSchema = require("../schemas/user.json").definitions.register;
const userUpdateSchema = require("../schemas/user.json").definitions.userUpdate;
const loginSchema = require("../schemas/user.json").definitions.login;

const addCommentSchema = require("../schemas/comment.json").definitions.addComment;
const updateCommentSchema = require("../schemas/comment.json").definitions.updateComment;


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
exports.validateUpdatePost = makeKoaValidetor(updatePostSchema, 'updatePost');
exports.validateUserRegister = makeKoaValidetor(userRegisterSchema, 'userRegister');
exports.validateUserUpdate = makeKoaValidetor(userUpdateSchema, 'userUpdate');
exports.validateLogin = makeKoaValidetor(loginSchema, 'login');
exports.validateAddComment = makeKoaValidetor(addCommentSchema, 'addComment');
exports.validateUpdateComment = makeKoaValidetor(updateCommentSchema, 'updateComment');

