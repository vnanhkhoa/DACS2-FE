import React, { } from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import Billitem from "../products/BillItem";
import BillActionButton from "../layout/BillActionButton";

const formatDate = (date) => {
  const time = new Date(date);

  const d = `0${time.getDate()}`.slice(-2);
  const minute = `0${time.getMinutes()}`.slice(-2);
  const year = time.getFullYear();
  const h = `0${time.getHours()}`.slice(-2);
  const month = `0${time.getMonth()+1}`.slice(-2);
  const second = `0${time.getSeconds()}`.slice(-2);

  return `${d}/${month}/${year} ${h}:${minute}:${second}`;
}

const Bill = ({ bills: { customer, date, products, total, _id, status },socket }) => {
  
  let test = formatDate(date);
  return (
    <Col key={_id.toString()} className="my-2">
      <Card
        className="shadow"
        border={status === "Accepted" ? "success": status === "Rejected"? "danger": "warning"}
      >
        <Card.Body>
          <Card.Title className="mb-0">
            <div className="bill-id mb-1">#{_id}</div>
            <div className="bill-date mb-2">{test}</div>
            <div className="overflow-auto container p-3" style={{ height: "150px"}}>
              {products.map((product,index) => {
                return <Billitem key={index} products={product} />;
              })}
            </div>
            <Row className="mt-2">
              <Col>
                <Col sm={12} className="bill-itemscount">
                  x{products.length} items
                </Col>
                <Col sm={12}>
                  <Badge pill variant="secondary" className="bill-totalprice">
                    ${total}
                  </Badge>
                </Col>
              </Col>
              <Col className="text-right">
                <BillActionButton 
                  _id={_id} 
                  status={status} 
                  socket={socket} 
                  customer={customer}
                  _ids={products.map(product => product.product._id)}
                />
              </Col>
            </Row>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Bill;
