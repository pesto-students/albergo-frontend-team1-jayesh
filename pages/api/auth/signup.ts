import type { NextApiRequest, NextApiResponse } from "next";
import {
  NEXT_PUBLIC_API_URL,
  isValidateName,
  isValidEmail,
  isValidPassword,
} from "../../../Utils/auth/authHelper";
import {
  IPartnerSignupForm,
  IUserSignupForm,
} from "../../../Utils/auth/signup";
import { makeReq } from "../../../Utils/db";
import { inValidPasswordMsg, UserRole } from "../../../Utils/Helper";

interface IResponseData {
  message?: string;
  data?: unknown;
  error?: unknown;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) {
  // only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { role } = req.body as { role: UserRole; };

  if (!role || (role !== "partner" && role !== "user")) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  if (role === "user") {
    //   get the email and password from the request body
    const {
      name,
      phone,
      email,
      password,
      confirmPassword,
    } = req.body as IUserSignupForm;

    if (!name || !email || !password || !phone || !confirmPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //   check if email and password are valid
    if (!isValidateName(name)) {
      return res.status(400).json({ message: "Invalid name" });
    }

    if (phone.length < 10) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ message: inValidPasswordMsg });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }

    return new Promise<void>(async (resolve) => {
      const raw = {
        name,
        phone,
        email,
        password
      };

      const resObj = await makeReq(`${NEXT_PUBLIC_API_URL}/api/auth/signup`, "POST", raw);

      if (!resObj || resObj.error || (resObj && !resObj.response)) {
        res.status(400).json({ error: "Please try again later" });
        resolve();
        return;
      }

      res.status(resObj.response.status).json(resObj.res);
      resolve();
      return;
    });
  }

  if (role === "partner") {
    //   get the email and password from the request body
    const formInp = req.body as IPartnerSignupForm;

    for (const formKey in formInp) {
      if (Object.prototype.hasOwnProperty.call(formInp, formKey)) {
        const formInpValue = formInp[formKey as keyof IPartnerSignupForm];

        if (!formInpValue) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
      }
    }

    //   check if email and password are valid
    if (!isValidateName(formInp.name)) {
      return res.status(400).json({ message: "Invalid name" });
    }

    if (!isValidEmail(formInp.email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!isValidPassword(formInp.password)) {
      return res.status(400).json({ message: inValidPasswordMsg });
    }

    if (formInp.password !== formInp.confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }

    if (formInp.phone.length < 10) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (!formInp.address || formInp.address.trim().length < 1) {
      return res.status(400).json({ message: "Invalid address" });
    }

    return new Promise<void>(async (resolve) => {
      const raw = {
        name: formInp.name,
        phone: formInp.phone,
        email: formInp.email,
        password: formInp.password,
        address: formInp.address,
        city: formInp.city,
        state: formInp.state,
        country: formInp.country,
        coordinates: {
          long: formInp.long,
          lat: formInp.lat,
        }
      };

      const resObj = await makeReq(`${NEXT_PUBLIC_API_URL}/api/hotel/signup`, "POST", raw);

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
}
