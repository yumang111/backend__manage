export default function uploadFile(url, files) { // 文件对象
  return new Promise((resolve, reject) => {
    const f = new FormData()
    Object.keys(files).forEach(key => {
      f.append('file', files[key])
    })
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status == 200) {
        let res = JSON.parse(xhr.responseText)
        resolve(res)
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        reject()
      }
    }
    xhr.send(f)
  })
}
