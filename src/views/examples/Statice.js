import React from "react";
import axios from "axios";
import moment from "jalali-moment"; // reactstrap components
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
  Table,
  Spinner,
} from "reactstrap";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import { RangeDatePicker } from "jalali-react-datepicker";

import { config } from "../../Constant";
var url = config.url.API_URL;

function Statice() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState("");
  const [producer, setProducer] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [type, setType] = React.useState("");
  const [showResult, setShowResult] = React.useState(false);
  const [error, setError] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");

  const getData = () => {
    axios.get(`${url}/products/operators/`).then((res) => {
      setUsers(res.data);
    });
    axios.get(`${url}/products/`).then((res) => {
      setProducts(res.data);
    });
  };

  const getStatice = (data) => {
    data.preventDefault();
    setError(null);
    setLoading(true);
    axios
      .post(`${url}/products/statice/`, {
        user: { name: data.target.user.value },
        product: { id: data.target.product.value },
        type: data.target.type.value,
        date_from: date.start
          ? moment(date.start, "fa", "YYYY/MM/DD").format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD"),
        date_to: date.end
          ? moment(date.end, "fa", "YYYY/MM/DD").format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD"),
      })
      .then((res) => {
        setProducer(data.target.user.value);
        setType(data.target.type.value)
        setProduct(products[data.target.product.value - 1].name);
        setDateStart(moment(date.start).locale("fa").format("YYYY/MM/DD"));
        setDateEnd(moment(date.end).locale("fa").format("YYYY/MM/DD"));
        setResult(res.data);
        setLoading(false);
        setShowResult(true);
      })
      .catch((error) => {
        setLoading(false);
        setError("مشکلی پیش آمده است");
      });
  };

  React.useEffect(() => {
    getData();
    setError(null);
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            {showResult &&
              (loading ? (
                <Spinner />
              ) : (
                <>
                  <p>آمار {type == "1" ? "تولید" : "بسته‌بندی"}</p>
                  <Table style={{ color: "white" }}>
                    <thead>
                      <tr>
                        <th>تولید کننده</th>
                        <th>محصول</th>
                        <th>از تاریخ</th>
                        <th>تا تاریخ</th>
                        <th>کل تولید</th>
                        {/* <th>میزان ضایعات</th>
                        <th>میانگین روزانه</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{producer}</th>
                        <td>{product}</td>
                        <td>{dateStart}</td>
                        <td>{dateEnd}</td>
                        <td>{result.count ? result.count : 0}</td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              ))}
            <Col>
              <Card className="card-login card-plain">
                <Form onSubmit={getStatice} className="form">
                  <CardHeader className="text-center">
                    {/* <div className="logo-container">
                        <img
                          alt="..."
                          src={require("assets/img/now-logo.png").default}
                          ></img>
                      </div> */}
                    {!showResult && <p>مشاهده آمار</p>}
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
                          <option key={e.id} value={e.name}
                          style={{ color: "#000", backgroundColor:"#FFF" }}
                          >
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
                        name="product"
                        placeholder="محصول"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      >
                        {products.map((e) => (
                          <option key={e.id} value={e.id}
                          style={{ color: "#000", backgroundColor:"#FFF" }}
                          >
                            {e.full_name}
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
                        name="type"
                        required
                        type="select"
                        placeholder="نوع آمار"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      >
                        <option key="1" value="prod">
                          تولید
                        </option>
                        <option key="2" value="pack"
                        style={{ color: "#000", backgroundColor:"#FFF" }}
                        >
                          بسته‌بندی
                        </option>
                      </Input>
                    </InputGroup>
                    <RangeDatePicker
                      timePicker="false"
                      fromLabel="از"
                      toLabel="تا"
                      onClickSubmitButton={(date) => setDate(date)}
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
                      نمایش
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Statice;
