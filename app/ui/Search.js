'use client'
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search({sortValue}) {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)
	const router = useRouter();


  const handleSortChange = (event) => {
	//router.push(`?sort=${event.target.value}`,undefined,{shallow:true})
	params.set('sort', event.target.value)
	router.replace(`/?${params.toString()}`)
  };

  const selectOptions = [
    { name: 'Popular', value: 'popular' },
    { name: 'A-Z', value: 'asc' },
    { name: 'Z-A', value: 'desc' },
  ];

  const categoryOptions = [
    { name: 'Comedy', value: 'comedy' },
    { name: 'Action', value: 'action' },
    { name: 'Drama', value: 'drama' },
	{ name: 'Animation', value: 'animation' },
  ];
  

  return (
	<div>
		<select
		className="text-black p-2 rounded-lg mb-4"
		onChange={handleSortChange}
		>
		{selectOptions.map((option) => (
			<option key={option.value} value={option.value} selected={sortValue === option.value}>
			{option.name}
			</option>
		))}
		</select>

		{categoryOptions.map(option => (
			<label className='block'>
				<input id={option.name} type="checkbox" value={option.value} onClick={ e => {
					
					const checked = e.target.checked
					!checked ? params.delete(option.name) : params.set(option.name, option.value)
					router.replace(`/?${params.toString()}`)
				}}/>
				<span>{option.name}</span>
			</label>
		))}

		
		
	</div>
  );
}
