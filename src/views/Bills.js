import { useContext, useEffect, useRef } from "react";
import { BillContext } from "../contexts/BillContext";
import { AuthContext } from "../contexts/AuthContext";
import { Spinner, Row, Button, Card, Container,Toast } from "react-bootstrap";
import Bill from "../components/products/Bill";
import InfoBar from "../components/layout/InfoBar";
import io from "socket.io-client";
import { ProductContext } from "../contexts/ProductContext";

const Bills = () => {

  const {
    showToast: { show, message, type },
    setShowToast,
  } = useContext(ProductContext);

  const socket = useRef()

  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    billState: { billLoading, bill },
    getBills,
  } = useContext(BillContext);

  useEffect(() => {
    getBills();

    socket.current = io("http://localhost:1201");
    socket.current.on("connect", () => {
      socket.current.emit("getUser", user._id);
    })

    socket.current.on("load-bill", () => {
      setShowToast({ show: true, message: "New Bill", type: "success" });
      getBills();
    })

  }, []);

  let loadData = () => {
    if (billLoading) {
      return (
        <div className="spinner-container">
          <Spinner animation="border" variant="info" />
        </div>
      );
    } else {
      if (bill.length === 0) {
        return (
          <>
            <Card className="text-center mx-5 my-5">
              <Card.Header as="h1"> Hi {user.username} </Card.Header>
              <Card.Body>
                <Card.Title> Welcome to LearnIt </Card.Title>
                <Card.Text>
                  Click the button below to get your first product
                </Card.Text>
                <Button variant="primary"> LearnIt! </Button>
              </Card.Body>
            </Card>
          </>
        );
      } else {
        return (
          <>
            <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
              {bill.map((billDetail, index) => {
                return <Bill key={index} bills={billDetail} socket={socket.current} />;
              })}
            </Row>
          </>
        );
      }
    }
  };

  return (
    <Container className="mb-4">
      {bill && <InfoBar bills={bill} />} {loadData()}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
        animation={true}
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default Bills;
