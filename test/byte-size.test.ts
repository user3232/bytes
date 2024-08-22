import { numberInUnits } from '../src/index.js'



console.log(numberInUnits(0xffff, {units: 'metric', locale: 'de-DE'}))
console.log(numberInUnits(0xffff, {units: 'metric', locale: 'en'}))
console.log(numberInUnits(0xffff, {units: 'metric_octet'}))
console.log(numberInUnits(0xffff, {units: 'iec'}))
console.log(numberInUnits(0xffff, {units: 'iec_octet'}))


console.log(numberInUnits(0xffff, {
    units: 'metric', 
    toStringFn: function() {
        return `${this.value} ${this.unit}`
    }
}))

const customUnitsExample = {
    simple: [
      { from: 0, to: 1e3, unit: '' },
      { from: 1e3, to: 1e6, unit: 'k' },
      { from: 1e6, to: 1e9, unit: 'm' },
      { from: 1e9, to: 1e12, unit: 'bn' },
    ],
    complicated: [],
}

console.log(numberInUnits(0xffff, {units: 'iec', customUnits: customUnitsExample}))
console.log(numberInUnits(0xffff, {units: 'simple', customUnits: customUnitsExample}))
console.log(numberInUnits(0xffff, {units: 'complicated', customUnits: customUnitsExample}))

console.log(numberInUnits(0xffff, {units: 'iec'}))
console.log(numberInUnits(0xffff, {units: 'metric', precision: 2}))


