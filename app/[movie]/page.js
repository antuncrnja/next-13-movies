import Image from "next/image";
export default async function page({ searchParams }) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${searchParams.m}?api_key=${process.env.API_KEY}`, { next: { revalidate: 300 } });
  const movie = await res.json();

  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <main className="w-[60%] mx-auto my-5">
      <div className="flex gap-5 mt-20">
        <Image className="mb-5 rounded-xl" src={imagePath + movie.poster_path} width={300} height={200} priority />

        <div>
          <p className="bg-yellow-400 font-bold text-black px-2 py-1 inline-block rounded-lg mb-6 text-xsm">{movie.vote_average.toFixed(2)}</p>
          <h1 className="font-bold text-xl mb-1">{movie.title}</h1>
          <div className="my-3 mb-5">
            {movie.genres.map((genre) => (
              <span className="text-xs bg-slate-700 px-2 py-1 mr-2 rounded-full">{genre.name}</span>
            ))}
          </div>

          <small className="mb-4 inline-block text-slate-500">Release date: {movie.release_date}</small>
          <p className="text-sm max-w-lg text-slate-300">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}
