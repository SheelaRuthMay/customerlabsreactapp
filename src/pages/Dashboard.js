import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Row,
  Col,
  Layout,
  Drawer,
  Button,
  Space
} from "antd"; //antd components
// import "antd/dist/antd.min.css"; //antd component css
import {
    DownloadOutlined,
    LeftOutlined
} from "@ant-design/icons"; //antd icons

import TopHeader from "../components/Header";
import SegmentForm from "../components/SegmentForm";

// functional component for dashboard page
function DashboardPage() {
  
  const { Header, Footer, Content } = Layout; 
  
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const hideDrawer = ()=>{
    setOpen(false)
  }
  

  

  return (
    <div>
       <Layout>
      <Header className="header">
        <TopHeader/>
      </Header>
      
     
        
      <Content className="site-layout">
        
        <div>
        <Button onClick={showDrawer} 
        className="primary-btn" type="primary" 
        // icon={} 
        // shape="round" 
        size="large">
            Save Segment
          </Button>
          
       <SegmentForm  open={open} hideDrawer={hideDrawer}
        />

        </div>
      </Content>
      <Footer className="footer">
        <p className="text-black">CustomerLabs ©2023 - Designed by Sheel</p>
      </Footer>
      </Layout>
    </div>
  );
}
// .
export default DashboardPage;
