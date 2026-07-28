# Escopo 2 — Painel Administrativo · Blueprint (v3)

> Status: **APROVADO** (2026-07-22) — deploy único + Payload CMS + admin em subdomínio.
> Motivo do Payload: é produto do João (não vira produto revendável da Corex),
> então entrega rápida e menor superfície de segurança pesam mais que admin on-brand.
> Substitui o ADR-001 do `ARQUITETURA.md` (v2), cujo gatilho de revisão foi ativado.
> Data: 2026-07-22

---

## 0. O que mudou desde o v2

O site foi **reposicionado** (briefing do cliente): não vende mais "João Vitor,
cantor sertanejo" — vende **experiência musical**. A Home tem 11 seções
narrativas e o artista só aparece a 66% da página.

E o cliente pediu: **"o painel precisa controlar todos os textos e imagens, de
todas as seções"**.

Isso levou o escopo de **9 entidades simples** → **~15 entidades + upload de
mídia + ordenação de listas + rascunho/publicar + preview**.

O ADR-001 do v2 escolheu "custom enxuto" com esta condição escrita:

> *"Gatilho de revisão: se surgir multi-usuário com papéis, **muitos tipos de
> conteúdo novos**, ou o prazo apertar → migra pra Payload."*

**O gatilho disparou.** Este documento revisita a decisão.

---

## 1. Reframe — as duas decisões reais

O que foi perguntado: *"custom ou CMS?"* e *"backend separado não é mais seguro?"*

O que se decide de verdade:

> **(1)** Quanto código de infraestrutura de conteúdo faz sentido escrever à mão,
> sabendo que **cada linha é superfície de bug e de ataque** — num projeto onde o
> valor está no site, não no CRUD.
>
> **(2)** Onde fica a **fronteira de autorização** — que não é o deploy, é a ação.

---

## 2. As forças que decidem

1. **Mantenedor não-técnico.** O João travou no Wix. Precisa editar sem medo e
   **sem conseguir quebrar** o layout.
2. **Risco de produto (novo).** O posicionamento acabou de ser definido. Se o
   hero/manifesto forem reescritos sem critério, a estratégia evapora. Precisa de
   **rascunho + preview + histórico para reverter**.
3. **Segurança cobrada como sênior.** Authz por ação, zod em tudo, upload
   validado, rate limit, segredos server-only. **Mais código escrito à mão = mais
   superfície para revisar.**
4. **Ops e custo ~zero**, entrega por escopos aprováveis.

---

## 3. ADR-008 — Deploy separado (backend à parte)?  ❌ **Não**

**Decisão:** manter **um único deploy Next.js** (front + admin + API na mesma
aplicação), com banco e mídia externos.

**Por que a intuição de "separado = mais seguro" falha aqui:**

No App Router o backend **já é separado do cliente**: Server Components/Actions
rodam em funções serverless, e o bundle do navegador nunca recebe segredo nem
query (garantido por `import 'server-only'` — o build quebra se violar).

| Separar em 2 deploys | Efeito real |
|---|---|
| "isolamento" | Publica **uma API na internet** — alvo novo que hoje não existe |
| auth entre serviços | **Mais um segredo** para gerenciar e vazar |
| CORS | Nova superfície de configuração para errar |
| latência | 2 saltos (front → API → banco) em vez de 1 |
| ops | 2 projetos, 2 pipelines, 2 conjuntos de env |

Nada disso mitiga o que realmente derruba CMS: **authz fraca, upload malicioso,
XSS armazenado, brute-force**. Um backend separado com `requireAdmin()` mal feito
é invadido igual.

**O isolamento que importa (e que está no plano):**
- Banco fora do app (Neon, pooled) ✓
- Mídia fora do app (Blob/CDN) ✓
- Admin isolado **logicamente**: `requireAdmin()` dentro de **cada** ação, rate
  limit próprio, headers/CSP próprios
- Segredos server-only ✓

**Gatilho de revisão:** app mobile ou parceiros consumindo a mesma API; time
separado com ciclo de deploy próprio; compliance exigindo isolamento de rede.
Nenhum existe hoje.

---

## 4. ADR-001 (revisado) — Motor do admin

