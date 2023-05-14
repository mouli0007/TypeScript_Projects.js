// Setting up the React Query !
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";
const Gallaery = () => {
  const { searchTerm } = useGlobalContext();

  const URL: string = `https://api.unsplash.com/search/photos?client_id=OdETN6bd199k0Io2cVhokspOgbaZuw7DcfBcX-Rpet8`;

  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${URL}&query=${searchTerm}`);
      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an Error</h4>
      </section>
    );
  }

  const result = response.data.results;

  if (result.length < 1) {
    return (
      <section className="image-container">
        <h4>No Results Found</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {result.map((item: any) => {
        const url = item?.urls?.regular;
        return (
          <img
            key={item.id}
            src={url}
            alt={item.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallaery;
