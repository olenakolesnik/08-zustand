"use client"
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { SyntheticEvent, useId, } from "react";

import { createNote, CreateNotePayload } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "@/types/note";

type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
function NoteForm() {
    const fieldId = useId();
    const router = useRouter();
    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation<Note, Error, CreateNotePayload>({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            router.push("/notes/filter/all");
        },
        onError: (error) => {
            console.error(error);
            alert("Error creating note");
        },
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setDraft({ ...draft, [name]: value });
    };
    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate({
            title: draft.title,
            content: draft.content,
            tag: draft.tag as Tag,
        });
    };
    return (
       
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input id={`${fieldId}-title`} type="text" name="title" className={css.input}
               required
               minLength={3}
                    maxLength={50}
                    value={draft.title}
                    onChange={handleChange}
                />
           
                </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                    <textarea
                    id={`${fieldId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                    maxLength={500}
                    value={draft.content}
                    onChange={handleChange}
                />
              
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <select
                    id={`${fieldId}-tag`} name="tag" className={css.select}
                    value={draft.tag}
                    onChange={handleChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
               
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton}
                    onClick={() => router.back()}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                   disabled={isPending}
                >
                    {isPending ? "Creating..." : "Create note"}
                </button>
            </div>
            </form>
           
    );
}

export default NoteForm;