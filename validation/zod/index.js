import { OrderSchema, ProductSchema, UserSchema } from "./schema.js";

export const validateUser = (req, res, next) => { 
  try {
    const validationResult = UserSchema.safeParse(req.body);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format(); // Get detailed error messages
      return res.status(400).json({ errors: formattedErrors });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.errors});
  }
};

export const validateProduct = (req, res, next) => {
  try {
    const validationResult = ProductSchema.safeParse(req.body);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format(); // Get detailed error messages
      return res.status(400).json({ errors: formattedErrors });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.errors});
  }
}

export const validateOrder = (req, res, next) => {
  try {
    console.log("called");
    console.log(req.body);
    
    const validationResult = OrderSchema.safeParse(req.body);
    console.log(validationResult,"result");
    
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format(); // Get detailed error messages
      return res.status(400).json({ errors: formattedErrors });
    }
     
    next();
  } catch (error) {
    res.status(400).json({message:"order schema validation error "+ error.message, error: error.errors});
  }
}
