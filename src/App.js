import { useState, useEffect, useMemo } from "react";

const PAPERS = [
  // 2026
  { id:101, year:2026, title:"Mercury 2: Diffusion Language Models at 1,000 Tokens per Second", authors:"Inception Labs", venue:"Technical Report 2026", tags:["Architecture","Efficiency","LLM"], mins:14, url:"https://arxiv.org/abs/2506.17298", abstract:"Parallel token refinement via diffusion instead of autoregressive generation delivers 10x the throughput of frontier models like Claude Haiku and Gemini Flash — demonstrating that token-by-token generation is not the only viable path for capable LLMs." },
  { id:102, year:2026, title:"AlphaGenome: Sequence Models for Genome Regulation", authors:"Google DeepMind", venue:"arXiv 2026", tags:["Biology","Science","Architecture"], mins:28, url:"https://arxiv.org/abs/2502.11699", abstract:"First model to explicitly predict RNA splice junction locations and expression levels from raw DNA sequence, outperforming all prior models on 22 of 24 regulatory benchmarks and opening new paths for rare disease research." },
  { id:103, year:2026, title:"Gemini 2.5 Pro: Thinking at Scale", authors:"Google DeepMind", venue:"Technical Report 2026", tags:["LLM","Reasoning","Multimodal"], mins:25, url:"https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf", abstract:"Thinking model that dynamically allocates compute before responding, reaching the top of major reasoning benchmarks and able to process entire code repositories in its context window." },
  { id:104, year:2026, title:"GPT-5: A Unified Reasoning System", authors:"OpenAI", venue:"Technical Report 2026", tags:["LLM","Reasoning","Multimodal"], mins:30, url:"https://openai.com/research/gpt-5", abstract:"Internal-router architecture that selects specialized sub-models at inference time, delivering expert-level performance on GPQA Diamond and AIME — setting new standards for scientific and mathematical reasoning." },

  // 2025
  { id:201, year:2025, title:"Welcome to the Era of Experience", authors:"Silver & Sutton — Google DeepMind", venue:"DeepMind 2025", tags:["RL","Reasoning","Theory"], mins:20, url:"https://storage.googleapis.com/deepmind-media/Era-of-Experience%20/The%20Era%20of%20Experience%20Paper.pdf", abstract:"Human-generated data is approaching exhaustion. Silver and Sutton argue the next leap requires agents that learn continuously from their own experience — a call to arms that sparked the widest discussion in the field in years." },
  { id:202, year:2025, title:"Llama 4: Open Frontier Models with Mixture of Experts", authors:"Meta AI", venue:"Technical Report 2025", tags:["LLM","Open Source","MoE"], mins:26, url:"https://arxiv.org/abs/2504.03997", abstract:"Scout and Maverick MoE models trained natively multimodal from scratch, with only 17B active of 400B total parameters — setting a new capability ceiling for open-weight AI." },
  { id:203, year:2025, title:"Qwen3: Next-Generation Dense and MoE Language Models", authors:"Alibaba Cloud", venue:"arXiv 2025", tags:["LLM","Reasoning","MoE"], mins:22, url:"https://arxiv.org/abs/2505.09388", abstract:"Family spanning 0.6B to 235B parameters with hybrid thinking/non-thinking modes — the first Chinese-developed model family to consistently challenge frontier Western models on every major benchmark." },
  { id:204, year:2025, title:"Gemini 2.0: Advancing Agentic AI", authors:"Google DeepMind", venue:"Technical Report 2025", tags:["Multimodal","LLM","Agents"], mins:24, url:"https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_0_report.pdf", abstract:"Native image and audio output with enhanced agentic tool use — marking Google's shift from reactive assistant to proactive AI agent capable of multi-step autonomous computer tasks." },
  { id:205, year:2025, title:"Claude 3.5 Sonnet and the Computer Use API", authors:"Anthropic", venue:"Technical Report 2025", tags:["LLM","Agents","Safety"], mins:18, url:"https://www.anthropic.com/news/developing-computer-use", abstract:"Introduces computer use — controlling a mouse and keyboard like a human — marking the transition of LLMs from conversational tools to autonomous computer-operating agents." },
  { id:1,  year:2025, title:"DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", authors:"DeepSeek-AI", venue:"arXiv 2025", tags:["Reasoning","RL","LLM"], mins:22, url:"https://arxiv.org/abs/2501.12948", abstract:"Pure reinforcement learning without supervised fine-tuning creates reasoning models rivaling OpenAI-o1 across math, code, and logical tasks — proving RL alone can unlock sophisticated chain-of-thought." },
  { id:2,  year:2025, title:"Kimi k1.5: Scaling Reinforcement Learning with LLMs", authors:"Moonshot AI", venue:"arXiv 2025", tags:["RL","Scaling","LLM"], mins:18, url:"https://arxiv.org/abs/2501.12599", abstract:"Long-context RL training with combined short and long chain-of-thought achieves SOTA on AIME and MATH, demonstrating a new scaling axis beyond parameters and data." },
  { id:3,  year:2025, title:"phi-4: Microsoft's Compact Reasoning Model", authors:"Microsoft Research", venue:"arXiv 2025", tags:["SLM","Efficiency","LLM"], mins:14, url:"https://arxiv.org/abs/2412.08905", abstract:"14B parameters trained mostly on synthetic data outperform far larger models, proving curated data quality trumps raw scale for mathematical and logical reasoning." },
  { id:4,  year:2025, title:"GPT-4o Technical Report", authors:"OpenAI", venue:"Technical Report 2025", tags:["Multimodal","LLM","Speech"], mins:30, url:"https://openai.com/index/hello-gpt-4o/", abstract:"Omni model unifying text, audio, and vision in real-time with sub-300ms speech latency — the first native multimodal model to feel genuinely conversational and emotionally responsive." },
  { id:5,  year:2025, title:"Scaling LLM Test-Time Compute Optimally", authors:"Snell et al.", venue:"arXiv 2025", tags:["Reasoning","Scaling","RL"], mins:20, url:"https://arxiv.org/abs/2408.03314", abstract:"Inference-time compute scaling via search and self-refinement can match training-time scaling gains — a crucial insight reorienting the field toward test-time compute as a first-class resource." },

  // 2024
  { id:6,  year:2024, title:"Gemini 1.5: Unlocking Multimodal Understanding Across Millions of Tokens", authors:"Google DeepMind", venue:"arXiv 2024", tags:["Multimodal","LLM","MoE"], mins:35, url:"https://arxiv.org/abs/2403.05530", abstract:"1M token context window via Mixture-of-Experts achieves near-perfect recall over hour-long videos, entire codebases, and book-length documents." },
  { id:7,  year:2024, title:"Mamba: Linear-Time Sequence Modeling with Selective State Spaces", authors:"Gu & Dao", venue:"ICLR 2024", tags:["Architecture","Efficiency"], mins:28, url:"https://arxiv.org/abs/2312.00752", abstract:"Selective state space model matches Transformer quality at linear inference cost, breaking the quadratic attention barrier and renewing the search for Transformer alternatives." },
  { id:8,  year:2024, title:"SORA: Video Generation Models as World Simulators", authors:"OpenAI", venue:"Technical Report 2024", tags:["Video","Diffusion","Multimodal"], mins:16, url:"https://openai.com/research/video-generation-models-as-world-simulators", abstract:"Spacetime latent patches unlock 60-second photorealistic video generation — the first model to demonstrate emergent physics and camera dynamics from pure video data." },
  { id:9,  year:2024, title:"Llama 3: Open Foundation Models at Scale", authors:"Meta AI", venue:"arXiv 2024", tags:["LLM","Open Source"], mins:26, url:"https://arxiv.org/abs/2407.21783", abstract:"405B open-source model trained on 15T+ tokens — making frontier open-source AI genuinely competitive with closed systems for the first time." },
  { id:10, year:2024, title:"AlphaFold 3: Predicting All of Life's Molecular Structures", authors:"Google DeepMind", venue:"Nature 2024", tags:["Biology","Science","Diffusion"], mins:32, url:"https://www.nature.com/articles/s41586-024-07487-w", abstract:"SE(3) diffusion over all biomolecules — proteins, DNA, RNA, small molecules — extends AlphaFold's revolution to every molecular interaction in the living cell." },
  { id:11, year:2024, title:"The Era of 1-bit LLMs: All Large Language Models in 1.58 Bits", authors:"Microsoft Research", venue:"arXiv 2024", tags:["Efficiency","Quantization","Architecture"], mins:15, url:"https://arxiv.org/abs/2402.17764", abstract:"Ternary weights match full-precision performance while cutting memory and energy by an order of magnitude — pointing toward a new generation of edge-deployable AI." },

  // 2023
  { id:12, year:2023, title:"GPT-4 Technical Report", authors:"OpenAI", venue:"arXiv 2023", tags:["LLM","Multimodal","Reasoning"], mins:35, url:"https://arxiv.org/abs/2303.08774", abstract:"Human-level performance on the bar exam, GRE, and AMC — the model that shifted public perception of AI to genuine professional-grade intelligence." },
  { id:13, year:2023, title:"Llama 2: Open Foundation and Fine-Tuned Chat Models", authors:"Meta AI", venue:"arXiv 2023", tags:["LLM","Open Source"], mins:28, url:"https://arxiv.org/abs/2307.09288", abstract:"Open-source LLM family with thorough RLHF training that powered thousands of downstream research projects and set the template for responsible open-model releases." },
  { id:14, year:2023, title:"Constitutional AI: Harmlessness from AI Feedback", authors:"Anthropic", venue:"arXiv 2023", tags:["Alignment","Safety"], mins:24, url:"https://arxiv.org/abs/2212.08073", abstract:"A written constitution guides AI-generated critiques and revisions, scaling alignment without scaling human labor — the blueprint for Claude's safety training." },
  { id:15, year:2023, title:"Sparks of Artificial General Intelligence", authors:"Microsoft Research", venue:"arXiv 2023", tags:["AGI","LLM"], mins:60, url:"https://arxiv.org/abs/2303.12528", abstract:"100 pages of evidence that GPT-4 shows early AGI characteristics across mathematics, vision, law, medicine, and theory of mind — the paper that reframed the entire field." },
  { id:16, year:2023, title:"Chain-of-Thought Prompting Elicits Reasoning in LLMs", authors:"Wei et al., Google", venue:"NeurIPS 2023", tags:["Reasoning","Prompting"], mins:18, url:"https://arxiv.org/abs/2201.11903", abstract:"Step-by-step examples in prompts unlock dramatic reasoning improvements — the foundational technique behind every modern AI reasoning system." },
  { id:17, year:2023, title:"LoRA: Low-Rank Adaptation of Large Language Models", authors:"Hu et al.", venue:"ICLR 2023", tags:["Fine-tuning","Efficiency"], mins:20, url:"https://arxiv.org/abs/2106.09685", abstract:"Rank decomposition matrices reduce trainable parameters by 10,000x while matching full fine-tuning quality — now the universal standard for efficient LLM adaptation." },
  { id:18, year:2023, title:"Toolformer: Language Models Can Teach Themselves to Use Tools", authors:"Schick et al., Meta", venue:"NeurIPS 2023", tags:["Agents","LLM"], mins:20, url:"https://arxiv.org/abs/2302.04761", abstract:"Self-supervised API call learning without task-specific supervision — the conceptual blueprint for how modern AI agents use calculators, search, and external systems." },

  // 2022
  { id:19, year:2022, title:"Emergent Abilities of Large Language Models", authors:"Wei et al., Google", venue:"TMLR 2022", tags:["Scaling","LLM"], mins:22, url:"https://arxiv.org/abs/2206.07682", abstract:"Capabilities absent at smaller scales appear suddenly and unpredictably at larger ones — a profound challenge to smooth extrapolation and AI safety prediction." },
  { id:20, year:2022, title:"InstructGPT: Training LLMs to Follow Instructions with Human Feedback", authors:"Ouyang et al., OpenAI", venue:"NeurIPS 2022", tags:["Alignment","LLM"], mins:25, url:"https://arxiv.org/abs/2203.02155", abstract:"A 1.3B aligned model outperforms 175B GPT-3 on human preference — the direct blueprint for ChatGPT and every RLHF-trained assistant since." },
  { id:21, year:2022, title:"Stable Diffusion: High-Resolution Image Synthesis with Latent Diffusion Models", authors:"Rombach et al.", venue:"CVPR 2022", tags:["Diffusion","Image Gen"], mins:22, url:"https://arxiv.org/abs/2112.10752", abstract:"Running diffusion in compressed latent space cuts compute by 10x — the paper that democratized generative AI for everyone." },
  { id:22, year:2022, title:"Chinchilla: Training Compute-Optimal Large Language Models", authors:"Hoffmann et al., DeepMind", venue:"NeurIPS 2022", tags:["Scaling","LLM"], mins:20, url:"https://arxiv.org/abs/2203.15556", abstract:"70B Chinchilla outperforms 280B Gopher — proving the industry was massively undertrained and rewriting every LLM training recipe in the field." },
  { id:23, year:2022, title:"DALL-E 2: Hierarchical Text-Conditional Image Generation", authors:"Ramesh et al., OpenAI", venue:"arXiv 2022", tags:["Image Gen","Diffusion"], mins:20, url:"https://arxiv.org/abs/2204.06125", abstract:"CLIP embeddings plus cascaded diffusion decoder enable photorealistic image generation and semantic editing — the turning point for commercial image AI." },
  { id:24, year:2022, title:"Whisper: Robust Speech Recognition via Large-Scale Weak Supervision", authors:"Radford et al., OpenAI", venue:"ICML 2022", tags:["Speech","Multimodal"], mins:18, url:"https://arxiv.org/abs/2212.04356", abstract:"680K hours of multilingual audio produces near-human transcription with strong zero-shot transfer — the model now powering real-world ASR at scale." },

  // 2021
  { id:25, year:2021, title:"CLIP: Learning Transferable Visual Models from Natural Language", authors:"Radford et al., OpenAI", venue:"ICML 2021", tags:["Multimodal","Vision"], mins:25, url:"https://arxiv.org/abs/2103.00020", abstract:"Contrastive image-text training enables zero-shot classification across 30+ datasets — the backbone of almost every modern vision-language model." },
  { id:26, year:2021, title:"AlphaFold 2: Highly Accurate Protein Structure Prediction", authors:"Jumper et al., DeepMind", venue:"Nature 2021", tags:["Biology","Science"], mins:35, url:"https://www.nature.com/articles/s41586-021-03819-2", abstract:"50 years of structural biology solved in a single model — attention over evolutionary sequences produces atomic-precision protein structures, revolutionizing medicine and drug discovery." },
  { id:27, year:2021, title:"Codex: Evaluating Large Language Models Trained on Code", authors:"Chen et al., OpenAI", venue:"arXiv 2021", tags:["Code","LLM"], mins:22, url:"https://arxiv.org/abs/2107.03374", abstract:"28.8% pass rate on HumanEval and the power behind GitHub Copilot — the model that brought AI-assisted programming to tens of millions of developers." },

  // 2020
  { id:28, year:2020, title:"GPT-3: Language Models Are Few-Shot Learners", authors:"Brown et al., OpenAI", venue:"NeurIPS 2020", tags:["LLM","Scaling"], mins:40, url:"https://arxiv.org/abs/2005.14165", abstract:"175B parameters and in-context learning without gradient updates — the paper that established prompting as the dominant AI interaction paradigm." },
  { id:29, year:2020, title:"Scaling Laws for Neural Language Models", authors:"Kaplan et al., OpenAI", venue:"arXiv 2020", tags:["Scaling","LLM"], mins:25, url:"https://arxiv.org/abs/2001.08361", abstract:"Power-law relationships between parameters, data, compute, and loss — the quantitative laws behind every major LLM training decision for the past five years." },
  { id:30, year:2020, title:"Denoising Diffusion Probabilistic Models (DDPM)", authors:"Ho, Jain & Abbeel", venue:"NeurIPS 2020", tags:["Diffusion","Generative"], mins:22, url:"https://arxiv.org/abs/2006.11239", abstract:"Markov chain noise plus learned denoising produces high-quality images — the framework underlying Stable Diffusion, DALL-E 2, Sora, and most generative AI today." },
  { id:31, year:2020, title:"T5: Exploring the Limits of Transfer Learning", authors:"Raffel et al., Google", venue:"JMLR 2020", tags:["NLP","LLM"], mins:45, url:"https://arxiv.org/abs/1910.10683", abstract:"Every NLP task as text-to-text transformation on the C4 corpus — the architecture and training recipe that shaped the modern LLM paradigm." },

  // 2019
  { id:32, year:2019, title:"GPT-2: Language Models Are Unsupervised Multitask Learners", authors:"Radford et al., OpenAI", venue:"Technical Report 2019", tags:["LLM","Generation"], mins:18, url:"https://openai.com/research/better-language-models", abstract:"1.5B parameters generating coherent long-form text — withheld on safety grounds, marking the first major public AI risk communication moment in history." },
  { id:33, year:2019, title:"BERT: Pre-training of Deep Bidirectional Transformers", authors:"Devlin et al., Google", venue:"NAACL 2019", tags:["NLP","Architecture"], mins:25, url:"https://arxiv.org/abs/1810.04805", abstract:"Masked language modeling set 11 NLP benchmark records simultaneously and defined the pre-train/fine-tune paradigm that still dominates the field today." },

  // 2018
  { id:34, year:2018, title:"GPT-1: Improving Language Understanding by Generative Pre-Training", authors:"Radford et al., OpenAI", venue:"Technical Report 2018", tags:["LLM","NLP"], mins:18, url:"https://openai.com/research/language-unsupervised", abstract:"The origin of the GPT lineage: generative pre-training then discriminative fine-tuning outperforms task-specific models — the paper that started everything." },

  // 2017
  { id:35, year:2017, title:"Attention Is All You Need", authors:"Vaswani et al., Google", venue:"NeurIPS 2017", tags:["Architecture","Transformer"], mins:28, url:"https://arxiv.org/abs/1706.03762", abstract:"Self-attention replaces all recurrence and convolution. The single most influential paper in modern AI — every LLM, diffusion model, and vision transformer traces to this work." },
  { id:36, year:2017, title:"Proximal Policy Optimization Algorithms (PPO)", authors:"Schulman et al., OpenAI", venue:"arXiv 2017", tags:["RL","Optimization"], mins:16, url:"https://arxiv.org/abs/1707.06347", abstract:"Clipped surrogate objective balances stability and sample efficiency — now the standard RL algorithm powering RLHF in ChatGPT, Claude, Gemini, and every major LLM." },
  { id:37, year:2017, title:"AlphaGo Zero: Mastering Go Without Human Knowledge", authors:"Silver et al., DeepMind", venue:"Nature 2017", tags:["RL","Games"], mins:25, url:"https://www.nature.com/articles/nature24270", abstract:"Pure self-play RL surpasses all human knowledge in Go — demonstrating that superhuman expertise can emerge entirely from first principles with zero human data." },

  // 2015
  { id:38, year:2015, title:"DQN: Human-Level Control through Deep Reinforcement Learning", authors:"Mnih et al., DeepMind", venue:"Nature 2015", tags:["RL","Games"], mins:22, url:"https://www.nature.com/articles/nature14236", abstract:"Experience replay and target networks let a single CNN master 49 Atari games at human level — the paper that launched deep reinforcement learning as a field." },
  { id:39, year:2015, title:"Batch Normalization: Accelerating Deep Network Training", authors:"Ioffe & Szegedy, Google", venue:"ICML 2015", tags:["Architecture","Training"], mins:16, url:"https://arxiv.org/abs/1502.03167", abstract:"Normalizing activations enables much higher learning rates and acts as strong regularization — now a standard component of virtually every deep network." },

  // 2014
  { id:40, year:2014, title:"Generative Adversarial Networks (GANs)", authors:"Goodfellow et al.", venue:"NeurIPS 2014", tags:["Generative","Architecture"], mins:18, url:"https://arxiv.org/abs/1406.2661", abstract:"Generator vs discriminator minimax game enables realistic synthesis — the dominant generative modeling paradigm before diffusion models took over a decade later." },
  { id:41, year:2014, title:"Neural Machine Translation: Learning to Align and Translate", authors:"Bahdanau, Cho & Bengio", venue:"ICLR 2015", tags:["NLP","Architecture"], mins:20, url:"https://arxiv.org/abs/1409.0473", abstract:"The attention mechanism — the conceptual invention that Vaswani et al. scaled into the full Transformer, changing the course of all of AI." },
  { id:42, year:2014, title:"Dropout: A Simple Way to Prevent Neural Networks from Overfitting", authors:"Srivastava et al., Hinton Lab", venue:"JMLR 2014", tags:["Training","Theory"], mins:18, url:"https://www.jmlr.org/papers/v15/srivastava14a.html", abstract:"Randomly zeroing neurons during training prevents co-adaptation — the simplest and most universally adopted regularizer in deep learning history." },

  // 2012
  { id:43, year:2012, title:"AlexNet: ImageNet Classification with Deep CNNs", authors:"Krizhevsky, Sutskever & Hinton", venue:"NeurIPS 2012", tags:["Vision","Architecture"], mins:18, url:"https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf", abstract:"ReLU, GPU training, dropout — a 10.9% margin at ILSVRC 2012 that single-handedly ended shallow ML and began the deep learning era." },

  // 1986
  { id:44, year:1986, title:"Learning Representations by Back-propagating Errors", authors:"Rumelhart, Hinton & Williams", venue:"Nature 1986", tags:["Foundational","Theory"], mins:12, url:"https://www.nature.com/articles/323533a0", abstract:"The algorithm — chain rule applied through differentiable networks enables gradient descent on any computation graph. The irreducible foundation of all of deep learning." },
];