| | **(A) Custom** | **(B) Payload CMS 3** | **(C) Híbrido** |
|---|---|---|---|
| Mantenedor não-técnico | CRUDs simples; preview e histórico **custam caro** | Rascunho, **preview ao vivo**, **versionamento/reverter**, upload com crop, painel pt-BR — **prontos** | = B agora |
| Proteção do posicionamento | precisa construir versionamento do zero | **nativo** (reverter em 1 clique) | nativo |
| Segurança | ~15 CRUDs + upload + auth **escritos à mão** = superfície grande | Access control declarativo, auth e upload **testados por milhares de projetos** | menor agora |
| Marca / revenda | **Admin 100% Corex** — vira produto revendável | Admin com a cara do Payload (dá logo/cores, não é 100%) | migra depois |
| Esforço do Escopo 2 | **Alto** | **Médio-baixo** | médio |
| Dependência | nenhuma | +1 framework (MIT, self-hosted, mesmo Neon) | idem |
| Compatibilidade | — | ✅ Payload ≥3.73 suporta Next ≥16.2.2 (temos **16.2.11**) | — |

**Recomendação: (B) Payload CMS**, com o admin em `/painel` no mesmo app e no
mesmo Postgres Neon.

**Por quê:** o requisito virou *"o João muda tudo, sempre, sem quebrar"*. Isso
não é CRUD — é **rascunho + preview + histórico + mídia**, exatamente o que um
CMS maduro entrega pronto e auditado. Escrever isso à mão gasta o Escopo 2 inteiro
em infraestrutura de conteúdo, **sem agregar valor ao produto**, e multiplica a
superfície que o próprio JP vai ter que revisar em segurança.

**Gatilho de revisão (quando eu mudaria de ideia):** se o objetivo for
**transformar isso em produto Corex** para revender a outros artistas, o admin
on-brand vira ativo comercial — aí (A) ou (C) ganham. É uma decisão de negócio,
não técnica: **só o JP responde.**

---

## 4b. ADR-009 — Painel em subdomínio  ✅ **aprovado**

**Decisão:** admin acessível em `painel.<dominio>.com.br` (mesmo deploy, mesmo
app). O isolamento é de **origem**, não de infraestrutura.

**Ganho real:**
- **Cookie de sessão isolado** por host — se um script de terceiro no site
  público for comprometido, o cookie do painel não está naquele contexto.
- **CSP, headers e rate limit próprios** para a origem do painel.
- Permite pôr uma **camada extra na porta** (proteção de acesso da plataforma ou
  allowlist de IP) sem afetar o site público.

**Custo:** um registro DNS a mais e roteamento por host. Sem API pública, sem
CORS, sem token de serviço — ou seja, **nenhum dos custos do deploy separado**.

---

## 5. Modelo de conteúdo — as 11 seções

Princípio: **campos fixos + listas ordenáveis**. O João muda todo texto e imagem,
adiciona/remove/reordena itens — mas **não move seções nem toca no design**.
Liberdade de conteúdo, zero liberdade de quebrar.

### Globals (singleton — 1 registro, sempre existe)

| Global | Campos |
|---|---|
| `hero` | eyebrow, linha1, linha2, subtítulo, CTA primário/secundário, **mídia de fundo (vídeo ou imagem)**, poster |
| `manifesto` | eyebrow, parágrafos[] (ordenável), frase de fecho 1 e 2 |
| `momentosMeta` | eyebrow, título, lead |
| `publicosMeta` | eyebrow, título, lead |
| `processoMeta` | eyebrow, título, lead |
| `formatosMeta` | eyebrow, título, lead |
| `provaMeta` | eyebrow, título |
| `artista` | eyebrow, nome, headline, bio, foto, **spotifyType + spotifyId** |
| `kit` | eyebrow, título, lead, itens[], CTA |
| `contato` | eyebrow, título, lead, perguntas[], fecho, nota do WhatsApp |
| `settings` | WhatsApp, redes sociais, cidade, SEO/OG |

### Collections (listas ordenáveis, com publicado/rascunho)

