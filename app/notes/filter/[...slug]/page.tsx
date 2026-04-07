


import NotesClient from "./Notes.client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
interface NotesFilterProps {
    params: Promise<{ slug: string[] }>;
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