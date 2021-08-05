#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718
#define PI TWO_PI/2.0;

uniform vec2 u_resolution;
uniform float u_time;

float quadraticBezier(float x, vec2 p) {
    float a = p.x;
    float b = p.y;
    
    float epsilon = 0.00001;
    a = max(0.0, min(1.0, a)); 
    b = max(0.0, min(1.0, b)); 
    if (a == 0.5){
    	a += epsilon;
    }

    // solve t from x (an inverse operation)
    float om2a = 1.0 - 2.0*a;
    float t = (sqrt(a*a + om2a*x) - a)/om2a;
    float y = (1.0-2.0*b)*(t*t) + (2.0*b)*t;
    return y;
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ) {
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    
    return c.z * mix( vec3(1.0), rgb, c.y);
}

float plot(float st, float pct){
  return  smoothstep( pct-0.02, pct, st) -
          smoothstep( pct, pct+0.02, st);
}

float rect(vec2 origin, vec2 dim, vec2 st) {
    vec2 result = step(origin, st) * (1.0 - step(origin + dim, st));
    return result.x * result.y;
}

float rectFloor(vec2 origin, vec2 dim, vec2 st) {
    vec2 o = vec2(1.0);
    vec2 result = floor(st / origin) * (1.0 - floor(st / (origin + dim)));
    return result.x * result.y;
}

float rectSmooth(vec2 origin, vec2 dim, vec2 st) {
    vec2 t = vec2(0.005);
    vec2 result = smoothstep(origin, origin + t, st) * (1.0 - smoothstep(origin + dim, origin + dim + t, st));
    return result.x * result.y;
}

float rectOutline(vec2 origin, vec2 dim, vec2 t, vec2 st) {
    float outside = rect(origin, dim, st);
    float inside = rect(origin + t, dim - 2.0 * t, st);
    return outside - inside;
}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    vec2 border = step(vec2(0.1), st) * (1.0 - step(vec2(0.9), st));
    
    vec3 color = mix(vec3(1.0), vec3(0.0), rectOutline(vec2(0.1, 0.2), vec2(0.1, 0.3), vec2(0.01), st));

    gl_FragColor = vec4(color,1.0);
}