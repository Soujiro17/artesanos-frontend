/* eslint-disable no-undef */
/* eslint-disable space-before-blocks */
export const toFormData = (dic) => {
  const data = new FormData()

  Object.keys(dic).map((el) => {
    if (typeof dic[el] === 'object' && dic === 'redes_sociales'){
      return data.append(el, JSON.stringify(dic[el]))
    }
    return data.append(el, dic[el])
  })

  return data
}
