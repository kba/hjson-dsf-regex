# HJSON Regex DSF
Parse slash-delimited regexes as RegExp

## Usage

```js
const util = require('util')
const hjson = require('hjson')
const regexDsf = require('hjson-dsf-regex')
const data = `myre: /^\\d+/`
const parsed = hjson.parse(data, {dsf:[regexDsf()]})
console.log(util.inspect(parsed)) // -> { myre: /^\d+/ }
```
