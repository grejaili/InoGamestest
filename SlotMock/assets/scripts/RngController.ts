// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html




 export  default  class RngController 
{



    
   public  generateAnswer(): Promise<Array<Array<number>>>
    {
        return new Promise<Array<Array<number>>>(resolve => 
            
            {
            setTimeout(() => {
               resolve( [[1,1,1],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]); 
            }, 
            1000 + 500 * Math.random());
        });
          
    }

}
