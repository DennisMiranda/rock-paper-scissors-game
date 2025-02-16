const Rock= 0;
const Paper = 1;
const Scissors= 2;

const Tie = 0;
const Win = 1;
const Lost = 2;

const rockBtn= document.getElementById("rock");
const paperBtn= document.getElementById("paper");
const scissorsBtn= document.getElementById("scissors");

rockBtn.addEventListener("click",() =>{
    play(Rock);
});
paperBtn.addEventListener("click",() =>{
    play(Paper);
});
scissorsBtn.addEventListener("click",() =>{
    play(Scissors);
});
function play(userOption){
    const machineOption= Math.floor(Math.random() * 3);
    const result= calcResultado(userOption,machineOption);

        switch(result){
            case Tie: 
            alert(machineOption + "Tie");
            break;
            case Win: 
            alert(machineOption + "Win");
            break;
            case Lost: 
            alert(machineOption + "Lost");
            break;
        }
}
function calcResultado(userOption, machineOption){
    if (userOption=== machineOption){
        return Tie;

    }else  if (userOption=== Rock) {
        if (machineOption=== Paper) return Lost;
        if (machineOption=== Scissors) return Win;
    }
    else  if (userOption=== Paper) {
        if (machineOption===Scissors) return Lost;
        if (machineOption=== Rock) return Win;
    
    }else  if (userOption=== Scissors){
        if (machineOption===Rock ) return Lost;
        if (machineOption=== Paper) return Win;
    }

}