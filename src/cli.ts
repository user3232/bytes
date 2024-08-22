#!/usr/bin/env node

import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { numberInUnits } from './index.js'


kiloBytesCli()

function kiloBytesCli(
    argv?: string[]
) {
    const {_unknown, units, number, help, precision, locale} = commandLineArgs(
        [
            { 
                name: 'number', 
                type: Number,
                defaultOption: true,
                lazyMultiple: true,
            },
            { 
                name: 'help', 
                alias: 'h',
                type: Boolean,
                defaultValue: false,
            },
            { 
                name: 'units', 
                alias: 'u',
                type: String,
                defaultValue: 'iec',
            },
            {
                name: 'precision',
                alias: 'p',
                type: Number,
                defaultValue: 1,
            },
            {
                name: 'locale',
                alias: 'l',
                type: String,
                lazyMultiple: true,
            }
        ], 
        {
            stopAtFirstUnknown: true,
            partial: true,
            argv,
        }
    ) as {
        _unknown?: string[],
        number?: number[],
        help: boolean,
        units: string,
        precision: number,
        locale?: string[],
    }

    const clu = commandLineUsage([
        {
            header: 'kilobytes',
            content: 'Fromats number in KiB, MiB and similar',        
        },
        {
            header: 'Synopsis',
            content: [
                '$ kilobytes ',
                '$ kilobytes {bold --help}',
                '$ kilobytes [{bold --units}] [{bold --precision}] [{bold --locale}]* [{bold --number}] {underline number} [[{bold --number}] <number>]*',
            ]
        },
        {
            header: 'Examples',
            content: [
                {
                    desc: 'Display help',
                    example: '$ kilobytes'
                },
                {
                    desc: 'Display help',
                    example: '$ kilobytes --help'
                },
                {
                    desc: 'Format number',
                    example: '$ kilobytes 0xffff'
                },
                {
                    desc: 'Format number',
                    example: '$ kilobytes 65535'
                },
                {
                    desc: 'Format numbers',
                    example: '$ kilobytes 0xffff 65535'
                },
                {
                    desc: 'Format number in metric system',
                    example: '$ kilobytes --unit metric 0xffff'
                },
                {
                    desc: 'Format number in metric system with precision and locales',
                    example: '$ kilobytes --unit metric --precision 2 --locale en 0xffff'
                },
            ]
        },
        {
            header: 'Options',
            optionList: [
                { 
                    name: 'number', 
                    type: Number,
                    defaultOption: true,
                    lazyMultiple: true,
                    description: 'Number(s) to format.',
                },
                {
                    name: 'help',
                    alias: 'h',
                    defaultValue: false,
                    type: Boolean,
                    description: 'Optional, if present displays help and exit.',
                },
                {
                    name: 'units',
                    alias: 'u',
                    defaultValue: 'iec',
                    type: Boolean,
                    description: 
`Optional, formatting table to use: 'iec' for KiB (base 1024) \
or 'metric' for KB\'s (base 1000). \
Default is 'iec'.`,
                },
                {
                    name: 'precision',
                    alias: 'p',
                    type: Number,
                    defaultValue: 1,
                    description: 'How many digits show after decimal point',
                },
                {
                    name: 'locale',
                    alias: 'l',
                    type: String,
                    lazyMultiple: true,
                    description: 
`Optional, locales string to pass to Intl. \
for decimal point formating, e.g. "en" "de". \
may be multiple.`,
                }
            ],
        },
        
    ])

    if(help) {
        console.log(clu)
        return
    }

    if(number === undefined || number.length === 0) {
        console.log(clu)
        return
    }

    if(!(units === 'iec' || units === 'metric')) {
        console.log('--units must be "iec" (default) or "metric".')
        return
    }




    for( const n of number) {
        const {value, unit} = numberInUnits(n, {
            units: units,
            precision: precision,
            locale
        })
        console.log(`${value} ${unit}`)
    }

    return
}