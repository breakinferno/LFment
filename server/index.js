const Koa = require('koa')
const app = new Koa()
const SDK = require('../sdk/dist/index').default
console.log(SDK);
const sdk = new SDK('key', 'secret');

app.use( async ( ctx ) => {
    console.log('mdzz')
    let result = sdk.sendComment({
        'targetId': '2323',
        'userId': 'fuckfuck',
        content: 'test eeste test',
        createdTime: Date.now(),
        updatedTime: Date.now()
    });
    result.then(res => {
        ctx.body = res;
    });
})

app.listen(9999)
console.log('[demo] start-quick is starting at port 9999')