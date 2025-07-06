import * as coda from "@codahq/packs-sdk";
export const pack = coda.newPack();

pack.addNetworkDomain("example.com");

class Hsluv {
  hex: string;
  rgb_r: number;
  rgb_g: number;
  rgb_b: number;
  xyz_x: number;
  xyz_y: number;
  xyz_z: number;
  luv_l: number;
  luv_u: number;
  luv_v: number;
  lch_l: number;
  lch_c: number;
  lch_h: number;
  hsluv_h: number;
  hsluv_s: number;
  hsluv_l: number;
  hpluv_h: number;
  hpluv_p: number;
  hpluv_l: number;
  r0s: number;
  r0i: number;
  r1s: number;
  r1i: number;
  g0s: number;
  g0i: number;
  g1s: number;
  g1i: number;
  b0s: number;
  b0i: number;
  b1s: number;
  b1i: number;

  // Add static property type annotations
  static hexChars: string;
  static refY: number;
  static refU: number;
  static refV: number;
  static kappa: number;
  static epsilon: number;
  static m_r0: number;
  static m_r1: number;
  static m_r2: number;
  static m_g0: number;
  static m_g1: number;
  static m_g2: number;
  static m_b0: number;
  static m_b1: number;
  static m_b2: number;

  constructor() {
    this.hex = "#000000";
    this.rgb_r = 0;
    this.rgb_g = 0;
    this.rgb_b = 0;
    this.xyz_x = 0;
    this.xyz_y = 0;
    this.xyz_z = 0;
    this.luv_l = 0;
    this.luv_u = 0;
    this.luv_v = 0;
    this.lch_l = 0;
    this.lch_c = 0;
    this.lch_h = 0;
    this.hsluv_h = 0;
    this.hsluv_s = 0;
    this.hsluv_l = 0;
    this.hpluv_h = 0;
    this.hpluv_p = 0;
    this.hpluv_l = 0;
    this.r0s = 0;
    this.r0i = 0;
    this.r1s = 0;
    this.r1i = 0;
    this.g0s = 0;
    this.g0i = 0;
    this.g1s = 0;
    this.g1i = 0;
    this.b0s = 0;
    this.b0i = 0;
    this.b1s = 0;
    this.b1i = 0;
  }

  static fromLinear(s) {
    return s <= 0.0031308 ? 12.92 * s : 1.055 * Math.pow(s, 1 / 2.4) - 0.055;
  }

  static toLinear(s) {
    return s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92;
  }

  static yToL(s) {
    return s <= Hsluv.epsilon
      ? (s / Hsluv.refY) * Hsluv.kappa
      : 116 * Math.pow(s / Hsluv.refY, 1 / 3) - 16;
  }

  static lToY(s) {
    return s <= 8
      ? (Hsluv.refY * s) / Hsluv.kappa
      : Hsluv.refY * Math.pow((s + 16) / 116, 3);
  }

  static rgbChannelToHex(s) {
    let t = Math.round(s * 255);
    let i = t % 16;
    let r = ((t - i) / 16) | 0;
    return Hsluv.hexChars.charAt(r) + Hsluv.hexChars.charAt(i);
  }

  static hexToRgbChannel(s, t) {
    let i = Hsluv.hexChars.indexOf(s.charAt(t));
    let r = Hsluv.hexChars.indexOf(s.charAt(t + 1));
    return (i * 16 + r) / 255;
  }

  static distanceFromOriginAngle(s, t, i) {
    let r = t / (Math.sin(i) - s * Math.cos(i));
    return r < 0 ? Infinity : r;
  }

  static distanceFromOrigin(s, t) {
    return Math.abs(t) / Math.sqrt(Math.pow(s, 2) + 1);
  }

  static min6(s, t, i, r, n, c) {
    return Math.min(s, Math.min(t, Math.min(i, Math.min(r, Math.min(n, c)))));
  }

  rgbToHex() {
    this.hex = "#";
    this.hex += Hsluv.rgbChannelToHex(this.rgb_r);
    this.hex += Hsluv.rgbChannelToHex(this.rgb_g);
    this.hex += Hsluv.rgbChannelToHex(this.rgb_b);
  }

  hexToRgb() {
    this.hex = this.hex.toLowerCase();
    this.rgb_r = Hsluv.hexToRgbChannel(this.hex, 1);
    this.rgb_g = Hsluv.hexToRgbChannel(this.hex, 3);
    this.rgb_b = Hsluv.hexToRgbChannel(this.hex, 5);
  }

