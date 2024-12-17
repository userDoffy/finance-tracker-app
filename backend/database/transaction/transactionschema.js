import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    type: { type: String, require: true },
    amount: { type: Number, require: true },
    description: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
