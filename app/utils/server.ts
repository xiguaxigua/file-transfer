import http from 'http';
import fs from 'fs';
import html from '../client.html';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let app: any = null;

function getHtml(res: http.ServerResponse) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(html);
  res.end();
}

function get404(res: http.ServerResponse) {
  res.statusCode = 404;
  res.end('404: Please check url');
}

function uploadFile(req: http.IncomingMessage, res: http.ServerResponse) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chunks: any = [];
  let num = 0;

  req.on('data', chunk => {
    chunks.push(chunk);
    num += chunk.length;
  });

  req.on('end', () => {
    const buffer = Buffer.concat(chunks, num);
    const rems = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < buffer.length; i++) {
      const v = buffer[i];
      const v2 = buffer[i + 1];
      // 10代表\n 13代表\r
      if (v === 13 && v2 === 10) {
        rems.push(i);
      }
    }
    const picmsg = buffer.slice(rems[0] + 2, rems[1]).toString();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let filename = (picmsg.match(/filename=".*"/g) as any)[0].split('"')[1];

    // 图片数据
    const nbuf = buffer.slice(rems[3] + 2, rems[rems.length - 2]);
    const folderPath = window.localStorage.getItem('FOLDER');
    if (!folderPath) return;

    const fileList = fs.readdirSync(folderPath);

    if (fileList.includes(filename)) {
      filename = `${Date.now()}-${filename}`;
    }

    const address = `${folderPath}/${filename}`;

    fs.writeFile(address, nbuf, err => {
      if (err) {
        res.write(err);
      } else {
        res.write('创建成功');
      }
      res.end();
    });
  });
}

export function startServer() {
  if (!app) {
    app = http.createServer((req, res) => {
      switch (req.url) {
        case '/':
          return getHtml(res);
        case '/upload':
          return uploadFile(req, res);
        default:
          return get404(res);
      }
    });
  }

  app.listen('9528');
}

export function stopServer() {
  if (app) app.close();
}
