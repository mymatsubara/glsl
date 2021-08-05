#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 dayBlue = vec3(106.0/255.0, 178.0/255.0, 252.0/255.0);
vec3 red = vec3(212.0/255.0, 99.0/ 255.0, 81.0/255.0);
vec3 nightBlue = vec3(36.0/255.0, 45.0/255.0, 74.0/255.0);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

float plotTime(vec2 st, float pct) {
    return  smoothstep(pct-0.01, pct, st.x) -
          smoothstep(pct, pct+0.01, st.x);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
	float x = st.x;
    float y = st.y;
    
    float time = mod(u_time / 20.0, 1.0);
    
    // Red control
    float redStep1 = step(0.052, time) - step(0.272, time);
    float redStep2 = step(0.636, time) - step(0.852, time);
    float redOvertime = max(0.0, redStep1 * sin(time*26.384 + 8.808) + redStep2 * sin(time * 24.0 + 2.176));
    float redLeftover = max(0.03, (1.0 - pow((time - 0.5) * 4.0, 2.0)) * 0.1);    
    float redPct = pow(y, redOvertime + redLeftover);
    
    // Blue control
    float blueOvertime = max(0.0, 1.0 - pow(max(0.0, abs(time*3.0 - 1.5) * 2.0 - 1.0), 3.0));
    
    vec3 blue = mix(nightBlue, dayBlue, blueOvertime);   
	vec3 color = mix(red, blue, redPct);
            
    // Plot    
    float blueOvertimePlot = max(0.0, 1.0 - pow(max(0.0, abs(x*3.0 - 1.5) * 2.0 - 1.0), 3.0));
    
    // Plot
	float redStepPlot1 = step(0.052, x) - step(0.272, x);
    float redStepPlot2 = step(0.636, x) - step(0.852, x);
    float redOvertimePlot = max(0.0, redStepPlot1 * sin(x*26.384 + 8.808) + redStepPlot2 * sin(x * 24.0 + 2.176));        
    
    color = mix(color, vec3(0.0, 0.0, 1.0), plot(st, blueOvertimePlot));
    color = mix(color, vec3(1.0, 0.0, 0.0), plot(st, redOvertimePlot));
    color = mix(color, vec3(0.0, 1.0, 0.0), plotTime(st, time));

    gl_FragColor = vec4(color,1.0);
}