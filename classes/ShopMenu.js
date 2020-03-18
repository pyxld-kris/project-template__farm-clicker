import Phaser from "phaser";
import Sprout from "../classes/Sprout.js";
import Carrot from "../classes/Carrot.js";
import Potato from "../classes/Potato.js";

export default class ShopMenu extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    let halfGameWidth = scene.game.config.width / 2;
    let halfGameHeight = scene.game.config.height / 2;

    // Add to rendering engine
    scene.add.existing(this).setDepth(1000);

    // Background
    this.add(scene.add.sprite(halfGameWidth, halfGameHeight + 10, "shop-menu"));

    // exit button
    this.add(
      scene.add
        .sprite(236, 35, "exit-button")
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          this.destroy();
        })
    );

    /* Create zones to detect when items are clicked in the menu */

    // Carrot input
    this.add(
      scene.add
        .zone(55, 60, 50, 20, 0xff0000) // Change zone to rectangle for easy positioning
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          let goldBank = this.scene.goldBank;
          if (goldBank.balance >= Carrot.COST) {
            goldBank.modifyBalance(-1 * Carrot.COST);
            new Sprout(this.scene, 0, 0, Carrot); // create carrot in garden
            this.destroy(); // close menu
          }
        })
    );

    // Potato input
    this.add(
      scene.add
        .zone(55, 87, 50, 20, 0xff0000) // Change zone to rectangle for easy positioning
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          let goldBank = this.scene.goldBank;
          if (goldBank.balance >= Potato.COST) {
            goldBank.modifyBalance(-1 * Potato.COST);
            new Sprout(this.scene, 0, 0, Potato); // create carrot in garden
            this.destroy(); // close menu
          }
        })
    );

    // Toilet paper input
    this.add(
      scene.add
        .zone(55, 114, 50, 20, 0xff0000) // Change zone to rectangle for easy positioning
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          alert("clicked toilet paper");
        })
    );
  }

  destroy() {
    super.destroy();
    /*
    this.carrotInput.destroy();
    this.potatoInput.destroy();
    this.toiletPaperInput.destroy();

    this.background.destroy();
    this.exitButton.destroy();
    */
  }
}
