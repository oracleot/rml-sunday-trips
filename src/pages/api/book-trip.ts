import { supabase } from "@/lib/supabaseClient";
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

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { familyName, addressLine1, postCode, contactNo, numberOfPeople } =
    req.body;

  if (!familyName) {
    return res.status(400).json({ error: "Family name required" });
  }

  if (!addressLine1) {
    return res.status(400).json({ error: "Address Line 1 required" });
  }

  if (!postCode) {
    return res.status(400).json({ error: "Post Code required" });
  }

  if (!contactNo) {
    return res.status(400).json({ error: "Contact No required" });
  }

  if (!numberOfPeople) {
    return res.status(400).json({ error: "Nunmbe of people required" });
  }

  const { data, error } = await supabase.from("travellers").insert([
    {
      family_name: familyName,
      address_line_1: addressLine1,
      post_code: postCode,
      contact_no: contactNo,
      number_of_people: numberOfPeople,
    },
  ]);

  if (error) {
    res.status(400).json({ data: {}, error: "Something went wrong!" });
  }

  res
    .status(200)
    .json({ data: { data, message: "Booking successful!" }, error: {} });
}
