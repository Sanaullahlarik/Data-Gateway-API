import { Box, Button, Drawer, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, deleteProduct, increaseQuantity } from '../store/slices/cart/cartSlice';

const CartList = (props) => {
  const { openCartList, toggleCartList } = props;
  const cartItem = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();

  return (
    <>
      <Drawer open={openCartList} onClose={toggleCartList(false)}>
        <Box sx={{ width: 320, p: 2 }}>
          <Typography variant="h6">Shopping Cart</Typography>

          {cartItem?.length > 0 ? (
            cartItem.map((item) => (
              <Box className="row 4 mt-2" key={item.id}>
                <Box className="col-9 d-flex">
                  <img width={60} src={item.image} alt={item.title} />
                  <Box className="ms-3">
                    <Typography>
                      {item?.title?.length > 20
                        ? `${item?.title.slice(0, 20)}..`
                        : item?.title}
                    </Typography>
                    <Typography>{item?.category}</Typography>
                    <Typography>
                      ${item?.price} <span> Qty: {item?.quantity}</span>
                    </Typography>
                  </Box>
                </Box>
                <Box className="col-3 d-flex flex-column">
                  <Button
                    onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                    size="small"
                    variant="outlined"
                  >
                    +
                  </Button>
                  <Button className='my-2'
                    onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                    size="small"
                    variant="outlined"
                    color="error"
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => dispatch(deleteProduct({ id: item.id }))}
                    size="small"
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Your cart is empty.
            </Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default CartList;
