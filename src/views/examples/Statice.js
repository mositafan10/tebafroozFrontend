import React from "react";
import axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroup,
  Container,
  Col,
  Spinner,
  ListGroup,
  ListGroupItem
} from "reactstrap";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

import { config } from "../../Constant";
var url = config.url.API_URL;

function Statice() {
  const [packing, setPacking] = React.useState("");
  const [production, setProduction] = React.useState(false);
  const [error, setError] = React.useState("");

  const getInitData = () => {
    axios.get(`${url}/products/packing/`).then((res) => {
      setPacking(res.data);
    });
    axios.get(`${url}/products/production/`).then((res) => {
      setProduction(res.data);
    });
  };

  const getPackingData = () => {
    
  };

  const getProductionData = () => {
    
  };

  React.useEffect(() => {
    getInitData();
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <div style={{ fontFamily: "Vazir", direction: "rtl" }}>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg3.jpg").default + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col>
              <Card >
                {/* <div>
                  <p>
                    The <code>numbered</code> prop can be used to opt into
                    numbered list group items.
                  </p>
                  <ListGroup numbered>
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Morbi leo risus</ListGroupItem>
                    <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                </div> */}
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Statice;
