import { useEffect, useState } from "react";
import { Button, Form, Image, Modal, Table } from "react-bootstrap";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getImageCategory,
  updateCategory,
} from "../../../services/category.service";
import { toast } from "react-toastify";
const Category = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState(undefined);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    fetchAllCategory();
  }, []);
  useEffect(() => {
    setId(category.id);
    console.log(category.image);
    setImage(category.image);
    setPreviewImage(category.imageUrl);
    setName(category.name);
  }, [category]);
  // useEffect(async () => {}, [categories]);
  const fetchAllCategory = async () => {
    try {
      const data = await getAllCategory();
      setCategories(
        await Promise.all(
          data.map(async (category) => {
            const imageUrl = await fetchCategoryImage(category);
            return { ...category, imageUrl };
          })
        )
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchCategoryImage = async (category) => {
    try {
      const response = await getImageCategory(category.image);
      return URL.createObjectURL(response);
    } catch (error) {
      //console.error("Error fetching image:", error);
      return null;
    }
  };
  const handleClose = () => {
    setShow(false), setCategory({});
  };
  const handleShow = () => setShow(true);
  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
      console.log(image);
    }
  };
  const handleConfirmClose = () => {
    setConfirm(false);
    setCategory({});
  };
  const handleConfirmDelete = (category) => {
    setConfirm(true);
    setCategory(category);
  };
  const handleEdit = (category) => {
    setCategory(category);
    setShow(true);
  };
  const handleDelete = async () => {
    try {
      const data = await deleteCategory(id);
      toast.success(data.message);
      handleConfirmClose();
      fetchAllCategory()
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      if (id === undefined) {
        data = await createCategory(name, image);
      } else {
        data = await updateCategory(id, name, image);
      }
      toast.success(data.message);
      handleClose();
      fetchAllCategory();
    } catch (error) {
      toast.info(error.message);
    }
  };
  return (
    <div className="container-fluid">
      <div>
        <Button variant="primary" onClick={handleShow}>
          Create Category
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label
                  className="btn btn-outline-primary"
                  htmlFor="upload"
                >
                  Upload Image
                </Form.Label>
                <Form.Control
                  type="file"
                  id="upload"
                  onChange={(e) => handleUploadImage(e)}
                  hidden
                  placeholder="Upload Image"
                />
              </Form.Group>

              <div
                className="d-flex justify-content-center align-items-center border"
                style={{ height: "300px" }}
              >
                {previewImage ? (
                  <Image src={previewImage} width={"100%"} height={"100%"} />
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
              <Button className="w-100 mt-4" type="submit">
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              //const imageUrl = await fetchCategoryImage(category?.image);
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    {category.imageUrl && <Image src={category.imageUrl} />}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleConfirmDelete(category)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Modal show={confirm} onHide={handleConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete category: {category.name}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Category;
