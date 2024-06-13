
let theme = document.getElementById('themeIcon')
let QuestionNum = document.getElementById('Qnum');
let imgDiv = document.querySelector('.img-screen');
let QuestArea = document.getElementById('quest');
let nextBtnClick = document.getElementById('next-btn');
let backBtnClick = document.getElementById('back-btn');
let checkBtnClick = document.getElementById('check-btn');
let againBtnClick = document.getElementById('again-btn');
let imgQuestion = document.getElementById('QuestCover');
let answersArea = document.querySelector('#answers');
let answerIn = document.getElementsByName('answer-inp');
let answerChange = document.getElementsByClassName('AnswerPara');
let checked = document.getElementById('nextBackButton');
let svgImg = document.getElementById('svg-img');
let checkButton = document.getElementById('checkButton');
let againButton = document.getElementById('againButton');

let result = document.getElementById('result');
let resultText = document.getElementById('result-text');
let message = document.getElementById('message');
let messageText = document.getElementById('message-text');
let answerLabel = document.getElementsByClassName('myLabel');
let aswerLabelAll = document.querySelectorAll('label')
let themeIcon = document.getElementById('themeIcon');
let heart = document.getElementsByClassName('fa-solid fa-heart');
let heartDiv = document.getElementById('heart');
let heartsAr = document.getElementById('heartsAria');
let heartIcName = document.getElementsByName('heart-icon-name');

let timeCount = document.getElementById('time-count');
let timeCountAria = document.getElementById('time-count-aria');

fetch('Quiz.json').then(function (resp) {
    return resp.json()
}).then(function (data) {
         Question(data);
         Answers(data);   
         QuestImg(data);
         nextBtnClickF(data)
         backBtnClickF(data)
         checkBtnClickF(data);
}).catch(function (err) {
    console.error('failed to load data try again !')
})

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'Quiz.json', true);
// xhr.onload = function() {
//     if (xhr.status === 200) {
//         var data = JSON.parse(xhr.responseText);
//         Question(data);
//         Answers(data);   
//         QuestImg(data);
//         nextBtnClickF(data)
//         backBtnClickF(data)
//         checkBtnClickF(data);

//     }
// };
// xhr.send();
function QuestImg(data){
    imgQuestion.src = data[`Q1`][`img`];
};

theme.addEventListener('click', function (){
    document.body.classList.toggle('lightDark');
    let i = 1;
    themeIcon.className = themeIcon.className === 'fa-solid fa-sun' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';

});


function Question(data){
    QuestionNum.innerHTML = '# ' + data['Q1']['Qnumber'];
    QuestArea.innerHTML = data[`Q1`][`Question`];
};


let y = 1;
let ty = 0; 
let time;






function Answers(data){
    for (let i = 1; i <= 3; i++){
        let AnswerLi = document.createElement('li');
        
        let AnswerInput = document.createElement('input');
        AnswerInput.id = `answer-name-${i}`;
        AnswerInput.name = 'answer-inp';
        AnswerInput.type = 'radio';
        AnswerInput.dataset.Answer = data[`Q${y}`][`Answer-${i}`];

        let AnswerP = document.createElement('p');
        let AnswerTxt = document.createTextNode(data['Q1'][`Answer-${i}`]);
        AnswerP.className = 'AnswerPara';
        AnswerP.appendChild(AnswerTxt);

        let AnswerLabel = document.createElement('label');
        AnswerLabel.id = `lab${i}`;
        AnswerLabel.className = 'myLabel';
        AnswerLabel.htmlFor = `answer-name-${i}`;
        AnswerLabel.appendChild(AnswerP);
        
        AnswerLi.append(AnswerInput , AnswerLabel);
        
            answersArea.appendChild(AnswerLi);
        }
};

for(let h = 1; h <= 5; h++){
    let Ci = document.createElement('i');
    Ci.id = "heart-icon";
    Ci.className = 'fa-solid fa-heart' ;
    Ci.setAttribute('name', 'heart-icon-name')
    heartDiv.appendChild(Ci)
}

        

