import { useState, useEffect } from "react";
import paginate from "../Components/paginate";
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

interface PROPS {
  loading: boolean;
  data: any[];
}

export const useFetch = (): PROPS => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  const getProducts = async (): Promise<any> => {
    const response = await fetch(url);
    const data = await response.json();
    setData(paginate(data));

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return { loading, data };
};
