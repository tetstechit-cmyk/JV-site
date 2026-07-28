import Link from "next/link";

/**
 * Rodapé da navegação do painel.
 *
 * O Payload oferece logout só por um ícone discreto — invisível para um
 * mantenedor não-técnico. Aqui damos um "Sair" explícito e um atalho para
 * ver o site publicado.
 */
export default function RodapeNav() {
  const item: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
    padding: "0.5rem 0.7rem",
    borderRadius: 6,
    fontSize: "0.82rem",
    textDecoration: "none",
  };

  return (
    <div
      style={{
        marginTop: "1.5rem",
        paddingTop: "1rem",
        borderTop: "1px solid rgba(242,239,233,0.11)",
        display: "flex",
        flexDirection: "column",
        gap: "0.15rem",
      }}
    >
      <Link href="/" target="_blank" style={{ ...item, color: "#a29c93" }}>
        <span aria-hidden>↗</span> Ver o site
      </Link>
      <Link href="/admin/logout" style={{ ...item, color: "#ec6a5c" }}>
        <span aria-hidden>⏻</span> Sair do painel
      </Link>
    </div>
  );
}
