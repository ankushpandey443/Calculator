var openLinkedIn = document.querySelector(".container > .leftside > .bar > svg");
var closeLinkedIn =document.querySelector(".overlay > svg");
var overlay = document.querySelector(".overlay");
openLinkedIn.addEventListener("click",()=>{
    overlay.classList.add("showlinkedin");
})
closeLinkedIn.addEventListener("click",()=>{
    overlay.classList.remove("showlinkedin");
})
const controlls = document.querySelectorAll(".controlls>div");
var result=document.querySelector(".visual>.current");
var prenum=document.querySelector(".visual>.previousnum");
var presymbol=document.querySelector(".visual>.currentsymbol");
var record = document.querySelector(".history");
const maxdigit = 11;
var numa=0,numb=null;
var operation;
var secondturn = false;
var twoNum=false;

function addNumber(num){
    if(secondturn){
        result.textContent="";
        prenum.textContent=String(numa);
        if(num==="."){
            result.textContent="0";
            secondturn=false;
            return;
        }
        result.textContent=result.textContent+num;
        secondturn=false;
        return;
    }
    if(result.textContent.length>=maxdigit)return
    if(!(result.textContent==="0" && Number(num)===0)){
        if(result.textContent==="0"&&num!=="."){
            result.textContent="";
        }
        result.textContent=result.textContent+String(num);
    }
}
function backspace(){
    if(result.textContent=="0")return
    if(result.textContent.length===1){
        result.textContent="0";
        return
    }
    result.textContent=result.textContent.substring(0,result.textContent.length-1);
}
//clear just current number that is entered
function clear(){
    result.textContent="0";
}
// used for cleaning after binaryOperation
function clearExtra(flag){
    prenum.textContent="";
    if(flag)presymbol.textContent="";
}
//used for cleanup after urarny operation and equal operation
function normalClean(){
    operation=null;
    twoNum=false;
}
// clears everthing start from start
function clearFull(){
numa=0;
numb=null;
operation=null;
secondturn=false;
twoNum=false;
result.textContent="0"
prenum.textContent="";
presymbol.textContent="";
}

function setOperation(op){
    operation=op;
    presymbol.textContent=op;
    if(op.length>2)return;
    secondturn=true;
    twoNum=true;
    
}
function setHistory(fnum,op,temp,lnum=null){
    console.log(record.textContent);
    if(record.textContent=="There is no history yet"){
        record.innerHTML="";
    }
    if(lnum==null){
        record.innerHTML=record.innerHTML+"Number ="+String(fnum)+"<br>";
        record.innerHTML=record.innerHTML+"Operation ="+String(op)+"<br>";
        record.innerHTML=record.innerHTML+"Result ="+String(temp)+"<br>";
        record.innerHTML=record.innerHTML+"<hr>";
    }else{
        record.innerHTML=record.innerHTML+"Number a="+String(fnum)+"<br>";
        record.innerHTML=record.innerHTML+"Number b="+String(lnum)+"<br>";
        record.innerHTML=record.innerHTML+"Operation ="+String(op)+"<br>";
        record.innerHTML=record.innerHTML+"Result ="+String(temp)+"<br>";
        record.innerHTML=record.innerHTML+"<hr>";
    }
}
function binaryOperation(fnum,lnum,op){
    var temp;
    switch (op){
        case "%":
            temp=fnum%lnum;
            break;
            case "÷":
                temp=fnum/lnum;
                break;
            case "✕":
                temp=fnum*lnum;
                break;
            case "—":
                temp=fnum-lnum;
                break;
            case "+":
                temp=fnum+lnum;
                break;
            case "\\":
                temp=lnum/fnum;
                break;
            default:
                alert("error in binary operation");
        }
    numb=null;
    setHistory(fnum,op,temp,lnum);
    return temp
}
                           
