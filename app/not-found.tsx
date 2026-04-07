import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 - Page not found",
    description: "Sorry, the page you are looking for does not exist.",
    openGraph: {
        title: "404 - Page not found",
        description: "Sorry, the page you are looking for does not exist.",
        url: "./not-found",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "Not found",
            }
        ]
    },
  };



function Notfound() {
    return (
<div>
 <h1>404 - Page not found</h1>
<p>Sorry, the page you are looking for does not exist.</p>
</div>
    )
}
export default Notfound;

