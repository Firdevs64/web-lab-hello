import { useEffect, useState } from "react";
import type { Project, Category, SortField, SortOrder } from "./types/project";
import { fetchProjects } from "./services/projectService";
import { applyFilters } from "./utils/projectHelpers";

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sortField, setSortField] = useState<SortField>("year");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects();
        setProjects(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Veri yuklenemedi");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = applyFilters(
    projects,
    search,
    category,
    sortField,
    sortOrder
  );

  return (
    <div style={{ padding: "24px", fontFamily: "system-ui" }}>
      <h1>Projelerim</h1>

      {error && (
        <div
          style={{
            background: "crimson",
            color: "white",
            padding: "12px",
            marginBottom: "16px",
            borderRadius: "8px",
          }}
        >
          <strong>Hata:</strong> {error}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Proje ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setCategory("all")}>Tumu</button>
        <button onClick={() => setCategory("frontend")}>Frontend</button>
        <button onClick={() => setCategory("fullstack")}>Fullstack</button>
        <button onClick={() => setCategory("backend")}>Backend</button>

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as SortField)}
        >
          <option value="year">Yil</option>
          <option value="title">Baslik</option>
        </select>

        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? "Artan" : "Azalan"}
        </button>
      </div>

      {loading && <p>Yukleniyor...</p>}

      {!loading && filteredProjects.length === 0 && (
        <p>Eslesen proje bulunamadi.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
            }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              <strong>Teknolojiler:</strong> {project.tech.join(", ")}
            </p>
            <p>
              <small>
                {project.year} · {project.category}
              </small>
            </p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: "16px" }}>
        {filteredProjects.length} / {projects.length} proje gosteriliyor
      </p>
    </div>
  );
}