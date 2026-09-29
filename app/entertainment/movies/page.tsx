import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntertainmentCatalog } from "@/components/entertainment-catalog";
import { entertainmentPlatforms, entertainmentTitles, getEntertainmentGenres } from "@/lib/entertainment";

export const metadata: Metadata = {
  title: "Nigerian Movies — Where to Watch",
  description: "Browse Nigerian movies by title, actor, genre and platform, with official Netflix and YouTube watch links.",
  alternates: { canonical: "/entertainment/movies" },
};

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; platform?: string; genre?: string }>;
}) {
  const params = await searchParams;
  const initialPlatform = entertainmentPlatforms.includes(params.platform as (typeof entertainmentPlatforms)[number])
    ? params.platform
    : "all";
  const genres = getEntertainmentGenres();
  const initialGenre = params.genre && genres.includes(params.genre) ? params.genre : "all";

  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Entertainment", href: "/entertainment" },
          { label: "Movies" },
        ]} />
        <span className="eyebrow">Nigerian movie directory</span>
        <h1>Movies and official places to watch.</h1>
        <p className="page-intro">
          Filter the catalog without loading video players or giant media files. Open a movie to see its verified official watch links and the date those links were checked.
        </p>
        <EntertainmentCatalog
          titles={entertainmentTitles}
          initialQuery={params.q ?? ""}
          initialPlatform={initialPlatform ?? "all"}
          initialGenre={initialGenre}
        />
      </div>
    </section>
  );
}
