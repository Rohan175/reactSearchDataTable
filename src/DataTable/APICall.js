import { useState, useEffect } from "react";

const useDataApi = (initialUrl, initialData, callback) => {
	const [data, setData] = useState(initialData);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const headers = new Headers();
				headers.append("origin", "*");
				let req = new Request("http://starlord.hackerearth.com/" + initialUrl, {
					method: "GET",
					headers: headers,
					mode: "cors"
				});

				let result = await fetch(req).then(res => res.json());
				setData(result);
				callback(result);
				console.log("Network " + initialUrl + " API call success ");
				console.log("Network ", result);
			} catch (error) {
				setIsError(true);
				console.log("Network " + initialUrl + " API call failed " + error);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return [{ data, isLoading, isError }];
};

export default useDataApi;
