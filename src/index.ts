import byteSize, {ByteSizeOptions, ByteSizeResult} from 'byte-size'

/**
 * Basic [Multiple-Byte Units](https://en.wikipedia.org/wiki/Byte#Multiple-byte_units)
 * names of {@link defaultBytesUnits}:
 * * `metric` uses 1000 as base ({@link defaultMetricBytesUnits}),
 * * `iec` uses 1024 as base ({@link defaultIecBytesUnits}).
 */
export type BaseUnits = 
    | 'metric' 
    | 'iec'


/**
 * Custom unit:
 * * range of numbers
 * * and name
 */
export type CustomUnit = {
    /** Number lower bound for this label. */
    from: number,
    /** Number upper bound for this label. */
    to: number,
    /** Number range label. */
    unit: string,
    /** Number range long label. */
    long?: string
}


/**
 * Set of units systems.
 */
export type CustomUnits<K extends string> = {
    [key in K]: CustomUnit[]
}

/**
 * Helper type to get {@link CustomUnits} type.
 */
export type AsCustomUnits<T> = T extends CustomUnits<infer K> ? CustomUnits<K> : never


/**
 * Default units system for kB's.
 */
export const defaultMetricBytesUnits: CustomUnit[] = [
    { from: 0,      to: 1e3,    unit: 'B',  long: 'bytes' },
    { from: 1e3,    to: 1e6,    unit: 'kB', long: 'kilobytes' },
    { from: 1e6,    to: 1e9,    unit: 'MB', long: 'megabytes' },
    { from: 1e9,    to: 1e12,   unit: 'GB', long: 'gigabytes' },
    { from: 1e12,   to: 1e15,   unit: 'TB', long: 'terabytes' },
    { from: 1e15,   to: 1e18,   unit: 'PB', long: 'petabytes' },
    { from: 1e18,   to: 1e21,   unit: 'EB', long: 'exabytes' },
    { from: 1e21,   to: 1e24,   unit: 'ZB', long: 'zettabytes' },
    { from: 1e24,   to: 1e27,   unit: 'YB', long: 'yottabytes' }
]

/**
 * Default units system for kiB's.
 */
export const defaultIecBytesUnits: CustomUnit[] = [
    { from: 0,                  to: Math.pow(1024, 1), unit: 'B',   long: 'bytes' },
    { from: Math.pow(1024, 1),  to: Math.pow(1024, 2), unit: 'KiB', long: 'kibibytes' },
    { from: Math.pow(1024, 2),  to: Math.pow(1024, 3), unit: 'MiB', long: 'mebibytes' },
    { from: Math.pow(1024, 3),  to: Math.pow(1024, 4), unit: 'GiB', long: 'gibibytes' },
    { from: Math.pow(1024, 4),  to: Math.pow(1024, 5), unit: 'TiB', long: 'tebibytes' },
    { from: Math.pow(1024, 5),  to: Math.pow(1024, 6), unit: 'PiB', long: 'pebibytes' },
    { from: Math.pow(1024, 6),  to: Math.pow(1024, 7), unit: 'EiB', long: 'exbibytes' },
    { from: Math.pow(1024, 7),  to: Math.pow(1024, 8), unit: 'ZiB', long: 'zebibytes' },
    { from: Math.pow(1024, 8),  to: Math.pow(1024, 9), unit: 'YiB', long: 'yobibytes' }
]

/**
 * Default units systems.
 */
export const defaultBytesUnits: CustomUnits<'metric' | 'iec'> = {
    metric: defaultMetricBytesUnits,
    iec:    defaultIecBytesUnits,
}



/**
 * Formats number to best matching size.
 * 
 * ```ts
 * console.log(numberInUnits(0xffff, {units: 'iec'}))
 * // ByteSize { value: '64', unit: 'KiB', long: 'kibibytes' }
 * ```
 */