  xyzToRgb() {
    this.rgb_r = Hsluv.fromLinear(
      Hsluv.m_r0 * this.xyz_x +
        Hsluv.m_r1 * this.xyz_y +
        Hsluv.m_r2 * this.xyz_z
    );
    this.rgb_g = Hsluv.fromLinear(
      Hsluv.m_g0 * this.xyz_x +
        Hsluv.m_g1 * this.xyz_y +
        Hsluv.m_g2 * this.xyz_z
    );
    this.rgb_b = Hsluv.fromLinear(
      Hsluv.m_b0 * this.xyz_x +
        Hsluv.m_b1 * this.xyz_y +
        Hsluv.m_b2 * this.xyz_z
    );
  }

  rgbToXyz() {
    let s = Hsluv.toLinear(this.rgb_r);
    let t = Hsluv.toLinear(this.rgb_g);
    let i = Hsluv.toLinear(this.rgb_b);
    this.xyz_x =
      0.41239079926595 * s + 0.35758433938387 * t + 0.18048078840183 * i;
    this.xyz_y =
      0.21263900587151 * s + 0.71516867876775 * t + 0.072192315360733 * i;
    this.xyz_z =
      0.019330818715591 * s + 0.11919477979462 * t + 0.95053215224966 * i;
  }

  xyzToLuv() {
    let s = this.xyz_x + 15 * this.xyz_y + 3 * this.xyz_z;
    let t = 4 * this.xyz_x;
    let i = 9 * this.xyz_y;
    s !== 0 ? ((t /= s), (i /= s)) : ((t = NaN), (i = NaN));
    this.luv_l = Hsluv.yToL(this.xyz_y);
    this.luv_l === 0
      ? ((this.luv_u = 0), (this.luv_v = 0))
      : ((this.luv_u = 13 * this.luv_l * (t - Hsluv.refU)),
        (this.luv_v = 13 * this.luv_l * (i - Hsluv.refV)));
  }

  luvToXyz() {
    if (this.luv_l === 0) {
      this.xyz_x = 0;
      this.xyz_y = 0;
      this.xyz_z = 0;
      return;
    }
    let s = this.luv_u / (13 * this.luv_l) + Hsluv.refU;
    let t = this.luv_v / (13 * this.luv_l) + Hsluv.refV;
    this.xyz_y = Hsluv.lToY(this.luv_l);
    this.xyz_x = 0 - (9 * this.xyz_y * s) / ((s - 4) * t - s * t);
    this.xyz_z =
      (9 * this.xyz_y - 15 * t * this.xyz_y - t * this.xyz_x) / (3 * t);
  }

  luvToLch() {
    this.lch_l = this.luv_l;
    this.lch_c = Math.sqrt(this.luv_u * this.luv_u + this.luv_v * this.luv_v);
    if (this.lch_c < 1e-8) {
      this.lch_h = 0;
    } else {
      let s = Math.atan2(this.luv_v, this.luv_u);
      this.lch_h = (s * 180) / Math.PI;
      if (this.lch_h < 0) {
        this.lch_h = 360 + this.lch_h;
      }
    }
  }

  lchToLuv() {
    let s = (this.lch_h / 180) * Math.PI;
    this.luv_l = this.lch_l;
    this.luv_u = Math.cos(s) * this.lch_c;
    this.luv_v = Math.sin(s) * this.lch_c;
  }

  calculateBoundingLines(s) {
    let t = Math.pow(s + 16, 3) / 1560896;
    let i = t > Hsluv.epsilon ? t : s / Hsluv.kappa;
    let r = i * (284517 * Hsluv.m_r0 - 94839 * Hsluv.m_r2);
    let n =
      i * (838422 * Hsluv.m_r2 + 769860 * Hsluv.m_r1 + 731718 * Hsluv.m_r0);
    let c = i * (632260 * Hsluv.m_r2 - 126452 * Hsluv.m_r1);
    let o = i * (284517 * Hsluv.m_g0 - 94839 * Hsluv.m_g2);
    let e =
      i * (838422 * Hsluv.m_g2 + 769860 * Hsluv.m_g1 + 731718 * Hsluv.m_g0);
    let u = i * (632260 * Hsluv.m_g2 - 126452 * Hsluv.m_g1);
    let g = i * (284517 * Hsluv.m_b0 - 94839 * Hsluv.m_b2);
    let v =
      i * (838422 * Hsluv.m_b2 + 769860 * Hsluv.m_b1 + 731718 * Hsluv.m_b0);
    let a = i * (632260 * Hsluv.m_b2 - 126452 * Hsluv.m_b1);
    this.r0s = r / c;
    this.r0i = (n * s) / c;
    this.r1s = r / (c + 126452);
    this.r1i = ((n - 769860) * s) / (c + 126452);
    this.g0s = o / u;
    this.g0i = (e * s) / u;
    this.g1s = o / (u + 126452);
    this.g1i = ((e - 769860) * s) / (u + 126452);
    this.b0s = g / a;
    this.b0i = (v * s) / a;
    this.b1s = g / (a + 126452);
    this.b1i = ((v - 769860) * s) / (a + 126452);
  }

