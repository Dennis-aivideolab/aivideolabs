'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import * as THREE from 'three';
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

    const currentT = getT(lang);
    const svcNames = currentT.services.items.map((i: { title: string }) => i.title);

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
    (renderer as unknown as { outputColorSpace: string }).outputColorSpace = THREE.SRGBColorSpace;
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

    // ── geometry helpers ──
    function roundedRect(w: number, h: number, r: number): THREE.Shape {
      const s = new THREE.Shape();
      const x = -w / 2, y = -h / 2;
      s.moveTo(x + r, y);
      s.lineTo(x + w - r, y);
      s.absarc(x + w - r, y + r,     r, -Math.PI / 2, 0, false);
      s.lineTo(x + w, y + h - r);
      s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
      s.lineTo(x + r, y + h);
      s.absarc(x + r, y + h - r,     r, Math.PI / 2, Math.PI, false);
      s.lineTo(x, y + r);
      s.absarc(x + r, y + r,         r, Math.PI, Math.PI * 1.5, false);
      return s;
    }
    function rrPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y,     x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x,     y + h, r);
      ctx.arcTo(x,     y + h, x,     y,     r);
      ctx.arcTo(x,     y,     x + w, y,     r);
      ctx.closePath();
    }
    function slab(w: number, d: number, th: number, r: number) {
      const g = new THREE.ExtrudeGeometry(roundedRect(w, d, r), {
        depth: th, bevelEnabled: true, bevelThickness: th * 0.3,
        bevelSize: 0.018, bevelSegments: 3, curveSegments: 18,
      });
      g.rotateX(-Math.PI / 2);
      return g;
    }
    function panel(w: number, h: number, th: number, r: number) {
      const g = new THREE.ExtrudeGeometry(roundedRect(w, h, r), {
        depth: th, bevelEnabled: true, bevelThickness: th * 0.3,
        bevelSize: 0.016, bevelSegments: 3, curveSegments: 18,
      });
      g.translate(0, 0, -th / 2);
      return g;
    }

    // ── materials ──
    const titanium = new THREE.MeshStandardMaterial({ color: 0xc7ccd3, metalness: 1.0, roughness: 0.30, transparent: true, envMapIntensity: 1.1 });
    const aluminium = new THREE.MeshStandardMaterial({ color: 0xcbd0d8, metalness: 1.0, roughness: 0.34, transparent: true, envMapIntensity: 1.0 });
    const aluDk   = new THREE.MeshStandardMaterial({ color: 0x23272e, metalness: 0.85, roughness: 0.5,  transparent: true });
    const blackGlass = new THREE.MeshStandardMaterial({ color: 0x05070a, metalness: 0.6, roughness: 0.07, transparent: true, envMapIntensity: 1.2 });
    const btnMat  = new THREE.MeshStandardMaterial({ color: 0x9aa1ab, metalness: 1.0, roughness: 0.4,  transparent: true });
    const islandMat = new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 0.4, roughness: 0.2, transparent: true });
    const padMat  = new THREE.MeshStandardMaterial({ color: 0x2c313a, metalness: 0.5, roughness: 0.35, transparent: true });

    // ── iPhone ──
    const phone = new THREE.Group(); scene.add(phone);
    const W = 1.5, H = 3.1, R = 0.34, DEPTH = 0.16;
    phone.add(new THREE.Mesh(panel(W, H, DEPTH, R), titanium));
    const glass = new THREE.Mesh(new THREE.ShapeGeometry(roundedRect(W - 0.1, H - 0.1, R - 0.04), 24), blackGlass);
    glass.position.z = DEPTH / 2 + 0.005; phone.add(glass);

    // reel canvas
    const rc = document.createElement('canvas'); rc.width = 560; rc.height = 1180;
    const rx2 = rc.getContext('2d')!;
    type Pal = { a: string; b: string; h: string; g: string };
    const PAL: Pal[] = [
      { a: '#16384f', b: '#0a1822', h: '#0c2330', g: 'rgba(120,190,230,' },
      { a: '#3a2336', b: '#160d16', h: '#241019', g: 'rgba(220,150,190,' },
      { a: '#123a33', b: '#08110f', h: '#0e251f', g: 'rgba(150,220,190,' },
      { a: '#3a3024', b: '#15110a', h: '#241c10', g: 'rgba(235,200,140,' },
    ];
    function drawReel(elapsed: number) {
      const W2 = rc.width, H2 = rc.height;
      rx2.clearRect(0, 0, W2, H2);
      rx2.save(); rrPath(rx2, 0, 0, W2, H2, 86); rx2.clip();
      const dur = 3.6;
      const idx = Math.floor(elapsed / dur) % PAL.length;
      const nidx = (idx + 1) % PAL.length;
      const loc = (elapsed % dur) / dur;
      const sc = (P: Pal, off: number) => {
        const gY = rx2.createLinearGradient(0, 0, 0, H2);
        gY.addColorStop(0, P.a); gY.addColorStop(0.55, P.b); gY.addColorStop(1, '#05070a');
        rx2.fillStyle = gY; rx2.fillRect(0, 0, W2, H2);
        const sx = W2 * 0.5 + Math.sin(elapsed * 0.3 + off) * 120;
        const gl = rx2.createRadialGradient(sx, H2 * 0.42, 0, sx, H2 * 0.42, 260);
        gl.addColorStop(0, P.g + '0.55)'); gl.addColorStop(1, P.g + '0)');
        rx2.fillStyle = gl; rx2.fillRect(0, 0, W2, H2);
        rx2.fillStyle = P.h; rx2.beginPath(); rx2.moveTo(0, H2 * 0.6);
        for (let x = 0; x <= W2; x += 40) rx2.lineTo(x, H2 * 0.6 + Math.sin(x * 0.01 + elapsed * 0.4 + off) * 26);
        rx2.lineTo(W2, H2); rx2.lineTo(0, H2); rx2.fill();
        rx2.fillStyle = 'rgba(0,0,0,.45)'; rx2.beginPath(); rx2.moveTo(0, H2 * 0.72);
        for (let x = 0; x <= W2; x += 36) rx2.lineTo(x, H2 * 0.72 + Math.sin(x * 0.013 - elapsed * 0.5 + off) * 30);
        rx2.lineTo(W2, H2); rx2.lineTo(0, H2); rx2.fill();
      };
      sc(PAL[idx], 0);
      if (loc > 0.86) { rx2.globalAlpha = smooth(loc, 0.86, 1); sc(PAL[nidx], 10); rx2.globalAlpha = 1; }
      rx2.fillStyle = '#000';
      rx2.fillRect(0, 0, W2, H2 * 0.085);
      rx2.fillRect(0, H2 * 0.915, W2, H2 * 0.085);
      for (let i = 0; i < 55; i++) {
        rx2.fillStyle = 'rgba(255,255,255,' + (Math.random() * 0.04) + ')';
        rx2.fillRect(Math.random() * W2, Math.random() * H2, 2, 2);
      }
      rx2.fillStyle = 'rgba(255,80,80,.9)'; rx2.beginPath(); rx2.arc(52, H2 * 0.085 + 44, 9, 0, 7); rx2.fill();
      rx2.fillStyle = 'rgba(255,255,255,.85)';
      rx2.font = '600 22px sans-serif'; rx2.fillText('REC · 4K', 74, H2 * 0.085 + 52);
      const tc = Math.floor(elapsed * 24) % 24, ss = Math.floor(elapsed) % 60, mm = Math.floor(elapsed / 60) % 60;
      rx2.textAlign = 'right';
      rx2.fillText(String(mm).padStart(2,'0')+':'+String(ss).padStart(2,'0')+':'+String(tc).padStart(2,'0'), W2 - 48, H2 * 0.085 + 52);
      rx2.textAlign = 'left';
      rx2.strokeStyle = 'rgba(255,255,255,.25)'; rx2.lineWidth = 2;
      rx2.strokeRect(38, H2 * 0.915 - 66, W2 - 76, 38);
      rx2.fillStyle = 'rgba(255,255,255,.9)';
      rx2.fillRect(42, H2 * 0.915 - 62, (W2 - 84) * ((elapsed * 0.08) % 1), 30);
      rx2.restore();
    }
    drawReel(0);
    const reelTex = new THREE.CanvasTexture(rc);
    reelTex.anisotropy = 4;
    const reelMat = new THREE.MeshBasicMaterial({ map: reelTex, transparent: true, opacity: 0 });
    const reel = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.14, H - 0.14), reelMat);
    reel.position.z = DEPTH / 2 + 0.012; phone.add(reel);

    const island = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.03), islandMat);
    island.position.set(0, H / 2 - 0.32, DEPTH / 2 + 0.02); phone.add(island);
    const sglow = new THREE.PointLight(0xaecbe6, 0, 6);
    sglow.position.set(0, 0, 1.2); phone.add(sglow);
    ([[W/2+0.012, 0.5, 0.36], [-W/2-0.012, 0.62, 0.46], [-W/2-0.012, 0.16, 0.3]] as [number,number,number][]).forEach(b => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.04, b[2], 0.1), btnMat);
      m.position.set(b[0], b[1], 0); phone.add(m);
    });
    const phoneMats = [titanium, blackGlass, btnMat, islandMat];

    // ── MacBook ──
    const laptop = new THREE.Group(); laptop.position.set(0, -0.55, 0); scene.add(laptop);
    laptop.add(new THREE.Mesh(slab(3.5, 2.4, 0.12, 0.10), aluminium));
    const deck = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.012, 2.1), aluDk);
    deck.position.y = 0.122; laptop.add(deck);
    const pad = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.014, 0.66), padMat);
    pad.position.set(0, 0.124, 0.62); laptop.add(pad);
    const lid = new THREE.Group(); lid.position.set(0, 0.12, -1.18); laptop.add(lid);
    const lidShell = new THREE.Mesh(panel(3.5, 2.25, 0.08, 0.10), aluminium);
    lidShell.position.y = 1.125; lid.add(lidShell);

    // services canvas
    const lc = document.createElement('canvas'); lc.width = 1024; lc.height = 640;
    const lx = lc.getContext('2d')!;
    function drawSvc(elapsed: number) {
      lx.fillStyle = '#0c0f14'; lx.fillRect(0, 0, 1024, 640);
      const vg = lx.createRadialGradient(512, 300, 80, 512, 300, 640);
      vg.addColorStop(0, 'rgba(40,48,60,.45)'); vg.addColorStop(1, 'rgba(8,10,14,1)');
      lx.fillStyle = vg; lx.fillRect(0, 0, 1024, 640);
      lx.fillStyle = '#878d99'; lx.font = '500 22px sans-serif'; lx.fillText('SERVICES', 60, 72);
      lx.strokeStyle = 'rgba(220,228,238,.14)'; lx.beginPath(); lx.moveTo(60, 96); lx.lineTo(964, 96); lx.stroke();
      const hi = Math.floor(elapsed * 0.5) % 4;
      svcNames.forEach((it, i) => {
        const y = 180 + i * 100;
        lx.fillStyle = i === hi ? '#eef1f5' : '#5f6671';
        lx.font = '300 40px Georgia,serif'; lx.fillText(it, 60, y);
        lx.fillStyle = i === hi ? '#c5cbd4' : '#3a4049';
        lx.font = 'italic 300 26px Georgia,serif'; lx.fillText('0' + (i + 1), 924, y - 6);
        lx.strokeStyle = 'rgba(220,228,238,.08)'; lx.beginPath(); lx.moveTo(60, y + 30); lx.lineTo(964, y + 30); lx.stroke();
      });
    }
    drawSvc(0);
    const svcTex = new THREE.CanvasTexture(lc);
    const lscreenMat = new THREE.MeshBasicMaterial({ map: svcTex, transparent: true, opacity: 0 });
    const lscreen = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.0), lscreenMat);
    lscreen.position.set(0, 1.125, 0.045); lid.add(lscreen);
    const lglow = new THREE.PointLight(0xaecbe6, 0, 7);
    lglow.position.set(0, 1.3, 0.6); lid.add(lglow);
    const CLOSED = Math.PI * 0.5, OPEN = -0.1;
    const lapMats = [aluminium, aluDk, padMat];

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

    function tick() {
      const t = clock.getElapsedTime();
      const p = getProgress();

      dust.rotation.y = t * 0.02;
      dust.rotation.x = Math.sin(t * 0.07) * 0.06;

      // ── phone ──
      const pAppear = smooth(p, 0.11, 0.22);
      const pSpin   = smooth(p, 0.11, 0.30);
      const pScreen = smooth(p, 0.24, 0.33);
      const pOut    = smooth(p, 0.36, 0.43);
      phone.visible = pAppear > 0.001 && pOut < 0.999;
      const ps = lerp(0.25, 1, pAppear) * lerp(1, 0.55, pOut);
      phone.scale.setScalar(ps);
      phone.rotation.y = lerp(-Math.PI * 3, 0, pSpin) + tx * 0.3 + Math.sin(t * 0.4) * 0.04 * pSpin;
      phone.rotation.x = ty * 0.12 + lerp(0.2, 0, pSpin);
      phone.rotation.z = lerp(0.25, 0, pAppear);
      phone.position.y = lerp(0, 1.6, pOut);
      const pop = pAppear * (1 - pOut);
      reelMat.opacity = pScreen * (1 - pOut);
      sglow.intensity = pScreen * 1.1 * (1 - pOut);
      phoneMats.forEach(m => { m.opacity = pop; });

      // ── laptop ──
      const lAppear = smooth(p, 0.50, 0.57);
      const lOpen   = smooth(p, 0.55, 0.66);
      const lScreen = smooth(p, 0.60, 0.68);
      const lOut    = smooth(p, 0.70, 0.76);
      laptop.visible = lAppear > 0.001 && lOut < 0.999;
      const ls = lerp(0.55, 1, lAppear) * lerp(1, 0.72, lOut);
      laptop.scale.setScalar(ls);
      lid.rotation.x = lerp(CLOSED, OPEN, lOpen);
      lglow.intensity = lScreen * 0.8 * (1 - lOut);
      lscreenMat.opacity = lScreen * (1 - lOut);
      laptop.rotation.y = lerp(-0.5, 0, lAppear) + tx * 0.14;
      laptop.rotation.x = ty * 0.07;
      laptop.position.y = -0.55 + lOut * 1.3;
      const lop = lAppear * (1 - lOut);
      lapMats.forEach(m => { m.opacity = lop; });
      shadowMat.opacity = lop * 0.5;
      shadow.scale.setScalar(ls);
      shadow.position.y = -1.45 + laptop.position.y * 0.2;

      // ── camera ──
      let lookY = 0;
      if (p < 0.09) {
        camTarget.set(tx * 2.0, -ty * 2.0, 14);
      } else if (p < 0.45) {
        camTarget.set(0, 0, lerp(13, 6.2, smooth(p, 0.11, 0.30)));
      } else if (p < 0.77) {
        camTarget.set(0, 0.3, 7.2); lookY = -0.28;
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

      // ── canvas texture updates ──
      if (pScreen > 0.02 && pOut < 0.99) { drawReel(t); reelTex.needsUpdate = true; }
      if (lScreen > 0.02 && lOut < 0.99) { drawSvc(t);  svcTex.needsUpdate  = true; }

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
      cancelAnimationFrame(animId);
      cancelAnimationFrame(ringAnimId);
      window.removeEventListener('mousemove', onMouseMoveCursor);
      window.removeEventListener('mousemove', onMouseMoveScene);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      [titanium, aluminium, aluDk, blackGlass, btnMat, islandMat, padMat, reelMat, lscreenMat, shadowMat].forEach(m => m.dispose());
      [sprTex, reelTex, svcTex, shadowTex].forEach(tex => tex.dispose());
    };
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

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
