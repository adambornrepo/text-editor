// utils/colorPalette.js
export const colors = [
    // Black/Grays
    "#000000", "#434343", "#999999", "#efefef",
    // Reds
    "#980000", "#ff0000", "#ea9999", "#f4cccc",
    // Yellows
    "#ff9900", "#ffff00", "#ffe599", "#fff2cc",
    // Greens
    "#00ff00", "#b6d7a8", "#d9ead3", "#e6efdb",
    // Blues
    "#0000ff", "#4a86e8", "#9fc5e8", "#c9daf8",
    // Purples
    "#9900ff", "#b4a7d6", "#d9d2e9", "#ead1dc",
];

export const isValidColor = (color) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== "";
};
