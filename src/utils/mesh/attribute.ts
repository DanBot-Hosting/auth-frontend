import { MiniGL } from "./minigl";

export class Attribute {
  /**
   * The parent MiniGL controller.
   *
   * @type {MiniGL}
   * @private
   */
  gl;

  type: 5126;
  buffer: WebGLBuffer | null;
  normalized = false;

  values!: Float32Array | Uint16Array;
  target!: number;
  size!: number;

  /**
   * @param {MiniGL} minigl
   * @param {object} properties
   */
  constructor(minigl: MiniGL, properties = {}) {
    // Add additional properties.
    Object.assign(this, properties);

    // Set required properties.
    this.gl = minigl;

    const context = this.gl.getContext();
    if (!context) throw "getContext cannot be found";

    this.type = context.FLOAT;
    this.buffer = context.createBuffer();

    this.update();
  }

  update() {
    if (this.values) {
      const context = this.gl.getContext();
      context?.bindBuffer(this.target, this.buffer);
      context?.bufferData(this.target, this.values, context.STATIC_DRAW);
    }
  }

  attach(e: string, t: WebGLProgram) {
    const context = this.gl.getContext();
    if (!context) throw "getContext cannot be found";
    const n = context.getAttribLocation(t, e);

    if (this.target === context.ARRAY_BUFFER) {
      context.enableVertexAttribArray(n);
      context.vertexAttribPointer(
        n,
        this.size,
        this.type,
        this.normalized,
        0,
        0
      );
    }

    return n;
  }

  use(e: number) {
    const context = this.gl.getContext();
    context?.bindBuffer(this.target, this.buffer);
    if (this.target === context?.ARRAY_BUFFER) {
      context.enableVertexAttribArray(e);
      context.vertexAttribPointer(
        e,
        this.size,
        this.type,
        this.normalized,
        0,
        0
      );
    }
  }
}
