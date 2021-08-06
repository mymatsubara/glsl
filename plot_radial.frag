#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plotRadial(vec2 st, float radius) {
    vec2 origin = vec2(0.5);
	float d = length(origin - st);
	return smoothstep(radius-0.01, radius, d) - smoothstep(radius, radius+0.01, d);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    
    vec2 pos = vec2(0.5) - st;
    float angle = atan(pos.y, pos.x);
    float radius = cos(angle*3.) * .3;    
    
    color = mix(vec3(1.0), vec3(0.0, 1.0, 0.0), plotRadial(st, radius));

    gl_FragColor = vec4(color,1.0);
}