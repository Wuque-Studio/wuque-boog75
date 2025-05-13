// Formats an 8-bit integer |value| in hexadecimal with leading zeros.
export function hex8(value: number) {
    return `00${value.toString(16)}`.substr(-2).toUpperCase();
};

// Formats a 16-bit integer |value| in hexadecimal with leading zeros.
export function hex16(value: number) {
    return `0000${value.toString(16)}`.substr(-4).toUpperCase();
};

export function parseHexArray(text: string) {
    // Remove non-hex characters.
    text = text.replace(/[^0-9a-fA-F]/g, '');
    if (text.length % 2)
        return null;

    // Parse each character pair as a hex byte value.
    let u8 = new Uint8Array(text.length / 2);
    for (let i = 0; i < text.length; i += 2)
        u8[i / 2] = parseInt(text.substr(i, 2), 16);

    return new DataView(u8.buffer);
};