import { Slide, Divider, Label, Big, Body, Code, Counter } from "./components/ui";
import { PipelineFull } from "./components/PipelineFull";
import { TokenizerFull } from "./components/TokenizerFull";
import { BPEFull } from "./components/BPEFull";
import { SixDims } from "./components/SixDims";
import { LangChart } from "./components/LangChart";
import { CharsRef } from "./components/CharsRef";
import { CtxBudget } from "./components/CtxBudget";
import { ArchSlide } from "./components/ArchSlide";
import { CostCalc } from "./components/CostCalc";
import { OptTable } from "./components/OptTable";
import { FailureTabs } from "./components/FailureTabs";
import { ChecklistFull } from "./components/ChecklistFull";
import { mono, c } from "./theme";

// Exported as a plain array — wrap in useMemo([]) inside Page
export const slideDefinitions = [
  // 0 — Title
  () => (
    <Slide>
      <Label>Layer 1 · Lesson 1</Label>
      <h1 style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, color: c.primary, marginBottom: 28 }}>
        Tokenization
      </h1>
      <Body style={{ marginBottom: 64 }}>
        How text becomes numbers — and why this invisible step shapes your costs, context limits, and product reliability.
      </Body>
      <div style={{ display: "flex", gap: 64 }}>
        {[
          { val: <Counter end={100000} suffix="+" />, l: "tokens in vocabulary", col: c.blue },
          { val: "~4", l: "chars/token (English)", col: c.blue },
          { val: "$0", l: "the model sees of your text", col: c.green },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ ...mono, fontSize: 40, fontWeight: 700, color: s.col }}>{s.val}</div>
            <div style={{ fontSize: 14, color: c.muted, marginTop: 8 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // 1 — Core statement
  () => (
    <Slide>
      <Big>The model never sees text.</Big>
      <div style={{ marginTop: 8, fontSize: 56, fontWeight: 800, color: c.dim, lineHeight: 1.1 }}>Ever.</div>
    </Slide>
  ),

  // 2 — The mapping + wrong/right
  () => (
    <Slide>
      <Label>Core Insight</Label>
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 36 }}>
        <div style={{ ...mono, fontSize: 32, color: c.primary, padding: "14px 28px", borderRadius: 14, backgroundColor: c.surface }}>
          "Hello world"
        </div>
        <div style={{ fontSize: 32, color: c.dim }}>→</div>
        <div style={{ ...mono, fontSize: 32, color: c.blue, padding: "14px 28px", borderRadius: 14, backgroundColor: `${c.blue}0c` }}>
          [15339, 1917]
        </div>
      </div>
      <Body style={{ marginBottom: 32 }}>
        Two integers. That's all the model receives. It operates entirely in vector space — predicting the next token ID, not the next word.
      </Body>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ padding: 28, borderRadius: 16, borderLeft: `3px solid ${c.red}50`, backgroundColor: `${c.red}06` }}>
          <div style={{ color: c.red, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>❌ WRONG</div>
          <div style={{ fontSize: 17, color: c.body, lineHeight: 1.7 }}>"The AI reads and understands my text like a human"</div>
        </div>
        <div style={{ padding: 28, borderRadius: 16, borderLeft: `3px solid ${c.green}50`, backgroundColor: `${c.green}06` }}>
          <div style={{ color: c.green, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>✓ RIGHT</div>
          <div style={{ fontSize: 17, color: c.body, lineHeight: 1.7 }}>"Text → IDs → vectors → math. Text is gone after step 1."</div>
        </div>
      </div>
    </Slide>
  ),

  // 3 — Consequences
  () => (
    <Slide>
      <Label>What This Means</Label>
      <Big>Four consequences</Big>
      <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 24 }}>
        {[
          { n: "1", title: "The unit of generation is a token", body: "Sometimes a word, sometimes half a word, sometimes punctuation fused to a space. The model doesn't distinguish — it predicts the next integer." },
          { n: "2", title: "Character-level tasks are fundamentally hard", body: '"How many r\'s in strawberry?" The model sees ["str", "aw", "berry"]. Letters are inside tokens, invisible to prediction.' },
          { n: "3", title: "Structured output can break at boundaries", body: "JSON closing braces are separate tokens. The model has no syntax tree — just probabilities. Sometimes the brace never comes." },
          { n: "4", title: "Token boundaries affect reasoning quality", body: "A domain term split into 3 tokens has a less concentrated representation than a single-token concept. Fragmentation reduces quality." },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ ...mono, fontSize: 20, fontWeight: 700, color: c.blue, width: 28, flexShrink: 0 }}>{item.n}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: c.primary, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 17, color: c.body, lineHeight: 1.7 }}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // 4 — Cascading effect
  () => (
    <Slide>
      <Label>The Cascading Effect</Label>
      <Big>One space changes everything.</Big>
      <Body style={{ marginTop: 20 }}>
        Change one space in your prompt → token boundaries shift → different embedding vectors are looked up → attention patterns change → the model's reasoning changes → different output entirely.
      </Body>
      <div style={{ ...mono, fontSize: 18, marginTop: 36, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ color: c.blue, whiteSpace: "pre", lineHeight: 2 }}>{'"Hello world"  → [15339, 1917]      → Output A'}</div>
        <div style={{ color: c.blue, whiteSpace: "pre", lineHeight: 2 }}>{'"Hello  world" → [15339, 220, 1917]  → Output B'}</div>
        <div style={{ color: c.red, lineHeight: 2, marginTop: 4 }}>One extra space. Three tokens instead of two. Different result.</div>
      </div>
      <div style={{ fontSize: 17, color: c.muted, marginTop: 32 }}>
        This is why tokenization isn't a preprocessing detail. It's upstream of every computation the model performs.
      </div>
    </Slide>
  ),

  // 5 — DIVIDER: Mechanics
  () => <Divider>Mechanics</Divider>,

  // 6 — Pipeline
  () => (
    <Slide>
      <Label>The Full Pipeline</Label>
      <Big>From text to prediction</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>Six steps. Your text is gone after step 1. Click any step.</Body>
      <PipelineFull />
    </Slide>
  ),

  // 7 — Tokens ≠ Words
  () => (
    <Slide>
      <Label>Interactive Demo</Label>
      <Big>Tokens ≠ Words</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>Tokens are subword units built statistically. Click examples.</Body>
      <TokenizerFull />
    </Slide>
  ),

  // 8 — BPE
  () => (
    <Slide>
      <Label>The Algorithm</Label>
      <Big>Byte Pair Encoding</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>Start with characters. Merge the most frequent pair. Repeat 100,000 times.</Body>
      <BPEFull />
    </Slide>
  ),

  // 9 — Why not character-level
  () => (
    <Slide>
      <Label>Why BPE?</Label>
      <Big>Why not just use characters?</Big>
      <Body style={{ marginTop: 16 }}>
        Sequence length explodes. Transformer attention scales quadratically — 4× the length = 16× the compute.
      </Body>
      <div style={{ ...mono, fontSize: 22, color: c.body, marginTop: 40, lineHeight: 2.2 }}>
        <span style={{ color: c.green }}>{"BPE tokens:  4,000 positions → ~16,000 chars  ✓"}</span>
        {"\n"}
        <span style={{ color: c.red }}>{"Characters:  4,000 positions →   4,000 chars  ✗"}</span>
      </div>
      <div style={{ fontSize: 17, color: c.muted, marginTop: 28 }}>
        Tokenization trades character-level visibility for tractability. You sacrifice seeing individual letters in exchange for fitting useful amounts of text into the model's fixed-size attention window.
      </div>
    </Slide>
  ),

  // 10 — Six Dimensions
  () => (
    <Slide>
      <Label>Six Dimensions</Label>
      <Big>Why it matters everywhere</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>Click each dimension.</Body>
      <SixDims />
    </Slide>
  ),

  // 11 — Cross-language visual
  () => (
    <Slide>
      <Label>Cross-Language Tax</Label>
      <Big>Same meaning. Different cost.</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>
        "Hello, how are you?" in six languages. English is cheap. Non-Latin scripts pay a premium.
      </Body>
      <LangChart />
    </Slide>
  ),

  // 12 — Embedding lookup
  () => (
    <Slide>
      <Label>Mathematical Dimension</Label>
      <Big>Tokens become vectors</Big>
      <Body style={{ marginTop: 16, marginBottom: 36 }}>
        Each token ID is a row index into a massive embedding matrix. The resulting vector is what enters the transformer. Tokens in similar contexts get similar vectors — this is how meaning emerges from statistics.
      </Body>
      <Code>{`Vocabulary size: 100,000 tokens\nEmbedding dimension: 4,096\n\nToken ID 15339 ("Hello")\n  → look up row 15339 in [100,000 × 4,096] matrix\n  → [0.023, -0.41, 0.87, ..., 0.15]\n     ↑ 4,096-dimensional vector\n\nThis vector is what enters the transformer.\nThe token ID is just the bridge from text to math.`}</Code>
      <div style={{ fontSize: 16, color: c.muted, marginTop: 20 }}>
        This same principle powers vector search, RAG retrieval, and document clustering in Layer 4.
      </div>
    </Slide>
  ),

  // 13 — Chars per token reference
  () => (
    <Slide>
      <Label>Quick Reference</Label>
      <Big>Characters per token</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>Never assume ~4. Always tokenize a representative sample of your actual data.</Body>
      <div style={{ maxWidth: 640 }}>
        <CharsRef />
      </div>
      <div style={{ fontSize: 16, color: c.muted, marginTop: 32 }}>
        These are rough averages for back-of-envelope budgeting. Real projections require measuring your actual content.
      </div>
    </Slide>
  ),

  // 14 — Connection map
  () => (
    <Slide>
      <Label>Forward References</Label>
      <Big>Every layer connects back here</Big>
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column" }}>
        {[
          { concept: "Next-token prediction", layer: "L1", link: "Predicts token IDs, not words", color: c.blue },
          { concept: "Prompt engineering", layer: "L2", link: "Length measured in tokens, not words", color: c.blue },
          { concept: "Cost management", layer: "L2+", link: "You pay per token — counts are unintuitive", color: c.blue },
          { concept: "RAG chunking", layer: "L4", link: "Chunk limits are token limits", color: c.green },
          { concept: "Agent budgets", layer: "L5", link: "Every step burns tokens", color: c.red },
          { concept: "Context windows", layer: "All", link: "The hard constraint is always tokens", color: c.blue },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: r.color, opacity: 0.6, flexShrink: 0 }} />
            <div style={{ width: 180, fontSize: 16, fontWeight: 600, color: c.primary }}>{r.concept}</div>
            <div style={{ ...mono, fontSize: 13, color: c.dim, width: 36 }}>{r.layer}</div>
            <div style={{ flex: 1, fontSize: 16, color: c.body }}>{r.link}</div>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // 15 — DIVIDER: Architecture
  () => <Divider>Architecture</Divider>,

  // 16 — Architecture implications
  () => (
    <Slide>
      <Label>Architecture</Label>
      <Big>Implications for builders</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>Not trivia — an architectural constraint.</Body>
      <ArchSlide />
    </Slide>
  ),

  // 17 — Context budget visual
  () => (
    <Slide>
      <Label>Context Budget</Label>
      <Big>Where do tokens go?</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>
        A typical RAG system on a 200K context window. Every component competes for the same fixed resource.
      </Body>
      <CtxBudget />
    </Slide>
  ),

  // 18 — Cost calculator
  () => (
    <Slide>
      <Label>Interactive</Label>
      <Big>System prompt cost</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>Just the system prompt. Real costs are 5–20× higher.</Body>
      <CostCalc />
    </Slide>
  ),

  // 19 — Optimization
  () => (
    <Slide>
      <Label>Cost Architecture</Label>
      <Big>$1,282 → $63</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>Three techniques. Design-time decisions.</Body>
      <OptTable />
    </Slide>
  ),

  // 20 — Failure modes
  () => (
    <Slide variant="danger">
      <Label>What Breaks</Label>
      <Big>Failure modes</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>Invisible until production. Click each.</Body>
      <FailureTabs />
    </Slide>
  ),

  // 21 — DIVIDER: Practice
  () => <Divider>Practice</Divider>,

  // 22 — Code snippets
  () => (
    <Slide>
      <Label>Hands-On</Label>
      <Big>See it yourself</Big>
      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 28 }}>
        {[
          { title: "The fundamental mapping", code: `enc = tiktoken.encoding_for_model("gpt-4")\ntext = "Hello world"\ntokens = enc.encode(text)\n# Model sees: [15339, 1917]` },
          { title: "Character-level blindness", code: `enc.encode("strawberry")\n# → ["str", "aw", "berry"]\n# Model sees chunks, not letters.` },
          { title: "Cross-language comparison", code: `for lang, text in [("English", "Hello, how are you?"),\n                    ("Japanese", "こんにちは、お元気ですか？")]:\n    print(f"{lang}: {len(enc.encode(text))} tokens")` },
          { title: "Cost estimation", code: `sp_tokens = len(enc.encode(prompt))\nmonthly = sp_tokens * 10_000 * 15.00 / 1e6 * 30` },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 17, fontWeight: 600, color: c.body, marginBottom: 10 }}>{s.title}</div>
            <Code>{s.code}</Code>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // 23 — Build exercise
  () => (
    <Slide>
      <Label>Build Exercise</Label>
      <Big>Token Budget Analyzer</Big>
      <Body style={{ marginTop: 12, marginBottom: 36 }}>Build before Week 3. ~1–2 hours. Makes token counting second nature.</Body>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {[
          "Takes a text file as input, tokenizes with tiktoken",
          "Reports: char count, word count, token count, chars/token ratio",
          "Estimates cost per request for Haiku, Sonnet, and Opus",
          "Estimates monthly cost at 100 / 1K / 10K requests per day",
          "Warns if text exceeds any model's context window",
          "Bonus: accept system prompt separately, show combined budget",
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ ...mono, fontSize: 18, fontWeight: 700, color: c.blue, width: 28, flexShrink: 0 }}>{i + 1}</div>
            <span style={{ fontSize: 18, color: c.body, lineHeight: 1.7 }}>{item}</span>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // 24 — Takeaways
  () => (
    <Slide>
      <Label>Key Takeaways</Label>
      <h2 style={{ fontSize: 52, fontWeight: 800, color: c.primary, lineHeight: 1.1, marginBottom: 40 }}>
        Think in tokens,{"\n"}not words.
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {[
          { icon: "🧠", t: "The model never sees text — only integer IDs → vectors → math" },
          { icon: "💰", t: "You pay per token. Different content = different density" },
          { icon: "📏", t: "Context windows are token budgets. Manage like memory" },
          { icon: "🌐", t: "Non-English costs more. Factor into pricing" },
          { icon: "⚠️", t: "Character tasks fight the token boundary" },
          { icon: "🔍", t: "Surprised by behavior? Check the tokenization" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0" }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <span style={{ fontSize: 17, color: c.body, lineHeight: 1.7 }}>{item.t}</span>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // 25 — Checklist
  () => (
    <Slide variant="dark">
      <Label>Before You Ship</Label>
      <h2 style={{ fontSize: 60, fontWeight: 800, color: c.primary, lineHeight: 1.1, marginBottom: 16, letterSpacing: -2 }}>
        Professional reflex checklist
      </h2>
      <Body style={{ marginBottom: 44 }}>10 minutes. Prevents incidents that take days.</Body>
      <div style={{ maxWidth: 600 }}>
        <ChecklistFull />
      </div>
    </Slide>
  ),
];
