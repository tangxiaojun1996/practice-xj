/* eslint-disable no-restricted-globals */

const workercode = () => {

  self.importScripts("https://cdn.bootcdn.net/ajax/libs/spark-md5/3.0.0/spark-md5.min.js");

  // 生成文件 hash
  self.onmessage = e => {
    const { fileChunkList } = e.data;
    const spark = new self.SparkMD5.ArrayBuffer();
    let percentage = 0;
    let count = 0;
    const loadNext = index => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileChunkList[index].file);
      reader.onload = e => {
        count++;
        spark.append(e.target.result);
        if (count === fileChunkList.length) {
          self.postMessage({
            percentage: 100,
            hash: spark.end()
          });
          self.close();
        } else {
          percentage += 100 / fileChunkList.length;
          self.postMessage({
            percentage
          });
          // 递归计算下一个切片
          loadNext(count);
        }
      };
    };
    loadNext(0);
  };
}

let code = workercode.toString()
code = code.substring(code.indexOf('{')+1, code.lastIndexOf('}'))

const blob = new Blob([code], {type: 'application/javascript'})

const workerScript =  URL.createObjectURL(blob)

export default workerScript

