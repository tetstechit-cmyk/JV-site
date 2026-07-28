/* Logo do João na tela de login do painel. */
export default function Logo() {
  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-jv-trim.png"
        alt="João Vitor"
        style={{ height: 64, width: "auto", margin: "0 auto" }}
      />
      <p
        style={{
          marginTop: "1rem",
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.65rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#9d9891",
        }}
      >
        Painel de conteúdo
      </p>
    </div>
  );
}
