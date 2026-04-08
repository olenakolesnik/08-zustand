import CreateNote from "./CreateNote";


export const metadata = {
    title: "Create Note | NoteHub App",
    description: "Create a new note quickly and easily in NoteHub App.",
    url: "https://localhost:3000/notes/action/create", 
    openGraph: {
      title: "Create Note | NoteHub App",
      description: "Create a new note quickly and easily in NoteHub App.",
      url: "https://localhost:3000/notes/action/create", 
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
  return <CreateNote />;
}