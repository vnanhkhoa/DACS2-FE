import React, { useContext } from "react";
import DeleteIcon from "../../assets/trash.svg";
import EditIcon from "../../assets/pencil.svg";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ProductContext } from "../../contexts/ProductContext";

const ActionButtons = ({ _id }) => {
  const {
    deleteProducts,
    findProducts,
    setShowUpdateProductModal,
  } = useContext(ProductContext);
  const chooseProduct = (productId) => {
    findProducts(productId);
    setShowUpdateProductModal(true);
  };
  return (
    <>
      <OverlayTrigger placement="left" overlay={<Tooltip>Edit</Tooltip>}>
        <Button className="post-button bg-white border-0" onClick={chooseProduct.bind(this, _id)}>
          <img src={EditIcon} alt="Edit" width="24" height="24" />
        </Button>
      </OverlayTrigger>
      <OverlayTrigger placement="right" overlay={<Tooltip>Delete</Tooltip>}>
        <Button
          className="post-button bg-white border-0"
          onClick={deleteProducts.bind(this, _id)}
        >
          <img src={DeleteIcon} alt="Delete" width="24" height="24" />
        </Button>
      </OverlayTrigger>
    </>
  );
};
export default ActionButtons;
