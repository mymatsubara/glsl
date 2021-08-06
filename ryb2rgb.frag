// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

// Function from Flavin
// https://math.stackexchange.com/questions/305395/ryb-and-rgb-color-space-conversion
vec3 ryb2rgb(in vec3 c) {
    float r = c.r;
    float y = c.g;
    float b = c.b;
    
    vec3 f_000 = vec3(1.0, 1.0, 1.0);
    vec3 f_001 = vec3(0.163, 0.373, 0.6);
    vec3 f_010 = vec3(1.0, 1.0, 0.0);    
    vec3 f_011 = vec3(0.0, 0.66, 0.2);
    vec3 f_100 = vec3(1.0, 0.0, 0.0);
    vec3 f_101 = vec3(0.5, 0.5, 0.0);    
    vec3 f_110 = vec3(1.0, 0.5, 0.0);
    vec3 f_111 = vec3(0.2, 0.094, 0.0);
    
    return f_000 * (1.0-r) * (1.0-y) * (1.0-b) 
        + f_001 * (1.0-r) * (1.0-y) * b 
        + f_010 * (1.0-r) * y * (1.0-b) 
        + f_100 * r * (1.0-y) * (1.0-b)
        + f_011 * (1.0-r)* y * b 
        + f_101 * r * (1.0-y) * b
        + f_110 * r * y * (1.0-b)
        + f_111 * r * y * b;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);
    
    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*2.0;

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    color = ryb2rgb(hsb2rgb(vec3((angle/TWO_PI)+0.5,radius,1.0)));

    gl_FragColor = vec4(color,1.0);
}