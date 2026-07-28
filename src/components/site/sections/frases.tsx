import { getFrases } from "@/lib/content";
import { FrasesView } from "./frases-view";

export async function FrasesMarquee() {
  const frases = await getFrases();
  return <FrasesView frases={frases} />;
}
