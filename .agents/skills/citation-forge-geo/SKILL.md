---
name: citation-forge-geo
description: Deterministic Generative Engine Optimization (GEO / AEO) auditing, Citation Share-of-Voice (cSoV) scoring, llms.txt & llms-full.txt compilation, AI crawler robots.txt patching, and JSON-LD entity graph synthesis. Use when auditing domains for AI Search visibility across ChatGPT Search, Perplexity, Gemini, and Claude.
---

# CitationForge GEO & Entity Graph Engineering Skill

This project-local skill codifies the deterministic formulas, structural validators, and compilation templates used by **CitationForge (#1)**.

---

## 1. Deterministic Scoring Formulas

### A. Citation Share-of-Voice (`cSoV` %)
Evaluates a brand $B$ across $N = 25$ high-intent category buyer prompts and $|E| = 4$ answer engines (`ChatGPT Search`, `Perplexity`, `Gemini AI Overviews`, `Claude Search`):

1. **Position Discount Weight**:
   $$w_r = \frac{1}{\log_2(r + 1)}$$
   where $r \in \{1, 2, 3, 4, 5\}$ is the citation rank within the synthesized response ($w_1 = 1.000$, $w_2 = 0.631$, $w_3 = 0.500$, $w_4 = 0.431$, $w_5 = 0.387$).
2. **Prompt-Engine Weighted Share**:
   $$s_{i,e}(B) = \frac{w_{r_{i,e}(B)}}{\sum_{c \in C_{i,e}} w_{r_{i,e}(c)}}$$
3. **Aggregate `cSoV` (%)**:
   $$\text{cSoV}(B) = \text{round}\left(\frac{100}{N \cdot |E|} \sum_{i=1}^{N} \sum_{e \in E} s_{i,e}(B), 1\right)$$

### B. `llms.txt` & Agent-Readability Score (0–100)
Computed as the weighted sum of 5 structural checkpoints:
- **`/llms.txt` Presence & Spec Validity (30 pts)**:
  - Starts with `# H1` (+10)
  - Contains `> Blockquote` summary (+5)
  - Contains `## H2` categorized markdown link lists with `: description` (+15)
- **`/llms-full.txt` Deep Context Manifest (15 pts)**:
  - Accessible at `/llms-full.txt` with inline markdown documentation corpus (+15)
- **AI Bot `/robots.txt` Access Permissions (25 pts)**:
  - Explicit `Allow: /` (or non-blocked) for `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `Google-Extended`, and `ClaudeBot` (5 pts each, max 25 pts)
- **Semantic Heading & Answer-First Hierarchy (15 pts)**:
  - Clean `H1 -> H2 -> H3` hierarchy with 40–60 word direct definitions immediately following H2 headings (+15)
- **Token-to-HTML Signal Ratio (15 pts)**:
  - Ratio $\rho = \frac{\text{Clean Markdown Bytes}}{\text{Raw HTML Bytes}}$. Full 15 pts when $\rho \ge 0.28$; linear decay down to 3 pts when $\rho < 0.08$.

### C. JSON-LD Entity Graph Density Score (0–100)
Evaluates structured data completeness for RAG entity disambiguation:
- **`Organization` Node (25 pts)**: `@id`, `name`, `url`, `logo`, `description`.
- **`sameAs` Knowledge Graph Links (25 pts)**: Links to Wikidata (`wikidata.org/wiki/Q...`), GitHub, LinkedIn, Crunchbase, Wikipedia (5 pts per verified authority link, max 25 pts).
- **`SoftwareApplication` / `Product` Node (25 pts)**: Includes `applicationCategory`, `operatingSystem`, `offers` (`price`, `priceCurrency`), and `aggregateRating`.
- **`FAQPage` Node (25 pts)**: At least 4 structured `Question` + `acceptedAnswer` pairs matching high-intent category queries.

### D. Composite GEO Visibility Grade & Score (0–100)
$$\text{GEO Score} = \text{round}(0.40 \cdot \text{Normalized cSoV} + 0.30 \cdot \text{Agent Readability} + 0.30 \cdot \text{Entity Density})$$
- **90–100**: `A+` (Dominant Citation Authority)
- **80–89**: `A` (High AI Search Visibility)
- **70–79**: `B` (Moderate Citation Presence — Missing Deep Schema or `llms-full.txt`)
- **55–69**: `C` (Vulnerable — Competitors Capturing High-Intent Prompts)
- **< 55**: `D` (Invisible to Answer Engines / Blocking AI Crawlers)

---

## 2. Auto-Compiler Output Artifacts

Every CitationForge audit (`POST /api/audit`) deterministically compiles 4 deploy-ready artifacts customized for the target domain:
1. **`llms.txt`**: Compliant with `AnswerDotAI/llms-txt` v1.0 spec.
2. **`llms-full.txt`**: Multi-section inline Markdown corpus with YAML metadata headers, core product architecture, pricing matrix, security posture, and citations.
3. **`robots.txt` AI Patch**: Explicit allow rules for `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Google-Extended`, `ClaudeBot`, `Amazonbot`, and `Applebot-Extended`, plus `Sitemap:` and `LLMs-Txt:` directives.
4. **`JSON-LD` `@graph` Bundle**: Strict `schema-dts` compliant `<script type="application/ld+json">` block combining `Organization`, `SoftwareApplication`, and `FAQPage`.
