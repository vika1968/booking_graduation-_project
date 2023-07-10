
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
interface FetchResult<T> {
  data: T[];
  loading: boolean;
  error: any;
}

const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const res: AxiosResponse<T[]> = await axios.get(url); 
        
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;