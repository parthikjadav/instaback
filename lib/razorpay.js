import Razorpay from "razorpay"
import { env } from "../env/index.js"
// create razorpay instance 
export const instance = new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
})
