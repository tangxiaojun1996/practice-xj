import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { request } from './api'
import workerScript from './js/hash'

const SIZE = 10 * 1024 * 1024; // 切片大小

class App extends React.Component{
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      file: null,
      progress: {
        // filename: {index: percent}
      }
    }
  }

  handleUpload = async (event) => {
    event.preventDefault();
    const file = this.fileInput.current.files[0];
    const fileChunkList = this.createFileChunk(file); // file是Blob对象，可以slice
    const hash = await this.calculateHash(fileChunkList);
    // const { shouldUpload } = await this.verifyUpload(file.name, hash);
    // console.log('shouldUpload',shouldUpload);
    // if (!shouldUpload) {
    //   alert("秒传：上传成功");
    //   return;
    // }
    const data = fileChunkList.map(({ file: chunk }, index) => ({
      fileHash: hash,
      chunk,
      index,
      total: fileChunkList.length,
      hash: hash + "_" + index // 文件名 + 数组下标
    }));
    const chunkPercent = data.reduce((r, { index }) => ({ ...r, [index]: 0 }), {});
    this.setState({ progress: { [hash]: chunkPercent } }, () => {
      console.log('start upload chunkPercent', chunkPercent);
      this.uploadChunks(data, hash);
    });
  }

  handleChange = (e) => {
    const [file] = e.target.files;
    console.log('handleChange file', file, e);
  }

  createFileChunk = (file, size = SIZE) => {
    const fileChunkList = [];
    let cur = 0;
    while (cur < file.size) {
      fileChunkList.push({ file: file.slice(cur, cur + size) });
      cur += size;
    }
    return fileChunkList;
  }

  // 生成文件 hash（web-worker）
  calculateHash(fileChunkList) {
    return new Promise(resolve => {
      // 添加 worker 属性
      const worker = new Worker(workerScript);
      console.log('worker', worker);
      worker.postMessage({ fileChunkList });
      worker.onmessage = e => {
        const { percentage, hash } = e.data;
        console.log('onmessage percentage', percentage);
        // this.hashPercentage = percentage;
        console.log('hash', hash);
        if (hash) {
          resolve(hash);
        }
      };
    });
  }
  
  // 上传切片
  async uploadChunks(data, fileName) {
    const requestList = data.map((item) => {
      const formData = new FormData();
      // { chunk,hash,index }
      Object.keys(item).forEach(key => {
        formData.append([key], item[key]);
      });
      formData.append("filename", fileName);

      return request({
        url: "http://localhost:3001/upload",
        data: formData,
        // todo 更新进度
        onProgress: (e) => {
          const percentage = (e.loaded / e.total) * 100;
          const { progress } = this.state;
          const percentInfo = progress[fileName] || {};
          percentInfo[item.index] = percentage;
          progress[fileName] = percentInfo;
          console.log('onProgress progress', progress);
          this.setState({ progress });
        }
      })
    });
    console.log('requestList', requestList);
    const result = await Promise.all(requestList); // 并发切片
    console.log('result', result);
  }

  async verifyUpload(filename, fileHash) {
    console.log('enter verifyUpload');
    const { data } = await request({
      url: "http://localhost:3001/verify",
      // headers: {
      //   "content-type": "application/json"
      // },
      data: JSON.stringify({
        filename,
        fileHash
      })
    });
    console.log('verifyUpload data', data);
    return JSON.parse(data);
  }
    
  test = async () => {
    // const res = await request({
    //   url: 'http://localhost:3001/test',
    //   data: 'test!',
    // })
    // console.log('res', res);
  }

  render(){
    return (
      <div className="App">
        <button type='button' onClick={this.test}>test</button>
        <form onSubmit={this.handleUpload}>
          <label>
            Upload file:
            <input type="file" ref={this.fileInput} onChange={this.handleChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
