import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Select, Space, Drawer } from "antd";
import {
    MinusCircleOutlined,
    PlusOutlined,
    LeftOutlined
} from "@ant-design/icons"; //antd icons

const { Option } = Select;

const sights = [{
    label: 'First Name',
    value: 'first_name'
  },
  {
    label: 'Last Name',
    value: 'last_name'
  },
  {
    label: 'Gender',
    value: 'gender'
  },
  {
    label: 'Age',
    value: 'age'
  },
  {
    label: 'Account Name',
    value: 'account_name'
  },
  {
    label: 'City',
    value: 'city'
  },
  {
    label: 'State',
    value: 'state'
  }];

const SegmentForm = ({open, hideDrawer}) => {

    const [selected, setSelected] = useState([]);
    const [selectedAll, setSelectedAll] = useState([]);
    const [defaultSelected, setDefaultSelected] = useState("Select Segment");
  const onFinish = (values) => {
    localStorage.clear()
    console.log('Received values of form:', values);
  };
  const onFinishFailed = () => {
    console.log('error');
  };
  


  const closeDrawer = () => {
    localStorage.clear();
    setDefaultSelected("Select Segment");
    setSelected([])
    setSelectedAll([])
    hideDrawer()
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
        <Col
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >

<Form
    name="segment"
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    
  >
    <Form.Item
      label="Enter Name of the Segment"
      name="segment_name"
    //   rules={[{ required: true, message: 'Please Enter Name of the Segment !' }]}
    >
      <Input placeholder="Name of the Segment"/>
    </Form.Item>

    <Form.List name="schema">
      {(fields, { add, remove }) => (
        <>
          {selected &&  fields.map(({ key, name, ...restField }) =>{
            localStorage.setItem(key, selectedAll[key]);
             return (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
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
              
              <MinusCircleOutlined onClick={() => {
                localStorage.removeItem(key);
                let newArray = selected;
                let index = selected.indexOf(selectedAll[key])
                newArray.splice(index, 1)
                setSelected(newArray);
                 remove(name)
                 }} />
            </Space>
          )})}

          <Form.Item>
                      <Select value={defaultSelected} disabled={(sights.filter((el)=> selected.includes(el.value) === false)).length === 0} style={{width: '400px'}} onChange={(val, elem)=>{ setSelected([...selected,val]); setSelectedAll([...selectedAll,val]); setDefaultSelected(val)}}>
                      <Option disabled value="Select Segment">Select Segment</Option>
                        {sights.filter((el)=> selected.includes(el.value) === false).map((item) => (
                          <Option key={item.value} value={item.value}>
                            {item.value}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
          <Form.Item>
            
            <Button type="dashed" 
            disabled={defaultSelected === "Select Segment"}
             onClick={() => { add(); setDefaultSelected("Select Segment")}} block icon={<PlusOutlined />}>
              Add Schema
            </Button>
            
            
          </Form.Item>
        </>
      )}
    </Form.List>
   
    
    <Form.Item>
      <Button type="primary" className="primary-btn" htmlType="submit">
        Save the Segment
      </Button>
      <Button onClick={closeDrawer} type="primary" className="secondary-btn">
        Cancel
      </Button>
    </Form.Item>
  </Form>
          
        </Col>
        <Col
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          
            

         
        </Col>
      </Row>
    </div>
    </Drawer>
  );
};

export default SegmentForm;
