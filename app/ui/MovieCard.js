import Image from "next/image";
import Link from "next/link";

const imagePath = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  return (
    <div key={movie.id}>
      <Link href={`/${movie.title.toLowerCase().replace(/\s+/g, "-") + "?movie_id=" + movie.id}`}>
        <Image src={imagePath + movie.poster_path} width={200} height={200} className="w-full rounded-xl mb-2 pointer-events-none" alt={movie.title.replace(" ", "-")} />
        <h1 className="text-sm">{movie.title}</h1>
      </Link>
    </div>
  );
}
