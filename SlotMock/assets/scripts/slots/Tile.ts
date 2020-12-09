const { ccclass, property } = cc._decorator;

@ccclass
export default class Tile extends cc.Component {
  @property({ type: [cc.SpriteFrame], visible: true })
  private textures = [];
  @property
  winnerTile:boolean = false;


  async onLoad(): Promise<void> {
    await this.loadTextures();
  }

  async resetInEditor(): Promise<void> {
    await this.loadTextures();
    this.setRandom();
  }

  async loadTextures(): Promise<boolean> {
    const self = this;
    return new Promise<boolean>(resolve => {
      cc.loader.loadResDir('gfx/Square', cc.SpriteFrame, function afterLoad(err, loadedTextures) {
        self.textures = loadedTextures;
        resolve(true);
      });
    });
  }

  setTile(index: number, winner:boolean): void {
    this.node.getComponent(cc.Sprite).spriteFrame = this.textures[index];
  }

  setRandom(): void {
    //random number beeing generated
    const randomIndex = Math.floor(Math.random() * this.textures.length);
    this.setTile(randomIndex,false);
  }


  setWinner(win: boolean): void{
    this.winnerTile = win;
  } 


  TriggerWinEffect(): void
  {
    console.log("Run Effect here");
   //trigger Win effect
  } 






}
