const crypto = require('crypto');
const fs = require('fs');
// 签名算法
const signAlgorithm = 'RSA-SHA1';
// 数据的加密算法
const encryptAlgorithm = 'RSA-SHA1';
const pubKey = fs.readFileSync('./pub.key.pem', 'utf-8');
// const pubKey = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyFhUjRgCN5MtE+5DnPmWM+ZNl
// 5a30zFMKkC7jQ1ROw1zeIMAVMBdikDVknwQrVz2fsvq8AT/8l24SSCGpcpVpp+cF
// JQ4YIfRbifXIzuBd2H6pEus2mNL78OFfoRqfSHkrUoawP1nc1JB6TGGhxdfoMbVm
// PlUdSpKtD68kNyblMwIDAQAB
// -----END PUBLIC KEY-----`

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
 * 生成签名
 * @param {string} alg 签名算法
 * @param {string} key 公钥
 * @param {string} data 数据
 */
const signer= (alg, key, data) => {
    let sign = crypto.createSign(alg);
    sign.update(data);
    const sig = sign.sign(key, 'hex');
    return sig;
}

/**
 * 
 * @param {string} alg 算法
 * @param {pub} pub 秘钥
 * @param {string} sig 签名
 * @param {string} data 数据
 */
const verifier = (alg, pub, sig, data) => {
    const verify = crypto.createVerify(alg);
    verify.update(data);
    return verify.verify(pub, sig, 'hex');
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

// 生成签名 校验是否是可信赖的平台发起的请求
exports.genSignature = (data, secret) => {
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
    const rtStr = 'secret' + propStr + secret;
    // 签名
    return signer(signAlgorithm, pubKey, rtStr);
}

// 对数据部分使用公钥进行加密 防止数据泄露
exports.encryptData = function encrypt(data) {
    // 基本数据类型
    if (typeof data !== 'object') {
        return signer(encryptAlgorithm, pubKey, data);
    } else {
        // 对象则对值进行加密
        const keys = Object.keys(data);
        if (!keys.length) {
            keys.reduce((tar, key) => {
                tar[key] = encrypt(tar[key]);
                return data;
            }, data);
            return data;
        }
        return data;
    }
}