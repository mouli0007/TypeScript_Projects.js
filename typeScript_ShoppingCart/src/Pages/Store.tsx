import React from "react";
import storeItems from "../data/items.json";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../Components/StoreItem";
const Store = () => {
  return (
    <>
      <h2>Choose Your Products</h2>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map((item) => {
          return (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Store;
