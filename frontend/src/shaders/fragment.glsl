uniform sampler2D dayTexture;
uniform sampler2D nightTexture;
uniform sampler2D specularTexture;
uniform vec3 lightDirection; // normalized



varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    

    // dot product between surface normal and light direction
    float intensity = max(dot(normal, lightDirection), 0.0);


    //day and night texture
    vec3 dayColor=texture(dayTexture,vUv).rgb;
    vec3 nightColor=texture(nightTexture,vUv).rgb*1.5;
    vec3 specularMap = texture2D(specularTexture, vUv).rgb;
    

     // blend day/night based on intensity
    vec3 color = mix(nightColor, dayColor, intensity);

    // simple specular highlight (oceans)
    float specular = pow(intensity, 10.0);
    color += specularMap * specular;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}