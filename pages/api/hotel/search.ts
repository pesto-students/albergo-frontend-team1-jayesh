import type { NextApiRequest, NextApiResponse } from "next";
import { } from "../../../Utils/auth/authHelper";
import { makeReq } from "../../../Utils/db";

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

  return new Promise<void>(async (resolve) => {
    const raw = req.body;

    const resObj = await makeReq(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/search`,
      "POST",
      raw,
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
