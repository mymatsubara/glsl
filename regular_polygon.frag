// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // Change the number of sides
    int sides = 3;
    float rotation = PI/float(sides);
    
    vec2 pos = vec2(0.5) - st;
    float angle = atan(pos.y, pos.x) + rotation;    
    
    float h = TWO_PI/float(sides);
    float s = sign(sin(angle* PI / h));
    float a = s * mod(angle, h) + step(s, 0.0) * h - h/2.0;
    float radius = 1.0 / cos(a) * 0.2;            
    
    vec3 color = 1.0 - vec3(smoothstep(radius, radius+0.01, length(pos)));

    gl_FragColor = vec4(color,1.0);
}