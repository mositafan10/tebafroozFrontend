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
  Toast,
  ToastHeader,
  ToastBody,
  Spinner,
} from "reactstrap";
import { DatePicker } from "jalali-react-datepicker";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import moment from "jalali-moment"; // reactstrap components


import { config } from "../../Constant";
var url = config.url.API_URL;

function Packing() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [productions, setProductions] = React.useState([]);
  const [date, setDate] = React.useState("");
  const [finish, setFinish] = React.useState(false);
  const [error, setError] = React.useState("");

  const getData = () => {
    axios.get(`${url}/products/operators/`).then((res) => {
      setUsers(res.data);
    });
    axios.get(`${url}/products/productions/2/`).then((res) => {
      setProductions(res.data);
    });
  };

  const sendForm = (data) => {
    data.preventDefault();
    axios
      .post(`${url}/products/packings/`, {
        user: data.target.user.value,
        number: data.target.number.value,
        production: data.target.production.value,
        created_at: date.value ? moment(date.value).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
      })
      .then(() => {
        setFinish(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  React.useEffect(() => {
    getData();
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
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form onSubmit={sendForm} className="form">
                  <CardHeader className="text-center">
                    {/* <div className="logo-container">
                        <img
                          alt="..."
                          src={require("assets/img/now-logo.png").default}
                          ></img>
                      </div> */}
                    <p>ثبت آمار بسته‌بندی</p>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <Input
                        style={{ fontFamily: "Vazir" }}
                        placeholder="تولید کننده"
                        name="user"
                        type="select"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      >
                        {users.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.name}
                          </option>
                        ))}
                      </Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <Input
                        style={{ fontFamily: "Vazir" }}
                        type="select"
                        name="production"
                        required
                        placeholder="سری تولید"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      >
                        {productions.map((e) => (
                          <option key={e.name} value={e.id}
                          style={{ color: "#000", backgroundColor:"#FFF" }}
                          >
                            {e.batch}
                          </option>
                        ))}
                      </Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <Input
                        style={{ fontFamily: "VazirD" }}
                        name="number"
                        required
                        type="tel"
                        placeholder="تعداد بسته‌بندی شده"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                    <DatePicker
                      onClickSubmitButton={(value) => setDate(value)}
                      timePicker={false}
                    />
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      style={{ fontFamily: "Vazir" }}
                      type="submit"
                      className="btn-round"
                      color="info"
                    >
                      ثبت
                    </Button>
                  </CardFooter>
                </Form>
                {finish && (
                  <Toast>
                    <ToastHeader icon={<Spinner size="sm">...</Spinner>}>
                      اطلاعات با موفقیت ثبت شد
                    </ToastHeader>
                  </Toast>
                )}
                {error && (
                  <div>
                    <Toast>
                      <ToastBody>{error}</ToastBody>
                    </Toast>
                  </div>
                )}
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Packing;
