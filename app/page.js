import Image from "next/image";
import Search from "./ui/Search";
import Link from "next/link";

export default async function Page({ searchParams }) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`, { next: { revalidate: 300 } });
  const movies = await res.json();

  const imagePath = "https://image.tmdb.org/t/p/w500";

  let sortedMovies = movies.results.sort((a, b) => {
    if (searchParams.sort === "asc") {
      return a.title.localeCompare(b.title);
    } else if (searchParams.sort === "desc") {
      return b.title.localeCompare(a.title);
    } else {
      return;
    }
  });

  sortedMovies = sortedMovies.filter((movie) => {
    if (!searchParams.search && !searchParams.cat) {
      return true;
    }

    const searchLower = searchParams.search?.toLowerCase();
    const cat = searchParams.cat?.split(",");

    return (!searchLower || movie.title.toLowerCase().includes(searchLower)) && (!cat || cat.every((c) => movie.genre_ids.toString().split(",").includes(c)));
  });

  return (
    <main className="w-[70%] mx-auto my-[100px]">
      <Search />

      <div className="grid grid-cols-6 gap-4 ">
        {sortedMovies.map((movie) => (
          <div key={movie.id}>
            <Link href={`/${movie.title.toLowerCase().replace(/\s+/g, "-") + "?m=" + movie.id}`}>
              <Image src={imagePath + movie.poster_path} width={200} height={200} className="w-full rounded-xl mb-2" alt={movie.title.replace(" ", "-")} />
              <h1 className="text-sm">{movie.title}</h1>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