  calcMaxChromaHpluv() {
    let s = Hsluv.distanceFromOrigin(this.r0s, this.r0i);
    let t = Hsluv.distanceFromOrigin(this.r1s, this.r1i);
    let i = Hsluv.distanceFromOrigin(this.g0s, this.g0i);
    let r = Hsluv.distanceFromOrigin(this.g1s, this.g1i);
    let n = Hsluv.distanceFromOrigin(this.b0s, this.b0i);
    let c = Hsluv.distanceFromOrigin(this.b1s, this.b1i);
    return Hsluv.min6(s, t, i, r, n, c);
  }

  calcMaxChromaHsluv(s) {
    let t = (s / 360) * Math.PI * 2;
    let i = Hsluv.distanceFromOriginAngle(this.r0s, this.r0i, t);
    let r = Hsluv.distanceFromOriginAngle(this.r1s, this.r1i, t);
    let n = Hsluv.distanceFromOriginAngle(this.g0s, this.g0i, t);
    let c = Hsluv.distanceFromOriginAngle(this.g1s, this.g1i, t);
    let o = Hsluv.distanceFromOriginAngle(this.b0s, this.b0i, t);
    let e = Hsluv.distanceFromOriginAngle(this.b1s, this.b1i, t);
    return Hsluv.min6(i, r, n, c, o, e);
  }

  hsluvToLch() {
    if (this.hsluv_l > 99.9999999) {
      this.lch_l = 100;
      this.lch_c = 0;
    } else if (this.hsluv_l < 1e-8) {
      this.lch_l = 0;
      this.lch_c = 0;
    } else {
      this.lch_l = this.hsluv_l;
      this.calculateBoundingLines(this.hsluv_l);
      let s = this.calcMaxChromaHsluv(this.hsluv_h);
      this.lch_c = (s / 100) * this.hsluv_s;
    }
    this.lch_h = this.hsluv_h;
  }

  lchToHsluv() {
    if (this.lch_l > 99.9999999) {
      this.hsluv_s = 0;
      this.hsluv_l = 100;
    } else if (this.lch_l < 1e-8) {
      this.hsluv_s = 0;
      this.hsluv_l = 0;
    } else {
      this.calculateBoundingLines(this.lch_l);
      let s = this.calcMaxChromaHsluv(this.lch_h);
      this.hsluv_s = (this.lch_c / s) * 100;
      this.hsluv_l = this.lch_l;
    }
    this.hsluv_h = this.lch_h;
  }

  hpluvToLch() {
    if (this.hpluv_l > 99.9999999) {
      this.lch_l = 100;
      this.lch_c = 0;
    } else if (this.hpluv_l < 1e-8) {
      this.lch_l = 0;
      this.lch_c = 0;
    } else {
      this.lch_l = this.hpluv_l;
      this.calculateBoundingLines(this.hpluv_l);
      let s = this.calcMaxChromaHpluv();
      this.lch_c = (s / 100) * this.hpluv_p;
    }
    this.lch_h = this.hpluv_h;
  }

  lchToHpluv() {
    if (this.lch_l > 99.9999999) {
      this.hpluv_p = 0;
      this.hpluv_l = 100;
    } else if (this.lch_l < 1e-8) {
      this.hpluv_p = 0;
      this.hpluv_l = 0;
    } else {
      this.calculateBoundingLines(this.lch_l);
      let s = this.calcMaxChromaHpluv();
      this.hpluv_p = (this.lch_c / s) * 100;
      this.hpluv_l = this.lch_l;
    }
    this.hpluv_h = this.lch_h;
  }

  hsluvToRgb() {
    this.hsluvToLch();
    this.lchToLuv();
    this.luvToXyz();
    this.xyzToRgb();
  }

  hpluvToRgb() {
    this.hpluvToLch();
    this.lchToLuv();
    this.luvToXyz();
    this.xyzToRgb();
  }

