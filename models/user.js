const db = require('../helper/database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const checkUsernameExist = async function (username) {
  const query = "SELECT * FROM users WHERE username=?";
  const result = await db.sql_query(query, username);
  //console.log(result)
  return result
}

exports.register = async function register(ctx) {
  const body = ctx.request.body;
  if (checkUsernameExist(body.username).length) {
    ctx.status = 500;
    ctx.body = {
      Message: `the username ${body.username} is already been used, please chooes a different one`
    }
  }
  else {
    const query = "INSERT INTO users SET ?";
    const password = body.password;
    body.password = bcrypt.hashSync(password, 10);
    const result = await db.sql_query(query, body);
    const id = result.insertId;
    console.log(`New account has been created.`)
    ctx.status = 201;
    ctx.body = {
      ID: id,
      Message: `account has been created for user ${body.name} with username ${body.username}.`,
    };
  }
}

exports.login = async function login(ctx) {
  const body = ctx.request.body;
  const query = "SELECT * FROM users WHERE username = ?"
  try {
    const result = await db.sql_query(query, body.username);
    //console.log(result[0].password, body.password)
    if (result.length) {
      const checkPassword = bcrypt.compareSync(body.password, result[0].password)
      if (checkPassword) {
        const token = jwt.sign({ ID: result[0].id }, "secretkey", { expiresIn: '1d' })
        console.log(`Successfully authenticated user ${body.username}. token issused`,)
        ctx.cookies.set("Token", token, { httpOnly: true });
        //console.log(ctx.cookies.get("Token"))
        ctx.status = 200;
        ctx.body = {
          ID: result[0].id,
          name: result[0].name,
          token
        }
      }
      else {
        console.log(`Incorrect password entered for ${body.username}`)
        ctx.status = 400;
        ctx.body = {
          Message: "Incorrect password."
        }
      }
    }
    else {
      ctx.status = 500;
      ctx.body = {
        Message: `${body.username} does not exits, please check your username`
      };
    }
  }
  catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      Message: "Something went wrong"
    }
  }
}

exports.getAllUser = async function getAllUser(ctx) {
  try {
    const query = "SELECT * FROM users";
    const result = await db.sql_query(query);
    ctx.body = result;
  }
  catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      Message: "Something went wrong."
    }
  }
}


exports.logout = async function logout(ctx) {
  ctx.cookies.set("Token", '', { httpOnly: false });
  ctx.status = 204;
  ctx.body = {
    Message: "YYou have logged out"
  }

}

