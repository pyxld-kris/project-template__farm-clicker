import Phaser from "phaser";

export default class Potato extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "potato");
    this.scene = scene;

    // Add to rendering engine
    scene.add.existing(this).setDepth(2);

    if (x === undefined && y === undefined) {
      let gardenZone = scene.gardenZone;
      this.setRandomPosition(
        gardenZone.x,
        gardenZone.y,
        gardenZone.width,
        gardenZone.height
      );
    }

    // Make sure to render things in the correct order, so crops don't stack strangly
    this.setDepth(this.y);

    this.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
      this.scene.goldBank.modifyBalance(Potato.VALUE);
      this.destroy();
    });

    //this.scene.goldBank.modifyBalanceIncrementer(5);
  }

  destroy() {
    //this.scene.goldBank.modifyBalanceIncrementer(-5);

    // Call this object's parent class destroy method
    super.destroy();
  }
}

Potato.COST = 50;
Potato.VALUE = 200;
