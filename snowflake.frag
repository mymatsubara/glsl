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
    float radius = (abs(cos(angle*12.)*sin(angle*3.))*.8+.1) * 0.4;    
    float dist = length(d);    
    
    float snowflake = smoothstep(dist, dist+0.01, radius*0.504);
    float internalHole = smoothstep(dist, dist+0.01, radius * 0.404);
    float snowflake2 =  smoothstep(dist, dist+0.01, radius * 0.372);
    float internalHole2 = smoothstep(dist, dist+0.01, radius * 0.324);
    float snowflake3 =  smoothstep(dist, dist+0.01, radius * 0.252);
    
    color = vec3(snowflake - internalHole + snowflake2 - internalHole2 + snowflake3);      

    gl_FragColor = vec4(color,1.0);
}