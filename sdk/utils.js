const crypto = require('crypto')
// 签名算法
const signAlgorithm = 'RSA-SHA1';

// 数据的加密算法


exports.checkType = (target, dist) => {
    const dists = dist.split('|');
    return dists.map(d => d.trim()).some(d => {
        return ({}).toString.call(target).slice(8, -1).toUpperCase() === d.toUpperCase();
    })

}

exports.getType = (target) => {
    return ({}).toString.call(target).slice(8, -1).toLowerCase();
}

exports.logger = (msg) => {
    if (typeof msg === 'object') {
        console.log('[LFment Service logged:]\n');
        console.log(msg);
    } else {
        console.log('[LFment Service logged:]' + msg);
    }
}


const sortKeys = (obj) => {
    return obj && Object.keys(obj).sort();
}

/**
 * 
 * @param {any} data 数据
 * @param {string} secret appsecret
 */
const genSigString = (data, secret) => {
    const sKeys = sortKeys(data);
    // 参数的字符串
    const propStr = sKeys.reduce((str, key) => {
        str += ''+key;
        // str += ''+data[key]
        if (typeof data[key] === 'object') {
            str += JSON.stringify(data[key]);
        } else {
            str += '' + data[key];
        }
        return str;
    }, '');
    // 头尾分别追加secret键值对
    return 'secret' + propStr + secret;
}

// 生成签名 校验是否是可信赖的平台发起的请求
const signer = (data, secret) => {
    // 额外的信息
    data.version = '1.0';
    data.format = 'json';
    const rtStr = genSigString(data, secret);
    // 签名
    return genSignature(rtStr);
}

/**
 * 就简单生成对应算法的签名
 * @param {string} alg 签名算法
 * @param {string} key 公钥
 * @param {string} data 数据
 */
const genSignature= (data, alg = 'md5') => {
    let sign = crypto.createHash(alg);
    sign.update(data);
    return sign.digest('hex')
}

/**
 * 就简单的对签名进行校验
 * @param {string} alg 算法
 * @param {string} sig 签名
 * @param {string} secret 秘钥
 * @param {string} data 实体数据
 */
const verifier = (data, sig, secret, alg = 'md5') => {
    const signature = signer(data, secret);
    return sig === signature
    // return sig === genSignature(data, alg)
}

/**
 * 加盐
 * @param {string} salt 盐
 * @param {string} secret 加盐串
 * @param {string} alg 加盐算法
 */
const salt = (salt, secret, alg) => {
    const saltAlg = crypto.createHash(alg);
    return saltAlg.update(salt + secret + salt).digest('hex');
}

// // 对数据部分使用公钥进行加密 防止数据泄露
// exports.encryptDataPublic = function (data) {
//     return pubKEY.encrypt(data, 'base64', 'utf-8')
// }

/**
 * 加密数据
 * @param {NodeRSA} key 加密对象
 * @param {any} data 加密数据   
 */
exports.encryptData = function rencrypt(key, data) {
    if (typeof data === 'object') {
        let rt = {}
        Object.keys(data).forEach(k => {
            rt[k] = rencrypt(key, data[k])
        })
        return rt
    }
    return key.encrypt(data, 'base64', 'utf-8');
}

exports.verifier = verifier

exports.signer = signer