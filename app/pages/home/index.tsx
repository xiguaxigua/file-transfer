import React, { useState } from 'react';
import Switch from 'react-switch';
import './style.css';

import { startServer, stopServer } from '../../utils/server';

export default function Home() {
  const [checked, setChecked] = useState(false);
  if (window.location.origin.includes('9528')) {
    return <div>该页面不支持在浏览器内打开</div>;
  }

  function handleChange(value: boolean) {
    if (value) {
      startServer();
    } else {
      stopServer();
    }
    setChecked(value);
  }

  return (
    <div className="page-home">
      <h2>Home</h2>
      <Switch onChange={handleChange} checked={checked} />
    </div>
  );
}
