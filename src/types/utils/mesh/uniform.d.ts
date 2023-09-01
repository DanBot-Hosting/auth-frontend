interface TypeMap {
  float: "1f";
  int: "1i";
  vec2: "2fv";
  vec3: "3fv";
  vec4: "4fv";
  mat4: "Matrix4fv";
}

interface UniformInstance {
  uniform: Uniform,
  location: WebGLUniformLocation | null,
}
