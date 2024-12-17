import { Box, Button, Rating, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const { product_id } = useParams();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${product_id}`)
      .then((data) => {
        setProduct(data.data);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoadingData(false);
      });
  }, [product_id]);

  if (loadingData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        p: 3,
        marginTop: "2%",
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        bgcolor: '#f9f9f9'
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 2,
          p: 2,
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            maxWidth: '100%',
            maxHeight: '400px',
            borderRadius: '8px',
            objectFit: 'contain'
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1"
          color="primary"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            letterSpacing: 1
          }}
        >
          {product.category}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            lineHeight: 1.5
          }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#666',
            lineHeight: 1.8,
            fontSize: '16px'
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating
            name="readOnly"
            value={product?.rating?.rate}
            precision={0.5}
            readOnly
          />
          <Typography variant="body2" sx={{ color: '#999', fontWeight: 500 }}>
            ({product?.rating?.count || 0} Reviews)</Typography></Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }} >
          <Typography variant="h5" color="success.main" sx={{ fontWeight: 'bold' }}>${product.price}</Typography>
          <Button variant="contained" color="success" size="large" startIcon={<AddIcon />} sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold', borderRadius: '20px', px: 3
          }}> Add</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
