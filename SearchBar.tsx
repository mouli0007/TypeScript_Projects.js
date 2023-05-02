import { useState, useEffect, useCallback } from "react";
import { ImageSearch, CloseSharp } from "@mui/icons-material";
import useDebounce from "../Debounce_hook/useDebounce";

//

export const SearchBar = () => {
  const [notice, setNotice] = useState<USERS_Notice[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  interface USERS_Notice {
    forename: string;
    date_of_birth: string;
    entity_id: number;
    nationalities: string[];
    name: string;
    _links: Links;
  }

  interface Links {
    self: Images;
    images: Images;
    thumbnail: Images;
  }

  interface Images {
    href: string;
  }

  const useDebounce = (value: any, delay: number) => {
    const [deBounced_Value, setDebounced_Value] = useState<any>(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounced_Value(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return deBounced_Value;
  };

  const debouncedSearch = useCallback(() => useDebounce(search, 500), [search]);

  const fetchData = async (): Promise<USERS_Notice> => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ws-public.interpol.int/notices/v1/red?forename=${debouncedSearch}&resultPerPage=200`
      );

      const data = await response.json();
      console.log(data._embedded.notices);
      setNotice(data._embedded.notices);
      setLoading(false);
      return data;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (!debouncedSearch) return;
    fetchData();
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <input
        type="search"
        placeholder="search..."
        value={search}
        onChange={handleChange}
      />

      {notice.map((notes: USERS_Notice): JSX.Element => {
        return (
          <div key={notes.entity_id}>
            <h2>{notes.forename}</h2>

            {notes._links?.thumbnail.href && (
              <img
                src={notes._links.thumbnail.href}
                alt={notes.forename}
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            )}

            <div>
              <p>
                {notes.forename} : {notes.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
