import React, { useEffect, useRef, useState } from 'react';

const injectStyles = () => {
  if (document.getElementById('felicita-pampulha-completa-styles')) return;
  const style = document.createElement('style');
  style.id = 'felicita-pampulha-completa-styles';
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap');

    :root {
      --gold:   #C9A84C;
      --gold2:  #E8C97E;
      --gold3:  #9B7A2E;
      --cream:  #F5F0E8;
      --cream2: #EDE8DC;
      --dark:   #0A0A0A;
      --dark2:  #101010;
      --dark3:  #161616;
      --txt:    #1C1C1C;
      --txts:   #4A4A4A;
      --wht:    #FAFAFA;

      --gold10: rgba(201,168,76,.10);
      --gold15: rgba(201,168,76,.15);
      --gold20: rgba(201,168,76,.20);
      --gold30: rgba(201,168,76,.30);
      --gold50: rgba(201,168,76,.50);
    }

    html { scroll-behavior: smooth; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--cream); color: var(--dark); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    ::selection { background: var(--gold); color: var(--dark); }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--dark); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }

    .fade-up { opacity:0; transform:translateY(24px); transition:opacity .9s cubic-bezier(.25,.46,.45,.94),transform .9s cubic-bezier(.25,.46,.45,.94); }
    .fade-up.visible { opacity:1; transform:translateY(0); }

    .f-header { position:fixed; top:0; left:0; right:0; z-index:1000; background:rgba(10,10,10,.94); backdrop-filter:blur(20px); border-bottom:1px solid var(--gold20); display:flex; align-items:center; justify-content:space-between; padding:14px 56px; }
    .f-header-badge { font-family:'Montserrat',sans-serif; font-size:10px; font-weight:600; letter-spacing:.35em; text-transform:uppercase; color:var(--gold); background:var(--gold10); border:1px solid var(--gold30); padding:6px 16px; border-radius:999px; }

    .hero-video-wrap { position:absolute; inset:0; overflow:hidden; }
    .hero-video-wrap video { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); min-width:100%; min-height:100%; width:auto; height:auto; object-fit:cover; }

    .spread { position:relative; overflow:hidden; }
    .spread-img { position:absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%; object-fit:cover; display:block; }
    .spread-veil { position:absolute; inset:0; background:linear-gradient(to bottom,rgba(10,10,10,.3) 0%,rgba(10,10,10,0) 30%,rgba(10,10,10,0) 50%,rgba(10,10,10,.85) 100%); }

    .photo-frame { position:relative; overflow:hidden; border-radius:2px; }
    .photo-frame img { display:block; width:100%; height:100%; object-fit:cover; transition:transform 1.2s ease; }
    .photo-frame:hover img { transform:scale(1.04); }
    .photo-frame-border { position:absolute; inset:0; border:.5px solid var(--gold30); z-index:2; pointer-events:none; border-radius:2px; }

    .diff-card { padding:28px 24px; border:1px solid var(--gold20); background:var(--wht); border-radius:4px; position:relative; overflow:hidden; transition:border-color .3s,box-shadow .3s; box-shadow:0 4px 24px rgba(201,168,76,.06); }
    .diff-card:hover { border-color:var(--gold); box-shadow:0 8px 32px var(--gold15); }
    .diff-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--gold3),var(--gold),var(--gold2)); }

    .vip-card { padding:36px 32px; border:1px solid var(--gold30); background:linear-gradient(135deg,var(--gold10),transparent); border-radius:4px; position:relative; overflow:hidden; }
    .vip-card::after { content:'VIP'; position:absolute; top:16px; right:20px; font-family:'Playfair Display',serif; font-size:11px; font-weight:700; letter-spacing:.4em; color:var(--gold); opacity:.25; }

    .team-item { border-bottom:1px solid var(--gold20); padding-bottom:20px; transition:border-color .4s; }
    .team-item:hover { border-color:var(--gold); }

    .buffet-row { display:flex; flex-direction:column; padding-bottom:20px; border-bottom:1px solid var(--gold20); }
    @media (min-width:768px) { .buffet-row { flex-direction:row; align-items:baseline; } }

    .inv-table-row { display:grid; grid-template-columns:80px 1fr 1fr 1fr; padding:12px 0; border-bottom:.5px solid var(--gold15); transition:background .2s; }
    .inv-table-row:hover { background:var(--gold10); }
    .inv-table-row:last-child { border-bottom:none; }

    .stat-item { display:flex; flex-direction:column; padding:16px 0; }
    .grid-bg { background-image:linear-gradient(var(--gold10) 1px,transparent 1px),linear-gradient(90deg,var(--gold10) 1px,transparent 1px); background-size:32px 32px; }

    .outdoor-stat { display:flex; flex-direction:column; gap:6px; padding:24px; border:1px solid var(--gold20); background:rgba(201,168,76,.04); }

    @media (max-width:768px) {
      .f-header { padding:10px 16px; }
      section { padding-left:20px !important; padding-right:20px !important; overflow-x:hidden !important; }
      * { max-width:100vw; box-sizing:border-box; }
      #hero { height:100svh !important; }
    }
  `;
  document.head.appendChild(style);
};

const useFadeIn = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

const FadeIn = ({ children, delay = 0 }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} className={`fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const TeamVideo = () => {
  const [started, setStarted] = useState(false);
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', borderRadius: 2, overflow: 'hidden', background: '#000' }}>
      {started ? (
        <iframe title="Equipe Felicitá Pampulha" src="https://www.youtube.com/embed/5038gNSMQTg?autoplay=1&mute=0&playsinline=1&rel=0&controls=1" allow="autoplay; fullscreen" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
      ) : (
        <>
          <img src="/images/team-thumb.png" alt="Equipe Felicitá" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#0A0A0A' }} />
          <div onClick={() => setStarted(true)} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', cursor: 'pointer' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(201,168,76,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(201,168,76,0.4)' }}>
              <div style={{ width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: '22px solid #0A0A0A', marginLeft: 4 }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const LogoLight = ({ height = 48 }) => (
  <img src="/images/Logo com letras branca correto.svg" alt="Espaço Felicitá" style={{ height, width: 'auto', display: 'block' }} />
);

const Eyebrow = ({ text, center = false }) => (
  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '.44em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: 16, textAlign: center ? 'center' : 'left' }}>{text}</span>
);

const EyebrowLight = ({ text, center = false }) => (
  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '.44em', textTransform: 'uppercase', color: 'var(--gold2)', display: 'block', marginBottom: 16, textAlign: center ? 'center' : 'left' }}>{text}</span>
);

