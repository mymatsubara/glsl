// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // Scale the coordinate system
    st *= 10.0;
    
    // Tiles
    vec2 i = floor(st);
    vec2 p = fract(st);
    
    // Point min values
    float min_d = 1.0;
    vec2 min_v;
    
    // Iterate through neighbor grids
    for (int y = -1; y < 2; y++) {
        for (int x = -1; x < 2; x++) {
            // Information for the grid in the iteration
            vec2 localGrid = vec2(float(x), float(y));
            vec2 pointLocal = random2(i + localGrid);
            pointLocal = 0.5 + 0.5*sin(2.413*pointLocal * u_time);
            
            vec2 point = pointLocal + localGrid;
            
            // Current pixel to current grid vector
            vec2 v = p - point;
            float d = length(v);
            
            if (d < min_d) {
                min_d = d;
                min_v = pointLocal;
            }
        }
    }
    

    // Draw cell color according to closest point length
    vec3 color = vec3(length(min_v/(sqrt(2.0))));
    
    // Draw grid
    color.r += step(0.98, p.x) + step(0.98, p.y);
    
    // Draw grid point
    color += vec3(1.0 - step(0.05, min_d));

    gl_FragColor = vec4(color,1.0);
}