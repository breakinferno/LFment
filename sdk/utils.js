exports.checktype = (target, dist) => {
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