const Rule = ({ center = false, light = false }) => (
  <div style={{ width: 48, height: 1, background: center ? `linear-gradient(90deg,transparent,${light ? 'var(--gold2)' : 'var(--gold)'},transparent)` : `linear-gradient(90deg,${light ? 'var(--gold2)' : 'var(--gold)'},transparent)`, margin: center ? '20px auto' : '20px 0' }} />
);

const Frame = ({ src, alt, style: s = {}, imgStyle = {} }) => (
  <div className="photo-frame" style={s}>
    <div className="photo-frame-border" />
    <img src={src} alt={alt} style={{ objectPosition: 'center center', ...imgStyle }} />
  </div>
);

const PRICING = [
  [100,'62.000,00','71.000,00','77.000,00'],
  [110,'64.500,00','73.500,00','79.500,00'],
  [120,'67.000,00','76.000,00','82.000,00'],
  [130,'69.500,00','78.500,00','84.500,00'],
  [140,'72.000,00','81.000,00','87.000,00'],
  [150,'74.500,00','83.500,00','89.500,00'],
  [160,'77.000,00','86.000,00','92.000,00'],
  [170,'79.500,00','88.500,00','94.500,00'],
  [180,'82.000,00','91.000,00','97.000,00'],
  [190,'84.500,00','93.500,00','99.500,00'],
  [200,'87.000,00','96.000,00','102.000,00'],
  [210,'89.500,00','98.500,00','104.500,00'],
  [220,'92.000,00','101.000,00','107.000,00'],
  [230,'94.500,00','103.500,00','109.500,00'],
  [240,'97.000,00','106.000,00','112.000,00'],
  [250,'99.500,00','108.500,00','114.500,00'],
  [260,'102.000,00','111.000,00','117.500,00'],
  [270,'104.500,00','113.500,00','119.500,00'],
  [280,'107.000,00','116.000,00','122.000,00'],
  [290,'109.500,00','118.500,00','124.500,00'],
  [300,'112.000,00','121.000,00','127.000,00'],
];

