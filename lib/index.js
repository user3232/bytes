import byteSize from 'byte-size';
/**
 * Default units system for kB's.
 */
export const defaultMetricBytesUnits = [
    { from: 0, to: 1e3, unit: 'B', long: 'bytes' },
    { from: 1e3, to: 1e6, unit: 'kB', long: 'kilobytes' },
    { from: 1e6, to: 1e9, unit: 'MB', long: 'megabytes' },
    { from: 1e9, to: 1e12, unit: 'GB', long: 'gigabytes' },
    { from: 1e12, to: 1e15, unit: 'TB', long: 'terabytes' },
    { from: 1e15, to: 1e18, unit: 'PB', long: 'petabytes' },
    { from: 1e18, to: 1e21, unit: 'EB', long: 'exabytes' },
    { from: 1e21, to: 1e24, unit: 'ZB', long: 'zettabytes' },
    { from: 1e24, to: 1e27, unit: 'YB', long: 'yottabytes' }
];
/**
 * Default units system for kiB's.
 */
export const defaultIecBytesUnits = [
    { from: 0, to: Math.pow(1024, 1), unit: 'B', long: 'bytes' },
    { from: Math.pow(1024, 1), to: Math.pow(1024, 2), unit: 'KiB', long: 'kibibytes' },
    { from: Math.pow(1024, 2), to: Math.pow(1024, 3), unit: 'MiB', long: 'mebibytes' },
    { from: Math.pow(1024, 3), to: Math.pow(1024, 4), unit: 'GiB', long: 'gibibytes' },
    { from: Math.pow(1024, 4), to: Math.pow(1024, 5), unit: 'TiB', long: 'tebibytes' },
    { from: Math.pow(1024, 5), to: Math.pow(1024, 6), unit: 'PiB', long: 'pebibytes' },
    { from: Math.pow(1024, 6), to: Math.pow(1024, 7), unit: 'EiB', long: 'exbibytes' },
    { from: Math.pow(1024, 7), to: Math.pow(1024, 8), unit: 'ZiB', long: 'zebibytes' },
    { from: Math.pow(1024, 8), to: Math.pow(1024, 9), unit: 'YiB', long: 'yobibytes' }
];
/**
 * Default units systems.
 */
export const defaultBytesUnits = {
    metric: defaultMetricBytesUnits,
    iec: defaultIecBytesUnits,
};
export function numberInUnits(bytes, options) {
    return byteSize(bytes, {
        units: 'iec',
        customUnits: defaultBytesUnits,
        // provided options will override
        ...options
    });
}
//# sourceMappingURL=index.js.map