import Product from "../models/Product.js";

export const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });
    //add qunatity for etch product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItems) => cartItems.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });
    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existstingItem = user.cartItems.find((item) => item.id === productId);

    if (existstingItem) {
      existstingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in Add to cart items", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems.filter((item) => item.id !== productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

export const updatedProductQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existstingItem = user.cartItems.find((item) => item.id === productId);
    if (existstingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.json(user.cartItems);
      }
      existstingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.log("Error in updateProductQuantity controller", error.message);
    res
      .status(500)
      .json({ message: "Interal server error", error: error.message });
  }
};
