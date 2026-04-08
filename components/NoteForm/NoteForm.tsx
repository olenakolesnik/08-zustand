"use client"
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { SyntheticEvent, useId } from "react";

import { createNote } from "@/lib/api";


function NoteForm() {
    const fieldId = useId();
    const router = useRouter();

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tag = formData.get("tag") as string;

        try {
            await createNote({ title, content, tag });
            router.push("/notes"); 
          } catch (error) {
            console.error(error);
            alert("Error creating note");
          }
    };

    return (
       
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input id={`${fieldId}-title`} type="text" name="title" className={css.input}
               required
               minLength={3}
               maxLength={50} />
           
                </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                    <textarea
                    id={`${fieldId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                    maxLength={500}
                />
              
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <select
                        id={`${fieldId}-tag`} name="tag" className={css.select}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
                {/* <ErrorMessage name="tag" component="span" className={css.error} /> */}
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton}
                    onClick={() => router.back()}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                >
                    Create note
                </button>
            </div>
            </form>
           
    );
}

export default NoteForm;