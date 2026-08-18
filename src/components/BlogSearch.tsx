import { useState } from "react";

interface Post {
    id: string;
    title: string;
    description: string;
    date: string;
    slug: string;
    category: string;
    image: {
		name: string;
		url: string;
	}
}

interface Props {
    posts: Post[];
}

const CATEGORIAS = ["todas", "devlog", "notas"];

export default function BlogSearch({ posts }: Props) {
    const [query, setQuery] = useState("");
    const [categoriaActiva, setCategoriaActiva] = useState("todas");

    const postsFiltrados = posts.filter((post) => {
        const coincideTitulo = post.title.toLowerCase().includes(query.toLowerCase());
        const coincideCategoria = categoriaActiva === "todas" || post.category === categoriaActiva;
        return coincideTitulo && coincideCategoria;
    });

    return (
        <div>
        <input
            type="text"
            placeholder="Buscar posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 rounded-lg border border-border bg-surface text-ink mb-4 focus:outline-none focus:border-accent"
        />

        <div className="flex flex-wrap gap-3 mb-10">
            {CATEGORIAS.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setCategoriaActiva(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium border capitalize transition-all ${
                        categoriaActiva === cat
                            ? "bg-accent text-white border-accent shadow-[0_0_20px_-5px_var(--color-accent)]"
                            : "bg-surface text-ink-muted border-border hover:border-accent hover:text-ink"
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsFiltrados.map((post) => (
        <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block p-6 rounded-xl border border-border bg-surface hover:border-accent transition-colors"
            >
            {post.image?.url && (
                <img src={post.image.url} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            )}    
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full border mb-3 ${
                post.category === "devlog"
                ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                : "bg-sky-500/10 text-sky-400 border-sky-500/30"
            }`}>
                {post.category}
            </span>
            <h2 className="font-display text-xl font-semibold mb-2 text-ink">{post.title}</h2>
            <p className="text-ink-muted">{post.description}</p>
        </a>
        ))}
        </div>

        {postsFiltrados.length === 0 && (
            <p className="text-ink-faint">No se encontraron posts.</p>
        )}
        </div>
    );
}