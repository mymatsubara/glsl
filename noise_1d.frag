#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in float x) {
    return fract(sin(x)*100000.0);;
}

float circle(vec2 st, float radius) {
	return 1.0 - smoothstep(radius, radius + 0.005, length(st - vec2(0.5)));
}

float cubic(float x) {
    return pow(x,3.0) - 4.0*pow(x,2.0) + 4.0*x;
}

float noise(float x) {
    float i = floor(x);
    float p = fract(x);
    return mix(random(i), random(i+1.0), cubic(p));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    st -= 0.5;
    st /= noise(u_time / 3.0);
    st += 0.5;
    
    vec3 color = vec3(circle(st, 0.3));

    gl_FragColor = vec4(color,1.0);
}