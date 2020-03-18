import Phaser from "phaser";

export default class GoldBank {
  constructor(scene, x, y, style) {
    // GoldBank is composed of a sprite oject and a text object

    this.scene = scene;

    // Coin sprite stuff
    this.coin = scene.add.sprite(x - 12, y, "coin");

    // Set our default style here, and allow the passed in style parameter to overwrite any of these
    style = style ? style : {};
    style.fontSize = style.fontSize ? style.fontSize : "32px";
    style.fontFamily = style.fontFamily ? style.fontFamily : '"Press Start 2P"';
    style.align = style.align ? style.align : "center";
    style.fill = style.fill ? style.fill : "#fff";
    style.padding = style.padding ? style.padding : { x: 1, y: 1 };
    style.backgroundColor = style.backgroundColor
      ? style.backgroundColor
      : "transparent";

    this.text = scene.add
      .text(x, y + 1, "0", style)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5) // Makes text more crisp
      .setDepth(100); // Keeps text in front of other objects

    this.balance = 0;
    this.balanceIncrementAmount = 2;
    //this.start();
  }

  modifyBalance(amount) {
    this.balance += amount;
    this.updateDisplay();
  }

  modifyBalanceIncrementer(amount) {
    this.balanceIncrementAmount += amount;
  }

  stop() {
    this.timer.remove();
  }
  start() {
    // Set up a phaser timer to increment this display every 1 second
    this.timer = this.scene.time.addEvent({
      delay: 1000, // ms
      callback: this.updateDisplay,
      //args: [],
      callbackScope: this,
      loop: true
    });
  }

  updateDisplay() {
    //this.balance += this.balanceIncrementAmount;
    this.text.setText(this.balance);
  }

  destroy() {
    // Call this object's parent class destroy method
    super.destroy();
  }
}
