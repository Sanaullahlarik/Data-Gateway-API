import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Rating,
  Toolbar,
  Typography,
  CircularProgress,
  Autocomplete,
  TextField,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useDispatch } from "react-redux";
import CartList from "../cart-list/CartList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { addToCart } from "../store/slices/cart/cartSlice";
import PaginationMui from "@mui/material/Pagination";

const ProductCarts = () => {
  const [openCartList, setOpenCartList] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [categoryArr, setCategoryArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const dispatch = useDispatch();

  const toggleCartList = (newOpen) => () => {
    setOpenCartList(newOpen);
  };

  const filterProducts = (category) => {
    if (!category) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (item) => item.category === category.value
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const fetchedProducts = response.data;
        const categories = Array.from(
          new Set(fetchedProducts.map((item) => item.category))
        ).map((category) => ({
          label: category,
          value: category,
        }));

        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        setCategoryArr(categories);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoadingData(false);
      });
  }, []);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <Box>
        <Toolbar />
        <Autocomplete
          className="my-2"
          disablePortal
          options={categoryArr}
          sx={{ width: "300px" }}
          onChange={(e, newValue) => filterProducts(newValue)}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
        <Grid container spacing={4} justifyContent="center">
          {loadingData ? (
            <Box className="d-flex justify-content-center align-items-center mt-5">
              <CircularProgress size={40} />
            </Box>
          ) : paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card>
                  <Swiper
                    spaceBetween={30}
                    centeredSlides
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide className="text-center pt-3">
                      <img
                        width="200px"
                        height="300px"
                        src={product.image}
                        alt="Product"
                      />
                    </SwiperSlide>
                  </Swiper>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {product.category}
                    </Typography>
                    <Typography variant="h6">
                      {product.title.length > 20
                        ? `${product.title.slice(0, 20)}...`
                        : product.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Rating
                        name="read-only"
                        value={product.rating?.rate || 0}
                        readOnly
                      />
                    </Box>
                    <Box className="d-flex justify-content-between align-items-center mt-3">
                      <Typography variant="body1" color="textPrimary">
                        ${product.price}
                      </Typography>
                      <Box sx={{ padding: 1, display: "flex" }}>
                        <Tooltip title="View Details">
                          <Link to={`/product-detail/${product.id}`}>
                            <Button>
                              <VisibilityIcon />
                            </Button>
                          </Link>
                        </Tooltip>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={() => dispatch(addToCart(product))}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6">No Products Found</Typography>
          )}
        </Grid>
        <CartList openCartList={openCartList} toggleCartList={toggleCartList} />
      </Box>
      <Box className="d-flex justify-content-center my-2">
        <PaginationMui
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          variant="outlined"
          color="primary"
        />
      </Box>
    </>
  );
};

export default ProductCarts;
