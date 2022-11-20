const makeReq = async (apiURL: string, method?: "POST" | "GET", body?: any) => {
    if (!method) method = "POST";
    try {
        const response = await fetch(apiURL, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        return null;
    }
};

const getHomePageResults = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};


export { getHomePageResults, makeReq };