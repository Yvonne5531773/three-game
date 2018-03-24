// 模型 json 数据
import { hammer } from '../../asset/jsons/hammer.js'
const HARMMER_JSON = hammer;

export default class Mod {
  constructor() {
    this.init.apply(this, arguments);

    return this;
  }

  init(option) {
    let self = this;

    self.option = Object.assign({
      gap: 45, // 旋转最大幅度
      rate: 3, // 旋转幅度 (角度)
      x: 0,
      y: 0,
      z: 0,
      xr: 0, // 初始角度
      yr: 0, // 初始角度
      zr: 0, // 初始角度
      scale: 90
    }, option);

    // 转换角度
    self.option.gap = self.parseAngle(self.option.gap);
    self.option.rate = self.parseAngle(self.option.rate);
    self.option.xr = self.parseAngle(self.option.xr);
    self.option.yr = self.parseAngle(self.option.yr);
    // self.option.zr = self.parseAngle(self.option.zr);

    self.flag = true; // 正负方向偏移标记
    self.count = 0; // 记录变换次数

    // 解析模型数据, 返回模型&材质
    let modelLoader = new THREE.JSONLoader();
    let obj = modelLoader.parse(HARMMER_JSON, 'hammer');
    self.geometry = obj.geometry;
    self.materials = obj.materials;

    // 生成模型
    let mesh = new THREE.Mesh(self.geometry, self.materials[0]);

    // 旋转方向
    let s = self.option.scale;
    mesh.scale.set(s, s, s);

    let xr = self.option.xr;
    let yr = self.option.yr;
    let zr = self.option.zr;

    // 防止死锁
    if (zr === 90 || zr === 270) {
      zr += 1;
    }

    zr = self.parseAngle(zr);

    mesh.rotation.set(xr, yr, zr);

    // 设置位移
    let x = self.option.x;
    let y = self.option.y;
    let z = self.option.z;
    mesh.position.set(x, y, z);

    self.mesh = mesh;
  }

  // 步进动画
  anim() {
    let self = this;
    let hammer = self.mesh;

    let xr = self.option.xr;
    let zr = self.option.zr;

    let gap = self.option.gap;
    let rate = self.option.rate;

    let rotation = hammer.rotation;

    if (self.flag) {
      hammer.rotateX(-rate);
    } else {
      hammer.rotateX(rate);
    }

    if (zr >= 90 && zr < 270) {
      if (rotation.x >= xr + gap || rotation.x <= xr) {
        self.flag = !self.flag;
        self.count++;
      }
    } else {
      if (rotation.x >= xr || rotation.x <= xr - gap) {
        self.flag = !self.flag;
        self.count++;
      }
    }

    if (self.count > 1) {
      self.anim = () => {};
      return;
    }
  }

  parseAngle(angle) {
    return angle / 180 * Math.PI;
  }
};
