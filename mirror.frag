// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circ(vec2 center, float radius, vec2 st) {
    float delta = sqrt(pow(radius, 2.0) - pow(st.x - center.x, 2.0));
    return step(center.y - delta, st.y) - step(center.y + delta, st.y);
}

float circDist(vec2 center, float radius, vec2 st) {
    return step(distance(st, center), radius);
}

float circEfficient(vec2 center, float radius, vec2 st) {
    vec2 dist = st-center;
	return 1.-smoothstep(radius-(radius*0.01),
                         radius+(radius*0.01),
                         dot(dist,dist)*4.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    st *= 2.0;
    st.x -= 1.0;

    vec3 color = vec3(circEfficient(vec2(0.5, 0.5), 0.5, abs(st)));

    gl_FragColor = vec4(color,1.0);
}