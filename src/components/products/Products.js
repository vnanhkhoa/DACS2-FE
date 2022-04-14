import React, { useState } from "react";
import { Row, Col, Card, Badge, Image } from "react-bootstrap";
import ActionButtons from "../layout/ActionButtons";

const Products = ({
  products: { _id, title, description, price, date, image },
}) => {
  let test = new Date(date);
  return (
    <Col key={_id} className="my-2">
      <Card className="shadow" border="success" style={{ height: "100%" }}>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col>
                <p className="post-title m-0">{title}</p>
              </Col>
              <Col className="text-right">
                <ActionButtons _id={_id} />
              </Col>
            </Row>
            {image !== undefined && (
                  <center>
                    <img
                      src={`http://localhost:1201/${image}`}
                      alt={title}
                      className="productImage"
                    />
                  </center>
                )}
                <p className="post-description">
                  {test.toString().substr(0, 24)}
                </p>
                <Badge pill variant="secondary" className="text-bottom">
                  $ {price}
                </Badge>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;
