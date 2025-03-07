import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.number().min(10, "Phone number must be at least 10 characters long"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    zip: z.number().min(1, "State is required"),
  }),
});

export const ProductSchema = z.object({
  userId: z.string().min(1, "User id is required"),
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z.string().min(1, "Image is required"),
  images: z.array(z.string()).min(1, "Images is required"),
  weight: z.number().min(1, "Weight is required"),
  mesurement: z.string().min(1, "Measurement is required"),
  stock: z.number().min(1, "Stock is required"),
  status: z.string().min(1, "Status is required"),
  brand: z.string().min(1, "Brand is required"),
});

export const OrderSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  products: z.array(z.object({
    productId: z.string().min(1, "Product ID is required"),
    name: z.string().min(1, "Name is required"),
    price: z.number().min(1, "Price is required"),
    quantity: z.number().min(1, "Quantity is required"),
  })),
  totalPrice: z.number().min(1, "Total Price is required"),
  shippingAddress: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    zip: z.number().min(1, "Zip is required"),
  }),
});




