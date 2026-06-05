import mongoose from "mongoose";
const {Schema,model}=mongoose

const PaymentSchema = new Schema({
  donor_name: { type: String, required: true },
  donor_email: { type: String, required: true },
  oid: { type: String, required: true },
  message: { type: String },
  amount: { type: Number, required: true },
  organization_name: { type: String, required: true }, 
  status: { 
    type: String, 
    enum: ["pending", "done", "failed"], 
    default: "pending" 
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || model("Payment",PaymentSchema) ;