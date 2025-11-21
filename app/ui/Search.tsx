"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const searchParam = params.get("search");

    if (searchParam) {
      setSearch(searchParam);
    } else {
      setSearch("");
    }
  }, []);

  return (
    <div className="search">
      <div className="search-wrapper">
        <input className="search-wrapper_input" type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      <div className="search-btn">
        <button onClick={() => updateFilter(search)}></button>
      </div>
    </div>
  );
}
