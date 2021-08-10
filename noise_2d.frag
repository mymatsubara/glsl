#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in float x) {
    return fract(sin(x)*100000.0);;
}

float random(in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0));
    
    vec2 p = smoothstep(vec2(0.0), vec2(1.0), fract(st));
    
  	// Bilinear interpolation 
    float q1 = mix(a,b, p.x);
    float q2 = mix(c,d, p.x);
    
    return mix(q1, q2, p.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st *= 10.0;
    
    vec3 color = vec3(noise(st));

    gl_FragColor = vec4(color,1.0);
}