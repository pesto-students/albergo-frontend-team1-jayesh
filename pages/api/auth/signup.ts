import type { NextApiRequest, NextApiResponse } from 'next';
import {
  API_URL,
  isValidateName,
  isValidEmail,
  isValidPassword
} from '../../../Utils/auth/authHelper';
import { IPartnerSignupForm } from '../../../Utils/auth/signup';
import { inValidPasswordMsg, UserRole } from '../../../Utils/Helper';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { role } = req.body as { role: UserRole };

  if (!role || (role !== 'partner' && role !== 'user')) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  if (role === 'user') {
    //   get the email and password from the request body
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //   check if email and password are valid
    if (!isValidateName(name)) {
      return res.status(400).json({ message: 'Invalid name' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ message: inValidPasswordMsg });
    }

    return new Promise<void>(async (resolve) => {
      const raw = JSON.stringify({
        name,
        email,
        password,
        role
      });

      await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: raw
      })
        .then((response) => response.json())
        .then((response) => {
          res.status(200).json({ data: response });
          resolve();
        })
        .catch(() => {
          res.status(200).json({ error: 'Please try again later' });
          resolve();
        });
    });
  }

  if (role === 'partner') {
    //   get the email and password from the request body
    const formInp = req.body as IPartnerSignupForm;

    for (const formKey in formInp) {
      if (Object.prototype.hasOwnProperty.call(formInp, formKey)) {
        const formInpValue = formInp[formKey as keyof IPartnerSignupForm];

        if (!formInpValue) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
      }
    }

    //   check if email and password are valid
    if (!isValidateName(formInp.hotelName)) {
      return res.status(400).json({ message: 'Invalid name' });
    }

    if (!isValidEmail(formInp.hotelEmail)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (!isValidPassword(formInp.hotelPassword)) {
      return res.status(400).json({ message: inValidPasswordMsg });
    }

    if (formInp.hotelPassword !== formInp.hotelConfirmPassword) {
      return res.status(400).json({ message: 'Password does not match' });
    }

    if (formInp.hotelPhone.length < 10) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    if (!formInp.hotelAddress || formInp.hotelAddress.trim().length < 1) {
      return res.status(400).json({ message: 'Invalid address' });
    }

    if (!formInp.hotelCity || formInp.hotelCity.trim().length < 1) {
      return res.status(400).json({ message: 'Invalid city' });
    }

    if (!formInp.hotelState || formInp.hotelState.trim().length < 1) {
      return res.status(400).json({ message: 'Invalid state' });
    }

    if (!formInp.hotelCountry || formInp.hotelCountry.trim().length < 1) {
      return res.status(400).json({ message: 'Invalid country' });
    }

    if (!formInp.hotelZip || formInp.hotelZip.trim().length < 6) {
      return res.status(400).json({ message: 'Invalid zip code' });
    }

    return new Promise<void>(async (resolve) => {
      const raw = JSON.stringify({
        ...formInp,
        role
      });

      await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: raw
      })
        .then((response) => response.json())
        .then((response) => {
          res.status(200).json({ data: response });
          resolve();
        })
        .catch(() => {
          res.status(400).json({ error: 'Please try again later' });
          resolve();
        });
    });
  }
}