| Collection | Campos | Ordenável |
|---|---|---|
| `momentos` | mídia, alt, legenda | ✓ |
| `publicos` | título, frase, descrição, **imagem** | ✓ |
| `etapas` | título, descrição | ✓ |
| `formatos` | título, descrição, "melhor para" | ✓ |
| `numeros` | valor, rótulo | ✓ |
| `empresas` | nome, logo (opcional), site | ✓ |
| `depoimentos` | autor, cargo/empresa, citação, avatar | ✓ |
| `shows` | título, local, cidade/UF, data, link, descrição, cancelado | por data |
| `frases` | texto (frases de palco) | ✓ |
| `midia` | upload (imagem/vídeo), alt, tamanhos gerados | — |
| `leads` | nome, telefone, e-mail, tipo, nº pessoas, atmosfera, mensagem, status, notas | por data |
| `admins` | e-mail, senha (hash), papel | — |

---

## 6. Rascunho → Preview → Publicação

1. João edita → salva como **rascunho** (site público não muda).
2. Clica **Preview** → vê o site real com o conteúdo novo (rota de preview
   assinada, só com sessão válida).
3. Clica **Publicar** → versão vira ativa e a rota revalida
   (`revalidatePath('/')`) — o site atualiza em segundos.
4. Errou? **Histórico** → restaura a versão anterior em 1 clique.

Esse fluxo é a **proteção do posicionamento**: nada entra no ar sem ele ver
antes, e todo erro é reversível.

---

## 7. Segurança — específico desta escolha

- [ ] Admin (`/painel`) com **access control declarativo**: leitura pública só do
      que está publicado; escrita **exige sessão** em toda operação.
- [ ] **Middleware não é fronteira** — a autorização vive na camada de acesso a
      dados (vale para Payload e para custom).
- [ ] Login endurecido: hash forte, **rate limit por IP confiável da plataforma**
      (não `x-forwarded-for` cru), sem lockout de conta (admin único → auto-DoS).
- [ ] Upload: allowlist de tipos (raster + mp4), teto de tamanho, **SVG banido**,
      re-encode/normalização, nome com sufixo aleatório.
- [ ] Rich text/markdown **sanitizado** na renderização (XSS armazenado é o vetor
      nº 1 de CMS).
- [ ] CSP com **nonce** (sem `unsafe-inline` em script); `frame-ancestors 'none'`;
      `frame-src` só Spotify/YouTube.
- [ ] Leitura pública sempre filtrando `publicado`.
- [ ] Leads: consentimento + retenção (LGPD), sem PII em log, export CSV com
      escape anti-fórmula.
- [ ] Segredos server-only + validação de env; grep de segredo no bundle no CI.
- [ ] `security-review` + `code-review` antes de fechar o escopo.

---

## 8. Plano faseado do Escopo 2

| Fase | Entrega | Pré-requisito |
|---|---|---|
| **2.0** | Neon conectado + migrations + admin semeado | **conexão Neon no `.env`** + e-mail do admin |
| **2.1** | Motor do admin no ar (`/painel`), login endurecido, rate limit | 2.0 |
| **2.2** | Globals das 11 seções + mídia (upload/otimização) | 2.1 |
| **2.3** | Collections ordenáveis + rascunho/preview/histórico | 2.2 |
| **2.4** | Site público lendo do banco (RSC + revalidação na publicação) | 2.3 |
| **2.5** | Leads: formulário grava no banco + notificação + inbox | 2.3 |
| **2.6** | `security-review` + `code-review` + migração do conteúdo atual | tudo |

Enquanto o Escopo 2 roda, o **front já publicado continua no ar** (mock) — o
João não fica sem site.

---

## 9. Princípios que ficam

1. **Fronteira de segurança é a ação, não o deploy.** Separar serviços resolve
   *escala e times*, não *autorização*.
2. **Código que você não escreve não tem bug seu.** Em infraestrutura commodity
   (auth, upload, versionamento), reusar maduro é decisão sênior — não preguiça.
3. **Liberdade de conteúdo ≠ liberdade de layout.** Para mantenedor não-técnico,
   restringir a estrutura é o que torna o painel usável.
4. **Reversibilidade.** Rascunho + histórico transformam "erro" em "ctrl+z".
5. **Decisão anterior com premissa nova = decisão nova.** O ADR-001 não estava
   errado; o escopo mudou. Registrar o gatilho é o que permite perceber isso.
