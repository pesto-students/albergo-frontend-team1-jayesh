import { IExpValidator, SnackbarType } from "./Helper";

const makeReq = async (apiURL: string, method?: "POST" | "GET" | "PATCH" | "DELETE", body?: any, token?: string) => {
    if (!method) method = "POST";
    try {
        const response = await fetch(apiURL, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify(body)
        });

        const res = await response.json();

        return { response, res };

    } catch (error) {
        const err = error as Error;
        return { error: err.message };
    }
};

const getHomePageResults = async () => {

    const resObj = await makeReq(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/categories`, "GET");

    if (!resObj) return null;
    if (resObj.error) return resObj;
    if (resObj.response && !resObj.response.ok) return null;

    return resObj.res;
};

// get return type of resolved makeReq
type MakeReqReturnType = {
    response: Response;
    res: any;
    error?: undefined;
} | {
    error: string;
    response?: undefined;
    res?: undefined;
};


const handleResponse = (
    resObj: MakeReqReturnType,
    enqueueSnackbar: SnackbarType
) => {
    if (!resObj) {
        enqueueSnackbar("Please try again later", { variant: "error" });
        return null;
    }

    if (resObj?.error) {
        enqueueSnackbar(resObj.error.toString() ?? "Error : Please try again later", { variant: "error" });
        return null;
    }

    if (resObj.res?.error) {
        if (Array.isArray(resObj.res?.error)) {
            const messageArr = resObj.res?.error.filter((values: any) => values !== null) as IExpValidator[];
            messageArr.forEach(message => {
                enqueueSnackbar(`${message.param} : ${message?.msg}`, { variant: "error" });
            });
            return null;
        }

        if (typeof resObj.res?.error === "string") {
            enqueueSnackbar(resObj.res?.error ?? "Error : Please try again later", { variant: "error" });
            return null;
        }
    }

    if (resObj.res.message) {
        enqueueSnackbar(resObj.res.message.toString() ?? "Message : Please try again later", { variant: "warning" });
        return null;
    }

    if (resObj.response && resObj.response.ok) {
        return resObj.res?.data;
    }

    enqueueSnackbar("Something went wrong", { variant: "warning" });
    return null;
};

export { getHomePageResults, makeReq, handleResponse };