  hsluvToHex() {
    this.hsluvToRgb();
    this.rgbToHex();
  }

  hpluvToHex() {
    this.hpluvToRgb();
    this.rgbToHex();
  }

  rgbToHsluv() {
    this.rgbToXyz();
    this.xyzToLuv();
    this.luvToLch();
    this.lchToHpluv();
    this.lchToHsluv();
  }

  rgbToHpluv() {
    this.rgbToXyz();
    this.xyzToLuv();
    this.luvToLch();
    this.lchToHpluv();
    this.lchToHpluv();
  }

  hexToHsluv() {
    this.hexToRgb();
    this.rgbToHsluv();
  }

  hexToHpluv() {
    this.hexToRgb();
    this.rgbToHpluv();
  }
}

Hsluv.hexChars = "0123456789abcdef";
Hsluv.refY = 1;
Hsluv.refU = 0.19783000664283;
Hsluv.refV = 0.46831999493879;
Hsluv.kappa = 903.2962962;
Hsluv.epsilon = 0.0088564516;
Hsluv.m_r0 = 3.240969941904521;
Hsluv.m_r1 = -1.537383177570093;
Hsluv.m_r2 = -0.498610760293;
Hsluv.m_g0 = -0.96924363628087;
Hsluv.m_g1 = 1.87596750150772;
Hsluv.m_g2 = 0.041555057407175;
Hsluv.m_b0 = 0.055630079696993;
Hsluv.m_b1 = -0.20397695888897;
Hsluv.m_b2 = 1.056971514242878;

pack.addFormula({
  name: "HsluvToHex",
  description: "Convert HSLuv to Hex",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "h",
      description: "Hue",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "s",
      description: "Saturation",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "l",
      description: "Lightness",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([h, s, l], context) {
    let color = new Hsluv();
    color.hsluv_h = h;
    color.hsluv_s = s;
    color.hsluv_l = l;
    color.hsluvToHex();
    return color.hex;
  },
});

pack.addFormula({
  name: "HexToHsluv",
  description: "Convert Hex to HSLuv",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "hex",
      description: "Hex color",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: coda.makeObjectSchema({
    properties: {
      h: {
        type: coda.ValueType.Number,
        description: "Hue",
      },
      s: {
        type: coda.ValueType.Number,
        description: "Saturation",
      },
      l: {
        type: coda.ValueType.Number,
        description: "Lightness",
      },
    },
    idProperty: "h",
  }),
  execute: async function ([hex], context) {
    let color = new Hsluv();
    color.hex = hex;
    color.hexToHsluv();
    return {
      h: color.hsluv_h,
      s: color.hsluv_s,
      l: color.hsluv_l,
    };
  },
});

pack.addFormula({
  name: "RgbToHex",
  description: "Convert RGB to Hex",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "r",
      description: "Red",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "g",
      description: "Green",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "b",
      description: "Blue",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([r, g, b], context) {
    let color = new Hsluv();
    color.rgb_r = r / 255;
    color.rgb_g = g / 255;
    color.rgb_b = b / 255;
    color.rgbToHex();
    return color.hex;
  },
});

pack.addFormula({
  name: "HexToRgb",
  description: "Convert Hex to RGB",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "hex",
      description: "Hex color",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: coda.makeObjectSchema({
    properties: {
      r: {
        type: coda.ValueType.Number,
        description: "Red",
      },
      g: {
        type: coda.ValueType.Number,
        description: "Green",
      },
      b: {
        type: coda.ValueType.Number,
        description: "Blue",
      },
    },
    idProperty: "r",
  }),
  execute: async function ([hex], context) {
    let color = new Hsluv();
    color.hex = hex;
    color.hexToRgb();
    return {
      r: Math.round(color.rgb_r * 255),
      g: Math.round(color.rgb_g * 255),
      b: Math.round(color.rgb_b * 255),
    };
  },
});

