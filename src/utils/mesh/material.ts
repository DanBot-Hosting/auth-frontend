import type { MiniGL } from "@/utils/mesh/minigl";
import type { Uniform } from "@/utils/mesh/uniform";

export class Material {
  /**
   * The parent MiniGL controller.
   *
   * @type {MiniGL}
   * @private
   */
  gl: MiniGL;

  uniformInstances: UniformInstance[] = [];
  uniforms: Partial<Uniforms> = {};
  vertexSource: string;
  Source: string;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;
  program: WebGLProgram;

  /**
   *
   * @param {MiniGL} minigl
   * @param {object} properties
   */
  constructor(
    minigl: MiniGL,
    vertexShaders: string,
    fragments: string,
    uniforms: Partial<Uniforms> = {},
    properties = {}
  ) {
    // Add additional properties.
    Object.assign(this, properties);

    // Set required properties.
    this.gl = minigl;
    this.uniforms = uniforms;

    const context = this.gl.getContext() as WebGLRenderingContext;

    const prefix = `
            precision highp float;
        `;

    this.vertexSource = `
            ${prefix}
            attribute vec4 position;
            attribute vec2 uv;
            attribute vec2 uvNorm;
            ${this._getUniformVariableDeclarations(
              this.gl.commonUniforms,
              "vertex"
            )}
            ${this._getUniformVariableDeclarations(uniforms, "vertex")}
            ${vertexShaders}
        `;

    this.Source = `
            ${prefix}
            ${this._getUniformVariableDeclarations(
              this.gl.commonUniforms,
              "fragment"
            )}
            ${this._getUniformVariableDeclarations(uniforms, "fragment")}
            ${fragments}
        `;

    this.vertexShader = this._getShaderByType(
      context.VERTEX_SHADER,
      this.vertexSource
    ) as WebGLShader;
    this.fragmentShader = this._getShaderByType(
      context.FRAGMENT_SHADER,
      this.Source
    ) as WebGLShader;
    this.program = context.createProgram() as WebGLProgram;

    context.attachShader(this.program, this.vertexShader);
    context.attachShader(this.program, this.fragmentShader);
    context.linkProgram(this.program);
    context.getProgramParameter(this.program, context.LINK_STATUS) ||
      console.error(context.getProgramInfoLog(this.program));
    context.useProgram(this.program);

    this.attachUniforms(void 0, this.gl.commonUniforms as Uniform);
    this.attachUniforms(void 0, this.uniforms as Uniform);
  }

  _getShaderByType(type: number, source: string) {
    const context = this.gl.getContext() as WebGLRenderingContext;
    const shader = context.createShader(type);

    if (!shader) throw "createShader cannot be initialized";

    context.shaderSource(shader, source);
    context.compileShader(shader);

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      console.error(context.getShaderInfoLog(shader));
    }

    return shader;
  }

  _getUniformVariableDeclarations(
    uniforms: Partial<Uniforms | CommonUniforms>,
    type: string
  ) {
    return Object.entries(uniforms)
      .map(([uniform, value]) => {
        return value.getDeclaration(uniform, type);
      })
      .join("\n");
  }

  attachUniforms(name: any, uniforms: Uniform) {
    if (!name) {
      Object.entries(uniforms).forEach(([name, uniform]) => {
        this.attachUniforms(name, uniform);
      });
    } else if (uniforms.type === "array") {
      uniforms.value.forEach((uniform: any, i: number) => {
        this.attachUniforms(`${name}[${i}]`, uniform);
      });
    } else if (uniforms.type === "struct") {
      Object.entries(uniforms.value).forEach(([uniform, i]) => {
        this.attachUniforms(`${name}.${uniform}`, i as Uniform);
      });
    } else {
      this.uniformInstances.push({
        uniform: uniforms,
        location: (
          this.gl.getContext() as WebGLRenderingContext
        ).getUniformLocation(this.program, name),
      });
    }
  }
}
