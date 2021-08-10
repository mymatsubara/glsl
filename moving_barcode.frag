#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float baseThreshold = 0.3;
float baseVerticalBars = 100.0;
float speed = 2.0;

float random(in float x) {
    return fract(sin(x)*100000.0);;
}

vec2 movingRow(in vec2 st, in float time) {
    st.y *= 2.0;
    
    float evenRow = mod(floor(st.y), 2.0);
    
    st.x += evenRow * time - (1.0 - evenRow) * time;
    
    return st;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // Parameters over time
    float a = sin(u_time);
    float n = step(-0.5, a) + step(0.5, a) + 1.0;
    
    // Bar code parameters
    float threshold = fract(baseThreshold * n);
    float verticalBars = baseVerticalBars * (n - 1.0) + baseVerticalBars;
    
    // Move rows
	st = movingRow(st, u_time / (n * speed));
    
    
    vec3 color = vec3(step(threshold, random(floor(st.x * verticalBars))));

    gl_FragColor = vec4(color,1.0);
}