/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Switch from 'antd/es/switch';
import Button from 'antd/es/button';
import message from 'antd/es/message';
import ip from 'ip';
import qrcode from 'qrcode';

import 'antd/es/switch/style/css';
import 'antd/es/button/style/css';
import 'antd/es/upload/style/css';
import 'antd/es/message/style/css';
import './style.css';
import { getFolder } from '../../utils';
import { startServer, stopServer } from '../../utils/server';

const STORAGE_KEY = 'FOLDER';

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [path, setPath] = useState('');
  const [qrcodeData, setQrcode] = useState('');

  if (window.location.origin.includes('9528')) {
    return <div>该页面不支持在浏览器内打开</div>;
  }

  function handleChange(value: boolean) {
    if (!path) {
      message.info('请选择目标目录');
      return;
    }
    if (value) {
      startServer();
    } else {
      stopServer();
    }
    setChecked(value);
  }

  function open() {
    return getFolder().then((folder: string) => {
      if (folder) {
        setPath(folder);
        window.localStorage.setItem(STORAGE_KEY, folder);
      }
      return null;
    });
  }

  useEffect(() => {
    const folder = window.localStorage.getItem(STORAGE_KEY);
    if (folder) setPath(folder);
  }, []);

  useEffect(() => {
    if (checked) {
      // eslint-disable-next-line promise/catch-or-return
      qrcode.toDataURL(`http://${ip.address()}:9528/`).then((url: string) => {
        setQrcode(url);
        return null;
      });
    } else {
      setQrcode('');
    }
  }, [checked]);

  return (
    <div className="page-home">
      <h2>文件传输助手</h2>
      <div className="form">
        <div className="row">
          <div className="label">服务状态：</div>
          <div className="column">
            <Switch onChange={handleChange} checked={checked} />
          </div>
        </div>
        <div className="row">
          <div className="label">目标目录：</div>
          <div className="column">
            <Button size="small" onClick={open}>
              {path || '选择目录'}
            </Button>
          </div>
        </div>
        <div className="row">
          {qrcodeData ? (
            <img className="qrcode" src={qrcodeData} width="200" alt="qrcode" />
          ) : (
            <>
              <div className="label">二维码：</div>
              <div className="column">开启服务后展示</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
