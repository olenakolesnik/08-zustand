import { fetchNotes } from "@/lib/api";
import css from "./SidebarNotes.module.css";
import Link from "next/link";


async function SidebarNotes() {
    const data = await fetchNotes(
        {
            page: 1,
            search: "",
            perPage: 12,
        }
    );
  
  const TAGS = [
    { value: "all", label: "All notes" },
    { value: "Todo", label: "Todo" },
    { value: "Work", label: "Work" },
    { value: "Personal", label: "Personal" },
    { value: "Meeting", label: "Meeting" },
    { value: "Shopping", label: "Shopping" },
  ];
    
  return (
   
    <ul className={css.menuList}>
      {TAGS.map(({ value, label }) => (
        <li key={value} className={css.menuItem}>
          <Link href={`/notes/filter/${value}`} className={css.menuLink}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SidebarNotes;