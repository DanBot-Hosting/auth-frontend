import type { MiniGL } from "./minigl";
import type { Material } from "./material";
import type { PlaneGeometry } from "./planeGeometry";

export class Mesh {
  /**
   * The parent MiniGL controller.
   *
   * @type {MiniGL}
   * @private
   */
  gl: MiniGL;
  geometry: PlaneGeometry;
  material: Material;

  wireframe = false;
  attributeInstances: AttributeInstance[] = [];

  /**
   * @param {MiniGL} minigl
   * @param geometry
   * @param material
   * @param {object} properties
   */
  constructor(
    minigl: MiniGL,
    geometry: PlaneGeometry,
    material: Material,
    properties = {}
  ) {
    // Add additional properties.
    Object.assign(this, properties);

    // Set required properties.
    this.geometry = geometry;
    this.material = material;
    this.gl = minigl;

    // Build `attributeInstances` array.
    Object.entries(this.geometry.attributes).forEach(([e, attribute]) => {
      this.attributeInstances.push({
        attribute: attribute,
        location: attribute.attach(e, this.material.program),
      });
    });

    // Add mesh to MiniGL controller.
    this.gl.meshes.push(this);
  }

  draw() {
    const context = this.gl.getContext() as WebGLRenderingContext;

    context.useProgram(this.material.program);

    this.material.uniformInstances.forEach(
      ({ uniform: uniform, location: location }) => {
        uniform.update(location);
      }
    );

    this.attributeInstances.forEach(
      ({ attribute: attribute, location: location }) => {
        attribute.use(location);
      }
    );

    const mode = this.wireframe ? context.LINES : context.TRIANGLES;

    context.drawElements(
      mode,
      this.geometry.attributes.index.values.length,
      context.UNSIGNED_SHORT,
      0
    );
  }

  remove() {
    this.gl.meshes = this.gl.meshes.filter((mesh) => mesh != this);
  }
}
