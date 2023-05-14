import { useGlobalContext } from "./context";
const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  const handlesubmit = (e: any) => {
    e.preventDefault();

    const searchValue = e.target.elements.search.value;
    if (!searchValue) return;
    setSearchTerm(searchValue);
  };

  return (
    <section>
      <h1 className="title">Unsplash</h1>

      <form className="search-form" onSubmit={handlesubmit}>
        <input
          type="text"
          className="form-input search-input"
          name="search"
          placeholder="Search for movies..."
        />
        <button type="submit" className="btn">
          Search...
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
