import Image from 'next/image'
import Search from './ui/Search';

export default async function Page({searchParams}) {

  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`, {next: {revalidate: 300}});
  const movies = await res.json()

  const imagePath = 'https://image.tmdb.org/t/p/w500'


  const sortedMovies = movies.results.sort((a,b) => {
    if(searchParams.sort === 'asc') {
      return a.title.localeCompare(b.title)
    }
    else if(searchParams.sort === 'desc') {
      return b.title.localeCompare(a.title);
    }
    else{
      return
    }
  })

  return (

    <main className='w-[70%] mx-auto my-[100px]'>
      <Search sortValue={searchParams.sort}/>

      <div className="grid grid-cols-6 gap-4 ">
        {sortedMovies.map(movie => (
          <div>
            <Image src={imagePath + movie.poster_path} width={200} height={200} className="w-full rounded-xl mb-2"/>
            <h1 className="text-sm">{movie.title}</h1>
          </div>
        ))}
      </div>
    </main>
  )
}
