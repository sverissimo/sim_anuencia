const formatMun = (municipio) => {
    if (municipio) {
        return municipio.split(' ').map(([h, ...t]) => h.toUpperCase() + t.join('').toLowerCase())
        .join(' ')
        .replace(' Da', ' da')
        .replace(' De ', ' de ')        
        .replace(/-mg|\/mg|, mg| - mg| -mg|,mg| \/ mg| \/mg/gi, '')        
    }
    return municipio
}

module.exports = { formatMun }