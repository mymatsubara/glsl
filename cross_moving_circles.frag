#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

vec2 crossMoving(vec2 _st, float _zoom, int mov){
    _st *= _zoom;

    float maxMoveAmount = float(mov);
    float evenRow = step(1., mod(_st.y,2.0));
    float evenCol = step(1., mod(_st.x,2.0));
    float moveRow = step(0.0,sin(u_time * PI / 2.0));
    float moveAmount = mod(u_time, maxMoveAmount);
    
    // Move rows
    _st.x += evenRow * moveAmount * moveRow - (1.0 - evenRow) * moveRow * moveAmount;
    
    // Move Cols
    _st.y += evenCol * moveAmount * (1.0 - moveRow) - (1.0 - evenCol) * (1.0 - moveRow) * moveAmount;

    return fract(_st);
}

float circle(vec2 st, vec2 origin, float radius) {
    
    return 1.0 - smoothstep(radius, radius+radius*0.15, length(origin-st));
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Apply the cross moving tiling
    st = crossMoving(st,10.0, 2);

    color = vec3(1.0 - circle(st,vec2(0.5), 0.2));

    gl_FragColor = vec4(color,1.0);
}