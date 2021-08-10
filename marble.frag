#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle),
               sin(angle), cos(angle));
}

float rect(vec2 origin, vec2 dim, vec2 st) {
    vec2 t = vec2(0.1);
    vec2 result = smoothstep(origin, origin + t, st) * (1.0 - smoothstep(origin + dim, origin + dim + t, st));
    return result.x * result.y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;    
    
    vec3 color = vec3(0.0);

    vec2 pos = vec2(st*2.5);
    
    float n = noise(pos);

    pos = rotate2d(PI * noise(pos) * 0.6) * pos;
    pos = rotate2d(PI * noise(pos + PI)) * pos;
    
    color = vec3(rect(vec2(-0.0, 0.5), vec2(10.0, 0.2), pos) * 5.0);
    
    pos = rotate2d(1.75) * pos;
    color += vec3(rect(vec2(-0.0, 0.5), vec2(10.0, 0.2), pos) * 5.0);
    color = 1.0 - color;

    gl_FragColor = vec4(color,1.0);
}