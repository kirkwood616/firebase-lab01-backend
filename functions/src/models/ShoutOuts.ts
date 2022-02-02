import { ObjectId } from "mongodb";

interface ShoutOut {
  _id?: ObjectId;
  to: string;
  from: string;
  shoutOut: string;
}

export default ShoutOut;
