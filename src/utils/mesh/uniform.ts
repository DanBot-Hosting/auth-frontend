import type { MiniGL } from "./minigl";

export class Uniform {
  /**
   * The parent MiniGL controller.
   *
   * @type {MiniGL}
   * @private
   */
  gl: MiniGL;

  /**
   * @type {string}
   */
  type: keyof TypeMap | string;

  /**
   * @type {*}
   */
  value: any;

  /**
   * The mapped type function.
   *
   * @type {string}
   */
  typeFn: string;

  /**
   * Type function mappings.
   *
   * @type {TypeMap}
   * @private
   */
  _typeMap: TypeMap = {
    float: "1f",
    int: "1i",
    vec2: "2fv",
    vec3: "3fv",
    vec4: "4fv",
    mat4: "Matrix4fv",
  };

  transpose: any;
  excludeFrom: any;

  /**
   * @param {MiniGL} minigl
   * @param {string} type
   * @param {*} value
   * @param {object} properties
   */
  constructor(
    minigl: MiniGL,
    type: keyof TypeMap | string,
    value: any,
    properties = {}
  ) {
    // Add additional properties i.e. excludeFrom, transpose... etc
    Object.assign(this, properties);

    // Set required properties.
    this.gl = minigl;
    this.type = type;
    this.value = value;

    // Get type function from map.
    this.typeFn =
      this._typeMap[this.type as keyof TypeMap] || this._typeMap.float;

    // Update.
    this.update();
  }

  update(value?: any) {
    if (this.value) {
      var paramB = this.value;
      var paramC = null;

      if (this.typeFn.indexOf("Matrix") === 0) {
        paramB = this.transpose;
        paramC = this.value;
      }

      // @ts-ignore
      this.gl.getContext()?.[`uniform${this.typeFn}`](value, paramB, paramC);
    }
  }

  getDeclaration(name: string, type: string, length: number = 0) {
    if (this.excludeFrom !== type) {
      if (this.type === "array") {
        return `${this.value[0].getDeclaration(name, type, this.value.length)}
const int ${name}_length = ${this.value.length};`;
      }

      if (this.type === "struct") {
        let namePrefix = name.replace("u_", "");
        namePrefix = namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1);

        const declaration = Object.entries(this.value)
          .map(([name, uniform]) => {
            return (uniform as any)
              .getDeclaration(name, type)
              .replace(/^uniform/, "");
          })
          .join("");

        return `uniform struct ${namePrefix} {
    ${declaration}
} ${name}${length > 0 ? `[${length}]` : ""};`;
      }

      return `uniform ${this.type} ${name}${length > 0 ? `[${length}]` : ""};`;
    }
  }
}
