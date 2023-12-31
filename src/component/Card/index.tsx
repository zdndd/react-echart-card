import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, Col } from "antd";
import { SettingOutlined, DragOutlined } from "@ant-design/icons";
import EchartCont from "../EchartCont";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./card.css";

const Card = (props: any) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    props.onChangeTask({ ...props.item, ...form.getFieldsValue() });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formSize = (size: string | number) => {
    switch (size) {
      case 6:
        return 1;
        break;
      case 8:
        return 2;
        break;
      case 12:
        return 3;
        break;
      case 24:
        return 4;
        break;
    }
  };

  const { Option } = Select;

  return (
    <Col span={props.item.size}>
      <div className="card-wrap" ref={setNodeRef} style={style} {...attributes}>
        <div className="title">
          <div>
            <span>{props.item.title}</span>
          </div>
          <div>
            <Button icon={<SettingOutlined />} onClick={showModal}></Button>
            <Button {...listeners} icon={<DragOutlined />}></Button>
          </div>
        </div>
        <EchartCont chartType={props.item.chartType}></EchartCont>
        <Modal
          title={props.item.title}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            form={form}
            autoComplete="off"
            initialValues={{
              title: props.item.title,
              size: formSize(props.item.size),
              chartType: props.item.chartType,
            }}
          >
            <Form.Item name="title" label="标题">
              <Input />
            </Form.Item>
            <Form.Item name="size" label="size">
              <Select placeholder="卡片大小" allowClear>
                <Option value="6">1</Option>
                <Option value="8">2</Option>
                <Option value="12">3</Option>
                <Option value="24">4</Option>
              </Select>
            </Form.Item>
            <Form.Item name="chartType" label="图标类型">
              <Select placeholder="各种图标类型" allowClear>
                <Option value="bar">柱状图</Option>
                <Option value="line">折线图</Option>
                <Option value="pie">饼图</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Col>
  );
};

export default Card;
