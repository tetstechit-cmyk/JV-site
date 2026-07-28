import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Sai do modo rascunho e volta ao site publicado. */
export async function GET() {
  const draft = await draftMode();
  draft.disable();
  redirect("/");
}
