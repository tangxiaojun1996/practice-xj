const express = require('express');
const path = require('path');

const fse = require('fs-extra');
const multiparty = require('multiparty');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/test', (req, res, next) => {
  res.send('Hello World Test!');
});

const UPLOAD_DIR = path.resolve(__dirname, '../target'); // 大文件存储目录

const streamMergeRecursive = (dir, files = [], fileWriteStream) => new Promise((resolve) => {
  const func = (f) => {
    // 递归到尾部情况判断
    if (!f.length) {
      resolve('done!');
      fileWriteStream.end("console.log('Stream 合并完成')"); // 最后关闭可写流，防止内存泄漏
      return;
    }

    const currentFile = path.resolve(dir, f.shift());
    console.log('currentFile', currentFile);
    const currentReadStream = fse.createReadStream(currentFile); // 获取当前的可读流

    currentReadStream.pipe(fileWriteStream, { end: false });
    currentReadStream.on('end', () => {
      func(f, fileWriteStream);
    });

    currentReadStream.on('error', (error) => { // 监听错误事件，关闭可写流，防止内存泄漏
      console.error(error);
      fileWriteStream.close();
    });
  };
  func(files, fileWriteStream);
});

router.post('/upload', async (req, res) => {
  console.log('req', req);
  const multipart = new multiparty.Form();

  multipart.parse(req, async (err, fields, files) => {
    if (err) {
      console.log('upload multipart err', err);
      return; // todo error 处理
    }
    console.log('files, fields', files, fields);

    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    const [fileHash] = fields.fileHash;
    const [index] = fields.index;
    const [total] = fields.total;
    const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
    console.log('chunkDir', chunkDir);

    // 切片目录不存在，创建切片目录
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir);
    }

    // fs-extra 专用方法，类似 fs.rename 并且跨平台
    // fs-extra 的 rename 方法 windows 平台会有权限问题
    // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
    const targetPath = path.resolve(chunkDir, index);
    if (!fse.existsSync(targetPath)) {
      await fse.move(chunk.path, targetPath);
    }

    /**
     * 获取文件数量，对比文件夹内数量是否等于total
     * 如果等于total，做一次merge操作；否则不管
     */
    const chunkPaths = fse.readdirSync(chunkDir);
    console.log('chunkPaths', chunkPaths.length, total, chunkPaths);

    if (chunkPaths.length === +total) {
      // 根据切片下标进行排序
      // 否则直接读取目录的获得的顺序可能会错乱
      chunkPaths.sort((a, b) => a - b);
      const fileWriteStream = fse.createWriteStream(`${chunkDir}_temp`); // 创建一个可写流
      const result = await streamMergeRecursive(chunkDir, chunkPaths, fileWriteStream);
      console.log('end stream', result);
      fse.rmdirSync(chunkDir, { recursive: true }); // 合并后删除保存切片的目录
      fse.rename(`${chunkDir}_temp`, chunkDir);
    }

    res.end('received file chunk');
  });
});

const extractExt = (filename) => filename.slice(filename.lastIndexOf('.'), filename.length); // 提取后缀名

// router.post('/verify', async (req, res) => {
//   console.log('enter verify', req);
//   const data = await resolvePost(req);
//   const { fileHash, filename } = data;
//   const ext = extractExt(filename);
//   const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
//   console.log('filePath', filePath);
//   const exist = fse.existsSync(filePath);
//   // const result = JSON.stringify({ shouldUpload: !exist });
//   const result = exist ? 'false' : 'true';
//   console.log('exist, result', exist, result);
//   res.end(result);
// });

module.exports = router;
