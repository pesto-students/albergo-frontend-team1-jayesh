import type { NextApiRequest, NextApiResponse } from "next";
import {
  NEXT_PUBLIC_API_URL,
  isValidEmail,
  isValidPassword,
} from "../../../Utils/auth/authHelper";
import { makeReq } from "../../../Utils/db";
import { inValidPasswordMsg } from "../../../Utils/Helper";

interface IResponseData {
  message?: string;
  data?: unknown;
  error?: unknown;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) {
  //   only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  //   get the email and password from the request body
  const { email, password } = req.body;

  //   check if email and password are valid
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ message: inValidPasswordMsg });
  }

  return new Promise<void>(async (resolve) => {
    const resObj = await makeReq(`${NEXT_PUBLIC_API_URL}/api/auth/login`,
      "POST",
      {
        email,
        password,
      },
    );

    if (!resObj || resObj.error || !resObj.response) {
      res.status(400).json({ error: resObj.error ?? "Please try again later" });
      resolve();
      return;
    }

    res.status(resObj.response.status).json(resObj.res);
    resolve();
    return;
  });
}
