var playerTurn
var winner
var restart = document.createElement("button")
restart.textContent="Click to Restart!"
restart.style.margin="0px 0px 0px 100px"
restart.style.borderRadius="1em"
restart.style.backgroundColor="grey"
restart.style.color="white"
restart.style.fontWeight="bold"
restart.style.fontFamily="Roboto Slab"
restart.style.width="100px"
restart.style.height="50px"
restart.style.fontSize="13px"
restart.onclick=function refresh(){window.location.reload()}
function start(){
  playerTurn = "X"
  winner = ""
}

function chooseSquare(){
  document.getElementById(event.srcElement.id).value=playerTurn
  document.getElementById(event.srcElement.id).disabled=true
  if (playerTurn == "X"){
    playerTurn = "O"
    document.getElementById("footer").innerHTML="It's Player "+playerTurn+"'s turn!"
  }
  else{
    playerTurn = "X"
    document.getElementById("footer").innerHTML="It's Player "+playerTurn+"'s turn!"
  }
}

function disableButtons(){
  document.getElementById("button1").disabled = true
  document.getElementById("button2").disabled = true
  document.getElementById("button3").disabled = true
  document.getElementById("button4").disabled = true
  document.getElementById("button5").disabled = true
  document.getElementById("button6").disabled = true
  document.getElementById("button7").disabled = true
  document.getElementById("button8").disabled = true
  document.getElementById("button9").disabled = true
  document.getElementById("footer").appendChild(restart)
}

function checkWin(){
  var button1check=document.getElementById("button1").value
  var button2check=document.getElementById("button2").value
  var button3check=document.getElementById("button3").value
  var button4check=document.getElementById("button4").value
  var button5check=document.getElementById("button5").value
  var button6check=document.getElementById("button6").value
  var button7check=document.getElementById("button7").value
  var button8check=document.getElementById("button8").value
  var button9check=document.getElementById("button9").value
  if(button1check=="X"&&button2check=="X"&&button3check=="X"){
    winner="X"
    document.getElementById("button1").style.backgroundColor="lightgreen"
    document.getElementById("button2").style.backgroundColor="lightgreen"
    document.getElementById("button3").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()

  }
  else if(button4check=="X"&&button5check=="X"&&button6check=="X"){
    winner="X"
    document.getElementById("button4").style.backgroundColor="lightgreen"
    document.getElementById("button5").style.backgroundColor="lightgreen"
    document.getElementById("button6").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button7check=="X"&&button8check=="X"&&button9check=="X"){
    winner="X"
    document.getElementById("button7").style.backgroundColor="lightgreen"
    document.getElementById("button8").style.backgroundColor="lightgreen"
    document.getElementById("button9").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button1check=="X"&&button4check=="X"&&button7check=="X"){
    winner="X"
    document.getElementById("button1").style.backgroundColor="lightgreen"
    document.getElementById("button4").style.backgroundColor="lightgreen"
    document.getElementById("button7").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button2check=="X"&&button5check=="X"&&button8check=="X"){
    winner="X"
    document.getElementById("button2").style.backgroundColor="lightgreen"
    document.getElementById("button5").style.backgroundColor="lightgreen"
    document.getElementById("button8").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button3check=="X"&&button6check=="X"&&button9check=="X"){
    winner="X"
    document.getElementById("button3").style.backgroundColor="lightgreen"
    document.getElementById("button6").style.backgroundColor="lightgreen"
    document.getElementById("button9").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button1check=="X"&&button5check=="X"&&button9check=="X"){
    winner="X"
    document.getElementById("button1").style.backgroundColor="lightgreen"
    document.getElementById("button5").style.backgroundColor="lightgreen"
    document.getElementById("button9").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button3check=="X"&&button5check=="X"&&button7check=="X"){
    winner="X"
    document.getElementById("button3").style.backgroundColor="lightgreen"
    document.getElementById("button5").style.backgroundColor="lightgreen"
    document.getElementById("button7").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button1check=="0"&&button2check=="0"&&button3check=="0"){
    winner="O"
    document.getElementById("button1").style.backgroundColor="lightgreen"
    document.getElementById("button2").style.backgroundColor="lightgreen"
    document.getElementById("button3").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button4check=="O"&&button5check=="O"&&button6check=="O"){
    winner="O"
    document.getElementById("button4").style.backgroundColor="lightgreen"
    document.getElementById("button5").style.backgroundColor="lightgreen"
    document.getElementById("button6").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button7check=="O"&&button8check=="O"&&button9check=="O"){
    winner="O"
    document.getElementById("button7").style.backgroundColor="lightgreen"
    document.getElementById("button8").style.backgroundColor="lightgreen"
    document.getElementById("button9").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button1check=="O"&&button4check=="O"&&button7check=="O"){
    winner="O"
    document.getElementById("button1").style.backgroundColor="lightgreen"
    document.getElementById("button4").style.backgroundColor="lightgreen"
    document.getElementById("button7").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button2check=="O"&&button5check=="O"&&button8check=="O"){
    winner="O"
    document.getElementById("button2").style.backgroundColor="lightgreen"
    document.getElementById("button5").style.backgroundColor="lightgreen"
    document.getElementById("button8").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button3check=="O"&&button6check=="O"&&button9check=="O"){
    winner="O"
    document.getElementById("button3").style.backgroundColor="lightgreen"
    document.getElementById("button6").style.backgroundColor="lightgreen"
    document.getElementById("button9").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button1check=="O"&&button5check=="O"&&button9check=="O"){
    winner="O"
    document.getElementById("button1").style.backgroundColor="lightgreen"
    document.getElementById("button5").style.backgroundColor="lightgreen"
    document.getElementById("button9").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
  }
  else if(button3check=="O"&&button5check=="O"&&button7check=="O"){
    winner="O"
    document.getElementById("button3").style.backgroundColor="lightgreen"
    document.getElementById("button5").style.backgroundColor="lightgreen"
    document.getElementById("button7").style.backgroundColor="lightgreen"
    document.getElementById("footer").innerHTML="Player "+winner+" has won!"
    disableButtons()
    
  }
  else if(button1check!=" "&&button2check!=" "&&button3check!=" "&&button4check!=" "&&button5check!=" "&&button6check!=" "&&button7check!=" "&&button8check!=" "&&button9check!=" "){
    document.getElementById("button1").style.backgroundColor="red"
    document.getElementById("button2").style.backgroundColor="red"
    document.getElementById("button3").style.backgroundColor="red"
    document.getElementById("button4").style.backgroundColor="red"
    document.getElementById("button5").style.backgroundColor="red"
    document.getElementById("button6").style.backgroundColor="red"
    document.getElementById("button7").style.backgroundColor="red"
    document.getElementById("button8").style.backgroundColor="red"
    document.getElementById("button9").style.backgroundColor="red"
    document.getElementById("footer").innerHTML="It is a tie!"
    disableButtons()
  }
}