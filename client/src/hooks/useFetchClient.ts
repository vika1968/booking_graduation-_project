import { useEffect, useState } from "react";
import axios from "axios";

const useFetchClient = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setData(null)
        const res = await axios.get(url);
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

export default useFetchClient;
