#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float size = 1.0/8.0;

#define PI 3.14159265358979323846

float chessSquares(in vec2 st, float width, float height) {
    float y = sin(st.y * PI * 2.0 / (height * 2.0));
    float x = sin(st.x * PI * 2.0 / (width * 2.0));
    return step(0.0, x * y);
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    // Draw board
    color += vec3(chessSquares(st + vec2(0.0, size), size, size));

    gl_FragColor = vec4(color,1.0);
}