const ALL_TAGS = ["All", ...[...new Set(PAPERS.flatMap(p => p.tags))].sort()];

export default function App() {
  const [read, setRead] = useState({});
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try { const s = localStorage.getItem("airt8"); if (s) setRead(JSON.parse(s)); } catch {}
    if (window.storage) window.storage.get("airt8").then(r => { if(r) setRead(JSON.parse(r.value)); }).catch(()=>{});
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem("airt8", JSON.stringify(read)); } catch {}
    if (window.storage) window.storage.set("airt8", JSON.stringify(read)).catch(()=>{});
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
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes checkIn{0%{transform:scale(0)}70%{transform:scale(1.2)}100%{transform:scale(1)}}
        @keyframes slideOpen{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .paper{background:#fff;border:1px solid #ede9e0;border-radius:12px;cursor:pointer;transition:box-shadow .2s,border-color .2s,transform .2s;animation:fadeUp .35s ease both;}
        .paper:hover{box-shadow:0 4px 20px rgba(0,0,0,.06);border-color:#d4cfc4;transform:translateY(-1px);}
        .paper.is-read{background:#fbfaf8;opacity:.62;}
        .paper.is-read:hover{opacity:1;}
        .paper.is-open{border-color:#b8a898;box-shadow:0 6px 28px rgba(0,0,0,.08);}
        .check{width:22px;height:22px;border-radius:50%;border:1.5px solid #c8c2b6;background:transparent;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s cubic-bezier(.34,1.56,.64,1);}
        .check:hover{border-color:#8a7a6a;transform:scale(1.15);}
        .check.done{background:#2d6a4f;border-color:#2d6a4f;}
        .check.done .tick{animation:checkIn .3s cubic-bezier(.34,1.56,.64,1) both;}
        .srch{width:100%;padding:11px 16px 11px 40px;background:#fff;border:1px solid #ede9e0;border-radius:10px;font-family:'Inter',sans-serif;font-size:14px;color:#3a3530;outline:none;transition:border-color .2s,box-shadow .2s;}
        .srch::placeholder{color:#b8b0a4;}
        .srch:focus{border-color:#8a7a6a;box-shadow:0 0 0 3px rgba(138,122,106,.1);}
        .sel{appearance:none;-webkit-appearance:none;padding:10px 36px 10px 14px;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%238a7a6a' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 12px center;border:1px solid #ede9e0;border-radius:10px;font-family:'Inter',sans-serif;font-size:13px;color:#3a3530;cursor:pointer;outline:none;transition:border-color .2s;min-width:155px;}
        .sel:focus{border-color:#8a7a6a;box-shadow:0 0 0 3px rgba(138,122,106,.1);}
        .link-btn{display:inline-flex;align-items:center;gap:5px;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:#5a6e60;text-decoration:none;padding:6px 14px;border-radius:7px;border:1px solid #c8ddd0;background:#f2f8f4;transition:all .18s;}
        .link-btn:hover{background:#e4f0e8;border-color:#a8c8b4;color:#2d6a4f;}
        .mark-btn{font-family:'Inter',sans-serif;font-size:12px;font-weight:500;padding:6px 14px;border-radius:7px;border:1px solid;cursor:pointer;transition:all .18s;}
        .pbar{height:2px;background:#ede9e0;border-radius:1px;overflow:hidden;}
        .pfill{height:100%;background:linear-gradient(90deg,#2d6a4f,#52b788);border-radius:1px;transition:width .8s cubic-bezier(.4,0,.2,1);}
        .ab{animation:slideOpen .25s ease both;}
        .yr{font-family:'Spectral',serif;font-style:italic;font-weight:300;color:#ccc8bf;font-size:clamp(38px,6vw,54px);letter-spacing:-2px;line-height:1;}
        .new-badge{font-family:'Inter',sans-serif;font-size:9px;font-weight:600;letter-spacing:.6px;text-transform:uppercase;padding:2px 7px;border-radius:10px;background:#fef3c7;color:#92400e;border:1px solid #fde68a;margin-bottom:2px;}
      `}</style>

      {/* HEADER */}
      <div style={{position:"sticky",top:0,zIndex:50,background:"rgba(247,245,240,.96)",backdropFilter:"blur(12px)",borderBottom:"1px solid #ede9e0"}}>
        <div style={{maxWidth:760,margin:"0 auto",padding:"18px 24px 14px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
            <div>
              <h1 style={{fontFamily:"'Spectral',serif",fontWeight:600,fontStyle:"italic",fontSize:"clamp(20px,3.5vw,28px)",color:"#2a2520",letterSpacing:"-.3px"}}>AI Research Papers</h1>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#a89e92",marginTop:3}}>{readCount} of {PAPERS.length} read · {pct}% complete</p>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#a89e92",marginBottom:5}}>{PAPERS.length - readCount} remaining</div>
              <div className="pbar" style={{width:130}}><div className="pfill" style={{width:`${pct}%`}}/></div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{maxWidth:760,margin:"0 auto",padding:"26px 24px 80px"}}>
        <div style={{display:"flex",gap:10,marginBottom:28,flexWrap:"wrap"}}>
          <div style={{position:"relative",flex:1,minWidth:200}}>
            <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#b8b0a4",fontSize:15,pointerEvents:"none"}}>⌕</span>
            <input className="srch" placeholder="Search papers or authors…" value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
          <select className="sel" value={tag} onChange={e=>setTag(e.target.value)}>
            {ALL_TAGS.map(t=><option key={t} value={t}>{t==="All"?"All Topics":t}</option>)}
          </select>
        </div>

        {years.length===0 && (
          <div style={{textAlign:"center",padding:"60px 0",fontFamily:"'Spectral',serif",fontStyle:"italic",color:"#b8b0a4",fontSize:20}}>No papers found</div>
        )}

        {years.map((year,yi)=>{
          const yp = filtered.filter(p=>p.year===year);
          const isNew = year >= 2025;
          return (
            <div key={year} style={{marginBottom:42,animation:`fadeUp .4s ${yi*.05}s ease both`}}>
              <div style={{display:"flex",alignItems:"baseline",gap:14,marginBottom:14}}>
                <span className="yr">{year}</span>
                {isNew && <span className="new-badge">New</span>}
                <div style={{flex:1,height:1,background:"#ede9e0",alignSelf:"center"}}/>
                <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"#c8bfb4"}}>{yp.filter(p=>read[p.id]).length}/{yp.length}</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {yp.map((paper,pi)=>{
                  const isRead=!!read[paper.id];
                  const isOpen=open===paper.id;
                  return (
                    <div key={paper.id} className={`paper ${isRead?"is-read":""} ${isOpen?"is-open":""}`}
                      style={{padding:"16px 20px",animationDelay:`${yi*.05+pi*.03}s`}}
                      onClick={()=>setOpen(isOpen?null:paper.id)}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
                        <button className={`check ${isRead?"done":""}`} onClick={e=>toggleRead(paper.id,e)}>
                          {isRead&&<span className="tick" style={{color:"#fff",fontSize:11,lineHeight:1,marginTop:1}}>✓</span>}
                        </button>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
                            <h3 style={{fontFamily:"'Spectral',serif",fontWeight:isRead?400:600,fontSize:"clamp(13.5px,2vw,15px)",lineHeight:1.5,color:isRead?"#a89e92":"#2a2520",flex:1,textDecoration:isRead?"line-through":"none",textDecorationColor:"#c8bfb4"}}>
                              {paper.title}
                            </h3>
                            <span style={{color:"#c8bfb4",fontSize:10,flexShrink:0,paddingTop:4,display:"inline-block",transition:"transform .2s",transform:isOpen?"rotate(180deg)":"rotate(0)"}}>▼</span>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6,flexWrap:"wrap"}}>
                            <span style={{fontFamily:"'Inter',sans-serif",fontSize:11.5,color:isRead?"#c0b8b0":"#7a6e64",fontStyle:"italic"}}>{paper.authors}</span>
                            <span style={{color:"#d4cfc4",fontSize:10}}>·</span>
                            <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#a89e92"}}>{paper.venue}</span>
                            <span style={{color:"#d4cfc4",fontSize:10}}>·</span>
                            <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#c8bfb4"}}>~{paper.mins} min</span>
                          </div>
                          <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
                            {paper.tags.map(t=>(
                              <span key={t} onClick={e=>{e.stopPropagation();setTag(t);}}
                                style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:500,padding:"2px 8px",borderRadius:20,background:"#f0ebe2",color:"#7a6e64",cursor:"pointer",border:"1px solid #e0d8cc"}}>
                                {t}
                              </span>
                            ))}
                          </div>
                          {isOpen&&(
                            <div className="ab" style={{marginTop:14,paddingTop:14,borderTop:"1px solid #f0ebe2"}}>
                              <p style={{fontFamily:"'Spectral',serif",fontStyle:"italic",fontSize:13.5,lineHeight:1.85,color:"#7a6e64",marginBottom:14}}>{paper.abstract}</p>
                              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                                <a href={paper.url} target="_blank" rel="noopener noreferrer" className="link-btn" onClick={e=>e.stopPropagation()}>
                                  <span>↗</span> Read Paper
                                </a>
                                <button className="mark-btn" onClick={e=>toggleRead(paper.id,e)}
                                  style={{borderColor:isRead?"#d4cfc4":"#b8d4c8",background:isRead?"#faf8f4":"#f0f8f4",color:isRead?"#a89e92":"#2d6a4f"}}>
                                  {isRead?"Mark unread":"✓ Mark as read"}
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
            {PAPERS.length} essential papers · 1986 — 2026
          </p>
        </div>
      </div>
    </div>
  );
}
