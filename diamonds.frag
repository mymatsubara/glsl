#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

// rotate2D: Author @patriciogv ( patriciogonzalezvivo.com ) - 2015
vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

// tile: Author @patriciogv ( patriciogonzalezvivo.com ) - 2015
vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

// box: Author @patriciogv ( patriciogonzalezvivo.com ) - 2015
float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Divide the space in 7
    st = tile(st,7.0);

    // Use a matrix to rotate the space 45 degrees
    vec2 stRotated = rotate2D(st,PI*0.25);
    
    // Distance to translate the diamonds to the corners
    float d = sqrt(2.0) / 2.0;
    
    // Diamonds coordinates
    vec2 stBL = vec2(d, 0.0) + stRotated;
    vec2 stTR = vec2(-d, 0.0) + stRotated;
    vec2 stTL = vec2(0.0, -d) + stRotated;
    vec2 stBR = vec2(0.0, d) + stRotated;
    
    // Draw a diamonds
    color += vec3(box(stBL,vec2(0.3),0.01));
    color += vec3(box(stTL,vec2(0.3),0.01));
    color += vec3(box(stTR,vec2(0.3),0.01));
    color += vec3(box(stBR,vec2(0.3),0.01));
    
    // Draw border
    color += vec3(box(st, vec2(1.1), 0.01)) - vec3(box(st, vec2(0.98), 0.01));

    gl_FragColor = vec4(color,1.0);
}