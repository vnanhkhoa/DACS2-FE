import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ProductContext } from "../../contexts/ProductContext";

const AddProductModel = () => {
  // Contexts
  const {
    showAddProductModal,
    setShowAddProductModal,
    addProducts,
    setShowToast,
  } = useContext(ProductContext);

  // State
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const { title, description, price } = newProduct;

  const onChangeNewProductForm = (event) => {
    if (event.target.name !== "image")
      setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
    else {
      console.log(event.target.files[0]);
      setNewProduct({
        ...newProduct,
        [event.target.name]: event.target.files[0],
      });
    }
  };

  const closeDialog = () => {
    resetAddProductData();
  };

  const Check = (object) => {
    if (object.title === "") {
      setShowToast({ show: true, message: "Missing Title", type: "danger" });
      return;
    }
    if (object.description === "") {
      setShowToast({
        show: true,
        message: "Missing Description",
        type: "danger",
      });
      return;
    }
    if (object.price === "") {
      setShowToast({ show: true, message: "Missing Price", type: "danger" });
      return;
    }
    if (object.image === "") {
      setShowToast({ show: true, message: "Missing Image", type: "danger" });
      return;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(newProduct);
    Check(newProduct);
    const { success, message } = await addProducts(newProduct);
    resetAddProductData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddProductData = () => {
    setNewProduct({
      title: "",
      description: "",
      price: "",
      image: "",
    });
    setShowAddProductModal(false);
  };

  return (
    <Modal show={showAddProductModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Creating A New Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required-aria-aria-describedby="title-help"
              value={title}
              onChange={onChangeNewProductForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              row={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewProductForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="0"
              value={price}
              onChange={onChangeNewProductForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={onChangeNewProductForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddProductModel;
