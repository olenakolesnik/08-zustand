"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";


interface Props {
    noteId: string;
}

function NotePreview({ noteId }: Props) {
  const router = useRouter();
    const { data: note, isLoading, isError } = useQuery({
        queryKey: ["note", noteId],
      queryFn: () => fetchNoteById(noteId),
      refetchOnMount: false,
    });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note</p>
    if (!note) return <p>Note not found</p>;
    const handleClose = () => {
      router.back(); 
    };
    return (
      <Modal onClose={handleClose}>
      <button className={css.backBtn} onClick={handleClose}>
        Close
      </button>

      <h2 className={css.header}>{note.title}</h2>
      <p className={css.tag}>{note.tag}</p>
      <p className={css.content}>{note.content}</p>
      <p className={css.data}>{note.createdAt}</p>
    </Modal>
  );
  }
export default NotePreview;