import type { NextApiRequest, NextApiResponse } from "next";
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
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const roomId = req.body.roomId;

    if (!roomId || typeof roomId !== "string" || roomId.length < 1) {
        return res.status(400).json({
            message: "roomId field should be a valid string"
        });
    }

    const token = req.headers.authorization;

    return new Promise<void>(async (resolve) => {
        const raw = { roomId };

        const resObj = await makeReq(
            `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}`,
            "DELETE",
            raw,
            token
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
