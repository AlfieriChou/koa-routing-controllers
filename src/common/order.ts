export function sort (options) {
  options = options.split(',')
  let sortObj: Object
  options.map(item => {
    let field = item.startsWith('-') || item.startsWith('+') ? item.substring(1) : item
    sortObj[field] = item.startsWith('-') ? 'desc' : 'asc'
  })
  return sortObj
}