function hexToRgb(hex: string): number[] {
  return (
    hex
      .replace(/^#/, "")
      .match(/.{2}/g)
      ?.map((x) => parseInt(x, 16)) || [0, 0, 0]
  );
}

function rgbToHex(rgb: number[]): string {
  return (
    "#" + rgb.map((x) => Math.round(x).toString(16).padStart(2, "0")).join("")
  );
}

function getLuminance(hex: string): number {
  let rgb = hexToRgb(hex).map((x) => x / 255);
  rgb = rgb.map((x) =>
    x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function rotateHue(h: number, degrees: number): number {
  return (h + degrees) % 360;
}

pack.addFormula({
  name: "HpluvToHex",
  description: "Convert HPLuv to Hex",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "h",
      description: "Hue (0-360)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "p",
      description: "Percent (0-100)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "l",
      description: "Lightness (0-100)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([h, p, l], context) {
    let color = new Hsluv();
    color.hpluv_h = h;
    color.hpluv_p = p;
    color.hpluv_l = l;
    color.hpluvToHex();
    return color.hex;
  },
});

pack.addFormula({
  name: "HexToHpluv",
  description: "Convert Hex to HPLuv",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "hex",
      description: "Hex color (e.g., #FF0000)",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: coda.makeObjectSchema({
    properties: {
      h: {
        type: coda.ValueType.Number,
        description: "Hue (0-360)",
      },
      p: {
        type: coda.ValueType.Number,
        description: "Percent (0-100)",
      },
      l: {
        type: coda.ValueType.Number,
        description: "Lightness (0-100)",
      },
    },
    idProperty: "h",
  }),
  execute: async function ([hex], context) {
    let color = new Hsluv();
    color.hex = hex;
    color.hexToHpluv();
    return {
      h: color.hpluv_h,
      p: color.hpluv_p,
      l: color.hpluv_l,
    };
  },
});

// Add a utility function to generate complementary colors
pack.addFormula({
  name: "ComplementaryColor",
  description: "Generate a complementary color",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "hex",
      description: "Base hex color (e.g., #FF0000)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([hex], context) {
    let color = new Hsluv();
    color.hex = hex;
    color.hexToHsluv();
    color.hsluv_h = (color.hsluv_h + 180) % 360;
    color.hsluvToHex();
    return color.hex;
  },
});

// Color Scheme Generation

pack.addFormula({
  name: "MonochromaticScheme",
  description: "Generate a monochromatic color scheme",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "baseColor",
      description: "Base hex color (e.g., #FF0000)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "count",
      description: "Number of colors to generate",
    }),
  ],
  resultType: coda.ValueType.Array,
  items: coda.makeSchema({
    type: coda.ValueType.String,
  }),
  execute: async function ([baseColor, count], context) {
    let color = new Hsluv();
    color.hex = baseColor;
    color.hexToHsluv();
    let scheme = [];
    for (let i = 0; i < count; i++) {
      color.hsluv_l = (100 / (count - 1)) * i;
      color.hsluvToHex();
      scheme.push(color.hex as never);
    }
    return scheme;
  },
});

pack.addFormula({
  name: "AnalogousScheme",
  description: "Generate an analogous color scheme",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "baseColor",
      description: "Base hex color (e.g., #FF0000)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "count",
      description: "Number of colors to generate",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "angle",
      description: "Angle between colors (default: 30)",
    }),
  ],
  resultType: coda.ValueType.Array,
  items: coda.makeSchema({
    type: coda.ValueType.String,
  }),
  execute: async function ([baseColor, count, angle = 30], context) {
    let color = new Hsluv();
    color.hex = baseColor;
    color.hexToHsluv();
    let scheme = [color.hex];
    for (let i = 1; i < count; i++) {
      color.hsluv_h = rotateHue(color.hsluv_h, angle);
      color.hsluvToHex();
      scheme.push(color.hex);
    }
    return scheme;
  },
});

pack.addFormula({
  name: "TriadicScheme",
  description: "Generate a triadic color scheme",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "baseColor",
      description: "Base hex color (e.g., #FF0000)",
    }),
  ],
  resultType: coda.ValueType.Array,
  items: coda.makeSchema({
    type: coda.ValueType.String,
  }),
  execute: async function ([baseColor], context) {
    let color = new Hsluv();
    color.hex = baseColor;
    color.hexToHsluv();
    let scheme = [color.hex];
    for (let i = 1; i < 3; i++) {
      color.hsluv_h = rotateHue(color.hsluv_h, 120);
      color.hsluvToHex();
      scheme.push(color.hex);
    }
    return scheme;
  },
});

pack.addFormula({
  name: "TetradicScheme",
  description: "Generate a tetradic (rectangle) color scheme",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "baseColor",
      description: "Base hex color (e.g., #FF0000)",
    }),
  ],
  resultType: coda.ValueType.Array,
  items: coda.makeSchema({
    type: coda.ValueType.String,
  }),
  execute: async function ([baseColor], context) {
    let color = new Hsluv();
    color.hex = baseColor;
    color.hexToHsluv();
    let scheme = [color.hex];
    color.hsluv_h = rotateHue(color.hsluv_h, 60);
    color.hsluvToHex();
    scheme.push(color.hex);
    color.hsluv_h = rotateHue(color.hsluv_h, 120);
    color.hsluvToHex();
    scheme.push(color.hex);
    color.hsluv_h = rotateHue(color.hsluv_h, 60);
    color.hsluvToHex();
    scheme.push(color.hex);
    return scheme;
  },
});

