import Phaser from "phaser";

export default class Carrot extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "carrot");
    this.scene = scene;

    // Add to rendering engine
    scene.add.existing(this);

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
      this.scene.goldBank.modifyBalance(Carrot.VALUE);
      this.destroy();
    });

    //this.scene.goldBank.modifyBalanceIncrementer(2);
  }

  destroy() {
    //this.scene.goldBank.modifyBalanceIncrementer(-2);

    // Call this object's parent class destroy method
    super.destroy();
  }
}

Carrot.COST = 2;
Carrot.VALUE = 5;
