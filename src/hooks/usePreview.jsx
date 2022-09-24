import { useEffect, useState } from 'react'

const usePreview = (file) => {
  const [preview, setPreview] = useState('')

  const getBase64 = (file) => {
    if (/https|http/gi.test(file)) return setPreview(file)
    if (!file) return setPreview('')

    const firstFile = file[0]

    // eslint-disable-next-line no-undef
    const reader = new FileReader()
    reader.readAsDataURL(firstFile)
    reader.onload = function () {
      setPreview(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  useEffect(() => {
    getBase64(file)
  }, [file])

  return preview
}

export default usePreview
