import { useState, useEffect, useMemo } from "react";

const PAPERS = [
  { id:1,  year:2025, title:"DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", authors:"DeepSeek-AI", venue:"arXiv 2025", tags:["Reasoning","RL","LLM"], mins:22, url:"https://arxiv.org/abs/2501.12948", abstract:"Pure reinforcement learning without supervised fine-tuning creates reasoning models rivaling OpenAI-o1 across math, code, and logical tasks." },
  { id:2,  year:2025, title:"Kimi k1.5: Scaling Reinforcement Learning with LLMs", authors:"Moonshot AI", venue:"arXiv 2025", tags:["RL","Scaling","LLM"], mins:18, url:"https://arxiv.org/abs/2501.12599", abstract:"Long-context RL training with combined short and long chain-of-thought achieves SOTA on AIME and MATH benchmarks." },
  { id:3,  year:2025, title:"phi-4: Microsoft's Compact Reasoning Model", authors:"Microsoft Research", venue:"arXiv 2025", tags:["SLM","Efficiency","LLM"], mins:14, url:"https://arxiv.org/abs/2412.08905", abstract:"14B parameters trained mostly on synthetic data outperform far larger models, proving curated data quality trumps raw scale." },
  { id:4,  year:2024, title:"GPT-4o Technical Report", authors:"OpenAI", venue:"Technical Report 2024", tags:["Multimodal","LLM"], mins:30, url:"https://openai.com/index/hello-gpt-4o/", abstract:"Omni model unifying text, audio, and vision in real-time with sub-300ms speech latency — the first native multimodal model to feel genuinely conversational." },
  { id:5,  year:2024, title:"Claude 3 Model Card", authors:"Anthropic", venue:"Technical Report 2024", tags:["LLM","Safety"], mins:20, url:"https://www-cdn.anthropic.com/de8ba9b01c9ab7cbabf5c33b80b7bbc618857627/Model_Card_Claude_3.pdf", abstract:"Haiku, Sonnet, and Opus form a capability-safety tradeoff ladder, with Opus reaching near-human performance on expert evaluations." },
  { id:6,  year:2024, title:"Gemini 1.5: Unlocking Multimodal Understanding Across Millions of Tokens", authors:"Google DeepMind", venue:"arXiv 2024", tags:["Multimodal","LLM","MoE"], mins:35, url:"https://arxiv.org/abs/2403.05530", abstract:"1M token context window via Mixture-of-Experts achieves near-perfect recall over hour-long videos and entire codebases." },
  { id:7,  year:2024, title:"Mamba: Linear-Time Sequence Modeling with Selective State Spaces", authors:"Gu & Dao", venue:"ICLR 2024", tags:["Architecture","Efficiency"], mins:28, url:"https://arxiv.org/abs/2312.00752", abstract:"Selective state space model matches Transformer quality at linear inference cost, breaking the quadratic attention barrier." },
  { id:8,  year:2024, title:"SORA: Video Generation Models as World Simulators", authors:"OpenAI", venue:"Technical Report 2024", tags:["Video","Diffusion"], mins:16, url:"https://openai.com/research/video-generation-models-as-world-simulators", abstract:"Spacetime latent patches unlock 60-second photorealistic video generation with emergent physics and camera dynamics." },
  { id:9,  year:2024, title:"Llama 3: Open Foundation Models at Scale", authors:"Meta AI", venue:"arXiv 2024", tags:["LLM","Open Source"], mins:26, url:"https://arxiv.org/abs/2407.21783", abstract:"405B open-source model trained on 15T+ tokens — making frontier open-source AI genuinely competitive with closed systems." },
  { id:10, year:2024, title:"AlphaFold 3: Predicting All of Life's Molecular Structures", authors:"Google DeepMind", venue:"Nature 2024", tags:["Biology","Science"], mins:32, url:"https://www.nature.com/articles/s41586-024-07487-w", abstract:"SE(3) diffusion over all biomolecules — proteins, DNA, RNA, small molecules — transforming structural biology and drug discovery." },
  { id:11, year:2024, title:"The Era of 1-bit LLMs: All Large Language Models in 1.58 Bits", authors:"Microsoft Research", venue:"arXiv 2024", tags:["Efficiency","Architecture"], mins:15, url:"https://arxiv.org/abs/2402.17764", abstract:"Ternary weights match full-precision performance while cutting memory and energy by an order of magnitude." },
  { id:12, year:2024, title:"Scaling LLM Test-Time Compute Optimally", authors:"Snell et al.", venue:"arXiv 2024", tags:["Reasoning","Scaling"], mins:20, url:"https://arxiv.org/abs/2408.03314", abstract:"Inference-time compute scaling via search and self-refinement can match training-time scaling gains." },
  { id:13, year:2023, title:"GPT-4 Technical Report", authors:"OpenAI", venue:"arXiv 2023", tags:["LLM","Multimodal"], mins:35, url:"https://arxiv.org/abs/2303.08774", abstract:"Human-level performance on the bar exam, GRE, and AMC — the model that shifted public perception of AI to professional-grade intelligence." },
  { id:14, year:2023, title:"Llama 2: Open Foundation and Fine-Tuned Chat Models", authors:"Meta AI", venue:"arXiv 2023", tags:["LLM","Open Source"], mins:28, url:"https://arxiv.org/abs/2307.09288", abstract:"Open-source LLM family with RLHF-trained chat variants that powered thousands of downstream research projects." },
  { id:15, year:2023, title:"Constitutional AI: Harmlessness from AI Feedback", authors:"Anthropic", venue:"arXiv 2023", tags:["Alignment","Safety"], mins:24, url:"https://arxiv.org/abs/2212.08073", abstract:"A written constitution guides AI-generated critiques and revisions, scaling alignment without scaling human labor." },
  { id:16, year:2023, title:"Sparks of Artificial General Intelligence", authors:"Microsoft Research", venue:"arXiv 2023", tags:["AGI","LLM"], mins:60, url:"https://arxiv.org/abs/2303.12528", abstract:"100 pages of evidence that GPT-4 shows early AGI characteristics across mathematics, vision, law, medicine, and theory of mind." },
  { id:17, year:2023, title:"Chain-of-Thought Prompting Elicits Reasoning in LLMs", authors:"Wei et al., Google", venue:"NeurIPS 2023", tags:["Reasoning","Prompting"], mins:18, url:"https://arxiv.org/abs/2201.11903", abstract:"Step-by-step examples in prompts unlock dramatic reasoning improvements — the technique behind every modern AI reasoning system." },
  { id:18, year:2023, title:"Toolformer: Language Models Can Teach Themselves to Use Tools", authors:"Schick et al., Meta", venue:"NeurIPS 2023", tags:["Agents","LLM"], mins:20, url:"https://arxiv.org/abs/2302.04761", abstract:"Self-supervised API call learning — the blueprint for how modern AI agents use calculators, search, and external systems." },
  { id:19, year:2023, title:"Reflexion: Language Agents with Verbal Reinforcement Learning", authors:"Shinn et al.", venue:"NeurIPS 2023", tags:["Agents","Reasoning"], mins:18, url:"https://arxiv.org/abs/2303.11366", abstract:"Verbal self-reflection stored in episodic memory lets agents improve through trial and error without weight updates." },
  { id:20, year:2023, title:"LoRA: Low-Rank Adaptation of Large Language Models", authors:"Hu et al.", venue:"ICLR 2023", tags:["Fine-tuning","Efficiency"], mins:20, url:"https://arxiv.org/abs/2106.09685", abstract:"Rank decomposition matrices reduce trainable parameters by 10,000x — now the universal standard for LLM fine-tuning." },
  { id:21, year:2022, title:"Emergent Abilities of Large Language Models", authors:"Wei et al., Google", venue:"TMLR 2022", tags:["Scaling","LLM"], mins:22, url:"https://arxiv.org/abs/2206.07682", abstract:"Capabilities appear suddenly and unpredictably at scale — a profound challenge to smooth extrapolation of AI development." },
  { id:22, year:2022, title:"InstructGPT: Training LLMs to Follow Instructions", authors:"Ouyang et al., OpenAI", venue:"NeurIPS 2022", tags:["Alignment","LLM"], mins:25, url:"https://arxiv.org/abs/2203.02155", abstract:"A 1.3B aligned model outperforms 175B GPT-3 on human preference — the direct blueprint for ChatGPT." },
  { id:23, year:2022, title:"DALL-E 2: Hierarchical Text-Conditional Image Generation", authors:"Ramesh et al., OpenAI", venue:"arXiv 2022", tags:["Image Gen","Diffusion"], mins:20, url:"https://arxiv.org/abs/2204.06125", abstract:"CLIP embeddings plus cascaded diffusion decoder enable photorealistic image generation and semantic editing." },
  { id:24, year:2022, title:"Stable Diffusion: High-Resolution Image Synthesis with Latent Diffusion", authors:"Rombach et al.", venue:"CVPR 2022", tags:["Diffusion","Image Gen"], mins:22, url:"https://arxiv.org/abs/2112.10752", abstract:"Running diffusion in compressed latent space cuts compute by 10x — the paper that democratized generative AI." },
  { id:25, year:2022, title:"Chinchilla: Training Compute-Optimal Large Language Models", authors:"Hoffmann et al., DeepMind", venue:"NeurIPS 2022", tags:["Scaling","LLM"], mins:20, url:"https://arxiv.org/abs/2203.15556", abstract:"70B Chinchilla outperforms 280B Gopher — proving the industry was massively undertrained and rewriting every LLM training recipe." },
  { id:26, year:2022, title:"Whisper: Robust Speech Recognition via Large-Scale Weak Supervision", authors:"Radford et al., OpenAI", venue:"ICML 2022", tags:["Speech","Multimodal"], mins:18, url:"https://arxiv.org/abs/2212.04356", abstract:"680K hours of weakly-supervised multilingual audio produces near-human transcription with strong zero-shot transfer." },
  { id:27, year:2021, title:"CLIP: Learning Transferable Visual Models from Natural Language", authors:"Radford et al., OpenAI", venue:"ICML 2021", tags:["Multimodal","Vision"], mins:25, url:"https://arxiv.org/abs/2103.00020", abstract:"Contrastive image-text training enables zero-shot classification across 30+ datasets — the backbone of modern vision-language models." },
  { id:28, year:2021, title:"DALL-E: Zero-Shot Text-to-Image Generation", authors:"Ramesh et al., OpenAI", venue:"ICML 2021", tags:["Image Gen","Multimodal"], mins:20, url:"https://arxiv.org/abs/2102.12092", abstract:"Autoregressive image generation demonstrates that language models can freely manipulate visual concepts without image-specific training." },
  { id:29, year:2021, title:"AlphaFold 2: Highly Accurate Protein Structure Prediction", authors:"Jumper et al., DeepMind", venue:"Nature 2021", tags:["Biology","Science"], mins:35, url:"https://www.nature.com/articles/s41586-021-03819-2", abstract:"50 years of structural biology solved in a single model — attention over evolutionary sequences produces atomic-precision protein structures." },
  { id:30, year:2021, title:"Codex: Evaluating Large Language Models Trained on Code", authors:"Chen et al., OpenAI", venue:"arXiv 2021", tags:["Code","LLM"], mins:22, url:"https://arxiv.org/abs/2107.03374", abstract:"28.8% pass rate on HumanEval and the power behind GitHub Copilot — bringing AI-assisted programming to millions of developers." },
  { id:31, year:2020, title:"GPT-3: Language Models Are Few-Shot Learners", authors:"Brown et al., OpenAI", venue:"NeurIPS 2020", tags:["LLM","Scaling"], mins:40, url:"https://arxiv.org/abs/2005.14165", abstract:"175B parameters and in-context learning without gradient updates — the paper that established prompting as the dominant AI paradigm." },
  { id:32, year:2020, title:"Scaling Laws for Neural Language Models", authors:"Kaplan et al., OpenAI", venue:"arXiv 2020", tags:["Scaling","LLM"], mins:25, url:"https://arxiv.org/abs/2001.08361", abstract:"Power-law relationships between parameters, data, compute, and loss — the quantitative laws behind every major LLM training decision." },
  { id:33, year:2020, title:"Denoising Diffusion Probabilistic Models (DDPM)", authors:"Ho, Jain & Abbeel", venue:"NeurIPS 2020", tags:["Diffusion","Generative"], mins:22, url:"https://arxiv.org/abs/2006.11239", abstract:"Markov chain noise plus learned denoising — the framework underlying Stable Diffusion, DALL-E 2, Sora, and most generative AI today." },
  { id:34, year:2020, title:"T5: Exploring the Limits of Transfer Learning", authors:"Raffel et al., Google", venue:"JMLR 2020", tags:["NLP","LLM"], mins:45, url:"https://arxiv.org/abs/1910.10683", abstract:"Every NLP task as text-to-text transformation — the architecture and training recipe that shaped the modern LLM paradigm." },
  { id:35, year:2019, title:"GPT-2: Language Models Are Unsupervised Multitask Learners", authors:"Radford et al., OpenAI", venue:"Technical Report 2019", tags:["LLM","Generation"], mins:18, url:"https://openai.com/research/better-language-models", abstract:"1.5B parameters generating coherent long-form text — withheld on safety grounds, marking the first major public AI risk communication moment." },
  { id:36, year:2019, title:"BERT: Pre-training of Deep Bidirectional Transformers", authors:"Devlin et al., Google", venue:"NAACL 2019", tags:["NLP","Architecture"], mins:25, url:"https://arxiv.org/abs/1810.04805", abstract:"Masked language modeling set 11 NLP benchmark records simultaneously and defined the pre-train/fine-tune paradigm still dominant today." },
  { id:37, year:2018, title:"GPT-1: Improving Language Understanding by Generative Pre-Training", authors:"Radford et al., OpenAI", venue:"Technical Report 2018", tags:["LLM","NLP"], mins:18, url:"https://openai.com/research/language-unsupervised", abstract:"Generative pre-training then discriminative fine-tuning outperforms task-specific models — the paper that started the GPT lineage." },
  { id:38, year:2017, title:"Attention Is All You Need", authors:"Vaswani et al., Google", venue:"NeurIPS 2017", tags:["Architecture","Transformer"], mins:28, url:"https://arxiv.org/abs/1706.03762", abstract:"Self-attention replaces all recurrence and convolution. The single most influential paper in modern AI — every LLM traces to this work." },
  { id:39, year:2017, title:"Proximal Policy Optimization Algorithms (PPO)", authors:"Schulman et al., OpenAI", venue:"arXiv 2017", tags:["RL","Optimization"], mins:16, url:"https://arxiv.org/abs/1707.06347", abstract:"Clipped surrogate objective — now the standard RL algorithm powering RLHF in ChatGPT, Claude, Gemini, and every major LLM." },
  { id:40, year:2017, title:"AlphaGo Zero: Mastering Go Without Human Knowledge", authors:"Silver et al., DeepMind", venue:"Nature 2017", tags:["RL","Games"], mins:25, url:"https://www.nature.com/articles/nature24270", abstract:"Pure self-play RL surpasses all human knowledge in Go — demonstrating that superhuman expertise can emerge from first principles." },
  { id:41, year:2015, title:"Human-Level Control through Deep Reinforcement Learning (DQN)", authors:"Mnih et al., DeepMind", venue:"Nature 2015", tags:["RL","Architecture"], mins:22, url:"https://www.nature.com/articles/nature14236", abstract:"A single CNN masters 49 Atari games at human level — the paper that launched deep reinforcement learning as a field." },
  { id:42, year:2014, title:"Generative Adversarial Networks (GANs)", authors:"Goodfellow et al.", venue:"NeurIPS 2014", tags:["Generative","Architecture"], mins:18, url:"https://arxiv.org/abs/1406.2661", abstract:"Generator vs discriminator minimax game enables realistic synthesis — the generative modeling paradigm before diffusion." },
  { id:43, year:2014, title:"Neural Machine Translation: Learning to Align and Translate", authors:"Bahdanau, Cho & Bengio", venue:"ICLR 2015", tags:["NLP","Architecture"], mins:20, url:"https://arxiv.org/abs/1409.0473", abstract:"The attention mechanism — the conceptual invention Vaswani et al. scaled into the full Transformer, changing everything." },
  { id:44, year:2012, title:"ImageNet Classification with Deep CNNs (AlexNet)", authors:"Krizhevsky, Sutskever & Hinton", venue:"NeurIPS 2012", tags:["Vision","Architecture"], mins:18, url:"https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf", abstract:"A 10.9% margin at ILSVRC 2012 that single-handedly ended shallow ML and began the deep learning era." },
  { id:45, year:1986, title:"Learning Representations by Back-propagating Errors", authors:"Rumelhart, Hinton & Williams", venue:"Nature 1986", tags:["Foundational","Theory"], mins:12, url:"https://www.nature.com/articles/323533a0", abstract:"The algorithm — chain rule applied through differentiable networks enables gradient descent on any computation graph. The foundation of all deep learning." },
];

