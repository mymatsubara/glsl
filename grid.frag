#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float rect(in vec2 st, in vec2 origin, in vec2 dim) {
    vec2 uv = step(origin, st) - step(origin + dim, st);
    return uv.x * uv.y;
}

float rectBorder(in vec2 st, in vec2 origin, in vec2 dim, in vec2 t) {
    return rect(st, origin, dim) - rect(st, origin+t, dim-t*2.0);
}

vec2 gridfy(in vec2 st, in vec2 grid) {
    return fract(st * grid);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    st = gridfy(st, vec2(3.0));

    color = vec3(st,0.0);
    color = vec3(1.0-rectBorder(st, vec2(0.0), vec2(1.0), vec2(0.1)));

	gl_FragColor = vec4(color,1.0);
}