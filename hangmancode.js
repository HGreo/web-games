var wordCollection = ["Apple","Beach","Brain","Bread","Brush","Chair","Chest","Chord","Click","Clock","Cloud","Dance","Diary","Drink","Earth","Flute","Fruit","Ghost","Grape","Green","Happy","Heart","House","Juice","Light","Money","Music","Party","Pizza",
"Plant","Radio","River","Salad","Sheep","Shoes","Smile","Snack","Snake","Spice","Spoon","Storm","Table","Toast","Tiger","Train","Water","Whale","Wheel","Woman","World","Write","Youth","Abyss","Ample","Ankle","Aroma","Aural","Began","Blunt","Braid","Brisk","Bumpy","Chive","Clasp","Crave","Crest",
"Cumin","Drape","Dregs","Dumpy","Dusky","Dwell","Elite","Ember","Enact","Evade","Evoke","Fable","Flair","Fluke","Folly","Gauze","Giddy","Gloom","Gorge","Gusty","Haste","Hilly","Hippy","Hovel","Hunch","Icily","Inept","Inert","Irate","Ivory","Jaded","Jazzy","Jolly","Joust","Jumpy","Kinky","Knack",
"Knave","Knead","Kudos","Lanky","Latch","Lolly","Lurid","Mirth","Moody","Mourn","Mower","Muggy","Nanny","Nappy","Nerve","Nifty","Nudge","Olive","Onset","Oomph","Ounce","Ovals","Peppy","Pious","Pique","Plush","Poise","Quail","Quake","Quell","Quill","Quirk","Ravel","Reedy","Ruddy","Runic","Sable",
"Spicy","Stilt","Swath","Swirl","Toast","Tonic","Triad","Tryst","Tweak"]
var word = wordCollection[Math.floor(Math.random()*wordCollection.length)].toUpperCase()
var wordcopy = word
var cellSequence = 0;
var rowSequence = 0;
var time = 300
var timer = 1
var checkstart = 0
var userGuess = []
var sequence = [
    ["row1cell1","row1cell2","row1cell3","row1cell4","row1cell5"],
    ["row2cell1","row2cell2","row2cell3","row2cell4","row2cell5"],
    ["row3cell1","row3cell2","row3cell3","row3cell4","row3cell5"],
    ["row4cell1","row4cell2","row4cell3","row4cell4","row4cell5"],
    ["row5cell1","row5cell2","row5cell3","row5cell4","row5cell5"]
]

function disablebuttons(){//before the user presses the start button, the game doesnt start
    var divs = document.getElementById("keyboard")
    var buttons = divs.getElementsByTagName("button")
    for(button of buttons){
        button.disabled=true
    }
}

function reablebuttons(){//when start button is clicked, game starts
    var divs = document.getElementById("keyboard")
    var buttons = divs.getElementsByTagName("button")
    for(button of buttons){
        button.disabled=false
    }
}

function fillin(){//fill in the guessing cells and push the letter into the list for checking
    document.getElementById(sequence[rowSequence][cellSequence]).innerText = event.srcElement.value
    userGuess.push(event.srcElement.innerText)
    if(cellSequence!=5){
        cellSequence += 1
    }
    else{
        cellSequence == 5
    }
}

function checkWin(){//if the last guess the user took make up the word, than user wins; else the guessing times reaches the limit, user loses
    if(document.getElementById(sequence[rowSequence-1][0]).innerHTML+document.getElementById(sequence[rowSequence-1][1]).innerHTML+document.getElementById(sequence[rowSequence-1][2]).innerHTML+document.getElementById(sequence[rowSequence-1][3]).innerHTML+document.getElementById(sequence[rowSequence-1][4]).innerHTML==word){
        pauseAudio("sound")
        playAudio("victory")
        window.alert("You win!")
        window.location.reload()
    }
    else if(rowSequence==5){
        pauseAudio("sound")
        playAudio("losing")
        window.alert("You failed! The word is "+word.toLowerCase())
        window.location.reload()
    }
}

