import Phaser, { Game } from "phaser";

export default class CheatTool extends Phaser.GameObjects.Container {
  constructor(scene, x, y, imgB, imgI) {
    super(scene, x, y);

    this.closed = true;
    this.stops = ["A", "A", "A"];
    this.interval;

    this.CheatTool = scene.add.image(0, 0, imgB);
    this.cimcim = scene.add.text(0, 0, "|", { fontSize: "36px" }).setAlpha(0);

    this.CheatToolInput1 = scene.add.image(-120, -30, imgI);
    this.CheatToolInput1Text = scene.add.text(-132, -50, "1", {
      fontSize: "40px",
      align: "center",
    });

    console.log(this.CheatToolInput1Text.x, this.CheatToolInput1Text.width / 2);

    this.CheatToolInput1.setInteractive().on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
      () => {
        this.setIndex(this.CheatToolInput1, this.CheatToolInput1Text, scene, 0);
      }
    );

    this.CheatToolInput2 = scene.add.image(0, -30, imgI);
    this.CheatToolInput2Text = scene.add.text(-12, -50, "1", {
      fontSize: "40px",
    });
    this.CheatToolInput2.setInteractive().on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
      () => {
        this.setIndex(this.CheatToolInput2, this.CheatToolInput2Text, scene, 1);
      }
    );
    this.CheatToolInput3 = scene.add.image(120, -30, imgI);
    this.CheatToolInput3Text = scene.add.text(108, -50, "1", {
      fontSize: "40px",
    });
    this.CheatToolInput3.setInteractive().on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
      () => {
        this.setIndex(this.CheatToolInput3, this.CheatToolInput3Text, scene, 2);
      }
    );
    this.tools = scene.add.text(-165, 85, "Tools", {
      fontSize: "24px",
    });
    this.arr = scene.add.text(-60, 85, "▼", { fontSize: "24px" });
    this.CheatToolText = scene.add.text(
      -200,
      -100,
      "Enter SYMBOL POSITION IN THE REEL 1-6",
      {
        fontSize: "24px",
      }
    );

    let btn = scene.add
      .sprite(-180, 95)
      .setInteractive({
        hitArea: new Phaser.Geom.Rectangle(0, 0, 170, 50),
        hitAreaCallback: Phaser.Geom.Rectangle.Contains,
        useHandCursor: true,
      })
      .setSize(170, 50);

    this.add(this.CheatTool);
    this.add(this.CheatToolText);
    this.add(this.CheatToolInput1);
    this.add(this.CheatToolInput1Text);
    this.add(this.CheatToolInput2);
    this.add(this.CheatToolInput2Text);
    this.add(this.CheatToolInput3);
    this.add(this.CheatToolInput3Text);
    this.add(btn);
    this.add(this.arr);
    this.add(this.tools);

    this.add(this.cimcim);

    btn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      !this.closed ? this.close() : this.open();
    });
    this.setSize(this.CheatTool.width, this.CheatTool.height);

    if (this.closed) {
      this.close();
    }
  }

  close() {
    this.closed = true;
    this.y = this.y - 210;
    this.arr.flipY = false;
  }

  open() {
    this.closed = false;
    this.y = this.y + 210;
    this.arr.flipY = true;
  }

  setIndex(line, text, scene, key) {
    clearInterval(this.interval);
    scene.input.keyboard.removeAllListeners("keydown");
    text.setText("");
    this.cimcim.setAlpha(0);

    this.cimcim.x = line.x - 10;
    this.cimcim.y = line.y - 19;
    this.interval = setInterval(() => {
      this.cimcim.alpha ? this.cimcim.setAlpha(0) : this.cimcim.setAlpha(1);
    }, 500);
    let res = 0;
    scene.input.keyboard.once("keydown", (Events) => {
      switch (Events.key) {
        case "1":
          res = 1;
          break;
        case "2":
          res = 2;
          break;
        case "3":
          res = 3;
          break;
        case "4":
          res = 4;
          break;
        case "5":
          res = 5;
          break;
        case "6":
          res = 6;
          break;
        case "7":
          res = 7;
          break;
        default:
          res = "A";
          break;
      }
      clearInterval(this.interval);
      this.cimcim.setAlpha(0);
      text.setText(res);
      this.stops[key] = res;
      console.log(this.stops);
    });
  }

  preload() {}

  create() {}

  update() {
    if (this.key1.isDown) {
      console.log("ღ1");
    }
  }
}
