// import { useEffect, useState } from "react";
// import axios, { AxiosError, AxiosResponse } from "axios";

// interface FetchResponse<T> {
//   data: T | null;
//   loading: boolean;
//   error: AxiosError | null;
//   refetch: () => Promise<void>;}

//   const useFetch = <T>(url: string): FetchResponse<T> => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<AxiosError | null>(null);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       console.log(url)
//       const response: AxiosResponse<T> = await axios.get(url);
//       setData(response.data);
//     } catch (err: any) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [url]);

//   const refetch = async () => {
//     await fetchData();
//   };

//   return { data, loading, error, refetch };
// };

// export default useFetch;

import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface FetchResult<T> {
  data: T[];
  loading: boolean;
  error: any;
  reFetch: () => Promise<void>;
}

const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(false);
  console.log(url)
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const res: AxiosResponse<T[]> = await axios.get(url);

        console.log(url)

        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async (): Promise<void> => {
    setLoading(true);
    try {
      const res: AxiosResponse<T[]> = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
