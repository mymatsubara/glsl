#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

// Game state:
// 0.0: empty
// 1.0: cross
// 2.0: circle
mat3 game = mat3(1.0, 0.0, 0.0,
                0.0, 2.0, 0.0,
                0.0, 0.0, 0.0);

vec3 black = vec3(0.0);

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.06),
                         _radius+(_radius*0.06),
                         dot(l,l)*4.0);
}

float ring(in vec2 st, in float radius, in float t) {
    return circle(st, radius) - circle(st, radius - t);
}

float rect(in vec2 st, in vec2 origin, in vec2 dim) {
    vec2 uv = step(origin, st) - step(origin + dim, st);
    return uv.x * uv.y;
}

float cross(in vec2 st, in vec2 origin, in vec2 dim) {
    vec2 dimH = dim;
    vec2 dimV = vec2(dim.y, dim.x);
	    return max(rect(st, origin-dimH/2.0, dimH), rect(st, origin-dimV/2.0, dimV));
}

float rectBorder(in vec2 st, in vec2 origin, in vec2 dim, in vec2 t) {
    return rect(st, origin, dim) - rect(st, origin+t, dim-t*2.0);
}

vec2 gridfy(in vec2 st, in vec2 grid) {
    return fract(st * grid);
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle),
               sin(angle), cos(angle));
}

float doubleStep(float s1, float s2, float x) {
    return step(s1, x) - step(s2, x);
}

// GLSL does not accept dynamic array indexing
// if there is a better solution, please tell me.
float getGamePiece(mat3 game, int x, int y) {
    float s = 0.0;
    int n = y * 3 + x;
    if (n == 0)
        s = game[0][0];
    else if(n == 1)
    	s = game[0][1];
    else if(n == 2)
    	s = game[0][2];
    else if(n == 3)
    	s = game[1][0];
    else if(n == 4)
    	s = game[1][1];
    else if(n == 5)
    	s = game[1][2];
    else if(n == 6)
    	s = game[2][0];
    else if(n == 7)
    	s = game[2][1];
    else if(n == 8)
    	s = game[2][2];   
    return s;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(1.0);
    
    // Tic-tac-toe grid is 3x3
    vec2 grid = vec2(3.0);
    
    // Getting the current pixel grid indexes
    int gridX = int(st.x / (1.0/grid.x));
    int gridY = int(st.y / (1.0/grid.y));
	
    // Transform coordinate space to grid
    st = gridfy(st, vec2(grid));
    
    // Draw grid borders
    color = mix(color, black, rectBorder(st, vec2(0.0), vec2(1.0), vec2(0.03)));
    
    // Cross 
    vec2 crossSt = rotate2d(PI/4.0) * st;
    crossSt -= vec2(sin(PI/4.0), 0.0);
    float crossValue = cross(crossSt, vec2(0.0), vec2(0.6, 0.1));
        
    // Ring value
    float ringValue = ring(st, 0.5, 0.2);
    
    // Draw current grid game piece
	float s = getGamePiece(game, gridX, gridY);       
    
    color = mix(color, black, doubleStep(1.0, 1.99, s) * crossValue + doubleStep(2.0, 2.99, s) * ringValue);        

	gl_FragColor = vec4(color,1.0);
}