import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";

export const POST = async (req) => {
  await connectDB();

  let body = await req.formData();
  body = Object.fromEntries(body);

  console.log("RAZORPAY BODY:", body);

  //  find payment
  let p = await Payment.findOne({ oid: body.razorpay_order_id });

  if (!p) {
    return NextResponse.json({
      success: false,
      message: "Order not found",
    });
  }

  //  verify payment
  const isValid = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    process.env.KEY_SECRET
  );

  if (isValid) {
    //  mark as success
    await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { status: "done" },  
      { new: true }
    );

    // redirect to success page (no user dependency)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/?paymentdone=true`
    );

  } else {
    //  mark as failed
    await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { status: "failed" }   
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/?paymentfailed=true`
    );
  }
};