function checkBtnClickF(data){
    checkBtnClick.addEventListener('click',  function (){


        for(let i = 0; i < 3; i++ ){

            if(answerIn[i].checked && answerIn[i].dataset.Answer === data[`Q${y}`]['RightAnswer']){
                setTimeout(()=>{


                    resultText.innerHTML = 'True'
                    checked.style.display = 'flex';
                    checkButton.style.display = 'none';
                    result.style.translate = '0%';
                    message.style.translate = '-200%';

                    svgImg.className = "fa-regular fa-circle-check"
                    svgImg.style.color = 'green';
                    answerLabel[i].style.border = 'solid 2px var(--checkButton)'
                    answerIn[i].style.accentColor = 'var(--checkButton)'

                }, 500)}else if(answerIn[i].checked && ty === 4){
                    againButton.style.display = 'none';
                    checkButton.style.display = 'none';
                    result.style.translate = '100%';
                    svgImg.className = "fa-regular fa-circle-xmark"
                    svgImg.style.color = 'rgb(146, 22, 22)';
                    answerLabel[i].style.border = 'solid 2px rgb(141, 30, 30)'
                    answerIn[i].style.accentColor = 'rgb(141, 30, 30)'
                    heartIcName[ty].className = 'fa-regular fa-heart'
                    ty += 1          
                    message.style.translate = '-100%';
                    messageText.innerHTML = 'لقد انتهت عدد المخاولات ';

                }else if(answerIn[i].checked){



                    againButton.style.display = 'flex';
                    resultText.innerHTML = 'False'
                    checkButton.style.display = 'none';
                    result.style.translate = '0%';
                    message.style.translate = '-200%';

                    svgImg.className = "fa-regular fa-circle-xmark"
                    svgImg.style.color = 'rgb(146, 22, 22)';
                    answerLabel[i].style.border = 'solid 2px rgb(141, 30, 30)'
                    answerIn[i].style.accentColor = 'rgb(141, 30, 30)'
                    heartIcName[ty].className = 'fa-regular fa-heart'
                    ty++
                    if(ty === 1){
                        time = 11
                        let timeRe = setInterval(() => {
                            time--;
                            timeCount.innerHTML = time
                            if(ty === 0 && time === 0){
                                clearInterval(timeRe)
                            }else if(time === 0){
                            ty--
                            heartIcName[ty].className = "fa-solid fa-heart";
                            time = 11;
                            if(ty === 0){
                                time = 0
                                clearInterval(timeRe)

                            }
                        }
                        }, 1000)

                    }
               }
        }
    })
}



function nextBtnClickF(data){
    
    nextBtnClick.addEventListener('click',  function(){
            if(y < Object.keys(data).length){
            setTimeout(()=>{
                y += 1;
                QuestionNum.innerHTML = '# 0' +  y;
                QuestArea.innerHTML = data[`Q${y}`]['Question'];
                imgQuestion.src = data[`Q${y}`]['img'];
                result.style.translate = '100%';
                checked.style.display = 'none';
                checkButton.style.display = 'flex'
                for(let i = 0; i < 3; i++ ){
                    answerLabel[i].style.border = 'solid 2px rgba(0, 128, 0, 0)'
                    answerLabel[i].style.borderRadius = "7px"
                    answerIn[i].style.accentColor = 'rgb(37, 37, 37)'


                }


                for(let a = 0; a < 3; a++){
                    answerChange[a].innerHTML = data[`Q${y}`][`Answer-${a + 1}`];
                    answerIn[a].dataset.Answer = data[`Q${y}`][`Answer-${a + 1}`];

                }

    

            }, 500)}else if(y === Object.keys(data).length){
                window.location.reload()
            }
        })

};

function backBtnClickF(data){

    backBtnClick.addEventListener('click',  function(){
        if(y < Object.keys(data).length){
            setTimeout(()=>{
                y -= 1;
                QuestionNum.innerHTML = '# 0' +  y;
                QuestArea.innerHTML = data[`Q${y}`]['Question'];
                imgQuestion.src = data[`Q${y}`]['img'];
                result.style.translate = '100%';
                for(let i = 0; i < 3; i++ ){
                    answerLabel[i].style.border = 'solid 2px rgba(0, 128, 0, 0)';
                    answerLabel[i].style.borderRadius = "7px"
                    answerIn[i].style.accentColor = 'rgb(37, 37, 37)'
    
                }
                for(let a = 0; a < 3; a++){
                    answerChange[a].innerHTML = data[`Q${y}`][`Answer-${a + 1}`];
                }


            }, 500)}else if(y === 1){
                window.location.reload()

            }

        })

};


    againBtnClick.addEventListener('click', function (){
    
        setTimeout(()=>{
            if(ty === heartIcName.length ){
                result.style.translate = '100%';
                againButton.style.display = 'none';

            }else{

                againButton.style.display = 'none'
                checkButton.style.display = 'flex';
                result.style.translate = '100%';

            }


        }, 500)


    })

    heartDiv.addEventListener('click', () => {
        timeCountAria.style.display = 'flex'
        heartDiv.style.display = 'none'
        setTimeout(() => {
        timeCountAria.style.display = 'none'
        heartDiv.style.display = 'flex'
        }, 5000)
    })


