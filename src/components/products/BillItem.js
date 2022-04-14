import React from "react";
import {
  Row,
  Col,
  Image,
} from "react-bootstrap";
const Billitem = ({ products: { product, quantity, price } }) => {
  return (
    <Row className="mb-2 mt-1">
      <Col sm={4} className="d-flex align-items-center">
        <Image
          width={70}
          height={70}
          src={`http://localhost:1201/${product.image}`}
          alt={product.title}
        />
      </Col>
      <Col sm={8} className="d-flex align-items-center">
        <Col sm={12} className="bill-id">
          {product.title}
          <p style={{ fontSize:"15px",margin:"0" }}>${price}</p>
          <p style={{ fontSize:"13px",margin:"0" }}>Qty: {quantity}</p>
        </Col>
      </Col>
    </Row>
  );
};

export default Billitem;
