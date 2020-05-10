import React, { FC, useState } from 'react';
import copy from 'copy-to-clipboard';
import Drawer from 'antd/es/drawer';
import Button from 'antd/es/button';
import Input from 'antd/es/input';
import Form from 'antd/es/form';
import message from 'antd/es/message';

import 'antd/es/form/style/css';
import 'antd/es/input/style/css';
import 'antd/es/drawer/style/css';
import 'antd/es/button/style/css';
import 'antd/es/message/style/css';

interface Props {
  visible: boolean;
  onClose: () => void;
}

function clearMessage() {
  console.log('清空消息');
}

function submit() {
  console.log('submit');
}

const SectionTitle = () => {
  return (
    <div className="section-title">
      <Button
        onClick={clearMessage}
        type="link"
        className="clear-btn"
        size="small"
      >
        清空
      </Button>
      <span>文本消息</span>
    </div>
  );
};

const SectionFooter = () => {
  const [value, setValue] = useState('');

  return (
    <Form className="section-footer" onSubmitCapture={submit}>
      <Input value={value} onChange={event => setValue(event.target.value)} />
      <Button type="primary" onClick={submit}>
        发送
      </Button>
    </Form>
  );
};

const SectionContent = ({ value }: { value: string }) => {
  return (
    // eslint-disable-next-line
    <div
      className="section-content"
      onClick={() => {
        copy(value);
        message.success('复制成功');
      }}
    >
      {value}
    </div>
  );
};

const TextSection: FC<Props> = ({ visible, onClose }: Props) => {
  return (
    <Drawer
      placement="top"
      title={<SectionTitle />}
      footer={<SectionFooter />}
      height={350}
      onClose={onClose}
      visible={visible}
    >
      <SectionContent value="1627316928369182763" />
      <SectionContent value="1627316928369182763" />
      <SectionContent value="1627316928369182763" />
      <SectionContent value="1627316928369182763" />
      <SectionContent value="1627316928369182763" />
      <SectionContent value="1627316928369182763" />
      <SectionContent value="1627316928369182763" />
      <SectionContent value="1627316928369182763" />
    </Drawer>
  );
};

export default TextSection;
