import { Button, Tab, Tabs } from "react-bootstrap";
import ModalComponent from "../ModalComponent";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { deleteProduct, getAllProducts, getProductImage } from "../../../services/product.service";
import TableComponent from "../TableComponent";
import ConfirmComponent from "../ConfirmComponent";
import ProductDetails from "../../ProductDetails";
import { toast } from "react-toastify";
import { getAllCategory } from "../../../services/category.service";
const Product = () => {
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [key, setKey] = useState("form");
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [titles, setTitles] = useState([]);
  const [imageUrl, setImageUrl] = useState(null)
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategory();
  }, []);
  useEffect(()=>{
    setCategory(categories.find(c => c.id==categoryId));
    // console.log(result);
    // categories.forEach(category=>{
    //   if(category.id==categoryId){
    //     console.log(true);
    //     setCategory(category);
    //   }
    // })
  },[categoryId]);
  const fetchAllCategory=async()=>{
    try {
      const data = await getAllCategory();
      
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  const fetchAllProducts = async () => {
     try {
      const data = await getAllProducts();
      let pro;
      setProducts(
        await Promise.all(
          data.map(async (product) => {
            const imageUrl = await getProductImage(product.thumbnail);
            pro={...product, imageUrl}
            return { ...product, imageUrl}//...(imageUrl?{thumbnail:imageUrl}:{}) };
          })
        )
      );
      setTitles(Object.keys(pro).map((key) => key.toUpperCase()));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleEdit = (product) => {
    setProduct(product);
    setKey("form");
  };
  const handleConfirm = (product) => {
    setProduct(product);
    setConfirm(true);
  };
  const handleView = (product) => {
    setProduct(product);
    setKey("preview");
  }
  const handleDelete = async() => {
    try {
      const data=await deleteProduct(product.id);
      toast.success(data.message);
      setConfirm(false);
      setProduct({});
      fetchAllProducts();  
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  return (
    <div className="container-fluid">
      <div>
        <Button variant="primary" onClick={handleShow}>
          Create Product
        </Button>
        <ModalComponent show={show} setShow={setShow} />
        <ConfirmComponent handleConfirm={handleDelete} setShow={setConfirm} show={confirm} message={`Do you want to delete product name: ${product.name}`} title={"Delete Product".toUpperCase()} />
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="form" title="Form">
            <ProductForm fetchAllProducts={fetchAllProducts} setImageUrl={setImageUrl} categoryId={categoryId} setCategoryId={setCategoryId} name={name} setName={setName} categories={categories} product={product} setProduct={setProduct} />
          </Tab>
          <Tab eventKey="table" title="Table">
            <TableComponent view={true} handleView={handleView} titles={titles} bool={true} boolTrue={"Active"} boolFalse={"Non Active"}  items={products} handleConfirm={handleConfirm} handleEdit={handleEdit}/>
          </Tab>
          <Tab eventKey="preview" title="Preview">
            <ProductDetails category={category} name={name}  imageUrl={imageUrl} product={product}/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default Product;