function uranryOperation(fnum,op){
    var temp;
    switch (op){
        case "inverse":
            if(fnum==0){
                alert("cannot find inverse of Zero");
                return;
            }else{
                temp=1/fnum;
            }
        break;
        case "square":
            temp=fnum**2;
        break;
        case "Sqrt(x)":
            temp=Math.sqrt(fnum);
        break;
        default:
            alert("wrong uranry operation");
    }
numb=null;
setHistory(fnum,op,temp);
return temp;
}
controlls.forEach((element)=>{
    element.addEventListener("click",(e)=>{
        var num=e.currentTarget.children[0].innerText;
        if(Number(num)>=0 && Number(num) <= 9 ||num==="." ){
            addNumber(num);
        }else if(e.currentTarget.id=="backspace"){
            backspace();
        }else if(e.currentTarget.id=="clear"){
            clear();
        }else if(e.currentTarget.id=="clearfull"){
            clearFull();
        }else if(e.currentTarget.children[0].textContent==="%"){
            if(twoNum){
                numb=Number(result.textContent);
                var temp=binaryOperation(numa,numb,operation);
                result.textContent=temp;
                numa=temp;
                twoNum=false;
               setOperation(e.currentTarget.children[0].textContent);
                clearExtra(0);
                return;
            }
            numa=Number(result.textContent);
            setOperation(e.currentTarget.children[0].textContent);
        }else if(e.currentTarget.children[0].textContent==="÷"){
            if(twoNum){
                numb=Number(result.textContent);
                if(numb==0 && operation=="÷"){
                    alert("cannot divide by zero")
                    return;
                }
                var temp=binaryOperation(numa,numb,operation);
                result.textContent=temp;
                numa=temp;
                twoNum=false;
                setOperation(e.currentTarget.children[0].textContent);
                clearExtra(0);
                return;
            }
            numa=Number(result.textContent);
            setOperation(e.currentTarget.children[0].textContent);
        }else if(e.currentTarget.children[0].textContent==="✕"){
            if(twoNum){
                numb=Number(result.textContent);
                var temp=binaryOperation(numa,numb,operation);
                result.textContent=temp;
                numa=temp;
                twoNum=false;
                setOperation(e.currentTarget.children[0].textContent);
                clearExtra(0);
                return;
            }
            numa=Number(result.textContent);
            setOperation(e.currentTarget.children[0].textContent);
        }else if(e.currentTarget.children[0].textContent==="—"){
            if(twoNum){
                numb=Number(result.textContent);
                var temp=binaryOperation(numa,numb,operation);
                result.textContent=temp;
                numa=temp;
                twoNum=false;
                setOperation(e.currentTarget.children[0].textContent);
                clearExtra(0);
                return;
            }
            numa=Number(result.textContent);
            setOperation(e.currentTarget.children[0].textContent);
        }else if(e.currentTarget.children[0].textContent==="+"){
            if(twoNum){
                numb=Number(result.textContent);
                var temp=binaryOperation(numa,numb,operation);
                result.textContent=temp;
                numa=temp;
                twoNum=false;
                setOperation(e.currentTarget.children[0].textContent);
                clearExtra(0);
                return;
            }
            numa=Number(result.textContent);
            setOperation(e.currentTarget.children[0].textContent);
        }else if(e.currentTarget.children[0].textContent==="\\"){
            if(twoNum){
                numb=Number(result.textContent);
                var temp=binaryOperation(numa,numb,operation);
                result.textContent=temp;
                numa=temp;
                twoNum=false;
                setOperation(e.currentTarget.children[0].textContent);
                clearExtra(0);
                return;
            }
            numa=Number(result.textContent);
            setOperation(e.currentTarget.children[0].textContent);
        }else if(e.currentTarget.children[0].textContent==="1/x"){
            if(twoNum){
                numb=Number(result.textContent);
                var temp=binaryOperation(numa,numb,operation);
                result.textContent=String(temp);
                numa=temp;
                twoNum=false;
                clearExtra(1);
            }else if(!twoNum&&numb==null&&operation==="inverse"){
                numa=Number(result.textContent)
               var temp = uranryOperation(numa,"inverse");
               result.textContent=String(temp);
               clearExtra(1);
            }
            setOperation("inverse");
        }else if(e.currentTarget.id==="square"){
            if(twoNum){
                numb=Number(result.textContent);
                var temp=binaryOperation(numa,numb,operation);
                result.textContent=String(temp);
                numa=temp;
                twoNum=false;
                clearExtra(1);
            }else if(!twoNum&&numb==null&&operation=="square"){
                numa=Number(result.textContent)
               var temp = uranryOperation(numa,"square");
               result.textContent=String(temp);
               clearExtra(1);
            }
            setOperation("square");
        }else if(e.currentTarget.children[0].textContent==="Sqrt(x)"){
            if(twoNum){
                numb=Number(result.textContent);
                var temp=binaryOperation(numa,numb,operation);
                result.textContent=String(temp);
                numa=temp;
                twoNum=false;
                clearExtra(1);
            }else if(!twoNum&&numb==null&&operation=="Sqrt(x)"){
                numa=Number(result.textContent)
               var temp = uranryOperation(numa,"Sqrt(x)");
               result.textContent=String(temp);
               clearExtra(1);
            }
            setOperation("Sqrt(x)");
        }else if(e.currentTarget.children[0].textContent==="="){
            if(twoNum){
                numb=Number(result.textContent);
                var temp=binaryOperation(numa,numb,operation);
                result.textContent=String(temp);
                numa=null;
                twoNum=false;
                secondturn=false;
                operation=null;
                clearExtra(1);
                return;
            }
            if(operation.length>2){
                numa=Number(result.textContent);
                var temp=uranryOperation(numa,operation);
                result.textContent=String(temp);
                numa=null;
                twoNum=false;
                secondturn=false;
                operation=null;
                clearExtra(1);
            }
        }
    })
})
