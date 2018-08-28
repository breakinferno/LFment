const Koa = require('koa')
const app = new Koa()
const SDK = require('../sdk/index')
console.log(SDK);
// const axios = require('axios');
const sdk = new SDK('key', 'secret');

const urlHanlder = (url) => {
    return url === '/' ? 'send' : url.slice(1);
}

const send = async (ctx) => {
    let [err, result] = await sdk.sendComment({
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

const deleteById = async (ctx) => {
    let [err, result] = await sdk.sendComment({
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

const deleteByUser = async (ctx) => {
    let [err, result] = await sdk.sendComment({
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


const deleteByTarget = async (ctx) => {
    let [err, result] = await sdk.sendComment({
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


const getById = async (ctx) => {
    let [err, result] = await sdk.sendComment({
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


const getByUser = async (ctx) => {
    let [err, result] = await sdk.sendComment({
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


const getByTarget = async (ctx) => {
    let [err, result] = await sdk.sendComment({
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


const updateExtra = async (ctx) => {
    let [err, result] = await sdk.sendComment({
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

const setExtra = async (ctx) => {
    let [err, result] = await sdk.sendComment({
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



app.use( async ( ctx ) => {
    console.log('mdzz')
    const {url} = ctx;
    // 路径如下
    // send

    // deleteById

    // deleteByUser

    // deleteByTarget

    // getById

    // getByUser

    // getByTarget

    // updateExtra

    // setExtra
    
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