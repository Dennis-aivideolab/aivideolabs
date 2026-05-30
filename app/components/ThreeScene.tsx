'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { getT } from '@/lib/i18n';

// ── Per-language text ──────────────────────────────────────────────────────
const ST: Record<string, {
  heroEyebrow: string; line1: string; line2: string; line3: string;
  sub: string; btn1: string; btn2: string;
  svc01: string; svcH2: [string, string, string];
  pf01: string; pfH2: [string, string, string];
  ref01: string; refH2: [string, string, string];
  refQuote: string; refBy: string;
  ctaLabel: string; ctaH2: string; ctaH2em: string; ctaH2c: string; ctaBtn: string;
}> = {
  de: {
    heroEyebrow: 'Cinematic AI Content · Schweiz',
    line1: 'Kino-Niveau.', line2: 'KI-Tempo.', line3: 'Null Drehtag.',
    sub: 'Wir verwandeln Marken-Visionen in cinematische Bewegtbilder, die im Gedächtnis bleiben — komponiert mit modernster KI, geliefert in Tagen statt Wochen.',
    btn1: 'Projekt starten', btn2: 'Showreel ansehen',
    svc01: '01  Services', svcH2: ['Was wir ', 'komponieren', '.'],
    pf01: '02  Portfolio', pfH2: ['Ausgewählte ', 'Arbeiten', '.'],
    ref01: '03  Referenzen', refH2: ['Vertrauen ', 'verdient', '.'],
    refQuote: '„Schneller, schärfer, günstiger als jede klassische Produktion — und es sieht aus wie Kino."',
    refBy: '— Auszug aus Kundenfeedback',
    ctaLabel: "Let's create", ctaH2: 'Bereit für dein', ctaH2em: 'nächstes', ctaH2c: ' Projekt?', ctaBtn: 'Kontakt aufnehmen',
  },
  ch: {
    heroEyebrow: 'Cinematic AI Content · Schwiiz',
    line1: 'Kino-Niveau.', line2: 'KI-Tempo.', line3: 'Null Drehtag.',
    sub: 'Mir verwandled Marke-Visione i cinematischi Bewegtbilder, wo im Gedächtnis bliibe — komponiert mit modernschter KI, gliiferet i Tage statt Wuche.',
    btn1: 'Projekt starte', btn2: 'Showreel aaluege',
    svc01: '01  Services', svcH2: ['Was mir ', 'komponiere', '.'],
    pf01: '02  Portfolio', pfH2: ['Usgwählti ', 'Arbeite', '.'],
    ref01: '03  Referenze', refH2: ['Vertraue ', 'verdient', '.'],
    refQuote: '„Schnäller, schärfer, günstiger als jedi klassischi Produktion — und es gseht us wie Kino."',
    refBy: '— Usgzug us Kundenfeedback',
    ctaLabel: "Let's create", ctaH2: 'Bisch bereit für dis', ctaH2em: 'nächschtes', ctaH2c: ' Projekt?', ctaBtn: 'Kontakt ufnäh',
  },
  en: {
    heroEyebrow: 'Cinematic AI Content · Switzerland',
    line1: 'Cinema-Grade.', line2: 'AI-Speed.', line3: 'Zero Shoot.',
    sub: 'We transform brand visions into cinematic motion pictures that stay in memory — composed with cutting-edge AI, delivered in days instead of weeks.',
    btn1: 'Start Project', btn2: 'Watch Showreel',
    svc01: '01  Services', svcH2: ['What we ', 'compose', '.'],
    pf01: '02  Portfolio', pfH2: ['Selected ', 'Works', '.'],
    ref01: '03  References', refH2: ['Trust ', 'earned', '.'],
    refQuote: '"Faster, sharper, cheaper than any traditional production — and it looks like cinema."',
    refBy: '— Customer feedback excerpt',
    ctaLabel: "Let's create", ctaH2: 'Ready for your', ctaH2em: 'next', ctaH2c: ' project?', ctaBtn: 'Get in Touch',
  },
};