// Color Manipulation

pack.addFormula({
  name: "AdjustBrightness",
  description: "Adjust the brightness of a color",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color",
      description: "Hex color to adjust (e.g., #FF0000)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "adjustment",
      description: "Brightness adjustment (-100 to 100)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([color, adjustment], context) {
    let hsluv = new Hsluv();
    hsluv.hex = color;
    hsluv.hexToHsluv();
    hsluv.hsluv_l = Math.max(0, Math.min(100, hsluv.hsluv_l + adjustment));
    hsluv.hsluvToHex();
    return hsluv.hex;
  },
});

pack.addFormula({
  name: "AdjustSaturation",
  description: "Adjust the saturation of a color",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color",
      description: "Hex color to adjust (e.g., #FF0000)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "adjustment",
      description: "Saturation adjustment (-100 to 100)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([color, adjustment], context) {
    let hsluv = new Hsluv();
    hsluv.hex = color;
    hsluv.hexToHsluv();
    hsluv.hsluv_s = Math.max(0, Math.min(100, hsluv.hsluv_s + adjustment));
    hsluv.hsluvToHex();
    return hsluv.hex;
  },
});

pack.addFormula({
  name: "MixColors",
  description: "Mix two colors with a given ratio",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color1",
      description: "First hex color (e.g., #FF0000)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color2",
      description: "Second hex color (e.g., #00FF00)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "ratio",
      description:
        "Mixing ratio (0 to 1, where 0 is all color1 and 1 is all color2)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([color1, color2, ratio], context) {
    let rgb1 = hexToRgb(color1);
    let rgb2 = hexToRgb(color2);
    let mixed = rgb1.map((c, i) => c * (1 - ratio) + rgb2[i] * ratio);
    return rgbToHex(mixed);
  },
});

pack.addFormula({
  name: "Tint",
  description: "Create a tint of a color (mix with white)",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color",
      description: "Hex color to tint (e.g., #FF0000)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "amount",
      description: "Tint amount (0 to 1)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([color, amount], context) {
    return this.functions.MixColors([color, "#FFFFFF", amount]);
  },
});

pack.addFormula({
  name: "Shade",
  description: "Create a shade of a color (mix with black)",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color",
      description: "Hex color to shade (e.g., #FF0000)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "amount",
      description: "Shade amount (0 to 1)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([color, amount], context) {
    return this.functions.MixColors([color, "#000000", amount]);
  },
});

// Accessibility and Contrast

pack.addFormula({
  name: "ContrastRatio",
  description: "Calculate the contrast ratio between two colors",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color1",
      description: "First hex color (e.g., #FF0000)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color2",
      description: "Second hex color (e.g., #00FF00)",
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: async function ([color1, color2], context) {
    let l1 = getLuminance(color1);
    let l2 = getLuminance(color2);
    let ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return Number(ratio.toFixed(2));
  },
});

pack.addFormula({
  name: "IsAccessible",
  description:
    "Check if a color combination meets WCAG accessibility standards",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "foreground",
      description: "Foreground hex color (e.g., #FF0000)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "background",
      description: "Background hex color (e.g., #FFFFFF)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "level",
      description: "WCAG level (AA or AAA)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "size",
      description: "Text size (large or small)",
    }),
  ],
  resultType: coda.ValueType.Boolean,
  execute: async function ([foreground, background, level, size], context) {
    let ratio = await this.functions.ContrastRatio([foreground, background]);
    if (level === "AA") {
      return size === "large" ? ratio >= 3 : ratio >= 4.5;
    } else if (level === "AAA") {
      return size === "large" ? ratio >= 4.5 : ratio >= 7;
    }
    return false;
  },
});

pack.addFormula({
  name: "SuggestTextColor",
  description: "Suggest an accessible text color for a given background color",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "backgroundColor",
      description: "Background hex color (e.g., #FF0000)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "level",
      description: "WCAG level (AA or AAA)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([backgroundColor, level], context) {
    let blackContrast = await this.functions.ContrastRatio([
      backgroundColor,
      "#000000",
    ]);
    let whiteContrast = await this.functions.ContrastRatio([
      backgroundColor,
      "#FFFFFF",
    ]);
    let threshold = level === "AAA" ? 7 : 4.5;
    if (blackContrast >= threshold && blackContrast > whiteContrast) {
      return "#000000";
    } else if (whiteContrast >= threshold) {
      return "#FFFFFF";
    } else {
      return "No sufficiently contrasting color found";
    }
  },
});

