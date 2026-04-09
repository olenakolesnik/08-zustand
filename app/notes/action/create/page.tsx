import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Note | NoteHub App",
    description: "Create a new note quickly and easily in NoteHub App.",
    openGraph: {
      title: "Create Note | NoteHub App",
      description: "Create a new note quickly and easily in NoteHub App.",
      url: "https://example.com/notes/action/create", 
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Create Note | NoteHub App",
        },
      ],
    },
  };

export default function Page() {
  return <NoteForm />;
}