// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.0);    
    
    vec2 origin = vec2(0.5);    
    vec2 d = origin - st;
    
          
    float angle = atan(d.y, d.x) + mod(u_time, PI * 2.0);
    float radius = (smoothstep(-.5,1., cos(angle*10.))*0.2+0.5) * 0.4;    
    float dist = length(d);    
    
    float gear = smoothstep(dist, dist+0.01, radius);
    float internalHole = smoothstep(dist, dist+0.01, 0.1);
    
    color = vec3(gear - internalHole);      

    gl_FragColor = vec4(color,1.0);
}