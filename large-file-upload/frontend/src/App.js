import React from 'react';
import logo from './logo.svg';
import './App.css';

const SIZE = 10 * 1024 * 1024; // 切片大小

class App extends React.Component{
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  request = ({
    url,
    method = "post",
    data,
    headers = {},
    requestList
  }) => {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      Object.keys(headers).forEach(key =>
        xhr.setRequestHeader(key, headers[key])
      );
      xhr.send(data);
      xhr.onload = e => {
        resolve({
          data: e.target.response
        });
      };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('event', event);
    // alert(
      //   `Selected file - ${this.fileInput.current.files[0]}`
      // );
    const file = this.fileInput.current.files[0];
    const fileList = this.createFileChunk(file);
    console.log('fileList', fileList);
  }

  handleChange = (e) => {
    console.log('handleChange e', e);
    const [file] = e.target.files;
    console.log('file', file);
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
    

  render(){
    return (
      <div className="App">
          <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} onChange={this.handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
