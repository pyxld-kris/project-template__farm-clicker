import Phaser from "phaser";
import GoldBank from "../classes/GoldBank.js";
import ShopMenu from "../classes/ShopMenu.js";
import Carrot from "../classes/Carrot.js";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    // Start UIScene, which will layer on top of PlayScene
    this.scene.run("UIScene");

    let halfGameWidth = this.game.config.width / 2;
    let halfGameHeight = this.game.config.height / 2;

    // Create background
    this.sky = this.add.sprite(halfGameWidth, halfGameHeight, "background");

    this.goldBank = new GoldBank(
      this,
      halfGameWidth - halfGameWidth / 2,
      this.game.config.height - halfGameHeight / 6
    );

    // Button to open shopping menu
    this.openShopButton = this.add
      .sprite(
        halfGameWidth + halfGameWidth / 2,
        this.game.config.height - halfGameHeight / 6,
        "open-shop-button"
      )
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        new ShopMenu(this);
      });

    this.gardenZone = this.add.zone(22, 57, 206, 58, 0xff0000).setOrigin(0, 0);

    // Create initial carrots
    for (let i = 0; i < 10; i++) {
      new Carrot(this);
    }

    const camera = this.cameras.main;
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
  }

  update(time, delta) {}
}
