#ifdef GL_ES
precision mediump float;
#endif

// Imaginary number product
#define im_prod(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)

uniform vec2 u_resolution;
uniform float u_time;

float box(in vec2 st, in vec2 origin, in vec2 size) {
    vec2 s = vec2(0.01);
    vec2 uv = smoothstep(origin, origin+s, st) * (1.0 - smoothstep(origin+size, origin+size+s, st));
    return uv.x * uv.y;
}

float cross(in vec2 _st, vec2 origin, float _size){
    vec2 sizeH = vec2(_size,_size/4.);
    vec2 sizeV = vec2(_size/4.,_size);
    
    return  box(_st, origin - sizeH/2.0, sizeH) +
            box(_st, origin - sizeV/2.0, sizeV);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // To move the cross we move the space
    vec2 translate = vec2(cos(u_time),sin(u_time));

    // Space coordinate translation
    st = st * 2.0 - 1.0 + translate*0.35;

    // Space coordinate rotation 
    st = im_prod(st, translate);    

    // Add the shape on the foreground
    color += vec3(cross(st, vec2(0.0), 0.25));

    gl_FragColor = vec4(color,1.0);
}