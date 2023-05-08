import { useState, useEffect } from "react";
import Follower from "./Components/Followers";
import { useFetch } from "./Hooks/useFetch";

const App = () => {
  const { loading, data } = useFetch();

  const [page, setPage] = useState<number>(0);

  const [followers, setFollowers] = useState<any[]>([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  const handleButtonChange = (index: number): void => {
    setPage(index);
  };

  const nextPage = () => {
    setPage((oldPage: number): number => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        return (nextPage = 0);
      }
      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage: number): number => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        return (prevPage = data.length - 1);
      }
      return prevPage;
    });
  };

  return (
    <main>
      <div className="section-title">
        <h2>{loading ? "Loading..." : "GitHub-Profile Pagination"}</h2>
        <div className="underline"></div>
      </div>

      <section className="followers">
        <div className="container">
          {followers.map((follower): JSX.Element => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>

        {!loading && (
          <div className="btn-container">
            <div className="prev-btn" onClick={prevPage}>
              prev
            </div>
            {data.map((_, index): JSX.Element => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? "active-btn" : null}`}
                  onClick={() => handleButtonChange(index)}
                >
                  {index + 1}
                </button>
              );
            })}

            <div className="prev-btn" onClick={nextPage}>
              next
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
