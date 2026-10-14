# CitationForge (#1) — GitHub Repository & Open-Source GEO Scout Report

**Date**: 2026-10-14  
**Builder**: Builder-CitationForge  
**Workspace**: `/Users/kadermula/Downloads/Ideas/studio/citation-forge/`

---

## 1. Executive Summary

To build **CitationForge** (*The Autonomous AI-Search (GEO/AEO) Visibility Radar, Citation Share-of-Voice Scorer & Auto-`llms.txt` / JSON-LD Knowledge Graph Compiler*), we scouted the top open-source repositories, specifications, and architectural patterns across `llms.txt` generation, LLM-ready web crawling, Generative Engine Optimization (GEO) citation scoring, and strict JSON-LD entity graph compilation.

---

## 2. Top Open-Source Repositories Scouted

| Repository | Stars | Core Focus | Key Architectural Takeaways for CitationForge |
| :--- | :--- | :--- | :--- |
| **`firecrawl/firecrawl`** | ★ 191,293 | Turn entire websites into LLM-ready markdown & automated `/llms.txt` + `/llms-full.txt` generation | Strips DOM boilerplate (`nav`, `footer`, ads), extracts clean CommonMark hierarchy, and pairs an index manifest (`llms.txt`) with an inline context corpus (`llms-full.txt`). |
| **`unclecode/crawl4ai`** | ★ 85,483 | Open-source web crawler & scraper for LLMs and AI agents | Measures token-to-HTML bloat ratio (`clean_markdown_tokens / raw_html_tokens`), extracts semantic heading trees (`H1 -> H2 -> H3`), and identifies crawler traps. |
| **`AgriciDaniel/claude-seo`** | ★ 18,881 | Universal SEO & GEO/AEO skill suite covering agent readiness, `llms.txt`, schema, and E-E-A-T | Evaluates AI crawler directives in `/robots.txt` (`GPTBot`, `OAI-SearchBot`, `Google-Extended`, `PerplexityBot`, `ClaudeBot`, `Applebot-Extended`) and Answer-First formatting (40-60 word concise definitions under H2/H3). |
| **`AnswerDotAI/llms-txt`** | ★ 2,656 | Official `/llms.txt` specification by Jeremy Howard (Answer.AI) | Strict sequence: `# H1 Project/Brand Name` (required) -> `> Blockquote 1-2 sentence summary` -> Preamble rules -> `## H2 Section Categories` -> `- [Title](URL): Concise description`. |
| **`google/schema-dts`** | ★ 1,420+ | Strict TypeScript definitions for Schema.org JSON-LD graphs | Enforces `@graph` composition connecting `Organization`, `SoftwareApplication`, `Product`, `FAQPage`, and `WebSite` with `@id` cross-references and `sameAs` entity disambiguation links (Wikidata, GitHub, LinkedIn, Crunchbase). |

---

## 3. Core Specifications Adopted in CitationForge

### A. The `llms.txt` & `llms-full.txt` Compiler Spec (`llmstxt.org`)
1. **`/llms.txt` (Lightweight Agent Index)**:
   - Served at root `/llms.txt` with `Content-Type: text/plain; charset=utf-8`.
   - Required `# Brand Name` H1 header.
   - Required `> One-sentence high-signal entity summary` blockquote.
   - Structured `## Core Documentation`, `## Product & Pricing`, `## API & SDK Reference`, and `## Optional` H2 sections containing `- [Page Title](https://domain/path.md): Fact-dense description` links.
2. **`/llms-full.txt` (Single-Fetch Deep Context Manifest)**:
   - Concatenates the full normalized Markdown text of the primary product, architecture, pricing, security, and FAQ pages with YAML frontmatter boundaries so RAG agents (`PerplexityBot`, `OAI-SearchBot`, `ClaudeBot`) can ingest the entire brand knowledge graph in a single HTTP request.

### B. Deterministic Citation Share-of-Voice (`cSoV`) Formula
Across $N = 25$ category buyer-intent prompts evaluated across 4 AI answer engines (**ChatGPT Search**, **Perplexity Pro**, **Google Gemini AI Overviews**, **Claude Search**):
- Each citation at rank position $r \in \{1, 2, \dots, K\}$ receives a logarithmic discount weight:
  $$w_r = \frac{1}{\log_2(r + 1)}$$
- For prompt $i$ and engine $e$, if brand $B$ is cited at rank $r_{i,e}$ among total cited competitors with weights $\sum_{c} w_{r_{i,e,c}}$, the prompt-engine share is:
  $$s_{i,e}(B) = \frac{w_{r_{i,e}(B)}}{\sum_{c \in C_{i,e}} w_{r_{i,e}(c)}}$$
- Overall **Citation Share-of-Voice (`cSoV` %)**:
  $$\text{cSoV}(B) = \frac{100}{N \cdot |E|} \sum_{i=1}^{N} \sum_{e \in E} s_{i,e}(B)$$

### C. Dual-Reader JSON-LD Entity Graph (`schema-dts` Pattern)
RAG retrieval pipelines cross-check prose claims against structured `@graph` JSON-LD blocks. CitationForge compiles a unified `@graph` containing:
1. `Organization` with `@id`, `name`, `url`, `logo`, `foundingDate`, and `sameAs` array (Wikidata Q-ID, LinkedIn, GitHub, X, Crunchbase).
2. `SoftwareApplication` / `Product` with `applicationCategory`, `operatingSystem`, `offers` (`AggregateOffer` with currency and pricing tiers), and `aggregateRating`.
3. `FAQPage` with 5 high-intent buyer `Question` / `acceptedAnswer` pairs formatted to 45-word Answer-First RAG extraction windows.
