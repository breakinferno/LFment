export const checktype = (target, dist) => {
    const dists = dist.split('|');
    return dists.map(d => d.trim()).some(d => {
        return ({}).toString.call(target).slice(8, -1).toUpperCase() === d.toUpperCase();
    })

}

export const getType = (target) => {
    return ({}).toString.call(target).slice(8, -1).toLowerCase();
}