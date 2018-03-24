const COLOR = 0xb39866;

export default class Mod {
  constructor() {
    this.init.apply(this, arguments);

    return this;
  }

  init(option) {
    let self = this;

    self.option = Object.assign({
        gap: 20, // 偏移最大间距差
        rate: 12, // 移动幅度
        x: 0,
        y: 0,
        z: 0,
        scale: 90,
        color: COLOR
    }, option);


    self.flag = true; // 正负方向偏移标记

    // 创建模型
    self.geometry = new THREE.BoxGeometry(0.5, 100, 0.5);
    // 创建材质
    self.material = new THREE.MeshLambertMaterial({
      color: self.option.color,
      ambient: self.option.color
    });

    // 生成模型
    let mesh = new THREE.Mesh(self.geometry, self.material);

    // 旋转方向
    let xr = 90 / 180 * Math.PI;
    let s = self.option.scale;
    mesh.scale.set(s, s * 10, s);
    mesh.rotation.set(xr, 0, 0);

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
    let string2 = self.mesh;

    let x = self.option.x;
    let gap = self.option.gap;
    let rate = self.option.rate;

    let pos = string2.position;

    if (self.flag) {
      pos.x += rate;
    } else {
      pos.x -= rate;
    }

    if (pos.x < x - gap || pos.x > x + gap) {
      self.flag = !self.flag;
    }

  }
};
