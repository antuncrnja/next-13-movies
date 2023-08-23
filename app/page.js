import Search from "./ui/Search";
import MovieCard from "./ui/MovieCard";

export default async function Page({ searchParams }) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`, { next: { revalidate: 300 } });
  const movies = await res.json();

  let sortedMovies = movies.results.sort((a, b) => (searchParams.sort === "asc" ? a.title.localeCompare(b.title) : searchParams.sort === "desc" ? b.title.localeCompare(a.title) : 0));

  sortedMovies = sortedMovies.filter((movie) => {
    if (!searchParams.search && !searchParams.cat) {
      return true;
    }

    const searchLower = searchParams.search?.toLowerCase();
    const cat = searchParams.cat?.split(",");

    return (!searchLower || movie.title.toLowerCase().includes(searchLower)) && (!cat || cat.every((c) => movie.genre_ids.toString().split(",").includes(c)));
  });

  return (
    <main className="w-[90%] mx-auto my-[100px]">
      <div className="flex gap-5">
        <div>
          <Search />
        </div>

        <div>
          <h1 className="text-xl font-bold mb-5">Top 20</h1>
          <div className="grid grid-cols-5 gap-4 ">
            {sortedMovies.length === 0 && <p className="text-sm">There are no movies with these filters</p>}
            {sortedMovies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