function del(){//take the letter out from cells and list
    document.getElementById(sequence[rowSequence][cellSequence-1]).innerText = " "
    userGuess.splice(-1,1)
    if (cellSequence!=0){
        cellSequence -= 1
    }
    else{
        cellSequence = 0
    }   
}

function enter(){//using 3 for loops to determine the cell color and the keyboard color
    if(cellSequence==5){
        for(var i=0;i<5;i++){//fill in the green ones first
            if(userGuess[i]==wordcopy.charAt(i)){
                document.getElementById(sequence[rowSequence][i]).style.backgroundColor= "#6acf64"
                document.getElementById(userGuess[i]).style.backgroundColor = "#6acf64"   
                wordcopy=wordcopy.replace(userGuess[i],"*") //mark the correct letter checked
            }
        }
        for(var a=0;a<5;a++){//yellow ones
            if(wordcopy.charAt(a)=="*"){//if the letter is decided green, then skip it
                continue
            }
            else if(wordcopy.includes(userGuess[a])){
                document.getElementById(sequence[rowSequence][a]).style.backgroundColor="gold"
                if(document.getElementById(userGuess[a]).style.backgroundColor == "rgb(106, 207, 100)"){//if the key already has a color, than skip; 黄色显示不出来
                    continue
                }
                else{
                    document.getElementById(userGuess[a]).style.backgroundColor = "gold"
                    wordcopy=wordcopy.replace(userGuess[a],"!") 
                }         
            }
        } 
        for(var z=0;z<5;z++){//red ones
                if(document.getElementById(sequence[rowSequence][z]).style.backgroundColor == "rgb(106, 207, 100)"||document.getElementById(sequence[rowSequence][z]).style.backgroundColor == "gold"){//if key is neither green nor yellow, then make both cell and key red
                      continue
                }
                else{
                    document.getElementById(sequence[rowSequence][z]).style.backgroundColor = "gray"  
                    if(document.getElementById(userGuess[z]).style.backgroundColor == "rgb(106, 207, 100)"||document.getElementById(userGuess[z]).style.backgroundColor == "gold"){//if key is neither green nor yellow, then make both cell and key red
                        continue
                  }
                    document.getElementById(userGuess[z]).style.backgroundColor = "gray" 
                }
            }
        rowSequence+=1
        cellSequence=0
        userGuess=[]
        wordcopy=word//initialize the variable
    }
    else{
        window.alert("Please enter a five letter word!")
    }
}

function timerTask(){//limited time for user 
        if(time<30&&time>10){
            document.getElementById("display").style.color="gold"
        }
        else if(time<10){
            document.getElementById("display").style.color="crimson"
            document.getElementById("display").style.fontWeight="bold"
        }
        if(time == 0){
            playAudio("losing")
            window.alert("Time's Up! The word is "+word)
            time = 300
            window.location.reload()
        }
        else{
            time= time - timer;
        }
        var minutes = Math.floor(time / 60)
        var seconds = time - (minutes * 60)
        if(seconds < 10){
            document.getElementById("display").innerHTML = "Remaining Time: " + minutes+":0"+seconds;
        }
        else{
            document.getElementById("display").innerHTML = "Remaining Time: " + minutes+":"+seconds;
        }
}

function start(){//starting button to start the game
    var starting = document.createElement("button")
    starting.innerText = "Click me to start!"
    starting.style.borderRadius= "1em"
    starting.style.backgroundColor = "black"
    starting.style.color = "white"
    starting.style.fontFamily = "Bebas Neue"
    starting.style.letterSpacing = "3px"
    starting.style.fontSize = "25px"
    starting.onclick=function time(){setInterval(timerTask,1000)
                                    starting.hidden=true//hide the button when game starts
                                    reablebuttons()
                                    playAudio("sound")}
    document.getElementById("placeforstart").appendChild(starting)
}

function playAudio(id){
    var playaudio = document.getElementById(id)
    playaudio.play()
}

function pauseAudio(id){
    var stopAudio = document.getElementById(id)
    stopAudio.pause()
}