export function numberInUnits(
    /**
     * Number to format.
     */
    bytes: number, 
    options?: {
        /**
         * Numbers of digits after `.` dot. Default is `1`.
         * 
         * ```ts
         * console.log(numberInUnits(0xffff, {units: 'iec'}))
         * // ByteSize { value: '65,54', unit: 'kB', long: 'kilobytes' }
         * ```
         */
        precision?: number,
        /**
         * Units system choosen. Default is `iec`.
         * 
         * ```ts
         * console.log(numberInUnits(0xffff, {units: 'iec'}))
         * // ByteSize { value: '64', unit: 'KiB', long: 'kibibytes' }
         * ```
         */
        units?: BaseUnits,
        /**
         * Locales to pass to {@link Intl.NumberFormat}. 
         * 
         * ```ts
         * console.log(byteSize(0xffff, {units: 'metric', locale: 'de'}))
         * // ByteSize { value: '65,5', unit: 'kB', long: 'kilobytes' }
         * 
         * console.log(byteSize(0xffff, {units: 'metric', locale: 'en'}))
         * // ByteSize { value: '65.5', unit: 'kB', long: 'kilobytes' }
         * ```
         */
        locale?: string | string[],
    }
): ByteSizeResult
/**
 * Formats number to best matching size.
 * 
 * ```ts
 * console.log(numberInUnits(0xffff, {units: 'iec'}))
 * // ByteSize { value: '64', unit: 'KiB', long: 'kibibytes' }
 * ```
 */
export function numberInUnits<
    /**
     * Selected unit
     */
    U extends K | BaseUnits, 
    /**
     * Additional units system keys.
     */
    K extends string,
>(
    /**
     * Number to format.
     */
    bytes: number, 
    /**
     * Format options. Defaults are:
     * * `precision`: `1` - digit after decimal point,
     * * `units`: `iec` - KiB, MiB, etc. (base 1024),
     */
    options?: {
        /**
         * Numbers of digits after `.` dot. Default is `1`.
         * 
         * ```ts
         * console.log(numberInUnits(0xffff, {units: 'iec'}))
         * // ByteSize { value: '65,54', unit: 'kB', long: 'kilobytes' }
         * ```
         */
        precision?: number,
        /**
         * Units system choosen. Default is `iec`.
         * 
         * ```ts
         * console.log(numberInUnits(0xffff, {units: 'iec'}))
         * // ByteSize { value: '64', unit: 'KiB', long: 'kibibytes' }
         * ```
         */
        units?: U | BaseUnits,
        /**
         * Additional/overwriting units systems.
         * 
         * 
         * ```ts
         * const customUnitsExample = {
         *     simple: [
         *         { from: 0, to: 1e3, unit: '' },
         *         { from: 1e3, to: 1e6, unit: 'k' },
         *         { from: 1e6, to: 1e9, unit: 'm' },
         *         { from: 1e9, to: 1e12, unit: 'bn' },
         *     ],
         *     complicated: [],
         * }
         * console.log(numberInUnits(0xffff, {
         *     units: 'simple', 
         *     customUnits: customUnitsExample})
         * )
         * // ByteSize { value: '65,5', unit: 'k', long: undefined }
         * console.log(numberInUnits(0xffff, {
         *     units: 'complicated', 
         *     customUnits: customUnitsExample})
         * )
         * // ByteSize { value: '65535', unit: '', long: '' }
         * ```
         */
        customUnits?: CustomUnits<K>,
        /**
         * Function to provide as {@link ByteSizeResult.toString}.
         * **Does not work!**
         * 
         * ```ts
         * console.log(numberInUnits(0xffff, {
         *     units: 'metric', 
         *     toStringFn: function() {
         *         return `${this.value} ${this.unit}`
         *     }
         * }))
         * // ByteSize { value: '65,5', unit: 'kB', long: 'kilobytes' }
         * ```
         */
        toStringFn?: (
            /**
             * {@link numberInUnits} formatting result.
             */
            this: ByteSizeResult
        ) => string,
        /**
         * Locales to pass to {@link Intl.NumberFormat}. 
         * 
         * ```ts
         * console.log(byteSize(0xffff, {units: 'metric', locale: 'de'}))
         * // ByteSize { value: '65,5', unit: 'kB', long: 'kilobytes' }
         * 
         * console.log(byteSize(0xffff, {units: 'metric', locale: 'en'}))
         * // ByteSize { value: '65.5', unit: 'kB', long: 'kilobytes' }
         * ```
         */
        locale?: string | string[],
    }
): ByteSizeResult
export function numberInUnits(
    bytes: number, 
    options?: {
        precision?: number,
        units?: string,
        customUnits?: CustomUnits<string>,
        toStringFn?: () => string,
        locale?: string | string[],
    }
) {
    return byteSize(bytes, {
        units: 'iec', 
        customUnits: defaultBytesUnits, 
        // provided options will override
        ...options
    })
}


