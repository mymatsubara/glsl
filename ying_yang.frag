#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359
#define TWO_PI 2.0 * 3.14159265359

vec3 beige = vec3(249.0/255.0, 242.0/255.0, 224.0/255.0);
vec3 red = vec3(182.0/255.0, 38.0/255.0, 39.0/255.0);

float circ(vec2 center, float radius, vec2 st) {
    float delta = sqrt(pow(radius, 2.0) - pow(st.x - center.x, 2.0));
    return step(center.y - delta, st.y) - step(center.y + delta, st.y);
}

float circDist(vec2 center, float radius, vec2 st) {
    return step(distance(st, center), radius);
}

float circDistSmooth(vec2 center, float radius, vec2 st) {
    return 1.0 - smoothstep(radius, radius + 0.004,distance(st, center));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;    
    
    vec2 origin = vec2(0.5, 0.5);
        
    float angle1 = mod(u_time, TWO_PI);
    float angle2 = angle1 + PI;
    vec2 radius = vec2(0.1);
    
    float pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
    pct = pow(distance(st,vec2(cos(angle1), sin(angle1)) * radius + origin), distance(st,vec2(cos(angle2), sin(angle2)) * radius + origin));

    vec3 color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}