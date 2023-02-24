import React, { useEffect, useState, useForm } from "react";
import { Row, Col, Form, Input, Button, Select, Space, Drawer, Modal } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons"; //antd icons

const { Option } = Select;

const sights = [
  {
    label: "First Name",
    value: "first_name",
  },
  {
    label: "Last Name",
    value: "last_name",
  },
  {
    label: "Gender",
    value: "gender",
  },
  {
    label: "Age",
    value: "age",
  },
  {
    label: "Account Name",
    value: "account_name",
  },
  {
    label: "City",
    value: "city",
  },
  {
    label: "State",
    value: "state",
  },
];

const SegmentForm = ({ open, hideDrawer, savedValue }) => {
  
  const [form] = Form.useForm();
  const [current, setCurrent] = useState();
  const [selected, setSelected] = useState([]);
  const [selectedAll, setSelectedAll] = useState([]);
  const [defaultSelected, setDefaultSelected] = useState("Add schema to segment");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const onFinish = async(values) => {
    localStorage.clear(); 
    
    const response = await fetch('https://webhook.site/5577a82b-25ac-4fcf-a5f4-30cf8925fb05', {method: 'POST', body: JSON.stringify(values)});

    if(response.status === 200){
      savedValue(values)
      Modal.success({
        className: "popup-model",
        icon: false,
        content: (
          <div>
            <Row>
              <Col span={24}>
                <span className="popup-content">Segment Saved Successfully.</span>
              </Col>
            </Row>
          </div>
        ),
        onOk: ()=>{closeDrawer()}
      });

    }
    else{
      Modal.error({
        className: "popup-model",
        icon: false,
        content: (
          <div>
            <Row>
              <Col span={24}>
                <span className="popup-content">Error while saving segment !</span>
              </Col>
            </Row>
          </div>
        ),
      });
    }

  };

  const onFinishFailed = () => {
    console.log("error");
  };

  const closeDrawer = () => {
    localStorage.clear();
    setDefaultSelected("Add schema to segment");
    setSelected([]);
    setSelectedAll([]);
    form.resetFields()
    hideDrawer();
  };

  return (
    <Drawer
      title="Saving Segment"
      placement="right"
      width={500}
      onClose={closeDrawer}
      open={open}
      closeIcon={<LeftOutlined />}
    >
      <div>
        <Row type="flex" align="middle">
          <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
            <Form
              name="segment"
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
               style={{marginBottom: "20px"}}
                label="Enter Name of the Segment"
                name="segment_name"
                rules={[
                  { required: true, message: "Enter Name of the Segment !" },
                ]}
              >
                <Input placeholder="Name of the Segment" />
              </Form.Item>

              <Form.List name="schema">
                {(fields, { add, remove }) => (
                  <>
                    {selected &&
                      fields.map(({ key, name, ...restField }) => {
                        localStorage.setItem(key, selectedAll[key]);
                        return (
                          <Space
                            key={key}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              style={{
                                width:"400px"
                              }}
                              name={[name, localStorage.getItem(key)]}
                              rules={[
                                {
                                  required: true,
                                  message: `Enter ${localStorage.getItem(key)}`,
                                },
                              ]}
                            >
                              <Input placeholder={localStorage.getItem(key)} />
                            </Form.Item>

                            <MinusCircleOutlined
                              onClick={() => {
                                localStorage.removeItem(key);
                                let newArray = selected;
                                let index = selected.indexOf(selectedAll[key]);
                                newArray.splice(index, 1);
                                setSelected(newArray);
                                remove(name);
                              }}
                            />
                          </Space>
                        );
                      })}

                    <Form.Item style={{marginTop: "20px"}}>
                      <Select
                        value={defaultSelected}
                        disabled={
                          sights.filter(
                            (el) => selected.includes(el.value) === false
                          ).length === 0
                        }
                        style={{ width: "400px" }}
                        onChange={(val, elem) => {
                          setCurrent(val);
                          setDefaultSelected(val);
                        }}
                      >
                        <Option disabled value="Add schema to segment">
                          Add schema to segment
                        </Option>
                        {sights
                          .filter((el) => selected.includes(el.value) === false)
                          .map((item) => (
                            <Option key={item.label} value={item.value}>
                              {item.label}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="dashed"
                        disabled={defaultSelected === "Add schema to segment"}
                        onClick={() => {
                          setSelected([...selected, current]);
                          setSelectedAll([...selectedAll, current]);
                          setDefaultSelected("Add schema to segment");
                          add();
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add new schema
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item>
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  Save the Segment
                </Button>
                <Button
                  onClick={closeDrawer}
                  type="primary"
                  className="secondary-btn"
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Drawer>
  );
};

export default SegmentForm;
