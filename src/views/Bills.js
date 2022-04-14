import { useContext, useEffect, useState, useRef } from "react";
import { BillContext } from "../contexts/BillContext";
import { AuthContext } from "../contexts/AuthContext";
import { Spinner, Row, Button, Card, Container } from "react-bootstrap";
import Bill from "../components/products/Bill";
import InfoBar from "../components/layout/InfoBar";
import io from "socket.io-client";

const Bills = () => {

  // const [socket,setSocket] = useState(null);

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
    socket.current.emit("getUser",user._id);

    socket.current.on("load-bill",() => {
      getBills();
    })

  },[]);

  let loadData = () => {
    if (billLoading) {
      return (
        <div className="spinner-container">
          <Spinner animation="border" variant="info" />
        </div>
      );
    } else {
      if (bill.length === 0) {
        return(
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
            <Row className="mx-auto mt-3">
              {bill.map((billDetail,index) => {
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
    </Container>
  );
};

export default Bills;
