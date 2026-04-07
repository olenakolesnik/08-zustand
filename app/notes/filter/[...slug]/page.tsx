
import type { Metadata } from "next";

import NotesClient from "./Notes.client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

interface NotesFilterProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesFilterProps):Promise<Metadata> {
   const { slug } = await params;
   const allowedTags = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
   const tagFromSlug = slug?.[0];
   const tag = tagFromSlug === "all" ? undefined : allowedTags.includes(tagFromSlug) ? tagFromSlug : undefined;
   const title = tag ? `Notes - ${tag}` : "All notes";
   const description = tag ? `Browse notes filtered by "${tag}". Find relevant notes quickly.`
    : "Browse all notes. Manage your tasks, meetings, and personal notes.";
    const url = tag ? `/notes/filter/${tag}` : `/notes/filter/all`;
   return {
      title,
      description,
      openGraph: {
         title,
         description,
         url,
         images: [
           {
             url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg", 
             width: 1200,
             height: 630,
             alt: "Notes App",
           },
         ],
       },
   };
}

const allowedTags = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
 async function NoteFilter({ params }: NotesFilterProps) {
    const { slug } = await params;
    const tagFromSlug = slug?.[0];
    const tag = tagFromSlug === "all" ? undefined : allowedTags.includes(tagFromSlug) ? tagFromSlug : undefined;
    
     const queryClient = new QueryClient();
     await queryClient.prefetchQuery({
        queryKey: ["notes", { page: 1, search: "", tag }],
        queryFn: () => fetchNotes({ page: 1, search: "", tag }),
     });
    return (
        
            <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient initialPage={1} initialSearch="" tag={tag} />
            </HydrationBoundary>
       
)
}
export default NoteFilter;