const ALL_TAGS = ["All", ...new Set(PAPERS.flatMap(p => p.tags))].sort((a,b)=> a==="All"?-1:b==="All"?1:a.localeCompare(b));

export default function App() {
  const [read, setRead] = useState({});
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try { const s = localStorage.getItem("airt6"); if (s) setRead(JSON.parse(s)); } catch {}
    if (window.storage) window.storage.get("airt6").then(r => { if(r) setRead(JSON.parse(r.value)); }).catch(()=>{});
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem("airt6", JSON.stringify(read)); } catch {}
    if (window.storage) window.storage.set("airt6", JSON.stringify(read)).catch(()=>{});
  }, [read, mounted]);

  const toggleRead = (id, e) => { e.stopPropagation(); setRead(p => ({...p, [id]: !p[id]})); };

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return PAPERS.filter(p => {
      const mt = tag === "All" || p.tags.includes(tag);
      const ms = !ql || p.title.toLowerCase().includes(ql) || p.authors.toLowerCase().includes(ql) || p.venue.toLowerCase().includes(ql);
      return mt && ms;
    });
  }, [q, tag]);

  const readCount = Object.values(read).filter(Boolean).length;
  const pct = Math.round((readCount / PAPERS.length) * 100);
  const years = [...new Set(filtered.map(p => p.year))].sort((a,b) => b-a);

  return (
    <div style={{minHeight:"100vh", background:"#f7f5f0", fontFamily:"'Spectral', Georgia, serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Inter:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#f7f5f0} ::-webkit-scrollbar-thumb{background:#d9d4c7;border-radius:3px}

        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes checkIn{0%{transform:scale(0)}70%{transform:scale(1.2)}100%{transform:scale(1)}}
        @keyframes slideOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}

        .paper {
          background:#fff;
          border:1px solid #ede9e0;
          border-radius:12px;
          cursor:pointer;
          transition:box-shadow .2s, border-color .2s, transform .2s;
          animation: fadeUp .4s ease both;
        }
        .paper:hover { box-shadow:0 4px 24px rgba(0,0,0,.07); border-color:#d4cfc4; transform:translateY(-1px); }
        .paper.is-read { background:#fafaf8; border-color:#ede9e0; }
        .paper.is-open { border-color:#b8a898; box-shadow:0 6px 32px rgba(0,0,0,.09); }

        .check {
          width:22px; height:22px; border-radius:50%;
          border:1.5px solid #c8c2b6;
          background:transparent; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:all .2s cubic-bezier(.34,1.56,.64,1);
        }
        .check:hover { border-color:#8a7a6a; transform:scale(1.15); }
        .check.done { background:#2d6a4f; border-color:#2d6a4f; }
        .check.done .tick { animation:checkIn .3s cubic-bezier(.34,1.56,.64,1) both; }

        .srch {
          width:100%; padding:11px 16px 11px 40px;
          background:#fff; border:1px solid #ede9e0;
          border-radius:10px; font-family:'Inter',sans-serif;
          font-size:14px; color:#3a3530; outline:none;
          transition:border-color .2s, box-shadow .2s;
        }
        .srch::placeholder{color:#b8b0a4;}
        .srch:focus{border-color:#8a7a6a; box-shadow:0 0 0 3px rgba(138,122,106,.1);}

        .sel {
          appearance:none; -webkit-appearance:none;
          padding:9px 36px 9px 14px; background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%238a7a6a' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 12px center;
          border:1px solid #ede9e0; border-radius:10px;
          font-family:'Inter',sans-serif; font-size:13px; color:#3a3530;
          cursor:pointer; outline:none; transition:border-color .2s;
          min-width:160px;
        }
        .sel:focus{border-color:#8a7a6a; box-shadow:0 0 0 3px rgba(138,122,106,.1);}

        .link-btn {
          display:inline-flex; align-items:center; gap:5px;
          font-family:'Inter',sans-serif; font-size:12px; font-weight:500;
          color:#8a7a6a; text-decoration:none;
          padding:6px 14px; border-radius:7px;
          border:1px solid #e0d8cc; background:#faf8f4;
          transition:all .18s; cursor:pointer;
        }
        .link-btn:hover { background:#f0ebe2; border-color:#c8bfb4; color:#3a3530; }

        .mark-btn {
          font-family:'Inter',sans-serif; font-size:12px; font-weight:500;
          padding:6px 14px; border-radius:7px; border:1px solid;
          cursor:pointer; transition:all .18s;
        }

        .pbar { height:2px; background:#ede9e0; border-radius:1px; overflow:hidden; }
        .pfill { height:100%; background:#2d6a4f; border-radius:1px; transition:width .8s cubic-bezier(.4,0,.2,1); }

        .ab { animation:slideOpen .28s ease both; }

        .yr { font-family:'Spectral',serif; font-style:italic; font-weight:300; color:#c8bfb4; font-size:clamp(40px,6vw,56px); letter-spacing:-2px; line-height:1; }

        .tag-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
      `}</style>

      {/* HEADER */}
      <div style={{position:"sticky",top:0,zIndex:50,background:"rgba(247,245,240,.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid #ede9e0"}}>
        <div style={{maxWidth:780,margin:"0 auto",padding:"18px 24px 14px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
            <div>
              <h1 style={{fontFamily:"'Spectral',serif",fontWeight:600,fontStyle:"italic",fontSize:"clamp(20px,3.5vw,28px)",color:"#2a2520",letterSpacing:"-.3px"}}>
                AI Research Papers
              </h1>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#a89e92",marginTop:4}}>
                {readCount} of {PAPERS.length} read · {pct}% complete
              </p>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#a89e92",marginBottom:5}}>{PAPERS.length - readCount} remaining</div>
              <div className="pbar" style={{width:140}}>
                <div className="pfill" style={{width:`${pct}%`}}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{maxWidth:780,margin:"0 auto",padding:"28px 24px 80px"}}>

        {/* Controls */}
        <div style={{display:"flex",gap:10,marginBottom:28,flexWrap:"wrap"}}>
          <div style={{position:"relative",flex:1,minWidth:220}}>
            <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#b8b0a4",fontSize:15,pointerEvents:"none"}}>⌕</span>
            <input className="srch" placeholder="Search papers or authors…" value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
          <select className="sel" value={tag} onChange={e=>setTag(e.target.value)}>
            {ALL_TAGS.map(t => <option key={t} value={t}>{t === "All" ? "All Topics" : t}</option>)}
          </select>
        </div>

        {/* Papers */}
        {years.length === 0 && (
          <div style={{textAlign:"center",padding:"60px 0",fontFamily:"'Spectral',serif",fontStyle:"italic",color:"#b8b0a4",fontSize:20}}>No papers found</div>
        )}

        {years.map((year, yi) => {
          const yp = filtered.filter(p => p.year === year);
          return (
            <div key={year} style={{marginBottom:44, animation:`fadeUp .4s ${yi*.06}s ease both`}}>
              {/* Year */}
              <div style={{display:"flex",alignItems:"baseline",gap:16,marginBottom:14}}>
                <span className="yr">{year}</span>
                <div style={{flex:1,height:1,background:"#ede9e0"}}/>
                <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"#c8bfb4"}}>{yp.filter(p=>read[p.id]).length}/{yp.length}</span>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {yp.map((paper, pi) => {
                  const isRead = !!read[paper.id];
                  const isOpen = open === paper.id;
                  return (
                    <div key={paper.id}
                      className={`paper ${isRead?"is-read":""} ${isOpen?"is-open":""}`}
                      style={{padding:"16px 20px", animationDelay:`${yi*.06+pi*.03}s`, opacity: isRead ? 0.65 : 1}}
                      onClick={()=>setOpen(isOpen?null:paper.id)}>

                      <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
                        {/* Checkbox */}
                        <button className={`check ${isRead?"done":""}`} onClick={e=>toggleRead(paper.id,e)}>
                          {isRead && <span className="tick" style={{color:"#fff",fontSize:11,lineHeight:1,marginTop:1}}>✓</span>}
                        </button>

                        <div style={{flex:1,minWidth:0}}>
                          {/* Title + chevron */}
                          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
                            <h3 style={{fontFamily:"'Spectral',serif",fontWeight:isRead?400:600,fontSize:"clamp(13.5px,2vw,15px)",lineHeight:1.5,color:isRead?"#a89e92":"#2a2520",flex:1,textDecoration:isRead?"line-through":"none",textDecorationColor:"#c8bfb4"}}>
                              {paper.title}
                            </h3>
                            <span style={{color:"#c8bfb4",fontSize:10,flexShrink:0,paddingTop:4,transition:"transform .2s",display:"inline-block",transform:isOpen?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
                          </div>

                          {/* Meta row */}
                          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6,flexWrap:"wrap"}}>
                            <span style={{fontFamily:"'Inter',sans-serif",fontSize:11.5,color:"#7a6e64",fontStyle:"italic"}}>{paper.authors}</span>
                            <span style={{color:"#d4cfc4",fontSize:10}}>·</span>
                            <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#a89e92"}}>{paper.venue}</span>
                            <span style={{color:"#d4cfc4",fontSize:10}}>·</span>
                            <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#c8bfb4"}}>~{paper.mins} min</span>
                          </div>

                          {/* Tags */}
                          <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
                            {paper.tags.map(t => (
                              <span key={t}
                                onClick={e=>{e.stopPropagation();setTag(t);}}
                                style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:500,padding:"2px 8px",borderRadius:20,
                                  background:"#f0ebe2",color:"#7a6e64",cursor:"pointer",transition:"background .15s",border:"1px solid #e0d8cc"}}>
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Expanded panel */}
                          {isOpen && (
                            <div className="ab" style={{marginTop:14,paddingTop:14,borderTop:"1px solid #f0ebe2"}}>
                              <p style={{fontFamily:"'Spectral',serif",fontStyle:"italic",fontSize:13.5,lineHeight:1.85,color:"#7a6e64",marginBottom:14}}>
                                {paper.abstract}
                              </p>
                              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                                <a href={paper.url} target="_blank" rel="noopener noreferrer" className="link-btn" onClick={e=>e.stopPropagation()}>
                                  <span>↗</span> Read Paper
                                </a>
                                <button className="mark-btn" onClick={e=>toggleRead(paper.id,e)}
                                  style={{borderColor:isRead?"#d4cfc4":"#b8d4c8",background:isRead?"#faf8f4":"#f0f8f4",color:isRead?"#a89e92":"#2d6a4f"}}>
                                  {isRead ? "Mark unread" : "✓ Mark as read"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{textAlign:"center",paddingTop:24,borderTop:"1px solid #ede9e0"}}>
          <p style={{fontFamily:"'Spectral',serif",fontStyle:"italic",fontSize:13,color:"#c8bfb4"}}>
            {PAPERS.length} essential papers · 1986 — 2025
          </p>
        </div>
      </div>
    </div>
  );
}
