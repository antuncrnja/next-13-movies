"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const updateURLParams = () => {
    const queryString = params.toString().replace(/%2C/g, ",");
    router.replace(`/?${queryString}`);
  };

  const handleSortChange = (e) => {
    params.set("sort", e.target.value);
    updateURLParams();
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    params.set("search", e.target.value);
    e.target.value === "" && params.delete("search");
    updateURLParams();
  };

  const handleCheckboxChange = (e, option) => {
    const checked = e.target.checked;

    if (!checked) {
      const categories = params
        .getAll("cat")[0]
        .split(",")
        .filter((cat) => cat !== option);
      params.delete("cat");
      if (categories.length > 0) {
        params.set("cat", categories.join(","));
      }
    } else {
      const categories = params.getAll("cat");
      categories.push(option);
      params.set("cat", categories.join(","));
    }

    updateURLParams();
  };

  const isChecked = (optionValue) => (params.getAll("cat")[0]?.split(",").includes(optionValue) ? true : false);

  const handleResetButton = () => {
    router.replace("/");
    setSearchValue("");
  };

  const selectOptions = [
    { name: "Popular", value: "popular" },
    { name: "A-Z", value: "asc" },
    { name: "Z-A", value: "desc" },
  ];

  const categoryOptions = [
    { name: "Comedy", value: "35" },
    { name: "Action", value: "28" },
    { name: "Romance", value: "10749" },
    { name: "Animation", value: "16" },
  ];

  return (
    <div>
      <select className="text-black p-2 rounded-lg mb-4" onChange={handleSortChange} value={params.get("sort") || "popular"}>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      {categoryOptions.map((option) => (
        <label className="block py-1" key={option.value}>
          <input className="mr-1" type="checkbox" defaultValue={option.value} onChange={(e) => handleCheckboxChange(e, option.value)} checked={isChecked(option.value)} />
          <span>{option.name}</span>
        </label>
      ))}

      <input type="search" className="block mt-4 rounded p-2 text-black" onChange={handleSearchChange} value={searchValue} />

      <button className="text-xs my-5" onClick={handleResetButton}>
        Reset
      </button>
    </div>
  );
}
