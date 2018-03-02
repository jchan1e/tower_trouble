#version 120
uniform float dX;
uniform float dY;
uniform sampler2D img;

vec4 sample(float dx, float dy)
{
   return texture2D(img,gl_TexCoord[0].st + vec2(dx, dy));
}

void main()
{
   //Laplacian Edge Detection
   vec4 color = - sample(-dX,+dY) -     sample(0.0,+dY) - sample(+dX,+dY)
                - sample(-dX,0.0) + 8.0*sample(0.0,0.0) - sample(+dX,0.0)
                - sample(-dX,-dY) -     sample(0.0,-dY) - sample(+dX,-dY);

   ////Sobel Edge Detection
   //vec4 colorv =   sample(-dX,+dY) +   2*sample(0.0,+dY) + sample(+dX,+dY)
   //           // - sample(-dX,0.0) + 8.0*sample(0.0,0.0) - sample(+dX,0.0)
   //              - sample(-dX,-dY) -   2*sample(0.0,-dY) - sample(+dX,-dY);
   //vec4 colorh = -   sample(-dX,+dY)                   +   sample(+dX,+dY)
   //              - 2*sample(-dX,0.0)                   + 2*sample(+dX,0.0)
   //              -   sample(-dX,-dY)                   +   sample(+dX,-dY);
   //vec4 color = sqrt(colorv*colorv + colorh*colorh);
   color.r = sqrt(color.r);
   color.g = sqrt(color.g);
   color.b = sqrt(color.b);
   //color.a = pow(max(max(color.r, color.g), color.b), 1.5);
   color.a = max(max(color.r, color.g), color.b);
   //color.a = 1.0;
   gl_FragColor = color;
}
