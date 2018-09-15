const Koa = require('koa')
const static = require('koa-static')
const path = require('path')
const fs = require('fs')
const app = new Koa()
const SDK = require('../sdk/index').sdk
// console.log(SDK);
// const axios = require('axios');
const sdk = new SDK('ld2n7Myo+2rA/EYjrVeK4w==', 'BaH8uHyPTGz7WJAIB8IXIg==');

const urlHanlder = (url) => {
    return url === '/' ? 'send' : url.split('?')[0].slice(1);
}

// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
    return new Promise((resolve, reject) => {
      try {
        let postdata = "";
        ctx.req.addListener('data', (data) => {
          postdata += data
        })
        ctx.req.addListener("end",function(){
        //   let parseData = parseQueryStr( postdata )
        let parseData = JSON.parse(postdata).data
          resolve( parseData )
        })
      } catch ( err ) {
        reject(err)
      }
    })
  }
  
  // 将POST请求参数字符串解析成JSON
  function parseQueryStr( queryStr ) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log( queryStrList )
    for (  let [ index, queryStr ] of querySt5rList.entries()  ) {
      let itemList = queryStr.split('=')
      queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
    }
    return queryData
  }
  

const send = async (ctx) => {
    if (ctx.method !== 'POST') {
        throw new Error()
    }
    let postData = await parsePostData( ctx )
    const {target, user, content} = postData
    let [err, result] = await sdk.sendComment({
        'targetId': target,
        'userId': user,
        content,
        createdTime: Date.now(),
        updatedTime: Date.now(),
        extra: {
            nickname: 'woca',
            sex: 'male'
        }
    })
    if (err) {
        ctx.body = err
        return;
    }
    ctx.body = result;
}

const deleteById = async (ctx) => {
    const {query} = ctx
    let [err, result] = await sdk.deleteCommentById(query.id)
    if (err) {
        ctx.body = err;
        return;
    }
    ctx.body = result.data;
}

const deleteByUser = async (ctx) => {
    const {query} = ctx
    let [err, result] = await sdk.deleteCommentsByUser(query.userId)
    if (err) {
        ctx.body = err;
        return;
    }
    ctx.body = result.data;
}


const deleteByTarget = async (ctx) => {
    const {query} = ctx
    let [err, result] = await sdk.deleteCommentsByTarget(query.targetId)
    if (err) {
        ctx.body = err;
        return;
    }
    ctx.body = result.data;
}


const getById = async (ctx) => {
    let [err, result] = await sdk.getCommentById(ctx.query.id)
    if (err) {
        ctx.body = err;
        return;
    }
    ctx.body = result.data;
}


const getByUser = async (ctx) => {
    const {query} = ctx
    let [err, result] = await sdk.getCommentByUser(query.userId)
    if (err) {
        ctx.body = err;
        return;
    }
    ctx.body = result.data;
}


const getByTarget = async (ctx) => {
    const {query} = ctx
    let [err, result] = await sdk.getCommentByTarget(query.targetId)
    if (err) {
        ctx.body = err;
        return;
    }
    ctx.body = result.data;
}


const updateExtra = async (ctx) => {
    let [err, result] = await sdk.updateExtra({
        'targetId': '2323',
        'userId': 'fuckfuck',
        content: 'test eeste test',
        createdTime: Date.now(),
        updatedTime: Date.now(),
        extra: {
            nickname: 'woca',
            sex: 'male'
        }
    })
    if (err) {
        ctx.body = err;
        return;
    }
    ctx.body = result.data;
}

const setExtra = async (ctx) => {
    let [err, result] = await sdk.setExtra({
        'targetId': '2323',
        'userId': 'fuckfuck',
        content: 'test eeste test',
        createdTime: Date.now(),
        updatedTime: Date.now()
    })
    if (err) {
        ctx.body = err;
        return;
    }
    ctx.body = result.data;
}

app.use(static(path.join(__dirname, '../static')))


app.use( async ( ctx ) => {
    const {url} = ctx;
    switch(urlHanlder(url)) {
        case 'send':
        await send(ctx);
        break;
        case 'deleteById':
        await deleteById(ctx);
        break;
        case 'deleteByUser':
        await deleteByUser(ctx);
        break;
        case 'deleteByTarget':
        await deleteByTarget(ctx);
        break;
        case 'getById':
        await getById(ctx);
        break;
        case 'getByUser':
        await getByUser(ctx);
        break;
        case 'getByTarget':
        await getByTarget(ctx);
        break;
        case 'updateExtra':
        await updateExtra(ctx);
        break;
        case 'setExtra':
        await setExtra(ctx);
        break;
        default:
        console.log('default');
    }

})

app.listen(9999)
console.log('[demo] start-quick is starting at port 9999')