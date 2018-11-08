export class BaseController {
  getSort (options) {
    options = options.split(',')
    let sortObj: Object
    options.map(item => {
      let field = item.startsWith('-') || item.startsWith('+') ? item.substring(1) : item
      sortObj[field] = item.startsWith('-') ? 'desc' : 'asc'
    })
    return sortObj
  }
  paginate ({ count, page, size }) {
    return {
      page: +page,
      size: +size,
      row_count: count,
      page_count: Math.ceil(count / size)
    }
  }
}