// Color Analysis

pack.addFormula({
  name: "ColorName",
  description: "Get the name of a color",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color",
      description: "Hex color (e.g., #FF0000)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([color], context) {
    const colorNames = {
      "#FF0000": "Red",
      "#00FF00": "Lime",
      "#0000FF": "Blue",
      "#FFFF00": "Yellow",
      "#FF00FF": "Magenta",
      "#00FFFF": "Cyan",
      "#000000": "Black",
      "#FFFFFF": "White",
      // Add more color names as needed
    };
    return colorNames[color.toUpperCase()] || "Unknown";
  },
});

pack.addFormula({
  name: "IsWarmOrCool",
  description: "Determine if a color is warm or cool",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color",
      description: "Hex color (e.g., #FF0000)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([color], context) {
    let hsluv = new Hsluv();
    hsluv.hex = color;
    hsluv.hexToHsluv();
    return hsluv.hsluv_h >= 30 && hsluv.hsluv_h <= 210 ? "Cool" : "Warm";
  },
});

// Advanced Color Spaces

pack.addFormula({
  name: "RGBToCMYK",
  description: "Convert RGB to CMYK",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "r",
      description: "Red value (0-255)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "g",
      description: "Green value (0-255)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "b",
      description: "Blue value (0-255)",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: coda.makeObjectSchema({
    properties: {
      c: { type: coda.ValueType.Number },
      m: { type: coda.ValueType.Number },
      y: { type: coda.ValueType.Number },
      k: { type: coda.ValueType.Number },
    },
  }),
  execute: async function ([r, g, b], context) {
    let c = 1 - r / 255;
    let m = 1 - g / 255;
    let y = 1 - b / 255;
    let k = Math.min(c, m, y);
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return { c, m, y, k };
  },
});

pack.addFormula({
  name: "CMYKToRGB",
  description: "Convert CMYK to RGB",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "c",
      description: "Cyan value (0-1)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "m",
      description: "Magenta value (0-1)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "y",
      description: "Yellow value (0-1)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "k",
      description: "Key (Black) value (0-1)",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: coda.makeObjectSchema({
    properties: {
      r: { type: coda.ValueType.Number },
      g: { type: coda.ValueType.Number },
      b: { type: coda.ValueType.Number },
    },
  }),
  execute: async function ([c, m, y, k], context) {
    let r = 255 * (1 - c) * (1 - k);
    let g = 255 * (1 - m) * (1 - k);
    let b = 255 * (1 - y) * (1 - k);
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  },
});

// Gradients

pack.addFormula({
  name: "LinearGradient",
  description: "Generate a linear gradient between two colors",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color1",
      description: "Start color (hex)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color2",
      description: "End color (hex)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "steps",
      description: "Number of color steps",
    }),
  ],
  resultType: coda.ValueType.Array,
  items: coda.makeSchema({
    type: coda.ValueType.String,
  }),
  execute: async function ([color1, color2, steps], context) {
    let rgb1 = hexToRgb(color1);
    let rgb2 = hexToRgb(color2);
    let gradient = [];
    for (let i = 0; i < steps; i++) {
      let ratio = i / (steps - 1);
      let r = Math.round(rgb1[0] * (1 - ratio) + rgb2[0] * ratio);
      let g = Math.round(rgb1[1] * (1 - ratio) + rgb2[1] * ratio);
      let b = Math.round(rgb1[2] * (1 - ratio) + rgb2[2] * ratio);
      gradient.push(rgbToHex([r, g, b]) as never);
    }
    return gradient;
  },
});

// Color Blindness Simulation

