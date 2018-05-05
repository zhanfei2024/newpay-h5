const slice = value => {
    if (!value) return ''
    value = value.toString()
    if (value.length > 8) {
        return value.slice(0, 8)
    } else {
        return value
    }
}

const cny = (value, semi)  => {
    let n = semi >= 0 && semi <= 20 ? semi : 2;
    let s = parseInt(value, 10) + '';
    if (n > 0) {
        s = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
    }
    let l = s.split('.')[0].split('').reverse();
    let r = n > 0 ? '.' + s.split('.')[1] : '';
    let t = '';
    for (let i = 0; i < l.length; i++) {
        if (i == 2 && l[3] == '-') { t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? '' : ''); continue; }
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + r || 　0.00;
}

const wan = value => {
    let val = Number(value) / 10000 || 　0
    return val + '万'
}


export default {
    slice,
    cny,
    wan
}