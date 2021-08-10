#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float verticalBars = 140.0;
float rows = 70.0;
float maxSpeed = 2.0;

float random(in float x) {
    return fract(sin(x)*100000.0);;
}

vec2 movingRows(in vec2 st, in float time, float rows) {
    st.y *= rows;
    
    float rowNumber = floor(st.y);
    
    st.x -= abs(sin(rowNumber)) * time;
    
    return st;
}

float getRowThreshold(in vec2 st, in float mouseInput) {
    float rowNumber = floor(st.y);
    return min(abs(sin(rowNumber)), 0.040 + mouseInput);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
	st = movingRows(st, u_time / maxSpeed, rows);
    
    float threshold = getRowThreshold(st, u_mouse.x / (u_resolution.x * 4.0));
    
    
    vec3 color = vec3(step(threshold, random(floor(st.x * verticalBars))));

    gl_FragColor = vec4(color,1.0);
}