import React, { useState } from "react";
import { Layout, Button, Table } from "antd";
import { SaveOutlined } from "@ant-design/icons";

import TopHeader from "../components/Header";
import SegmentForm from "../components/SegmentForm";

const columns = [
  {
    title: "Segment Name",
    dataIndex: "segment_name",
    key: "segment_name",
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Account Name",
    dataIndex: "account_name",
    key: "account_name",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
];

// functional component for dashboard page
function DashboardPage() {
  const { Header, Footer, Content } = Layout;

  const [open, setOpen] = useState(false);
  const [savedSegments, setSavedSegments] = useState([]);

  const showDrawer = () => {
    setOpen(true);
  };

  const hideDrawer = () => {
    setOpen(false);
  };

  const savedValue = (values) => {
    let first_name = "";
    let last_name = "";
    let gender = "";
    let age = "";
    let account_name = "";
    let city = "";
    let state = "";

    values.schema &&
      values.schema.map((e, i) => {
        if (e.first_name) {
          first_name = values.schema[i].first_name;
        }
        if (e.last_name) {
          last_name = values.schema[i].last_name;
        }
        if (e.gender) {
          gender = values.schema[i].gender;
        }
        if (e.age) {
          age = values.schema[i].age;
        }
        if (e.account_name) {
          account_name = values.schema[i].account_name;
        }
        if (e.city) {
          city = values.schema[i].city;
        }
        if (e.state) {
          state = values.schema[i].state;
        }
      });

    let newValue = {
      segment_name: values.segment_name,
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      age: age,
      account_name: account_name,
      city: city,
      state: state,
    };
    setSavedSegments([...savedSegments, newValue]);
  };

  return (
    <div>
      <Layout>
        <Header className="header">
          <TopHeader />
        </Header>

        <Content className="site-layout">
          <div>
            <Button
              onClick={showDrawer}
              className="primary-btn"
              type="primary"
              icon={<SaveOutlined />}
              shape="round"
              size="large"
            >
              Save Segment
            </Button>

            {savedSegments && savedSegments.length > 0 && (
              <Table
                style={{ margin: "0 50px" }}
                dataSource={savedSegments}
                columns={columns}
              />
            )}

            <SegmentForm
              open={open}
              hideDrawer={hideDrawer}
              savedValue={savedValue}
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
