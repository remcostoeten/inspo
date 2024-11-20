import Drawboard from "@/components/drawboard";

export default function DrawboardPage({ params }: { params: { id: string } }) {
  return <Drawboard id={params.id} />;
}

// For static export, provide a minimal set of params
export function generateStaticParams() {
  return [{ id: "default" }];
}
