import Phaser from "phaser";
import background from "./public/background.png";
import SpinButton from "./scenes/SpinButton.js";
import spinImg from "./public/Spin.png";
import CheatTool from "./scenes/CheatTool.js";

import cherry from "./public/cherry.png";
import banana from "./public/banana.png";
import blackberry from "./public/blackberry.png";

import win from "./public/Win.png";

import CheatToolBackground from "./public/CheatToolBackground.png";
import CheatToolInput from "./public/CheatToolInput.png";

// import banana from './public/banana.png'
// import blackberry from './public/blackberry.png'
// import cherry from './public/cherry.png'

class MiniSlot extends Phaser.Scene {
  constructor() {
    super({ key: "MiniSlot", active: true });
  }

  preload() {
    this.load.image("background", background);
    this.load.image("spin", spinImg);
    this.load.image("bigWin", win);

    this.load.image("cherry", cherry);
    this.load.image("banana", banana);
    this.load.image("blackberry", blackberry);

    this.load.image("CTB", CheatToolBackground);
    this.load.image("CTI", CheatToolInput);
  }

  create() {
    this.add.image(960, 540, "background");
    this.bigWin = this.add.image(960, 200, "bigWin");
    this.playTime = false;

    this.bigWin.setAlpha(0);

    this.results = [];

    const debug = this.add.graphics();

    const button = new SpinButton(this, 960, 950, "spin");
    const cheatTool = new CheatTool(this, 230, 130, "CTB", "CTI");

    const line1 = this.add.container(398, 293);
    const line2 = this.add.container(798, 293);
    const line3 = this.add.container(1184, 293);

    line1.setSize(345, 460);
    line2.setSize(345, 460);
    line3.setSize(345, 460);

    const imgArr = ["cherry", "banana", "blackberry"];
    line1.add(this.generate(line1, imgArr));
    line2.add(this.generate(line2, imgArr));
    line3.add(this.generate(line3, imgArr));
    //  აქამდე ვარ

    debug.fillStyle(0xff0000, 0.2);
    debug.fillRect(398, 293, 345, 460);
    debug.fillRect(790, 293, 345, 460);
    debug.fillRect(1180, 293, 345, 460);

    const shape1 = this.make.graphics().fillRect(398, 293, 345, 460);
    const shape2 = this.make.graphics().fillRect(790, 293, 345, 460);
    const shape3 = this.make.graphics().fillRect(1180, 293, 345, 460);
    const lineShape1 = shape1.createGeometryMask();
    const lineShape2 = shape2.createGeometryMask();
    const lineShape3 = shape3.createGeometryMask();
    line1.setMask(lineShape1);
    line2.setMask(lineShape2);
    line3.setMask(lineShape3);
    this.add.existing(button);
    this.add.existing(cheatTool);

    let reels = this.playLine([line1, line2, line3], button, cheatTool);

    // let playing = this.tweens.add({
    //   targets: line1,
    //   y: 3093,
    //   duration: 30000,
    //   repeat: -1,
    //   onStart: function () {
    //     console.log("Start");
    //   },
    //   onComplete: function () {
    //     console.log(this.data);

    //     console.log(line1.y);
    //   },
    //   onStop: function () {
    //     let elem = Math.floor((this.data[0].current - 293) / 400);
    //     elem = (elem + 1) % 8;
    //     let stop = 293 + 400 * elem;
    //     console.log(this.data[0].target.list[elem].texture.key);
    //     this.data[0].target.y = stop;
    //   },
    // });

    button
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        if (button.active) {
          button.update(false);

          this.results = [];
          //   this.playTime = !this.playTime;
          //   console.log(this.playTime, "Start");
          let min = 1000;
          let max = 3000;

          if (!cheatTool.closed) {
            min = 2000;
          }
          let [...times] = [
            this.getRndTime(min, 3000),
            this.getRndTime(min, 3000),
            this.getRndTime(min, 3000),
          ];
          times.sort((a, b) => a - b);
          reels.forEach((element, key) => {
            element.play();
            setTimeout(function () {
              element.stop();
            }, times[key]);
          });
        }
      });
  }

  update() {}

  getRndTime(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  playLine(lines, button, cheatTool) {
    let reels = lines.map((line, key) => {
      let a = this.tweens.add({
        targets: line,
        y: 3093,
        duration: 200,
        repeat: -1,
        onStart: function () {},
        onComplete: function () {
          let elem = Math.floor((this.data[0].current - 293) / 400);
        },
        onStop: function () {
          let elem;

          if (typeof cheatTool.stops[key] === "number" && !cheatTool.closed) {
            elem = cheatTool.stops[key];
          } else {
            elem = Math.floor((this.data[0].current - 293) / 400);
            elem = (elem + 1) % 8;
          }
          console.log("უნდა გაჩერდეს", elem);
          let stop = 293 + 400 * elem;
          console.log(this.data[0].target.list[elem].texture.key);
          this.data[0].target.y = stop;

          if (!button.active) {
            game.scene.scenes[0].results.push(
              this.data[0].target.list[elem].texture.key
            );
          }

          if (key == 2 && button.active === false) {
            button.update(true);
            game.scene.scenes[0].checkResults(button);
          }
        },
      });
      a.stop();
      return a;
    });
    return reels;
  }
  checkResults(button) {
    console.log(this.results);

    if (
      this.results[0] === this.results[1] &&
      this.results[1] === this.results[2]
    ) {
      console.log("Big WIN");
      button.update(false);
      this.bigWin.setAlpha(1);
      //   this.bigWin = active;
      setTimeout(() => {
        button.update(true);
        this.bigWin.setAlpha(0);
      }, 2000);
    }
  }
  generate(cont, list) {
    let fruits = [];

    for (let index = 0; index < 8; index++) {
      let xLoc = cont.width / 2;
      let yLoc = cont.height / 2 - index * 400;
      let imgIndex = Math.floor(Math.random() * 3) + 0;
      let fr;
      if (index == 7) {
        fr = this.add.sprite(xLoc, yLoc, fruits[0].texture.key);
      } else {
        fr = this.add.sprite(xLoc, yLoc, list[imgIndex]);
      }
      fruits.push(fr);
    }

    return fruits;
  }
}
const config = {
  type: Phaser.CANVAS,
  parent: "phaser-example",
  backgroundColor: "#FFFFFF",
  width: 1920,
  height: 1080,
  scene: [MiniSlot],
};

const game = new Phaser.Game(config);
