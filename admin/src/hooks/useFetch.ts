import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(url)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        console.log(res)       
        setData(res.data);
      } catch (error: any) {
        setError(error.response?.data ?? "Something went wrong");
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error: any) {
      setError(error.response?.data ?? "Something went wrong");
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
