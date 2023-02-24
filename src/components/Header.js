import { Row, Col } from "antd";

const Header = () => {
  return (
    <div>
      <Row type="flex" align="middle">
        <Col
          md={{ span: 8 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          className="text-left vertical-align"
        >
          <h3 className="logo text-white m-0">CustomerLabs Assessment 1</h3>
        </Col>
        <Col
          md={{ span: 16 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          className="text-right vertical-align"
        >
          <p className="text-white m-0">Welcome</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
