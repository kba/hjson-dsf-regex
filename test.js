const tap = require('tap-only')
tap.test = tap
const {inspect} = require('util')
const HJSON = require('hjson')
const regexDsfFactory = require('.')

tap.test('parse / stringify', (t) => {
    const expected = {
        '/foo/':  /foo/,
        '/foo/i':  /foo/i,
        '/foo bar/i':  /foo bar/i,
        '/one/two/i':  /one\/two/i,
        '/one/im':  /one/im,
        '/one/i/i':  /one\/i/i,
    }
    const regexDsf = regexDsfFactory()
    Object.keys(expected).forEach(hjson => {
        const actual = regexDsf.parse(hjson)
        const wanted = expected[hjson]
        t.deepEquals(actual, wanted, `parse '${hjson}' -> ${wanted} ` +
            `(${wanted.constructor.name}/${actual.constructor.name})`)
        const stringified = regexDsf.stringify(actual)
        t.deepEquals(stringified, hjson, `stringify '${stringified}' -> ${hjson}`)
    })
    t.end()
})

tap.test('hjson.parse', (t) => {
    const expected = {
        '/foo/':  /foo/,
        '/foo/i':  /foo/i,
        '/foo bar/i':  /foo bar/i,
        '/one\/two/i':  /one\/two/i,
        'x: /foo/': {x: /foo/},
        'x: /foo/i': {x: /foo/i},
    }
    const regexDsf = regexDsfFactory()
    const hjsonOptions = {
        dsf: [regexDsf]
    }
    Object.keys(expected).forEach(hjson => {
        const actual = HJSON.parse(hjson, hjsonOptions)
        const wanted = expected[hjson]
        t.deepEquals(actual, wanted, `'${hjson}' -> ${inspect(wanted)}`)
    })
    t.end()
})
