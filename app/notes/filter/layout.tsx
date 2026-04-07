import css from "./LayoutNotes.module.css";

interface NotesLayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}
  
function NotesLayout({ sidebar, children }: NotesLayoutProps) {
    return (
        <section  className={css.container}>
            <div className={css.sidebar}>{sidebar}</div>
            <div className={css.notesWrapper}>{children}</div>
            </section>
    );
}
export default NotesLayout;