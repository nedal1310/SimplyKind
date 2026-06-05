"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const initiate = async (amount, paymentform) => {
  await connectDB();

  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await instance.orders.create(options);

await Payment.create({
  oid: order.id,
  amount: amount,
  organization_name: "SimplyKind Foundation",
  donor_name: paymentform.donor_name, 
  donor_email: paymentform.donor_email,
  message: paymentform.message,
  status: "pending",
});

  return order;
};


export const fetchuser = async (email) => {
  await connectDB();

  const user = await User.findOne({ email }).lean();

  if (!user) return null;

  return {
    ...user,
    _id: user._id.toString(),
  };
};

export const fetchpayments = async () => {
  await connectDB();

  let p = await Payment.find({
    organization_name: "SimplyKind Foundation",
    status: "done",   
  })
    .sort({ amount: -1 })
    .lean();

  const safePayments = p.map((payment) => ({
    ...payment,
    _id: payment._id.toString(),
    createdAt: payment.createdAt?.toISOString(),
    updatedAt: payment.updatedAt?.toISOString(),
  }));

  return safePayments;
};

 export const updateProfile = async (formData) => {
  await connectDB();

  
  console.log("FORM DATA:", Object.fromEntries(formData));

  const data = Object.fromEntries(formData);
  await User.updateOne(
    { email: data.email },
    data
  );

  return { success: true };
};