export default function App() {
  useEffect(() => { injectStyles(); }, []);
  const isMobile = useIsMobile();
  const gridBg = { backgroundImage: 'linear-gradient(var(--gold10) 1px,transparent 1px),linear-gradient(90deg,var(--gold10) 1px,transparent 1px)', backgroundSize: '32px 32px' };

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* HEADER */}
      <header className="f-header">
        <LogoLight height={isMobile ? 36 : 48} />
        <span className="f-header-badge">Proposta Exclusiva · Pampulha Completa · 2026</span>
      </header>
      <div style={{ height: isMobile ? 68 : 80 }} />

      {/* S1 HERO */}
      <section id="hero" style={{ position: 'relative', height: isMobile ? '100svh' : '130vh', overflow: 'hidden' }}>
        <div className="hero-video-wrap">
          <video ref={el => { if (!el) return; el.muted = true; el.playsInline = true; const t = () => el.play().catch(() => {}); el.addEventListener('ended', t); el.addEventListener('pause', () => { if (!el.ended) t(); }); t(); }} src="/videos/hero.mp4" muted playsInline preload="auto" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(170deg,rgba(10,10,10,.1) 0%,rgba(10,10,10,.35) 40%,rgba(10,10,10,.88) 75%,#0A0A0A 100%)' }} />
        <div style={{ position: 'absolute', bottom: isMobile ? 40 : 90, left: isMobile ? 24 : 56, right: isMobile ? 24 : 56, zIndex: 2 }}>
          <FadeIn delay={150}>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 'clamp(32px,9vw,48px)' : 'clamp(52px,6vw,84px)', fontWeight: 700, color: '#fff', lineHeight: 1.06, marginBottom: isMobile ? 12 : 20, letterSpacing: '-.02em' }}>
              Uma noite que <span style={{ color: 'var(--gold2)', fontStyle: 'italic' }}>nunca se esquece.</span>
            </h1>
          </FadeIn>
          {!isMobile && (
            <FadeIn delay={300}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 23, color: 'rgba(255,255,255,.55)', lineHeight: 1.75, maxWidth: 540 }}>
                O Espaço Felicitá Pampulha — onde cada detalhe foi concebido para transformar os momentos mais marcantes da sua vida em memória eterna.
              </p>
            </FadeIn>
          )}
          {!isMobile && (
            <FadeIn delay={450}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 36 }}>
                {['300 convidados', 'Área externa exclusiva', 'Buffet próprio', 'Casamento · 15 Anos · Adulto'].map((pill, i) => (
                  <span key={i} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.45)', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(201,168,76,.25)', padding: '6px 16px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />{pill}
                  </span>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* S2 CASAMENTO */}
      <section id="celebracao" style={{ background: 'var(--cream2)', padding: isMobile ? '72px 24px' : 'clamp(72px,9vw,112px) clamp(24px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 48 : 88, alignItems: 'center' }}>
            <FadeIn>
              <Frame src="/images/essence.jpg" alt="Casamento Espaço Felicitá Pampulha" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 30%' }} />
            </FadeIn>
            <div>
              <FadeIn>
                <Eyebrow text="Casamento · A Celebração Mais Importante" />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,3.5vw,52px)', fontWeight: 700, color: 'var(--txt)', lineHeight: 1.1, marginBottom: 8 }}>O lugar onde o seu sim</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,3.5vw,52px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold3)', lineHeight: 1.1 }}>encontra o cenário perfeito.</h2>
                <Rule />
              </FadeIn>
              <FadeIn delay={200}>
                <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 22, color: 'var(--txts)', lineHeight: 1.85, borderLeft: '1.5px solid var(--gold)', paddingLeft: 22, margin: '28px 0 32px' }}>
                  "No Espaço Felicitá Pampulha, o casamento começa antes do altar — na qualidade de cada espaço, na precisão de cada detalhe, na emoção que apenas o ambiente certo é capaz de provocar."
                </blockquote>
              </FadeIn>
              <FadeIn delay={300}>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 300, color: 'var(--txts)', lineHeight: 2, marginBottom: 12 }}>
                  Da cerimônia ao ar livre no jardim exclusivo à recepção no salão principal — cada ambiente foi concebido para que você e seus convidados vivam esse dia com presença, elegância e sofisticação absoluta.
                </p>
              </FadeIn>
              <FadeIn delay={400}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 0, borderTop: '1px solid var(--gold20)', paddingTop: 32, marginTop: 8 }}>
                  {[{ n: '+14', l: 'Anos de história' }, { n: '3', l: 'Unidades em BH' }, { n: '300', l: 'Convidados' }, { n: 'Próprio', l: 'Buffet exclusivo' }].map((s, i) => (
                    <div key={i} className="stat-item">
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 400, color: 'var(--gold)', display: 'block', lineHeight: 1.1, marginBottom: 6 }}>{s.n}</span>
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--txts)' }}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S3 SPREAD — ÁREA EXTERNA */}
      <section className="spread" style={{ height: isMobile ? '85vh' : '95vh' }}>
        <img className="spread-img" src="/images/spread-1.png" alt="Área externa Espaço Felicitá Pampulha" style={{ objectPosition: 'center center' }} />
        <div className="spread-veil" />
        <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 20 }}><LogoLight height={44} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 48 : 80, left: isMobile ? 24 : 64, right: isMobile ? 24 : 64, zIndex: 20 }}>
          <FadeIn>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '.5em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--gold50)', padding: '5px 18px', borderRadius: 999, display: 'inline-block', marginBottom: 24 }}>Cerimônia ao Ar Livre</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 'clamp(28px,8vw,44px)' : 'clamp(44px,5.5vw,76px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.06, marginBottom: 16, maxWidth: 820 }}>
              O único espaço em Belo Horizonte<br />
              <span style={{ color: 'var(--gold2)', fontStyle: 'italic' }}>para quem recusa o ordinário.</span>
            </h2>
            {!isMobile && (
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 22, color: 'rgba(255,255,255,.65)', lineHeight: 1.8, maxWidth: 620 }}>
                Porque alguns momentos exigem o céu como teto, o jardim como cenário e a noite como cúmplice — e apenas um espaço em BH oferece tudo isso com a exclusividade que a ocasião exige.
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* S3B CERIMÔNIA — CONTEÚDO */}
      <section style={{ background: 'var(--dark)', padding: isMobile ? '72px 24px' : '96px 64px', ...gridBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
            <FadeIn>
              <EyebrowLight text="Exclusividade ao Ar Livre" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3vw,44px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.1, marginBottom: 8 }}>Um jardim privativo.</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3vw,44px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold2)', lineHeight: 1.1 }}>Uma experiência sem igual.</h2>
              <Rule light />
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,.5)', lineHeight: 2, marginTop: 8, marginBottom: 36 }}>
                A Unidade Pampulha é o único espaço em Belo Horizonte que oferece cerimônias ao ar livre em um ambiente completamente exclusivo. Um jardim projetado, iluminação cênica e acesso controlado — para que o momento mais importante da sua vida aconteça exatamente como você sempre imaginou.
              </p>
              <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 22, color: 'var(--gold2)', lineHeight: 1.8, borderLeft: '1.5px solid var(--gold)', paddingLeft: 22 }}>
                "Nenhum salão reproduz o que a natureza oferece — e nenhum espaço ao ar livre em BH oferece o que o Felicitá Pampulha entrega."
              </blockquote>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { t: 'Jardim Privativo', d: 'Área exclusiva, sem interferência externa' },
                { t: 'Iluminação Cênica', d: 'Projeto luminotécnico assinado' },
                { t: 'Paisagismo Exclusivo', d: 'Vegetação selecionada e curada' },
                { t: 'Privacidade Total', d: 'Acesso controlado durante toda a celebração' },
                { t: 'Cerimônia + Recepção', d: 'Transição fluida do externo ao salão' },
                { t: 'Único em BH', d: 'Nenhum outro espaço oferece esse diferencial' },
              ].map((item, i) => (
                <FadeIn delay={i * 60} key={i}>
                  <div className="outdoor-stat">
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{item.t}</span>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,.4)', lineHeight: 1.6 }}>{item.d}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S4 EQUIPE */}
      <section style={{ backgroundColor: 'var(--dark2)', padding: isMobile ? '72px 24px' : '96px 64px', ...gridBg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <EyebrowLight text="Profissionais Dedicados" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.1, marginBottom: 8 }}>A equipe que transforma</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3.5vw,46px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold2)', lineHeight: 1.1 }}>cada detalhe em magia.</h2>
              <Rule center light />
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,.45)', maxWidth: 540, margin: '16px auto 0', lineHeight: 2 }}>
                Cada membro da equipe é treinado para antecipar necessidades, garantir segurança e transformar cada minuto da festa em um momento inesquecível.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 72, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { t: 'Coordenador do Evento', d: 'Orquestração completa — do planejamento ao último brinde' },
                { t: 'Garçons', d: 'Serviço impecável e presença discreta durante toda a celebração' },
                { t: 'Porteiro', d: 'Recepção calorosa e controle de acesso com cordialidade' },
                { t: 'Equipe de Cozinha', d: 'Especialistas em experiência gastronômica de alto nível' },
              ].map((item, i) => (
                <FadeIn delay={i * 80} key={i}>
                  <div className="team-item">
                    <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 500, color: 'var(--gold2)', marginBottom: 6 }}>{item.t}</h5>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,.4)', lineHeight: 1.8 }}>{item.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={200}><TeamVideo /></FadeIn>
          </div>
        </div>
      </section>

      {/* S5 ESTRUTURA */}
      <section id="estrutura" style={{ background: 'var(--cream2)', padding: isMobile ? '72px 24px' : '88px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
            <FadeIn>
              <div>
                <Eyebrow text="Estrutura & Exclusividade" />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3vw,44px)', fontWeight: 700, color: 'var(--txt)', lineHeight: 1.1, marginBottom: 8 }}>Detalhes que elevam</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3vw,44px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold3)', lineHeight: 1.1 }}>cada momento.</h2>
                <Rule />
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 300, color: 'var(--txts)', lineHeight: 2, marginTop: 8 }}>
                  A Unidade Pampulha foi concebida para ser o cenário perfeito de uma celebração única. Cada elemento foi escolhido com um único critério: a excelência.
                </p>
              </div>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
              {[
                { t: 'Capacidade', v: '300', s: 'convidados' },
                { t: 'Exclusividade', v: 'Sala VIP', s: 'para os anfitriões' },
                { t: 'Conforto', v: 'Climatizado', s: 'todos os ambientes' },
                { t: 'Elegância', v: 'Lustres', s: 'de cristal' },
                { t: 'Segurança', v: 'Câmeras', s: 'circuito completo' },
                { t: 'Palco', v: 'Estruturado', s: 'apresentações ao vivo' },
                { t: 'Paisagismo', v: 'Exclusivo', s: 'projeto assinado' },
                { t: 'Acessibilidade', v: 'Completa', s: 'todos os ambientes' },
                { t: 'Quarto da Noiva', v: 'Privativo', s: 'preparação exclusiva' },
                { t: 'Quarto do Noivo', v: 'Privativo', s: 'lounge exclusivo' },
                { t: 'Estacionamento', v: 'Reservado', s: 'aos anfitriões do evento' },
                { t: 'Área Externa', v: 'Exclusiva', s: 'cerimônias ao ar livre' },
              ].map((c, i) => (
                <FadeIn delay={i * 45} key={i}>
                  <div className="diff-card">
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '.32em', textTransform: 'uppercase', color: 'var(--gold3)', display: 'block', marginBottom: 10 }}>{c.t}</span>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 500, color: 'var(--txt)', display: 'block', lineHeight: 1.1, marginBottom: 4 }}>{c.v}</span>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 300, color: 'var(--txts)' }}>{c.s}</span>
                  </div>
                </FadeIn>
              ))}
              <FadeIn delay={600}>
                <div className="vip-card" style={{ gridColumn: '1 / -1' }}>
                  <Eyebrow text="Sala VIP" />
                  <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 500, color: 'var(--gold)', marginBottom: 10 }}>Ambiente reservado para momentos exclusivos</h5>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 300, color: 'var(--txts)', lineHeight: 1.9, marginBottom: 20 }}>
                    Espaço privativo com decoração refinada, iluminação especial e serviço dedicado — para quem deseja um momento à parte durante a celebração.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {['Acesso exclusivo', 'Decoração diferenciada', 'Serviço personalizado', 'Ambiente climatizado', 'Iluminação especial'].map((item, i) => (
                      <span key={i} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 500, color: 'var(--gold3)', background: 'var(--gold10)', border: '1px solid var(--gold20)', padding: '4px 14px', borderRadius: 999 }}>{item}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SA SPREAD ADULTO */}
      <section className="spread" style={{ height: isMobile ? '70vh' : '85vh' }}>
        <img className="spread-img" src="/images/spread-2.png" alt="Festa Adulto Felicitá Pampulha" style={{ objectPosition: 'center center' }} />
        <div className="spread-veil" />
        <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 20 }}><LogoLight height={44} /></div>
        <div style={{ position: 'absolute', bottom: isMobile ? 48 : 80, left: isMobile ? 24 : 64, zIndex: 20 }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: isMobile ? 18 : 22, fontWeight: 300, color: 'rgba(255,255,255,.75)', marginBottom: 8 }}>uma celebração à altura</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 'clamp(26px,7vw,36px)' : 'clamp(34px,3.5vw,48px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>De Quem Você É</h2>
          </FadeIn>
        </div>
      </section>

      {/* SB SPREAD 15 ANOS */}
      <section className="spread" style={{ height: isMobile ? '70vh' : '85vh' }}>
        <img className="spread-img" src="/images/spread-3.png" alt="Festa 15 Anos Felicitá Pampulha" style={{ objectPosition: 'center center' }} />
        <div className="spread-veil" />
        <div style={{ position: 'absolute', bottom: isMobile ? 48 : 80, left: isMobile ? 24 : 64, zIndex: 20 }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: isMobile ? 18 : 22, fontWeight: 300, color: 'rgba(255,255,255,.75)', marginBottom: 8 }}>o dia mais esperado da sua vida</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 'clamp(26px,7vw,36px)' : 'clamp(34px,3.5vw,48px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>Realizado Como Você Sonhou</h2>
          </FadeIn>
        </div>
      </section>

      {/* S8 BOATE */}
      <section style={{ backgroundColor: 'var(--cream2)', padding: isMobile ? '72px 24px' : '96px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
            <div>
              <FadeIn>
                <Eyebrow text="Boate · Luz · Som" />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3vw,44px)', fontWeight: 700, color: 'var(--txt)', lineHeight: 1.1, marginBottom: 8 }}>Onde a festa</h2>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3vw,44px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold3)', lineHeight: 1.1 }}>ganha vida.</h2>
                <Rule />
                <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 21, color: 'var(--txts)', lineHeight: 1.85, borderLeft: '1.5px solid var(--gold)', paddingLeft: 22, margin: '24px 0 32px' }}>
                  "Uma estrutura de boate completa, pensada para que a energia e a magia da noite sejam sentidas por cada convidado — do primeiro ao último momento."
                </blockquote>
              </FadeIn>
              <FadeIn delay={200}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {['Painel de LED', 'Faixas de LED no Teto', 'DJ Profissional'].map((item, i) => (
                    <li key={i} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 300, color: 'var(--txts)', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ width: 24, height: 1, background: 'var(--gold)', flexShrink: 0 }} />{item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <FadeIn delay={150}>
              <Frame src="/images/celebration.png" alt="Boate Felicitá" style={{ aspectRatio: '4/5' }} imgStyle={{ objectPosition: 'center 30%' }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S9 GASTRONOMIA */}
      <section id="gastronomia" style={{ background: 'var(--cream)', padding: isMobile ? '72px 24px' : '96px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <Eyebrow text="Gastronomia de Alto Nível" center />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3vw,44px)', fontWeight: 700, color: 'var(--txt)', lineHeight: 1.1, marginBottom: 8 }}>Buffet próprio,</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3vw,44px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold3)', lineHeight: 1.1 }}>sabor de verdade.</h2>
              <Rule center />
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 300, color: 'var(--txts)', lineHeight: 2, maxWidth: 560, margin: '16px auto 0' }}>
                Nosso buffet é inteiramente próprio — desenvolvido para atender todos os convidados com excelência, variedade e apresentação impecável.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12, marginBottom: 56 }}>
              <Frame src="/images/buffet-1.jpg" alt="Buffet Felicitá" style={{ aspectRatio: '4/3' }} imgStyle={{ objectPosition: 'center center' }} />
              <Frame src="/images/buffet-2.jpg" alt="Buffet Felicitá" style={{ aspectRatio: '4/3' }} imgStyle={{ objectPosition: 'center center' }} />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 800, margin: '0 auto' }}>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, color: 'var(--txts)', marginBottom: 20, letterSpacing: '.08em' }}>
                *Ítens opcionais — composição definida conforme o pacote contratado.
              </p>
              {[
                { t: 'Jantar completo *', d: 'Pratos quentes, saladas, carnes e acompanhamentos' },
                { t: 'Mesa de frios *', d: 'Queijos, embutidos e acompanhamentos selecionados' },
                { t: 'Massa ao vivo *', d: 'Preparo artesanal na frente dos convidados, com variedade de molhos e acompanhamentos' },
                { t: 'Bar completo *', d: 'Bebidas alcoólicas, sucos, refrigerantes e água' },
              ].map((item, i) => (
                <FadeIn delay={i * 60} key={i}>
                  <div className="buffet-row">
                    <h5 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 500, color: 'var(--txt)', minWidth: 210, marginBottom: isMobile ? 4 : 0 }}>{item.t}</h5>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 300, color: 'var(--txts)', lineHeight: 1.7 }}>{item.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* S10 INVESTIMENTO */}
      <section id="investimento" style={{ backgroundColor: 'var(--dark)', padding: isMobile ? '72px 24px' : '96px 64px', ...gridBg }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <EyebrowLight text="Proposta de Investimento" center />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3vw,48px)', fontWeight: 700, color: 'var(--wht)', lineHeight: 1.1, marginBottom: 8 }}>O valor de uma</h2>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(30px,3vw,48px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1.1 }}>memória eterna.</h2>
              <Rule center light />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 22, fontWeight: 300, color: 'rgba(250,250,250,.4)', lineHeight: 1.85, maxWidth: 520, margin: '16px auto 0' }}>
                "Cada celebração é única — e o Espaço Felicitá garante que o investimento reflita a exclusividade que a sua festa merece."
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
              {['Mínimo 100 convidados', 'Buffet R$ 250,00 por pessoa', 'Locação a partir de R$ 23.000'].map((info, i) => (
                <span key={i} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', background: 'var(--gold10)', border: '1px solid var(--gold30)', padding: '7px 20px', borderRadius: 999 }}>{info}</span>
              ))}
            </div>

            {/* DESKTOP */}
            {!isMobile && (
              <div style={{ border: '.5px solid var(--gold30)', background: 'var(--dark3)', padding: '40px 40px', position: 'relative' }}>
                {[{ top:-1,left:-1,borderTop:'2px solid var(--gold)',borderLeft:'2px solid var(--gold)' },{ top:-1,right:-1,borderTop:'2px solid var(--gold)',borderRight:'2px solid var(--gold)' },{ bottom:-1,left:-1,borderBottom:'2px solid var(--gold)',borderLeft:'2px solid var(--gold)' },{ bottom:-1,right:-1,borderBottom:'2px solid var(--gold)',borderRight:'2px solid var(--gold)' }].map((s,i)=>(<div key={i} style={{ position:'absolute', width:18, height:18, ...s }}/>))}
                <div style={{ display:'grid', gridTemplateColumns:'80px 1fr 1fr 1fr', paddingBottom:14, marginBottom:8, borderBottom:'.5px solid var(--gold20)' }}>
                  {['Convidados','2ª a 5ª','6ª · Dom · Fer · Vésp','Sábado'].map((h,i)=>(
                    <span key={i} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, fontWeight:700, color:'var(--gold)', letterSpacing:'.24em', textTransform:'uppercase', textAlign:i===0?'left':'center' }}>{h}</span>
                  ))}
                </div>
                {PRICING.map(([pax,seg,sexdom,sab],i)=>(
                  <div key={i} className="inv-table-row">
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:500, color:'var(--gold)' }}>{pax}</span>
                    <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:13, fontWeight:300, color:'rgba(250,250,250,.6)', textAlign:'center' }}>R$ {seg}</span>
                    <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:13, fontWeight:300, color:'rgba(250,250,250,.6)', textAlign:'center' }}>R$ {sexdom}</span>
                    <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:13, fontWeight:300, color:'rgba(250,250,250,.6)', textAlign:'center' }}>R$ {sab}</span>
                  </div>
                ))}
              </div>
            )}

            {/* MOBILE */}
            {isMobile && (
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                {PRICING.map(([pax,seg,sexdom,sab],i)=>(
                  <div key={i} style={{ padding:'16px 14px', border:'.5px solid var(--gold20)', background:'var(--dark2)', borderRadius:4, marginBottom:2 }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:500, color:'var(--gold)', display:'block', marginBottom:12 }}>{pax} convidados</span>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                      {[['2ª a 5ª',seg],['6ª · Dom · Fer',sexdom],['Sábado',sab]].map(([label,val],j)=>(
                        <div key={j} style={{ display:'flex', flexDirection:'column', gap:4, background:'var(--gold10)', border:'.5px solid var(--gold20)', borderRadius:4, padding:'8px 6px', textAlign:'center' }}>
                          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:8, fontWeight:700, color:'var(--gold)', letterSpacing:'.12em', textTransform:'uppercase' }}>{label}</span>
                          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:11, fontWeight:400, color:'rgba(250,250,250,.7)' }}>R$ {val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </FadeIn>
          <FadeIn delay={400}>
            <div style={{ marginTop:32, display:'flex', flexDirection:'column', gap:10, alignItems:'center' }}>
              <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, fontWeight:500, letterSpacing:'.32em', textTransform:'uppercase', color:'var(--gold)', border:'.5px solid var(--gold20)', padding:'9px 24px', display:'inline-block' }}>Formas de pagamento a combinar</span>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:14, color:'rgba(250,250,250,.3)', textAlign:'center', lineHeight:1.8 }}>
                * Esta proposta tem validade de 5 dias e não garante reserva de data.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* S11 CONTATO */}
      <section id="contato" style={{ backgroundColor: 'var(--dark2)', padding: isMobile ? '72px 24px' : '96px 64px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', borderTop:'.5px solid rgba(201,168,76,.1)', ...gridBg }}>
        <FadeIn><LogoLight height={isMobile ? 260 : 360} /></FadeIn>
        <FadeIn delay={200}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(28px,3vw,46px)', fontWeight:400, color:'var(--wht)', lineHeight:1.3, marginTop:36, marginBottom:8 }}>Onde os seus sonhos</h2>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,3vw,46px)', fontStyle:'italic', fontWeight:400, color:'var(--gold)', lineHeight:1.3, marginBottom:56 }}>se realizam</h2>
        </FadeIn>
        <FadeIn delay={300}>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:48, maxWidth:900, width:'100%', marginBottom:56 }}>
            {[
              { l:'Instagram', v:<a href="https://www.instagram.com/espaco_felicita" target="_blank" rel="noopener noreferrer" style={{ color:'var(--wht)', textDecoration:'none' }}>@espaco_felicita</a> },
              { l:'WhatsApp', v:<a href="https://wa.me/5531973560312?text=Olá!%20Vim%20pela%20proposta%20Pampulha%20Completa." target="_blank" rel="noopener noreferrer" style={{ color:'var(--wht)', textDecoration:'none' }}>(31) 97356-0312</a> },
              { l:'Endereço', v:<a href="https://maps.google.com/?q=Avenida+Otacílio+Negrão+de+Lima,+6920,+Bandeirantes,+Belo+Horizonte,+MG" target="_blank" rel="noopener noreferrer" style={{ color:'var(--wht)', textDecoration:'none' }}>Av. Otacílio Negrão de Lima, 6920<br/>Bandeirantes, BH</a> },
              { l:'Site', v:<a href="https://www.espacofelicita.com.br/site/" target="_blank" rel="noopener noreferrer" style={{ color:'var(--wht)', textDecoration:'none' }}>www.espacofelicita.com.br</a> },
            ].map((ct,i)=>(
              <div key={i} style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.44em', textTransform:'uppercase', color:'var(--gold)' }}>{ct.l}</span>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:'var(--wht)', lineHeight:1.6 }}>{ct.v}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div style={{ borderTop:'.5px solid var(--gold15)', paddingTop:40, display:'flex', flexDirection:'column', alignItems:'center', gap:16, width:'100%', maxWidth:520 }}>
            <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, fontWeight:600, letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(250,250,250,.2)' }}>Conheça também nossas casas</span>
            <div style={{ display:'flex', flexDirection:isMobile?'column':'row', gap:isMobile?12:48, alignItems:'center', fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:28, color:'var(--gold2)' }}>
              <span style={{ whiteSpace:'nowrap' }}>Felicitá Palmares</span>
              {!isMobile && <span style={{ color:'var(--gold20)' }}>·</span>}
              <span style={{ whiteSpace:'nowrap' }}>Felicitá Cidade Nova</span>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={600}>
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, fontWeight:300, letterSpacing:'.18em', color:'rgba(250,250,250,.15)', marginTop:52 }}>
            Espaço Felicitá © 2026 · Unidade Pampulha · Belo Horizonte, MG
          </p>
        </FadeIn>
      </section>

    </div>
  );
}
