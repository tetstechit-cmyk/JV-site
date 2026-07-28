import { estaEmRascunho } from "@/lib/content";

/**
 * Aviso de modo rascunho.
 *
 * Sem isto, o João poderia achar que o conteúdo já está no ar quando
 * ainda é rascunho — o erro mais caro possível num CMS.
 */
export async function BarraRascunho() {
  if (!(await estaEmRascunho())) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-amber px-4 py-2 text-center text-[#120c02]">
      <span className="font-sans text-xs font-medium tracking-[0.14em] uppercase">
        Pré-visualização — inclui conteúdo não publicado
      </span>
      <a
        href="/api/preview/sair"
        className="font-sans text-xs font-semibold underline underline-offset-2 hover:opacity-75"
      >
        Sair da pré-visualização
      </a>
    </div>
  );
}
