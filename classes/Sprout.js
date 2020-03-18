import Phaser from "phaser";

export default class Sprout extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, growsIntoClass) {
    super(scene, x, y, "sprout");
    this.scene = scene;
    this.growsIntoClass = growsIntoClass; // What kind of object should create in place of this, when it has fully grown?

    // Add to rendering engine
    scene.add.existing(this).setDepth(2);

    let gardenZone = scene.gardenZone;
    this.setRandomPosition(
      gardenZone.x,
      gardenZone.y,
      gardenZone.width,
      gardenZone.height
    );

    // Create timer to simulate this crop growing over time
    this.timer = this.scene.time.addEvent({
      delay: parseInt(5000 + Math.random() * 30000), // ms
      callback: this.cropFullyGrown,
      //args: [],
      callbackScope: this,
      loop: false
    });
  }

  cropFullyGrown() {
    new this.growsIntoClass(this.scene, this.x, this.y);
    this.destroy();
  }

  destroy() {
    // Call this object's parent class destroy method
    super.destroy();
  }
}
