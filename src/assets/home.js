// Home page behaviour: the hero word cycling and the 3D blob.
// Moved verbatim from the old inline <script>; the only change is that the
// word pairs come from the page (a JSON <script id="hero-words"> written by
// index.njk from _data/home.yml) so they can be edited in the CMS.

// ─── HERO WORD CYCLING ───
(function () {
  const dataEl = document.getElementById('hero-words');
  const pairs = dataEl ? JSON.parse(dataEl.textContent) : [['chaos', 'clarity']];

  const CHARS = 'abcdefghijklmnopqrstuvwxyz';
  const SCRAMBLE_IN = 450;  // ms to resolve each word
  const HOLD = 3500;        // ms to hold before cycling
  const GAP  = 400;         // ms between word 1 and word 2

  let index = 0;

  const slot1 = document.getElementById('slot1');
  const slot2 = document.getElementById('slot2');
  if (!slot1 || !slot2) return;

  // Fix masks to longest word per slot so layout never shifts
  const longest1 = pairs.reduce((a, b) => a[0].length >= b[0].length ? a : b)[0];
  const longest2 = pairs.reduce((a, b) => a[1].length >= b[1].length ? a : b)[1];
  slot1.querySelector('.slot-mask').textContent = longest1;
  slot2.querySelector('.slot-mask').textContent = longest2;

  function scramble(el, target, onDone) {
    el.style.opacity = '1';
    const len = target.length;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / SCRAMBLE_IN, 1);
      const resolved = Math.floor(p * len);
      let text = '';
      for (let i = 0; i < len; i++) {
        text += i < resolved
          ? target[i]
          : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = text;
      if (p < 1) { requestAnimationFrame(frame); }
      else        { el.textContent = target; if (onDone) onDone(); }
    }
    requestAnimationFrame(frame);
  }

  function runCycle() {
    const pair = pairs[index];
    const w1 = slot1.querySelector('.slot-word');
    const w2 = slot2.querySelector('.slot-word');

    scramble(w1, pair[0], () => {
      setTimeout(() => {
        scramble(w2, pair[1], () => {
          setTimeout(() => {
            index = (index + 1) % pairs.length;
            runCycle();
          }, HOLD);
        });
      }, GAP);
    });
  }

  slot1.querySelector('.slot-word').style.opacity = '0';
  slot2.querySelector('.slot-word').style.opacity = '0';
  setTimeout(runCycle, 500);
})();

// ─── 3D BLOB (Three.js) ───
(function () {
  const canvas = document.getElementById('ringCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(272, 272);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 3.2;

  // Lights
  scene.add(new THREE.AmbientLight(0x0a0a30, 2.0));

  const keyLight = new THREE.DirectionalLight(0x99aaff, 4.0);
  keyLight.position.set(-2.5, 3.0, 2.5);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x6633ff, 3.0, 8);
  rimLight.position.set(2.5, -2.0, -1.0);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0x3355ff, 1.2, 6);
  fillLight.position.set(0, -3.0, 1.5);
  scene.add(fillLight);

  // High-res sphere geometry
  const geo = new THREE.IcosahedronGeometry(1, 7);

  const material = new THREE.MeshPhysicalMaterial({
    color:       0x152070,
    metalness:   0.15,
    roughness:   0.28,
    reflectivity: 0.9,
  });

  // Uniforms for displacement
  const uniforms = {
    uTime:  { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  };
  const mouseTarget = new THREE.Vector2(0, 0);

  // 3D simplex noise GLSL
  const NOISE = `
    vec3 _m289v(vec3 x){return x-floor(x*(1./289.))*289.;}
    vec4 _m289(vec4 x){return x-floor(x*(1./289.))*289.;}
    vec4 _perm(vec4 x){return _m289(((x*34.)+1.)*x);}
    vec4 _tiSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1./6.,1./3.);
      vec3 i=floor(v+dot(v,C.yyy));
      vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);
      vec3 l=1.-g;
      vec3 i1=min(g.xyz,l.zxy);
      vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;
      vec3 x2=x0-i2+C.yyy;
      vec3 x3=x0-0.5;
      i=_m289v(i);
      vec4 p=_perm(_perm(_perm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
      vec3 ns=0.142857142857*vec3(0.,-1.,1.)-vec3(0.,0.5,-0.5);
      vec4 j=p-49.*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
      vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy;
      vec4 h=1.-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.;
      vec4 sh=-step(h,vec4(0.));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
      vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y);
      vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=_tiSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
      vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
      m=m*m;
      return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }
  `;

  material.onBeforeCompile = shader => {
    shader.uniforms.uTime  = uniforms.uTime;
    shader.uniforms.uMouse = uniforms.uMouse;

    shader.vertexShader = `
      uniform float uTime;
      uniform vec2  uMouse;
      ${NOISE}
    ` + shader.vertexShader;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      float n = snoise(normal * 1.6 + uTime * 0.25) * 0.20
              + snoise(normal * 3.2 + uTime * 0.16) * 0.09
              + snoise(normal * 6.5 + uTime * 0.33) * 0.04;
      vec3 mDir = normalize(vec3(uMouse, 0.9));
      float mBulge = pow(max(0.0, dot(normal, mDir)), 2.0) * length(uMouse) * 0.08;
      transformed += normal * (n + mBulge);
      float maxR = 1.12;
      if (length(transformed) > maxR) transformed = normalize(transformed) * maxR;`
    );
  };

  const mesh = new THREE.Mesh(geo, material);
  scene.add(mesh);

  // Resize handler
  function onResize() {
    const size = window.innerWidth <= 768 ? 200 : 272;
    renderer.setSize(size, size);
  }
  window.addEventListener('resize', onResize);
  onResize();

  // Mouse tracking
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseTarget.set(
       (e.clientX - rect.left) / rect.width  * 2 - 1,
      -(e.clientY - rect.top)  / rect.height * 2 + 1
    );
  });

  function frame(ts) {
    const t = ts / 1000;
    uniforms.uTime.value = t;
    uniforms.uMouse.value.lerp(mouseTarget, 0.05);
    mesh.rotation.y  = t * 0.08;
    mesh.rotation.x  = Math.sin(t * 0.12) * 0.15;
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
