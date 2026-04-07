
import type { Metadata } from "next";

import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";



interface NoteProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({params}: NoteProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const note = await fetchNoteById(id);
        return {
            title: note.title,
            description: note.content.slice(0, 150),
            openGraph: {
                title: note.title,
                description: note.content.slice(0, 150),
                url: `http://localhost:3000/notes/${id}`,
                images: [
                    {
                        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                        width: 1200,
                        height: 630,
                        alt: "NoteHub",
                    }
                ]
            }
        };
    } catch {
        return {
            title: "Note not found",
            description: "This note does not exist or failed to load.",
        };
    }
}

async function Note({ params }: NoteProps) {
    const { id } = await params;

    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ["note", id],
queryFn: () => fetchNoteById(id),
    });
    

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
        </HydrationBoundary>
}
export default Note;