import RngController from '../scripts/RngController';
import generateAnswer from '../scripts/RngController';
import Machine from './slots/Machine';


const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  @property(cc.Node)
  machine = null;


  @property({ type: cc.AudioClip })
  audioClick = null;

  private block = false;

  private result = null;


  @property
numberOfTexures: number =0;


  start(): void 
  {
    this.machine.getComponent('Machine').createMachine();
    

  }

  update(): void {
    if (this.block && this.result != null) 
    {
      this.informStop();
      this.result = null;
    }
  }

  click(): void {
    cc.audioEngine.playEffect(this.audioClick, false);

    if (this.machine.getComponent('Machine').spinning === false) 
    {
      this.block = false;
      this.machine.getComponent('Machine').spin();
      this.requestResult();
    } 
    else if (!this.block) 
    {
      this.block = true;
      this.machine.getComponent('Machine').lock();
    }
  }

  async requestResult(): Promise<void> 
  {
    this.result = null;
    this.result = await this.getAnswer();
  }

  getAnswer(): Promise<Array<Array<number>>> 
  {

    //if time allows
    //replace random for  //https://css-tricks.com/choose-an-random-option-based-on-a-range/
    let rand = Math.floor(Math.random() * 100); 
    let slotResult = this.FillMatrix(rand);

    return new Promise<Array<Array<number>>>(resolve => 
      {
      setTimeout(() => {
         resolve(slotResult); 
      }, 
      1000 + 500 * Math.random());
    }
    );

  }

  informStop(): void {
  
    const resultRelayed = this.result;
    this.machine.getComponent('Machine').stop(resultRelayed);
  }

  
public RandomizeWinner()
{

  return  Math.floor(Math.random() * 29);;
}


  public FillMatrix(porc: number)
  {
   let numberOfReel = 5;
   let numberLines = 3;
   let matrix = [];
    let linha = [];

    let rand ;
    let randWin = this.RandomizeWinner();


    for (let i = 0 ;i <numberOfReel;i++)
    {
      matrix.push([]);
    }
    
    if(porc <50) 
    {
     
      for (let i = 0 ;i <numberOfReel;i++)
      {

        for(let j = 0; j < numberLines ;j++)
          {       
           rand = Math.floor(Math.random() * 29);
           matrix[i].push(rand); 
          }

      }      
    }  
    else if( porc >50 && porc < 83)
    {

     
  
      let randLine =  Math.floor(Math.random() * 2);


      for (let i = 0 ;i <numberOfReel;i++)
      {

        for(let j = 0; j < numberLines ;j++)
          {   
            if(randLine == j)
            {
              matrix[i].push(randWin);  
            }   
            else
            {
              rand = Math.floor(Math.random() * 29);
              matrix[i].push(rand);   
            }            
              
          }
      }
      this.machine.getComponent('Machine').SaveWinCondition(1,new cc.Vec2(randLine,0));
      

    }
    else if(porc > 83 && porc < 93)
    {


      let randLine =  Math.floor(Math.random() * 2);
      let WinLines = [];
      for (let i = 0 ;i <numberOfReel;i++)
      {

        for(let j = 0; j < numberLines ;j++)
          {       
            if(randLine != j)
            {
              matrix[i].push(randWin);  
            }   
            else
            {
              rand = Math.floor(Math.random() * 29);
              matrix[i].push(rand);
              WinLines.push(j);   
            }            
              
          }
      }  
      this.machine.getComponent('Machine').SaveWinCondition(2,new cc.Vec2(WinLines[0],WinLines[1]));

    }
    else
    {
      console.log("  93 maior ");
      rand = Math.floor(Math.random() * 29);
      for (let i = 0 ;i <numberOfReel;i++)
      {                
        for(let j = 0; j < numberLines ;j++)
          {       
           matrix[i].push(randWin); 
          }
      }  

      this.machine.getComponent('Machine').SaveWinCondition(3,new cc.Vec2(0,0));
    }



   return matrix;
  
  }
  
}
