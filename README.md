# @user3232/bytes

Format number with sizes, e.g. in kB's or KiB's
or with simple (ranges) rules.

Quickly check the number "size" with CLI app.

Package is based on [NPM byte-size](https://www.npmjs.com/package/byte-size)
which it extends with TypeScript documentation and CLI tool.

## Install


``` sh
npm i --save-dev user3232/bytes#semver:latest
npm i --save-dev @user3232/bytes@user3232/bytes#semver:latest
npm i --save-dev @user3232/bytes@git+https://github.com/user3232/bytes.git#semver:latest
```

## Use CLI

```sh
# display help
$ npx bytes 
$ npx bytes --help
# formats number(s)
$ npx bytes 0xffff 
64 KiB
$ npx bytes 0xffff 65535
64 KiB
64 KiB
# formats number(s) in metric units
$ npx bytes --units metric 0xffff 65535
65,5 kB
65,5 kB
# formats number(s) with precision and locales
$ npx bytes --locale en --precision 3 --units metric 0xffff
65.535 kB
```

## Use Api 


```ts
import { numberInUnits } from '@user3232/byte-size-cli'

// 
// just check the number
// 

console.log(numberInUnits(0xffff))
// ByteSize { value: '65,54', unit: 'kB', long: 'kilobytes' }


// 
// choose metric units:
// 

console.log(numberInUnits(0xffff, {units: 'iec'}))
// ByteSize { value: '65,54', unit: 'kB', long: 'kilobytes' }


// 
// provide you own units systems
// 

const customUnitsExample = {
    simple: [
        { from: 0, to: 1e3, unit: '' },
        { from: 1e3, to: 1e6, unit: 'k' },
        { from: 1e6, to: 1e9, unit: 'm' },
        { from: 1e9, to: 1e12, unit: 'bn' },
    ],
    complicated: [],
}

console.log(numberInUnits(0xffff, {
    units: 'simple', 
    customUnits: customUnitsExample})
)
// ByteSize { value: '65,5', unit: 'k', long: undefined }

console.log(numberInUnits(0xffff, {
    units: 'complicated', 
    customUnits: customUnitsExample})
)
// ByteSize { value: '65535', unit: '', long: '' }

```

## Documentation and examples

Package is written in TypeScript, for doc and examps
import package in VS Code and hover on types and functions.

