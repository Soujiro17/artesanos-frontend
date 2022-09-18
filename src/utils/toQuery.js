export const toQuery = (dic) => {
  let query = ''

  Object.keys(dic).map(value => {
    query = query + `&${value}=${dic[value]}`
    return null
  })

  return query
}
