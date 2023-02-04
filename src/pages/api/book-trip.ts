import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    familyName: string;
    addressLine1: string;
    postCode: string;
    contactNo: string;
    numberOfPeople: string;
  };
}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { familyName, addressLine1, postCode, contactNo, numberOfPeople } =
    req.body;

  if (!familyName) {
    return res.status(400).json({ message: "Family name required" });
  }

  if (!addressLine1) {
    return res.status(400).json({ message: "Address Line 1 required" });
  }

  if (!postCode) {
    return res.status(400).json({ message: "Post Code required" });
  }

  if (!contactNo) {
    return res.status(400).json({ message: "Contact No required" });
  }

  if (!numberOfPeople) {
    return res.status(400).json({ message: "Nunmbe of people required" });
  }

  res.status(200).json({ message: "Success!" });
}
