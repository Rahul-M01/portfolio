import { useEffect, useRef, useState } from 'react';
import horizon from '../assets/black-hole-horizon.jpg';
import './black-hole.css';

const VERTEX = `attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

// Crossfaded flow phases animate the plasma without rotating the photograph.
const FRAGMENT = `
precision highp float;
uniform sampler2D scene;
uniform vec2 resolution;
uniform float imageAspect;
uniform float time;
uniform float mobile;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float aspect = resolution.x / resolution.y;
    if (aspect < imageAspect) {
        uv.x = (uv.x - 0.5) * aspect / imageAspect + mix(0.5, 0.63, mobile);
    } else {
        uv.y = (uv.y - 0.5) * imageAspect / aspect + 0.5;
    }
    vec2 p = (uv - vec2(0.737, 0.465)) * vec2(imageAspect, 1.0);
    float radius = length(p);
    vec2 tangent = vec2(-p.y, p.x) / max(radius, 0.01);
    float outer = smoothstep(0.275, 0.38, radius);
    vec2 orbit = tangent * vec2(0.025 / imageAspect, 0.025) * outer;
    float diskLine = 0.40 + 0.12 * (uv.x - 0.5);
    float foreground = 1.0 - smoothstep(diskLine - 0.10, diskLine + 0.025, uv.y);
    vec2 flow = mix(orbit, vec2(0.048, 0.0058), foreground);
    float eddy = sin(uv.x * 31.0 + uv.y * 19.0 + time * 0.9)
        * sin(uv.x * 14.0 - uv.y * 27.0 - time * 0.7);
    flow += vec2(eddy * 0.002, eddy * 0.0012) * max(outer, foreground);
    float phase = fract(time * 0.45);
    float phaseB = fract(time * 0.45 + 0.5);
    float blend = abs(phase - 0.5) * 2.0;
    vec3 a = texture2D(scene, uv - flow * phase).rgb;
    vec3 b = texture2D(scene, uv - flow * phaseB).rgb;
    vec3 color = mix(a, b, blend);
    color *= 1.0 + 0.025 * sin(time * 1.3 + uv.x * 17.0 + uv.y * 11.0);
    gl_FragColor = vec4(color, 1.0);
}`;

export default function BlackHole() {
    const ref = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const canvas = ref.current;
        const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
        if (!gl) return undefined;
        const program = gl.createProgram();
        const shaders = [];
        for (const [type, source] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]]) {
            const shader = gl.createShader(type);
            shaders.push(shader);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                shaders.forEach(s => gl.deleteShader(s));
                gl.deleteProgram(program);
                return undefined;
            }
            gl.attachShader(program, shader);
        }
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            shaders.forEach(s => gl.deleteShader(s));
            gl.deleteProgram(program);
            return undefined;
        }
        gl.useProgram(program);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.uniform1i(gl.getUniformLocation(program, 'scene'), 0);
        const resolution = gl.getUniformLocation(program, 'resolution');
        const time = gl.getUniformLocation(program, 'time');
        const mobile = gl.getUniformLocation(program, 'mobile');
        const imageAspect = gl.getUniformLocation(program, 'imageAspect');
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const image = new Image();
        let raf = 0, last = 0, elapsed = 0, visible = true, lost = false, loaded = false, disposed = false;
        const draw = () => {
            if (!loaded || lost || disposed) return;
            gl.uniform2f(resolution, canvas.width, canvas.height);
            gl.uniform1f(imageAspect, image.naturalWidth / image.naturalHeight);
            gl.uniform1f(time, elapsed);
            gl.uniform1f(mobile, canvas.clientWidth < 700 ? 1 : 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        };
        const frame = now => {
            raf = requestAnimationFrame(frame);
            if (now - last < 1000 / 40) return;
            elapsed += Math.min((now - last) / 1000, 0.08);
            last = now;
            draw();
        };
        const sync = () => {
            cancelAnimationFrame(raf);
            if (!loaded || !visible || document.hidden || lost || disposed) return;
            draw();
            last = performance.now();
            if (!motion.matches) raf = requestAnimationFrame(frame);
        };
        const resize = () => {
            const scale = Math.min(window.devicePixelRatio || 1, 1.5, 1920 / Math.max(1, canvas.clientWidth));
            canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
            canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
            gl.viewport(0, 0, canvas.width, canvas.height);
            draw();
        };
        image.onload = () => {
            if (disposed || lost) return;
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
            loaded = true;
            resize();
            setReady(true);
            sync();
        };
        image.src = horizon;
        const observer = new ResizeObserver(resize);
        observer.observe(canvas);
        const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
        intersection.observe(canvas);
        const onLost = e => { e.preventDefault(); lost = true; setReady(false); cancelAnimationFrame(raf); };
        canvas.addEventListener('webglcontextlost', onLost);
        motion.addEventListener('change', sync);
        document.addEventListener('visibilitychange', sync);
        resize();
        return () => {
            disposed = true;
            image.onload = null;
            cancelAnimationFrame(raf);
            observer.disconnect();
            intersection.disconnect();
            canvas.removeEventListener('webglcontextlost', onLost);
            motion.removeEventListener('change', sync);
            document.removeEventListener('visibilitychange', sync);
            gl.deleteTexture(texture);
            gl.deleteBuffer(buffer);
            shaders.forEach(s => gl.deleteShader(s));
            gl.deleteProgram(program);
        };
    }, []);

    return <div className={`black-hole ${ready ? 'is-ready' : ''}`} aria-hidden="true">
        <img className="black-hole-fallback" src={horizon} alt="" fetchpriority="high" />
        <canvas ref={ref} />
        <div className="black-hole-shade" />
    </div>;
}
