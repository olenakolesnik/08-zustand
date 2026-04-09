"use client";

import { useState } from "react";
import { useQuery, keepPreviousData, DehydratedState } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import css from "./NotesPage.module.css";
import {FetchNotesResponse} from "@/lib/api"
import Link from "next/link";


type NotesClientProps = {
  initialPage: number;
  initialSearch: string;
  tag?: string;
  dehydratedState?: DehydratedState;
};

export default function NotesClient(props: NotesClientProps) {
  return <NotesContent {...props} />;
}
  

function NotesContent({ initialPage, initialSearch, tag }: { initialPage: number; initialSearch: string, tag?: string }) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
 
  

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1); 
  }, 500);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes({ page, search, tag }),
    placeholderData: keepPreviousData,
  });


  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onSearch={handleSearch} />
        {(data?.totalPages ?? 0) > 0 && (
          <Pagination
            page={page}
            totalPages={data?.totalPages ?? 0}
            onPageChange={handlePageChange}
          />
        )}
       
        <Link href="/notes/action/create" className={css.button}>
  Create note +
</Link>
      </header>

      {isLoading && <strong className={css.loading}>Loading notes...</strong>}
      
      {isError && <p>Error loading notes</p>}
      {(data?.notes ?? []).length > 0 && (
        <NoteList notes={data?.notes ?? []} />
      )}

    </div>
  );
}