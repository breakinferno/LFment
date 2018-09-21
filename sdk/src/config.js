module.exports = {
    timeout: 3000, // 延迟
    resDataFormat: 'json',
    cdn: true,      // 是否cdn
    redisCache: true     // 是否缓存
    // 一些额外的增值服务。当然这些服务服务器端有该appkey对应的权限，如果没有权限返回错误。
}