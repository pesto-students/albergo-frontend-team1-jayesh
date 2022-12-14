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
    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, price, capacity, images, roomId } = req.body;

    if (name && typeof name !== "string" && name.length < 1) {
        return res.status(400).json({
            message: "name field should be a valid string"
        });
    }

    if (price && typeof price !== "number") {
        return res.status(400).json({
            message: "price field should be a valid number"
        });
    }

    if (capacity && typeof capacity !== "number") {
        return res.status(400).json({
            message: "capacity field should be a valid number"
        });
    }

    if (images && !Array.isArray(images) && images.length < 1) {
        return res.status(400).json({
            message: "images field should be a valid array"
        });
    }

    if (!roomId || typeof roomId !== "string" || roomId.length < 1) {
        return res.status(400).json({
            message: "roomId field should be a valid string"
        });
    }

    const token = req.headers.authorization;

    return new Promise<void>(async (resolve) => {
        const raw = { name, price, capacity, images, roomId };

        const resObj = await makeReq(
            `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}`,
            "PATCH",
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
