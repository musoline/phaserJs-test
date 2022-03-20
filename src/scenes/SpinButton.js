import Phaser, { Game } from "phaser";

export default class SpinButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, img) {
    super(scene, x, y);

    this.active = true;
    this.SpinImg = scene.add.image(0, 0, img).setTint(0xff0000);
    this.add(this.SpinImg);

    this.setSize(this.SpinImg.width, this.SpinImg.height);
    this.setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        console.log("In");
        this.SpinImg.setScale(0.9);
        console.log((this.SpinImg.tintFill = 1));
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        console.log("Out");
        this.SpinImg.setScale(1);
      });
  }

  preload() {}

  create() {}

  update(state) {
    setTimeout(() => {
      this.active = state;
      if (!this.active) {
        this.setAlpha(0.5);
      } else {
        this.setAlpha(1);
      }
    }, 100);
  }
}
