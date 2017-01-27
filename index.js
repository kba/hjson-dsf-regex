const RE_FLAGS = ['g', 'i', 'm', 'u', 'y']
const RE_EXPR = new RegExp(
    `^\\/(.*?)\\/([${RE_FLAGS.join('')}]{0,${RE_FLAGS.length}})$`
)

class HjsonRegexDSF {
    static factory(options) { return new HjsonRegexDSF(options) }
    get name() { return 'regex' }
    stringify(value) {
        if (Object.prototype.toString.call(value) === '[object RegExp]') {
            return value.toString().replace('\\/', '/')
        }
    }
    parse(value) {
        if (!(RE_EXPR.test(value))) return
        value.replace(RE_EXPR, (_, re, flags) => {
            // console.log({re, flags})
            value = new(Function.prototype.bind.call(RegExp, null, re, flags))()
        })
        // console.log(value.constructor.name)
        // console.log(value)
        return value
    }
}
HjsonRegexDSF.description = 'Parse regular expressions'

module.exports = HjsonRegexDSF.factory