// ── Mobile landing (lightweight, no Three.js) ─────────────────────────────
function MobileLanding({ s, lang }: { s: typeof ST['de']; lang: string }) {
  const t = getT(lang);
  const grad: React.CSSProperties = {
    fontStyle: 'italic', fontWeight: 400,
    background: 'linear-gradient(100deg,var(--plat-dk),var(--plat) 42%,var(--plat-lt))',
    WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
  };
  return (
    <>
      {/* Nav */}
      <nav style={{
        position: 'fixed', zIndex: 20, top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 24px', borderBottom: '1px solid var(--line)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        background: 'rgba(8,10,13,0.6)',
      }}>
        <Link href={`/${lang}`} style={{
          fontFamily: 'var(--font-fraunces,Georgia),serif', fontWeight: 500,
          letterSpacing: '0.22em', fontSize: 14, display: 'flex', alignItems: 'center',
          gap: 10, color: 'var(--ink)', textDecoration: 'none',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--plat)', boxShadow: '0 0 10px var(--plat)', display: 'inline-block' }} />
          AI VIDEO LABS
        </Link>
        <a href={`/${lang}#contact`} style={{
          fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
          padding: '10px 18px', border: '1px solid var(--plat-dk)', borderRadius: 2,
          color: 'var(--plat-lt)', textDecoration: 'none',
        }}>{t.nav.cta.replace(' →','').replace(' ✦','')}</a>
      </nav>

      {/* Hero */}
      <div style={{
        minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '100px 24px 48px',
      }}>
        <div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--plat)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 28, height: 1, background: 'linear-gradient(90deg,var(--plat),transparent)', display: 'inline-block' }} />
          {s.heroEyebrow}
        </div>
        <h1 className="font-fraunces" style={{ fontWeight: 300, fontSize: 'clamp(38px,11vw,60px)', lineHeight: 1.02, letterSpacing: '-0.01em', marginBottom: 24 }}>
          {s.line1}<br />
          <em style={grad}>{s.line2}</em><br />
          {s.line3}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 36, maxWidth: '38ch' }}>{s.sub}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={`/${lang}#contact`} className="btn-primary" style={{ fontSize: 12, padding: '14px 28px' }}>{s.btn1}</a>
        </div>

        {/* CSS-3D iPhone mockup with live video */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 52, perspective: '900px' }}>
          <div style={{
            width: 168,
            aspectRatio: '9/19.5',
            background: 'linear-gradient(160deg,#1e1e1e,#111)',
            borderRadius: 44,
            border: '7px solid #252525',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.08)',
              '0 40px 90px rgba(0,0,0,0.75)',
              '0 0 50px rgba(197,203,212,0.08)',
              'inset 0 0 0 1px rgba(255,255,255,0.04)',
            ].join(','),
            animation: 'phone-3d 7s ease-in-out infinite',
          }}>
            {/* Screen video */}
            <video src="/phone-video.mp4" autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

            {/* Dynamic Island */}
            <div style={{
              position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
              width: 74, height: 24, background: '#000', borderRadius: 13, zIndex: 3,
            }} />

            {/* Screen glare */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(145deg,rgba(255,255,255,0.07) 0%,transparent 40%)',
            }} />

            {/* Home indicator */}
            <div style={{
              position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
              width: 52, height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: 2, zIndex: 3,
            }} />
          </div>
        </div>

        {/* Glow under phone */}
        <div style={{
          width: 120, height: 12, margin: '12px auto 0',
          background: 'radial-gradient(ellipse,rgba(197,203,212,0.18) 0%,transparent 70%)',
          filter: 'blur(6px)',
        }} />
      </div>

      {/* CSS MacBook mockup with laptop video */}
      <div style={{ padding: '0 24px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '100%', maxWidth: 300,
          animation: 'laptop-3d 9s ease-in-out infinite',
        }}>
          {/* Screen / Lid */}
          <div style={{
            width: '100%', aspectRatio: '16/10',
            background: '#0d0d0d',
            borderRadius: '10px 10px 0 0',
            border: '5px solid #222',
            borderBottom: 'none',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <video src="/laptop-video.mp4" autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            {/* Webcam dot */}
            <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: '#2a2a2a' }} />
            {/* Glare */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,rgba(255,255,255,0.06) 0%,transparent 40%)', pointerEvents: 'none' }} />
          </div>
          {/* Base */}
          <div style={{
            width: '100%', height: 18,
            background: 'linear-gradient(180deg,#1c1c1c,#151515)',
            borderRadius: '0 0 5px 5px',
            border: '5px solid #222', borderTop: '2px solid #333',
            boxShadow: '0 6px 28px rgba(0,0,0,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 44, height: 4, background: '#2a2a2a', borderRadius: 2 }} />
          </div>
        </div>
        {/* Glow under MacBook */}
        <div style={{
          width: 180, height: 10, marginTop: 8,
          background: 'radial-gradient(ellipse,rgba(197,203,212,0.14) 0%,transparent 70%)',
          filter: 'blur(6px)',
        }} />
      </div>

      {/* Service hints */}
      <div style={{ padding: '0 24px 64px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {t.services.items.slice(0, 3).map((item, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(220,228,238,0.10)',
            borderRadius: 4, padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: 14,
          }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ThreeScene() {
  const params = useParams();
  const lang = (params?.lang as string) || 'de';
  const s = ST[lang] || ST.de;
  const t = getT(lang);
  const pf = t.portfolio.items;
  const navLinks = [
    { href: `/${lang}`, label: t.nav.home },
    { href: `/${lang}#services`, label: t.nav.services },
    { href: `/${lang}#portfolio`, label: t.nav.portfolio },
    { href: `/${lang}#referenzen`, label: t.nav.referenzen },
    { href: `/${lang}#contact`, label: t.nav.contact },
  ];
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef   = useRef<HTMLDivElement>(null);
  const svcRef    = useRef<HTMLDivElement>(null);
  const pfRef     = useRef<HTMLDivElement>(null);
  const refRef    = useRef<HTMLDivElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const cueRef    = useRef<HTMLDivElement>(null);
  const dotsRef   = useRef<(HTMLSpanElement | null)[]>([]);
  const curRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let aborted = false;

    // ── math helpers ──
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const smooth = (p: number, a: number, b: number) => {
      const t = clamp((p - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    };
    const band = (p: number, a: number, b: number, c: number, d: number) =>
      smooth(p, a, b) * (1 - smooth(p, c, d));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // ── custom cursor ──
    const cur = curRef.current;
    const ring = ringRef.current;
    let mxp = innerWidth / 2, myp = innerHeight / 2;
    let rxp = mxp, ryp = myp;
    let ringAnimId = 0;

    const onMouseMoveCursor = (e: MouseEvent) => {
      mxp = e.clientX; myp = e.clientY;
      if (cur) { cur.style.left = mxp + 'px'; cur.style.top = myp + 'px'; }
    };
    window.addEventListener('mousemove', onMouseMoveCursor);

    function ringLoop() {
      rxp += (mxp - rxp) * 0.16;
      ryp += (myp - ryp) * 0.16;
      if (ring) { ring.style.left = rxp + 'px'; ring.style.top = ryp + 'px'; }
      ringAnimId = requestAnimationFrame(ringLoop);
    }
    ringLoop();

    // ── renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a0d, 0.038);
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
    camera.position.set(0, 0, 14);

    // ── procedural studio env ──
    function makeEnv(): THREE.CanvasTexture {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 512;
      const x = c.getContext('2d')!;
      x.fillStyle = '#0a0d12'; x.fillRect(0, 0, 1024, 512);
      const blob = (cx: number, cy: number, r: number, col: string) => {
        const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
        x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
      };
      blob(300, 120, 300, 'rgba(255,255,255,.95)');
      blob(780, 150, 330, 'rgba(190,210,238,.8)');
      blob(520, 430, 300, 'rgba(120,140,175,.5)');
      blob(90,  360, 230, 'rgba(210,220,235,.55)');
      blob(940, 420, 220, 'rgba(150,170,200,.45)');
      const t = new THREE.CanvasTexture(c);
      t.mapping = THREE.EquirectangularReflectionMapping;
      return t;
    }
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envTex = makeEnv();
    const envMap = pmrem.fromEquirectangular(envTex).texture;
    scene.environment = envMap;
    envTex.dispose(); pmrem.dispose();

    // ── lights ──
    scene.add(new THREE.AmbientLight(0x222a36, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 0.85);
    key.position.set(5, 9, 7); scene.add(key);
    const fill = new THREE.DirectionalLight(0x33405a, 0.45);
    fill.position.set(-6, 2, -5); scene.add(fill);

    // ── dust particles ──
    const COUNT = 2000;
    const gd = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3), col = new Float32Array(COUNT * 3);
    const cA = new THREE.Color(0xeef1f5), cB = new THREE.Color(0xc5cbd4), cC = new THREE.Color(0x9aa3b2);
    for (let i = 0; i < COUNT; i++) {
      const r = 5 + Math.random() * 11;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i*3]   = r * Math.sin(ph) * Math.cos(th);
      pos[i*3+1] = r * Math.sin(ph) * Math.sin(th) * 0.55;
      pos[i*3+2] = r * Math.cos(ph);
      const m = Math.random();
      const c = m < 0.5 ? cB : (m < 0.8 ? cA : cC);
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    }
    gd.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    gd.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    const sprC = document.createElement('canvas'); sprC.width = sprC.height = 64;
    const sprX = sprC.getContext('2d')!;
    const sprGr = sprX.createRadialGradient(32, 32, 0, 32, 32, 32);
    sprGr.addColorStop(0,    'rgba(255,255,255,1)');
    sprGr.addColorStop(0.25, 'rgba(255,255,255,.5)');
    sprGr.addColorStop(1,    'rgba(255,255,255,0)');
    sprX.fillStyle = sprGr; sprX.fillRect(0, 0, 64, 64);
    const sprTex = new THREE.CanvasTexture(sprC);
    const dust = new THREE.Points(gd, new THREE.PointsMaterial({
      size: 0.1, map: sprTex, vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.55,
    }));
    scene.add(dust);

    // ── video elements for device screens ──
    const phoneVideoEl = document.createElement('video');
    phoneVideoEl.src = '/phone-video.mp4';
    phoneVideoEl.loop = true; phoneVideoEl.muted = true;
    phoneVideoEl.playsInline = true; phoneVideoEl.preload = 'auto';

    const lapVideoEl = document.createElement('video');
    lapVideoEl.src = '/laptop-video.mp4';
    lapVideoEl.loop = true; lapVideoEl.muted = true;
    lapVideoEl.playsInline = true; lapVideoEl.preload = 'auto';

    const phoneVideoTex = new THREE.VideoTexture(phoneVideoEl);
    phoneVideoTex.colorSpace = THREE.SRGBColorSpace;
    phoneVideoTex.minFilter = THREE.LinearFilter;
    phoneVideoTex.magFilter = THREE.LinearFilter;

    const lapVideoTex = new THREE.VideoTexture(lapVideoEl);
    lapVideoTex.colorSpace = THREE.SRGBColorSpace;
    lapVideoTex.minFilter = THREE.LinearFilter;
    lapVideoTex.magFilter = THREE.LinearFilter;

    // ── device model state ──
    let phone: THREE.Group | null = null;
    let laptop: THREE.Group | null = null;
    let laptopLid: THREE.Object3D | null = null;
    const phoneMaterials: THREE.Material[] = [];
    const lapMaterials: THREE.Material[] = [];
    let phoneScreenMat: THREE.MeshBasicMaterial | null = null;
    let lapScreenMat: THREE.MeshBasicMaterial | null = null;
    const lapScreenMats: THREE.MeshBasicMaterial[] = [];
    const sglow = new THREE.PointLight(0xc0d4f5, 0, 8);
    const lglow = new THREE.PointLight(0xc0d4f5, 0, 10);

    // ── load GLB models ──
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // Scale model to targetSize along given axis, apply rotY, and center at origin
    function fitAndCenter(obj: THREE.Object3D, axis: 'x' | 'y' | 'z', targetSize: number, rotY = 0): number {
      // Use a temp root so matrixWorld is correct during Box3 computation
      const root = new THREE.Object3D();
      root.add(obj);
      obj.position.set(0, 0, 0);
      obj.rotation.set(0, rotY, 0);
      obj.scale.set(1, 1, 1);
      root.updateMatrixWorld(true);
      const box1 = new THREE.Box3().setFromObject(root);
      const sz = new THREE.Vector3();
      box1.getSize(sz);
      const sc = targetSize / Math.max(sz[axis], 0.001);
      obj.scale.setScalar(sc);
      root.updateMatrixWorld(true);
      const box2 = new THREE.Box3().setFromObject(root);
      const ctr = new THREE.Vector3();
      box2.getCenter(ctr);
      obj.position.sub(ctr);
      root.remove(obj);
      return sc;
    }

    // Collect all materials from an object subtree
    function collectMaterials(root: THREE.Object3D, out: THREE.Material[]) {
      root.traverse(obj => {
        if (!(obj instanceof THREE.Mesh)) return;
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach(m => {
          if (!out.includes(m)) {
            m.transparent = true;
            out.push(m);
          }
        });
      });
    }

    gltfLoader.load('/models/devices.glb', (gltf) => {
      if (aborted) return;

      // ── iPhone ──────────────────────────────────────────────────────────
      const iphoneNode = gltf.scene.getObjectByName('iphone');
      if (iphoneNode) {
        fitAndCenter(iphoneNode, 'y', 3.1, Math.PI); // flip: screen faces +Z (toward camera)

        phone = new THREE.Group();
        phone.add(iphoneNode);
        scene.add(phone);
        phone.add(sglow);
        sglow.position.set(0, 0, 1.2);

        collectMaterials(iphoneNode, phoneMaterials);

        // Detect screen: material names are obfuscated random strings, so use geometry.
        // After fitAndCenter with rotY=π the screen faces +Z (toward camera).
        // Combined score = (area / thickness) * (1 + max(center.z,0)*5)
        //   - large flat meshes win over thick body shell
        //   - front-face bonus ensures front glass beats back glass when equal flatness
        //   - no hard Z cutoff so the filter never accidentally rejects the screen mesh
        phone.updateMatrixWorld(true);
        {
          let bestScore = -Infinity;
          let screenMesh: THREE.Mesh | null = null;
          iphoneNode.traverse(obj => {
            if (!(obj instanceof THREE.Mesh)) return;
            const box = new THREE.Box3().setFromObject(obj);  // world-space AABB
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);
            const area = size.x * size.y;
            if (area < 0.01) return;                          // skip tiny meshes (buttons, screws)
            const flatness = area / (size.z + 0.0001);        // thin flat panels score high
            const frontBonus = 1 + Math.max(center.z, 0) * 5; // reward front-face position
            const score = flatness * frontBonus;
            if (score > bestScore) { bestScore = score; screenMesh = obj as THREE.Mesh; }
          });
          if (screenMesh) {
            const scrMat = new THREE.MeshBasicMaterial({
              map: phoneVideoTex, transparent: true, opacity: 0, side: THREE.DoubleSide,
            });
            (screenMesh as THREE.Mesh).material = scrMat;
            phoneScreenMat = scrMat;
            phoneMaterials.push(scrMat);
            void phoneVideoEl.play().catch(() => {});
          }
        }
      }

      // ── MacBook ─────────────────────────────────────────────────────────
      const macbookNode = gltf.scene.getObjectByName('macbook');
      if (macbookNode) {
        // Original model: rubber feet +Z, Apple logo +Y, screen –Y, keyboard –Z.
        // Model uses Y-up: rubber feet –Y, Apple logo +Y, keyboard face +Y (base interior).
        // Testing with no orientGroup rotation: MacBook sits "natural" on its –Y axis,
        // screen opens toward +Z (camera) as lid rotates.
        fitAndCenter(macbookNode, 'x', 3.5, 0);

        const orientGroup = new THREE.Group();
        // orientGroup.rotation.x = 0  (identity — screen opens toward camera)
        orientGroup.add(macbookNode);

        laptop = new THREE.Group();
        laptop.add(orientGroup);
        scene.add(laptop);
        laptop.add(lglow);
        // Glow in front of the screen (screen faces +Z when closed, tilts back as it opens)
        lglow.position.set(0, 0.0, 1.5);

        collectMaterials(macbookNode, lapMaterials);

        // Apply video texture to all display meshes in the lid (Bevels_2).
        // Black_Glass_0_1 = main display panel; Glass_0_1 = cover glass overlay.
        // DoubleSide ensures the texture renders regardless of which way normals face.
        laptopLid = macbookNode.getObjectByName('Bevels_2') ?? null;
        const screenNames = new Set(['Black_Glass_0_1', 'Glass_0_1']);
        macbookNode.traverse(obj => {
          if (!(obj instanceof THREE.Mesh)) return;
          const mat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
          const matName = mat?.name ?? '';
          if (!screenNames.has(matName)) return;
          const scrMat = new THREE.MeshBasicMaterial({
            map: lapVideoTex, transparent: true, opacity: 0, side: THREE.DoubleSide,
            color: new THREE.Color(4, 4, 4), // HDR boost so ACES tone-maps dark video to visible range
          });
          (obj as THREE.Mesh).material = scrMat;
          if (!lapScreenMat) lapScreenMat = scrMat;
          lapScreenMats.push(scrMat);
          lapMaterials.push(scrMat);
          void lapVideoEl.play().catch(() => {});
        });
        // Fallback: use glossiest mesh in Bevels_2 if named meshes not found
        if (!lapScreenMat) {
          let best = 1, bestMesh: THREE.Mesh | null = null;
          laptopLid?.traverse(o => {
            if (!(o instanceof THREE.Mesh)) return;
            const m = Array.isArray(o.material) ? o.material[0] : o.material;
            if (m instanceof THREE.MeshStandardMaterial && m.roughness < best) {
              best = m.roughness; bestMesh = o as THREE.Mesh;
            }
          });
          if (bestMesh) {
            const scrMat = new THREE.MeshBasicMaterial({
              map: lapVideoTex, transparent: true, opacity: 0, side: THREE.DoubleSide,
              color: new THREE.Color(4, 4, 4),
            });
            (bestMesh as THREE.Mesh).material = scrMat;
            lapScreenMat = scrMat; lapScreenMats.push(scrMat); lapMaterials.push(scrMat);
            void lapVideoEl.play().catch(() => {});
          }
        }

        // Remove Apple logo branding.
        // - Material.002_0_1 and Material.001_0_1 are overlay meshes → hide
        // - The Apple logo indentation is baked into Space_Grey_0_1 as a normal/bump map
        //   → clear normalMap on those materials to erase the 3D indent
        macbookNode.traverse(obj => {
          if (!(obj instanceof THREE.Mesh)) return;
          const mat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
          const n = (mat?.name ?? '').toLowerCase();
          if (n.includes('apple') || n.includes('logo') ||
              n === 'material.002_0_1' || n === 'material.001_0_1') {
            obj.visible = false;
          }
          // Remove normal-map bump that creates the 3D Apple logo indent
          if ((n === 'space_grey_0_1' || n === 'space_grey.001_0_1') &&
              mat instanceof THREE.MeshStandardMaterial) {
            mat.normalMap = null;
            mat.needsUpdate = true;
          }
        });
      }
    }, undefined, (err: unknown) => {
      if (!aborted) console.error('GLB load error:', err);
    });

    // ── contact shadow ──
    const shC = document.createElement('canvas'); shC.width = shC.height = 256;
    const shX = shC.getContext('2d')!;
    const shG = shX.createRadialGradient(128, 128, 10, 128, 128, 128);
    shG.addColorStop(0, 'rgba(0,0,0,.55)'); shG.addColorStop(1, 'rgba(0,0,0,0)');
    shX.fillStyle = shG; shX.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shC);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0, depthWrite: false });
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), shadowMat);
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = -1.4; scene.add(shadow);

    // ── mouse tracking ──
    let tx = 0, ty = 0;
    const onMouseMoveScene = (e: MouseEvent) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
    };
    window.addEventListener('mousemove', onMouseMoveScene);

    // ── scroll progress ──
    function getProgress() {
      const h = document.body.scrollHeight - innerHeight;
      return h > 0 ? clamp(scrollY / h, 0, 1) : 0;
    }

    // ── render loop ──
    const clock = new THREE.Clock();
    let animId = 0;
    const camTarget = new THREE.Vector3(0, 0, 14);
    // MacBook lid animation angles
    // orientGroup rotates the flat model upright (-90° X), so the lid opens
    // by rotating in +X direction to swing toward the camera
    const LID_CLOSED = 0.0;
    // orientGroup = Rx(–π/2): screen starts at +Z (camera), rotates toward +Y as lid opens.
    // At θ=–0.30π screen normal ≈ (0, +0.81, +0.59) — visible from camera above.
    const LID_OPEN   = -Math.PI * 0.30;

    function tick() {
      const elapsed = clock.getElapsedTime();
      const p = getProgress();

      dust.rotation.y = elapsed * 0.02;
      dust.rotation.x = Math.sin(elapsed * 0.07) * 0.06;

      // ── phone ──
      const pAppear = smooth(p, 0.11, 0.22);
      const pSpin   = smooth(p, 0.11, 0.30);
      const pScreen = smooth(p, 0.24, 0.33);
      const pOut    = smooth(p, 0.36, 0.43);

      if (phone) {
        phone.visible = pAppear > 0.001 && pOut < 0.999;
        const ps = lerp(0.25, 1, pAppear) * lerp(1, 0.55, pOut);
        phone.scale.setScalar(ps);
        phone.rotation.y = lerp(-Math.PI * 3, 0, pSpin) + tx * 0.3 + Math.sin(elapsed * 0.4) * 0.04 * pSpin;
        phone.rotation.x = ty * 0.12 + lerp(0.2, 0, pSpin);
        phone.rotation.z = lerp(0.25, 0, pAppear);
        phone.position.y = lerp(0, 1.6, pOut);
        const pop = pAppear * (1 - pOut);
        sglow.intensity = pScreen * 1.1 * (1 - pOut);
        phoneMaterials.forEach(m => { m.opacity = pop; });
        if (phoneScreenMat) phoneScreenMat.opacity = pScreen * (1 - pOut);
      }

      // ── laptop ──
      const lAppear = smooth(p, 0.50, 0.57);
      const lOpen   = smooth(p, 0.55, 0.66);
      const lScreen = smooth(p, 0.60, 0.68);
      const lOut    = smooth(p, 0.70, 0.76);

      if (laptop) {
        laptop.visible = lAppear > 0.001 && lOut < 0.999;
        const ls = lerp(0.55, 1, lAppear) * lerp(1, 0.72, lOut);
        laptop.scale.setScalar(ls);
        if (laptopLid) laptopLid.rotation.x = lerp(LID_CLOSED, LID_OPEN, lOpen);
        lglow.intensity = lScreen * 1.6 * (1 - lOut); // brighter glow in front of screen
        laptop.rotation.y = lerp(-0.4, 0, lAppear) + tx * 0.14;
        laptop.rotation.x = ty * 0.07;          // no constant tilt — screen already faces camera
        laptop.position.y = 0.0 + lOut * 1.3;
        const lop = lAppear * (1 - lOut);
        lapMaterials.forEach(m => { m.opacity = lop; });
        const scrOp = lScreen * (1 - lOut);
        lapScreenMats.forEach(m => { m.opacity = scrOp; });
        shadowMat.opacity = lop * 0.5;
        shadow.scale.setScalar(ls);
        shadow.position.y = -1.45 + laptop.position.y * 0.2;
      }

      // ── camera ──
      let lookY = 0;
      if (p < 0.09) {
        camTarget.set(tx * 2.0, -ty * 2.0, 14);
      } else if (p < 0.45) {
        camTarget.set(0, 0, lerp(13, 6.2, smooth(p, 0.11, 0.30)));
      } else if (p < 0.77) {
        camTarget.set(0, 1.0, 7.5); lookY = 0.0;  // camera above, looking down at open screen
      } else {
        camTarget.set(0, 0, 11);
      }
      camera.position.lerp(camTarget, 0.06);
      camera.lookAt(0, lookY, 0);

      // ── HTML layers ──
      const heroEl = heroRef.current;
      const svcEl  = svcRef.current;
      const pfEl   = pfRef.current;
      const refEl  = refRef.current;
      const ctaEl  = ctaRef.current;
      const cueEl  = cueRef.current;
      const heroF  = 1 - smooth(p, 0.04, 0.10);
      if (heroEl) { heroEl.style.opacity = String(heroF); heroEl.style.transform = `translateY(${-smooth(p,0.04,0.10)*36}px)`; }
      if (cueEl)  cueEl.style.opacity  = String(heroF);
      if (svcEl)  svcEl.style.opacity  = String(band(p, 0.45, 0.50, 0.70, 0.745));
      if (pfEl)   pfEl.style.opacity   = String(band(p, 0.79, 0.83, 0.88, 0.915));
      if (refEl)  refEl.style.opacity  = String(band(p, 0.90, 0.93, 0.965, 0.985));
      if (ctaEl)  ctaEl.style.opacity  = String(smooth(p, 0.965, 0.995));

      // ── progress dots ──
      const seg = p < 0.10 ? 0 : p < 0.45 ? 1 : p < 0.77 ? 2 : p < 0.92 ? 3 : 4;
      dotsRef.current.forEach((d, i) => {
        if (d) {
          d.style.background = i === seg ? 'var(--plat)' : 'transparent';
          d.style.borderColor = i === seg ? 'var(--plat)' : 'var(--plat-dk)';
        }
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    }
    tick();

    // ── resize ──
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── cleanup ──
    return () => {
      aborted = true;
      cancelAnimationFrame(animId);
      cancelAnimationFrame(ringAnimId);
      window.removeEventListener('mousemove', onMouseMoveCursor);
      window.removeEventListener('mousemove', onMouseMoveScene);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      dracoLoader.dispose();
      phoneMaterials.forEach(m => m.dispose());
      lapMaterials.forEach(m => m.dispose());
      shadowMat.dispose();
      [sprTex, shadowTex, phoneVideoTex, lapVideoTex].forEach(tex => tex.dispose());
      phoneVideoEl.pause(); phoneVideoEl.removeAttribute('src');
      lapVideoEl.pause(); lapVideoEl.removeAttribute('src');
    };
  }, [lang, isMobile]); // isMobile ensures effect re-runs when canvas becomes available // eslint-disable-line react-hooks/exhaustive-deps

  // ── mobile: skip Three.js entirely ──────────────────────────────────────
  if (isMobile === null) return null;           // avoid SSR/hydration mismatch
  if (isMobile) return <MobileLanding s={s} lang={lang} />;

  // ── styles (static, inline) ───────────────────────────────────────────────
  const layerBase: React.CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none', opacity: 0,
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '0 clamp(20px, 6vw, 90px)', maxWidth: '1500px', margin: '0 auto',
  };

  return (
    <>
      {/* ── Three.js canvas ── */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'block', width: '100%', height: '100%' }}
      />

      {/* ── Atmospheric layers ── */}
      <div style={{
        position: 'fixed', zIndex: 1, top: '46%', left: '50%',
        transform: 'translate(-50%,-50%)', width: '62vw', height: '62vw',
        maxWidth: '820px', maxHeight: '820px', pointerEvents: 'none',
        background: 'radial-gradient(circle,rgba(197,203,212,.10) 0%,rgba(197,203,212,.03) 36%,transparent 66%)',
        filter: 'blur(22px)',
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(120% 95% at 50% 8%,transparent 44%,rgba(0,0,0,.72) 100%)',
      }} />
      <div style={{
        position: 'fixed', inset: '-50%', zIndex: 6, pointerEvents: 'none',
        opacity: 0.035,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.85\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        animation: 'grain 9s steps(7) infinite',
      }} />

      {/* ── Custom cursor (desktop only) ── */}
      <div ref={curRef} className="hide-mobile" style={{
        position: 'fixed', zIndex: 50, width: 6, height: 6, borderRadius: '50%',
        background: 'var(--plat-lt)', mixBlendMode: 'screen', pointerEvents: 'none',
        transform: 'translate(-50%,-50%)',
      }} />
      <div ref={ringRef} className="hide-mobile" style={{
        position: 'fixed', zIndex: 50, width: 40, height: 40,
        border: '1px solid rgba(220,228,238,.35)', borderRadius: '50%', pointerEvents: 'none',
        transform: 'translate(-50%,-50%)', transition: 'transform .14s, border-color .3s',
      }} />

      {/* ── Navigation ── */}
      <nav style={{
        position: 'fixed', zIndex: 20, top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px clamp(20px,5vw,64px)',
        borderBottom: '1px solid var(--line)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      }}>
        <Link href={`/${lang}`} style={{
          fontFamily: 'var(--font-fraunces,Georgia),serif', fontWeight: 500,
          letterSpacing: '0.22em', fontSize: 15,
          display: 'flex', alignItems: 'center', gap: 12,
          color: 'var(--ink)', textDecoration: 'none',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--plat)', boxShadow: '0 0 10px var(--plat)', display: 'inline-block',
          }} />
          AI VIDEO LABS
        </Link>
        <div className="hide-mobile" style={{ display: 'flex', gap: 34, fontSize: 13, letterSpacing: '0.06em' }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color .25s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              {l.label}
            </a>
          ))}
        </div>
        <a href={`/${lang}#contact`} style={{
          fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
          padding: '12px 24px', border: '1px solid var(--plat-dk)', borderRadius: 2,
          color: 'var(--plat-lt)', textDecoration: 'none', transition: 'all .35s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--plat)'; (e.currentTarget as HTMLElement).style.color = '#0c0e12'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--plat)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--plat-lt)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--plat-dk)'; }}>
          {t.nav.cta.replace(' →','').replace(' ✦','')}
        </a>
      </nav>

      {/* ── Hero layer ── */}
      <div ref={heroRef} style={{ ...layerBase, opacity: 1 }}>
        <div style={{ pointerEvents: 'auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 11,
            fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--plat)', fontWeight: 500, marginBottom: 24,
          }}>
            <span style={{ width: 34, height: 1, background: 'linear-gradient(90deg,var(--plat),transparent)', display: 'inline-block' }} />
            {s.heroEyebrow}
          </div>
          <h1 className="font-fraunces" style={{
            fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.015em',
            fontSize: 'clamp(46px,8.5vw,124px)', maxWidth: '15ch', marginBottom: 32,
          }}>
            {s.line1}<br />
            <em style={{
              fontStyle: 'italic', fontWeight: 400,
              background: 'linear-gradient(100deg,var(--plat-dk),var(--plat) 42%,var(--plat-lt))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{s.line2}</em><br />
            {s.line3}
          </h1>
          <p style={{
            fontSize: 'clamp(15px,1.5vw,18px)', color: 'var(--muted)', maxWidth: '48ch',
            lineHeight: 1.75, fontWeight: 300, marginBottom: 42,
          }}>{s.sub}</p>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            <a href={`/${lang}#contact`} className="btn-primary">{s.btn1}</a>
            <a href={`/${lang}#portfolio`} className="btn-ghost">{s.btn2}</a>
          </div>
        </div>
      </div>

      {/* ── Services heading layer ── */}
      <div ref={svcRef} style={{
        position: 'fixed', left: 0, right: 0, top: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '9vh', textAlign: 'center', pointerEvents: 'none', opacity: 0,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 11,
          fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: 'var(--plat)', fontWeight: 500, marginBottom: 20,
          justifyContent: 'center',
        }}>
          <span style={{ width: 34, height: 1, background: 'linear-gradient(90deg,var(--plat),transparent)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-fraunces,Georgia),serif', fontStyle: 'italic', fontWeight: 300 }}>01</span>
          &nbsp; {t.nav.services}
        </div>
        <h2 className="font-fraunces" style={{
          fontWeight: 300, lineHeight: 1.04, letterSpacing: '-0.01em',
          fontSize: 'clamp(38px,6vw,90px)', margin: 0,
        }}>
          {s.svcH2[0]}<em style={{ fontStyle: 'italic', fontWeight: 400 }}>{s.svcH2[1]}</em>{s.svcH2[2]}
        </h2>
      </div>

      {/* ── Portfolio layer ── */}
      <div ref={pfRef} style={{ ...layerBase }}>
        <div style={{ pointerEvents: 'auto', width: '100%' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 11,
            fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--plat)', fontWeight: 500, marginBottom: 24,
          }}>
            <span style={{ width: 34, height: 1, background: 'linear-gradient(90deg,var(--plat),transparent)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-fraunces,Georgia),serif', fontStyle: 'italic', fontWeight: 300 }}>02</span>
            &nbsp; {t.nav.portfolio}
          </div>
          <h2 className="font-fraunces" style={{ fontWeight: 300, fontSize: 'clamp(38px,6vw,90px)', marginBottom: 30, lineHeight: 1.04 }}>
            {s.pfH2[0]}<em style={{ fontStyle: 'italic', fontWeight: 400 }}>{s.pfH2[1]}</em>{s.pfH2[2]}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {pf.map((item: { tag: string; title: string; desc: string; video?: string }, i: number) => (
              <div key={i} style={{
                border: '1px solid var(--line)', borderRadius: 4, overflow: 'hidden',
                background: 'rgba(255,255,255,.015)', transition: 'border-color .4s, transform .4s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--plat-dk)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,228,238,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                <div style={{ aspectRatio: '16/10', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#161b22,#0c0f14)' }}>
                  {item.video ? (
                    <video src={item.video} loop muted autoPlay playsInline
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  ) : (
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(115deg,transparent 30%,rgba(197,203,212,.14) 50%,transparent 70%)',
                      backgroundSize: '300% 100%', animation: 'sh 4.5s linear infinite',
                    }} />
                  )}
                  <span style={{
                    position: 'absolute', top: 14, left: 14,
                    fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
                    color: 'var(--plat)', border: '1px solid var(--line)',
                    padding: '5px 9px', borderRadius: 2, background: 'rgba(8,10,13,.5)',
                  }}>{item.tag}</span>
                </div>
                <div style={{ padding: 18 }}>
                  <div className="font-fraunces" style={{ fontWeight: 400, fontSize: 18, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 300 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── References layer ── */}
      <div ref={refRef} style={{ ...layerBase }}>
        <div style={{ pointerEvents: 'auto', width: '100%' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 11,
            fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--plat)', fontWeight: 500, marginBottom: 24,
          }}>
            <span style={{ width: 34, height: 1, background: 'linear-gradient(90deg,var(--plat),transparent)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-fraunces,Georgia),serif', fontStyle: 'italic', fontWeight: 300 }}>03</span>
            &nbsp; {t.nav.referenzen}
          </div>
          <h2 className="font-fraunces" style={{ fontWeight: 300, fontSize: 'clamp(38px,6vw,90px)', marginBottom: 30, lineHeight: 1.04 }}>
            {s.refH2[0]}<em style={{ fontStyle: 'italic', fontWeight: 400 }}>{s.refH2[1]}</em>{s.refH2[2]}
          </h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1,
            background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 4, overflow: 'hidden', maxWidth: 900,
          }}>
            {['HK-Holz', 'Schürmann & Kruse', 'TGK Service', 'TexSeller'].map(name => (
              <div key={name} style={{
                background: 'var(--bg)', padding: '38px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-fraunces,Georgia),serif', fontWeight: 400,
                fontSize: 'clamp(15px,1.5vw,19px)', color: 'var(--muted)', textAlign: 'center',
                transition: 'color .4s, background .4s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--plat-lt)'; (e.currentTarget as HTMLElement).style.background = 'rgba(197,203,212,.04)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg)'; }}>
                {name}
              </div>
            ))}
          </div>
          <blockquote style={{
            marginTop: 34, maxWidth: 640,
            fontFamily: 'var(--font-fraunces,Georgia),serif', fontWeight: 300,
            fontStyle: 'italic', fontSize: 'clamp(18px,2.2vw,26px)', lineHeight: 1.5, color: 'var(--ink)',
          }}>
            {s.refQuote}
            <footer style={{ display: 'block', fontStyle: 'normal', fontFamily: 'var(--font-manrope,sans-serif)', fontSize: 13, letterSpacing: '0.06em', color: 'var(--muted)', marginTop: 16 }}>
              {s.refBy}
            </footer>
          </blockquote>
        </div>
      </div>

      {/* ── CTA layer ── */}
      <div ref={ctaRef} style={{
        position: 'fixed', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px', pointerEvents: 'none', opacity: 0,
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--plat)', marginBottom: 18 }}>
            {s.ctaLabel}
          </div>
          <h2 className="font-fraunces" style={{ fontWeight: 300, fontSize: 'clamp(38px,6vw,90px)', lineHeight: 1.04, letterSpacing: '-0.01em', marginBottom: 32 }}>
            {s.ctaH2}<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>{s.ctaH2em}</em>{s.ctaH2c}
          </h2>
          <a href={`/${lang}#contact`} className="btn-primary">{s.ctaBtn}</a>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div ref={cueRef} style={{
        position: 'fixed', bottom: 26, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, fontSize: 10, letterSpacing: '0.36em', textTransform: 'uppercase',
        color: 'var(--muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      }}>
        <span>Scroll</span>
        <span style={{ width: 1, height: 40, background: 'linear-gradient(var(--plat),transparent)', animation: 'cue 2.2s infinite', display: 'inline-block' }} />
      </div>

      {/* ── Progress dots ── */}
      <div className="hide-mobile" style={{
        position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {[0, 1, 2, 3, 4].map(i => (
          <span key={i} ref={el => { dotsRef.current[i] = el; }} style={{
            width: 6, height: 6, borderRadius: '50%',
            border: '1px solid var(--plat-dk)', display: 'inline-block',
            transition: 'background .3s, border-color .3s',
          }} />
        ))}
      </div>

      {/* ── Scroll spacer (creates the scroll height for the 3D journey) ── */}
      <div style={{ height: '900vh' }} />
    </>
  );
}
