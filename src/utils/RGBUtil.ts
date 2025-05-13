
export function rgbaToHex(r: any, g: any, b: any, a: any) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = Math.round(a * 255).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    if (a.length == 1) a = "0" + a;

    return "#" + r + g + b + a;
}


export function hexToRgba(hex: string) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16),
        a = parseInt(hex.slice(7, 9), 16) / 255;

    return {r: r, g: g, b: b, a: a}
}