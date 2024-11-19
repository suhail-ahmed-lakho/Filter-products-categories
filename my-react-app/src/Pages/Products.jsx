import { Box, Grid, Tooltip, Typography, Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");

        setProducts(data);
      } catch (error) {
        alert("there is an error");
      }
    };
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(product => product.category))];

  return <>
    <div className="mt-3 mb-3 container">
      <Autocomplete
        options={categories}
        onChange={(event, newValue) => setSelectedCategory(newValue)}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Filter Products by Category" 
            variant="outlined" 
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc', 
                },
                '&:hover fieldset': {
                  borderColor: '#888', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5', 
                },
              },
            }} 
          />
        )}
        clearOnBlur
        disableClearable={false}
        sx={{
          width: '300px', 
        }}
      />
    </div>
    <Grid container className="container">
      {products?.filter(product => 
        selectedCategory ? product.category === selectedCategory : true
      ).map(product => {
        return (
          <Grid item key={product.id} xs={12} md={3} sx={{ width: "250px", padding: "16px" }}>
            <Box sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              padding: '16px', 
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
              display: 'flex', 
              flexDirection: 'column', 
              height: '350px'
            }}>
              <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '8px' }} />
              <Tooltip title={product.title} placement="top">
                <Typography variant="h6" component="p" sx={{ marginTop: '8px', flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                  {product.title.length > 20 ? `${product.title.slice(0, 20)}...` : product.title}
                </Typography>
              </Tooltip>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  </>;
};

export default Products;
