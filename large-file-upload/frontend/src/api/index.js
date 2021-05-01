/* eslint-disable import/no-anonymous-default-export */

const request = ({
    url,
    method = "POST",
    data,
    headers = {},
    onProgress = e => e,
    requestList
  }) => {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = onProgress;
      xhr.open(method, url);
      Object.keys(headers).forEach(key =>
        xhr.setRequestHeader(key, headers[key])
      );
      xhr.send(data);
      xhr.onload = e => {
        console.log('request onload e', e);
        resolve({ data: e.target.response });
      };
    });
  }

export  { request };