const db = require('../helper/database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const checkUsernameExist = async function (username) {
  const query = "SELECT * FROM users WHERE username=?";
  const result = await db.sql_query(query, username);
  //console.log(result)
  return result
}

exports.register = async function register(ctx) {
  const body = ctx.request.body;
  const exist = await checkUsernameExist(body.username)
  console.log(exist);
  if (exist.length) {
    ctx.status = 409;
    ctx.body = {
      Message: `the username ${body.username} is already been used, please chooes a different one`,
      self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
    }
  }
  else {
    const query = "INSERT INTO users SET ?";
    const hashpassword = body.password;
    body.password = bcrypt.hashSync(hashpassword, 10);
    const result = await db.sql_query(query, body);
    const id = result.insertId;
    const { password, ...user } = body;
    console.log(`New account has been created.`)
    ctx.status = 201;
    ctx.body = {
      ID: id,
      user,
      registered: true,
      Message: `account has been created for user ${body.name} with username ${body.username}.`,
      self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
    };
  }
}

exports.login = async function login(ctx, next) {
  const body = ctx.request.body;
  const query = "SELECT * FROM users WHERE username = ?"
  try {
    const result = await db.sql_query(query, body.username);
    //console.log(result[0].password, body.password)
    if (result.length) {
      const checkPassword = bcrypt.compareSync(body.password, result[0].password)
      if (checkPassword) {
        const id = result[0].id;
        //console.log(ctx.state.userid);
        const links = `${ctx.protocol}://${ctx.host}${ctx.request.path}/${id}`
        const token = jwt.sign({ ID: result[0].id }, "secretkey", { expiresIn: '1d' })
        console.log(`Successfully authenticated user ${body.username}. token issused`,)
        const { password, registeredDate, modifiedDate, ...user } = result[0]
        ctx.cookies.set("Token", token, { httpOnly: true });
        //console.log(ctx.cookies.get("Token"))
        ctx.status = 200;
        ctx.body = { id: id, user, Login: true, self: links }
      }
      else {
        console.log(`Incorrect password entered for ${body.username}`)
        ctx.status = 400;
        ctx.body = {
          Message: "Incorrect password.",
          self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
        }
      }
    }
    else {
      ctx.status = 400;
      ctx.body = {
        Message: `${body.username} does not exits, please check your username`,
        self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
      };
    }
  }
  catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      Message: "Something went wrong",
      self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
    }
  }
  await next()
}

exports.getAllUser = async function getAllUser(ctx) {
  try {
    const query = "SELECT id,name, username, email, role FROM users";
    const result = await db.sql_query(query);
    ctx.status = 200
    ctx.body = result
  }
  catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      Message: "Something went wrong.",
      self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
    }
  }
}


exports.logout = async function logout(ctx) {
  ctx.cookies.set("Token", '', { httpOnly: false });
  ctx.status = 200;
  ctx.body = {
    Logout: true,
    Message: "You have logged out"
  }

}

exports.update = async function update(ctx) {
  const body = ctx.request.body;
  const id = ctx.params.userId;
  const query = "UPDATE users SET ? WHERE ID = ?;";

  if (body.password) {
    const password = body.password;
    const hash = bcrypt.hashSync(password, 10);
    body.password = hash;
  }
  try {
    await db.sql_query(query, [body, id]);
    ctx.status = 200;
    ctx.body = {
      ID: id,
      Updated: true,
      Message: "You have update your account",
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

exports.deleteUser = async function deleteUser(ctx) {
  const id = ctx.params.userId;
  const query = "DELETE FROM users WHERE id = ?";
  try {
    await db.sql_query(query, id)
    ctx.status = 200;
    ctx.body = {
      ID: id,
      Deleted: true,
      Message: "Your have deleted your account",
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error,
    }
  }
}

