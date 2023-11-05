function suma([a, ...b]) {
    if (typeof a !== 'number') return NaN;
    return b.reduce((a, b) => a + b, a);
}
 
export default suma;