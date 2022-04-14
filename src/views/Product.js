import AddIcon from "../assets/plus-circle-fill.svg";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext } from "../contexts/ProductContext";
import SearchBar from "../components/layout/SearchBar";
import {
  Spinner,
  OverlayTrigger,
  Tooltip,
  Row,
  Button,
  Card,
  Toast,
  Container,
} from "react-bootstrap";
import AddProductModel from "../components/products/AddProductModel";
import UpdateProductModel from "../components/products/UpdateProductModel";
import Products from "../components/products/Products";

const Product = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    productState: { productSelect, productLoading, product },
    setShowAddProductModal,
    getProducts,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(ProductContext);

  useEffect(() => {
    getProducts();
  }, [user, productLoading]);

  let body = null;

  getData();
  async function getData() {
    if (productLoading) {
      body = (
        <div className="spinner-container">
          <Spinner animation="border" variant="info" />
        </div>
      );
    } else {
      if (product.length === 0) {
        body = (
          <>
            <Card className="text-center mx-5 my-5">
              <Card.Header as="h1">Hi {user.username}</Card.Header>
              <Card.Body>
                <Card.Title>Welcome to LearnIt</Card.Title>
                <Card.Text>
                  Click the button below to get your first product
                </Card.Text>
                <Button variant="primary" onClick={setShowAddProductModal.bind(this, true)}>LearnIt!</Button>
              </Card.Body>
            </Card>
          </>
        );
      } else {
        body = (
          <>
            <Row
              key={user._id}
              className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3"
            >
              {product.map((products) => {
                console.log(products);
                return <Products products={products} />;
              })}
            </Row>

            <OverlayTrigger
              placement="left"
              overlay={<Tooltip>Add a new Product</Tooltip>}
            >
              <Button
                className="btn-floating"
                onClick={setShowAddProductModal.bind(this, true)}
              >
                <img src={AddIcon} alt="add-product" width="60" height="60" />
              </Button>
            </OverlayTrigger>
          </>
        );
      }
    }
  }

  return (
    <Container>
      <SearchBar/>
      {body}
      <AddProductModel />
      {productSelect !== null && <UpdateProductModel />}
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

export default Product;
