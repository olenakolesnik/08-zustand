

import { fetchNoteById } from "@/lib/api";

import NotePreview from "./NotePreview.client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const queryClient = new QueryClient();
    const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview noteId={id} />
    </HydrationBoundary>
  );
}