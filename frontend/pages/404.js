import SingleLayout from "../components/SingleLayout";
import Link from "next/link";
import { Row, Col, Layout } from "antd";

export default function PageNotFound() {
  return (
    <div className="max-container">
      <SingleLayout>
        <Layout style={{ width: "100vw", height: "100vh" }}>
          <Row justify="center">
            <Col xs={24}>
              <div className="singlePageContent">
                <h1 className="display-1 fw-bold">404</h1>

                <p className="fs-3">존재하지 않는 페이지 입니다.</p>

                <Link href="/">메인페이지</Link>
              </div>
            </Col>
          </Row>
        </Layout>
      </SingleLayout>
    </div>
  );
}
