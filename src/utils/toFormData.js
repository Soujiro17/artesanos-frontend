/* eslint-disable no-undef */
/* eslint-disable space-before-blocks */
export const toFormData = (dic) => {
  const data = new FormData()

  Object.keys(dic).map((el) => {
    return data.append(el, dic[el])
  })

  return data
}
