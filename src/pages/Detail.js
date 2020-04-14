import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  useEffect(() => {
    (async () => {
      const resp = await fetch(`http://localhost:3030/api/movies/detail/${id}`);
      const parsed = await resp.json();
      console.log(parsed);
      setInfo(parsed);
    })();
  }, [info.id]);
  const year = new Date(info.release_date).getFullYear();
  return (
    <div
      style={{
        backgroundImage: `url(
          https://image.tmdb.org/t/p/original/${info.backdrop_path}
        )`,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
        }}
      >
        {Object.keys(info).length > 0 && (
          <div className="absolute flex items-center px-6 w-1/2 text-white h-screen">
            <div>
              <header className="mb-6">
                <h2 className="text-4xl leading-none uppercase tracking-wider mb-2">
                  {info.title}
                </h2>
                <small className="mr-6 uppercase font-semibold">
                  released: {year}
                </small>
                <small className="mr-6 uppercase font-semibold">
                  runtime: {info.runtime}
                </small>
                <small className="uppercase font-semibold">
                  rating: {info.vote_average}
                </small>
              </header>
              <section>
                {info.tagline && (
                  <h3 className="text-xl italic mb-2">
                    &ldquo;{info.tagline}&rdquo;
                  </h3>
                )}
                <p className="">{info.overview}</p>
              </section>
            </div>
          </div>
        )}
        <button className="absolute bottom-0 text-white m-6 border px-4 py-2 uppercase rounded-md">
          <Link to="/">back</Link>
        </button>
      </div>
    </div>
  );
};

export default Detail;
