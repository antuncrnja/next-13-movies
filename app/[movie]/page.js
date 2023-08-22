import Image from "next/image";
export default async function page({ searchParams }) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${searchParams.m}?api_key=${process.env.API_KEY}`, { next: { revalidate: 300 } });
  const movie = await res.json();

  const imagePath = "https://image.tmdb.org/t/p/w500";

  console.log(movie);
  return (
    <div className="w-[60%] mx-auto mt-10 flex gap-6">
      <Image src={imagePath + movie.poster_path} width={200} height={200} className="rounded-xl mb-2" alt={movie.title} />
      <div>
        <h1 className="text-lg font-bold mb-4">{movie.title}</h1>
        <p className="text-sm">{movie.overview}</p>
      </div>
    </div>
  );
}
