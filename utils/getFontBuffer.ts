export const getFontBuffer = (fontB64: string) => {
    const fontBuffer = Uint8Array.from(atob(fontB64), (c) => c.charCodeAt(0));

    return fontBuffer;
};
