#ifdef GL_ES
precision mediump float;
#endif
​
#define PI 3.14159265359
​
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
​
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float x = st.x;
    float y = st.y;
    
    vec3 color = vec3(0.0, 0.0, 1.0);
    color.rg = vec2(1.0, 1.0) * step(1.0/3.0, x);
    color.bg -= vec2(1.0, 1.0) * step(2.0/3.0, x);
    
    gl_FragColor = vec4(color, 1.0);
}