const _ = require('lodash')

const items = [1,[2,[3, [4]]]]

const flatItems = _.flatMapDeep(items)

console.log(flatItems)