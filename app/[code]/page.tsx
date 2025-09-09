import { PresentationCard } from "../components/presentation-card";
import { presentations } from "../data/presentations";

export async function generateStaticParams() {
  return [];
}

export default function Home() {
  const title = "Tomas' presentations";
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {presentations.map((presentation) => (
          <PresentationCard key={presentation.id} presentation={presentation} />
        ))}
      </div>
    </div>
  );
}
