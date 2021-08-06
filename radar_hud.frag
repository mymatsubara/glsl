#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec4 softRed = vec4(1.0, 0.0, 0.0, 0.7);
vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
vec4 softGreen = vec4(182.0/255.0, 253.0/255.0, 255.0/255.0, 0.7);
vec4 green = vec4(182.0/255.0, 253.0/255.0, 255.0/255.0, 1.0);

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float box(in vec2 st, in vec2 origin, in vec2 size) {
    vec2 s = vec2(0.01);
    vec2 uv = smoothstep(origin, origin+s, st) * (1.0 - smoothstep(origin+size, origin+size+s, st));
    return uv.x * uv.y;
}

float cross(in vec2 _st, vec2 origin, float _size, float t){
    vec2 sizeH = vec2(_size,t);
    vec2 sizeV = vec2(t,_size);
    
    return  box(_st, origin - sizeH/2.0, sizeH) +
            box(_st, origin - sizeV/2.0, sizeV);
}

float fadingCircle(in vec2 st, vec2 origin, float r) {
    float d = length(origin - st);
    return d / r * (1.0 - smoothstep(r, r+r*0.1, d));
}

float bordedCircle(in vec2 st, vec2 origin, vec3 r) {
    float d = length(origin - st);
    return 1.0 - smoothstep(r.x, r.x+0.02, d) + smoothstep(r.y, r.y+0.02, d) - smoothstep(r.z, r.z+0.02, d);
}

float ring(in vec2 st, vec2 origin, float r, float t) {
	float d = length(origin - st);
    return 1.0 - smoothstep(r, r+0.02, d) - (1.0 - smoothstep(r-t, r-t+0.02, d));
}

float circle(in vec2 st, vec2 origin, float r) {
	float d = length(origin - st);
    return 1.0 - smoothstep(r, r+0.02, d);
}

float rotationEffect(in vec2 st, vec2 origin, float r, float arc) {
    float angle = atan(st.y, st.x);
    return min(step(0.0, angle) - pow(smoothstep(0.0, arc, angle), 0.6), circle(st, origin, r));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(0.0);
    st = st * 2.0 - 1.0;

    // Enemy
    float t = fract(u_time/4.0) * 2.0 - 1.0;
    vec2 origin = vec2(t, pow(t, 5.0));
    float radius = 0.2;
    vec3 innerRadius = vec3(0.08, 0.06, 0.05) * 0.7;
    color = mix(color, softRed, fadingCircle(st, origin, radius));
    color = mix(color, red, bordedCircle(st, origin, innerRadius));
    
    // Radar
    float r = 0.95;
        
    // Circles
    color = mix(color, softGreen, ring(st, vec2(0.0), r*0.25, 0.0125) + ring(st, vec2(0.0), r*0.5, 0.0125) + ring(st, vec2(0.0), r*0.75, 0.015) + ring(st, vec2(0.0), r, 0.02));
    
    // Cross
    t = 0.015;
    vec2 rotatedSt = rotate2d(PI/4.0) * st;    
    color = mix(color, softGreen, cross(rotatedSt, vec2(0.0), 2.0*r, t));
        
    // Scanner
    t = 0.02;
    vec2 movingSt = rotate2d(mod(-u_time, 2.0 * PI)) * st;
    float arc = PI;
    color = mix(color, softGreen, box(movingSt,vec2(0.0, -t*0.5), vec2(r, t)));
    color = mix(color, green, rotationEffect(movingSt, vec2(0.0),r,arc));
    
    
    gl_FragColor = color;
}