function simulateColorBlindness(rgb: number[], type: string): number[] {
  // Simulation matrices from https://www.color-blindness.com/coblis-color-blindness-simulator/
  const matrices = {
    protanopia: [
      [0.567, 0.433, 0],
      [0.558, 0.442, 0],
      [0, 0.242, 0.758],
    ],
    deuteranopia: [
      [0.625, 0.375, 0],
      [0.7, 0.3, 0],
      [0, 0.3, 0.7],
    ],
    tritanopia: [
      [0.95, 0.05, 0],
      [0, 0.433, 0.567],
      [0, 0.475, 0.525],
    ],
  };

  const matrix = matrices[type];
  return [
    rgb[0] * matrix[0][0] + rgb[1] * matrix[0][1] + rgb[2] * matrix[0][2],
    rgb[0] * matrix[1][0] + rgb[1] * matrix[1][1] + rgb[2] * matrix[1][2],
    rgb[0] * matrix[2][0] + rgb[1] * matrix[2][1] + rgb[2] * matrix[2][2],
  ].map(Math.round);
}

pack.addFormula({
  name: "SimulateColorBlindness",
  description: "Simulate how a color appears to people with color blindness",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color",
      description: "Hex color to simulate",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "type",
      description:
        "Type of color blindness (protanopia, deuteranopia, or tritanopia)",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([color, type], context) {
    let rgb = hexToRgb(color);
    let simulatedRgb = simulateColorBlindness(rgb, type);
    return rgbToHex(simulatedRgb);
  },
});
// Color Harmony
pack.addFormula({
  name: "EvaluateColorHarmony",
  description: "Evaluate the harmony of a color combination",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color1",
      description: "First hex color",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "color2",
      description: "Second hex color",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([color1, color2], context) {
    let hsluv1 = new Hsluv();
    let hsluv2 = new Hsluv();
    hsluv1.hex = color1;
    hsluv2.hex = color2;
    hsluv1.hexToHsluv();
    hsluv2.hexToHsluv();
    let hueDiff = Math.abs(hsluv1.hsluv_h - hsluv2.hsluv_h);
    if (hueDiff > 180) hueDiff = 360 - hueDiff;
    if (hueDiff < 30) return "Analogous (harmonious)";
    if (Math.abs(hueDiff - 180) < 30) return "Complementary (high contrast)";
    if (Math.abs(hueDiff - 120) < 30) return "Triadic (balanced)";
    if (Math.abs(hueDiff - 90) < 30) return "Square (vibrant)";
    return "Discordant (use with caution)";
  },
});

pack.addColumnFormat({
  name: "ColorPreview",
  instructions: "Displays color preview(s) based on the cell's hex value(s)",
  formulaName: "ColorPreviewFormatter",
  matchers: [
    new RegExp("#[0-9A-Fa-f]{6}"),
    new RegExp("#[0-9A-Fa-f]{6}(,\\s*#[0-9A-Fa-f]{6})*"), // Matches comma-separated hex colors
  ],
});

pack.addFormula({
  name: "ColorPreviewFormatter",
  description: "Formats a cell with color preview(s) based on its hex value(s)",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "input",
      description: "The hex color value or comma-separated list of hex color values",
    }),
  ],
  resultType: coda.ValueType.String,
  codaType: coda.ValueHintType.ImageReference,
  execute: async function ([input], context) {
    // Function to validate and normalize hex color
    function normalizeColor(hex) {
      hex = hex.trim().replace(/^#/, '');
      if (!/^[0-9A-Fa-f]{3,6}$/.test(hex)) {
        console.warn(`Skipping invalid hex color: #${hex}`);
        return null;
      }
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      if (hex.length < 6) {
        hex = hex.split('').map(char => char + char).join('');
      }
      return '#' + hex;
    }

    // Function to generate SVG for a single color
    function generateColorSVG(hex) {
      const normalizedHex = normalizeColor(hex);
      if (!normalizedHex) return null;
      return `
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" fill="${normalizedHex}" />
        </svg>
      `.trim();
    }

    let colors = input.split(',');
    let validSvgs = colors.map(generateColorSVG).filter(svg => svg !== null);

    if (validSvgs.length === 0) {
      throw new coda.UserVisibleError("No valid colors found. Please use 3 or 6-digit hex color codes (e.g., #RGB or #RRGGBB).");
    }

    let svg;
    if (validSvgs.length > 1) {
      // Handle multiple colors
      svg = `
        <svg viewBox="0 0 ${validSvgs.length * 22} 20" xmlns="http://www.w3.org/2000/svg">
          ${validSvgs.map((colorSvg, index) => 
            `<g transform="translate(${index * 22}, 0)">${colorSvg}</g>`
          ).join('')}
        </svg>
      `.trim();
    } else {
      // Handle single color
      svg = validSvgs[0];
    }

    // Encode the markup as base64
    let encoded = Buffer.from(svg).toString("base64");

    // Return the SVG as a data URL
    return coda.SvgConstants.DataUrlPrefix + encoded;
  },
});