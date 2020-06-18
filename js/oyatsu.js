'use strict';
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const fin = document.getElementById('fin');
  const toResult = document.getElementById('toResult');
  // const scoreLabel = document.querySelector('#result>p');
  // -----------------↓タイマー---------------------
  const timer = document.getElementById('timer');
  // -----------------↓スコア❤---------------------
  const scoreHeart = document.getElementById('score❤');
  var test;
  
  // //クリックエフェクト
  document.body.addEventListener("click", drop, false);
  function drop(e) {
    //座標の取得
    var x = e.pageX;
    var y = e.pageY;
    //しずくになるdivの生成、座標の設定
        var sizuku = document.createElement("div");
        sizuku.style.top = y + "px";
        sizuku.style.left = x + "px";
        document.body.appendChild(sizuku);
        //アニメーションをする className を付ける
        sizuku.className = "sizuku";
        //アニメーションが終わった事を感知してしずくを remove する
        sizuku.addEventListener("animationend", function() {
          this.parentNode.removeChild(this);
        }, false);
      }

      //-----------おやつあてゲーム---------
if(window.location.href.endsWith('play.html')){//あそび画面に居たら

  fin.addEventListener('touchstart', ()=>{
    fin.onclick= location.href="index.html";
  });
  // -----------------↓タイマー---------------------
  let startTime;
  let timeoutId;
  let timeLimit = 6*1000 ;
  
    //タイマーのカウントダウン関数
    function countDown(){
      const d = new Date(startTime + timeLimit - Date.now());
      const s = String(d.getSeconds()).padStart(1,'0');
      
      timer.textContent = `${s}`;
      timeoutId = setTimeout(()=>{countDown();}, 10);
      
      //タイマーリセット条件・タイムオーバー処理
      if(isAnswered){//選択肢押したら
        clearTimeout(timeoutId);//タイマー停止。
        timer.textContent = "5";//タイマー表示を5に戻す。
      }else if(timer.textContent === "0"){//5秒経ったら
        clearTimeout(timeoutId);//タイマー停止。
        isAnswered = true;//選択肢を押せなくなる。
        btn.classList.remove("disabled");//「つぎ」を押せるようにする。
        
      }     
    }

    // -----------------↑タイマー---------------------  
    const timer_next = document.getElementById('timer_next');
    const quiz=['img/L_dog.png','img/R_dog.png','img/L_dog.png','img/R_dog.png'];
    const answer= ['左手','右手',];
    const scoreHeartList = ['img/score0.png','img/score1.png', 'img/score2.png', 'img/score3.png',];
    
    let currentNum = 0; //今何問目？
    let isAnswered;
    let score = 0;
    let shuffled_quiz;//問題がでるたびに再代入していく。
    
    //犬画像シャッフル関数
    const shuffle = ([...quiz])=>{
      for(let i = quiz.length - 1; i > 0; i--){//1.0
        const j = Math.floor(Math.random()*(i+1));//1.0
        [quiz[i],quiz[j]] = [quiz[j],quiz[i]];
      }
      return quiz;
    }

    function setQuiz(){//クイズ表示関数
      isAnswered = false;
      question.classList.remove('oyatsu_toLR');

      startTime = Date.now();//タイマースタート
      countDown();
      
      shuffled_quiz = (shuffle(quiz)[currentNum]);//再代入
      
      console.log(shuffled_quiz);
      
      question.src = shuffled_quiz;//問題画像表示
      
      while(choices.firstChild){//他問題の選択肢表示は全消去
        choices.removeChild(choices.firstChild);
      }
      
      answer.forEach(choice=>{//各選択肢に対して
        
        const li= document.createElement('li');//liをつくる
        
        li.textContent = choice;//liの文章に選択肢の文章を代入する。
        
        li.addEventListener('click', ()=>{//選択肢がクリックされたら...
          checkAnswer(li);
        });
        
        choices.appendChild(li);//ulの下にliを追加する。
        
        
      });
      
      if(currentNum === quiz.length - 2){//三問終了済
        btn.classList.add('disabled');//「つぎ」押せなくする。
      }
    }

    function doQuiz(){//img変更⇒反転版にimg変更⇒setQuiz()
      question.classList.add('oyatsu_toLR');
      question.src = "img/oyatsu_toL_dog.png";
      setTimeout(function(){
        question.src = "img/oyatsu_toR_dog.png";
        setTimeout(function(){
          question.classList.add('transration');
          setTimeout(setQuiz,500);
        }, 1000);
      },1000)
    }

    doQuiz();

    // setQuiz();//出題
    
    function checkAnswer(li){//選択肢をクリックしたら
      
      if(isAnswered){
        return;//回答済みなら何も起きない。
      }
      isAnswered = true;//回答済みとする

      
      if(shuffled_quiz === 'img/L_dog.png'){
        if(li.textContent === answer[0]){//左犬でc[0]選んだら
          li.classList.add('correct');
          score++;
          scoreHeart.src = scoreHeartList[score];
        }else{
          li.classList.add('wrong');
        }
      }else if(shuffled_quiz === 'img/R_dog.png'){
        if(li.textContent === answer[1]){//右犬でc[1]選んだら
          li.classList.add('correct');
          score++;
          scoreHeart.src = scoreHeartList[score];
        }else{
          li.classList.add('wrong');
        }      
      }

      btn.classList.remove('disabled');//「つぎ」押せるようにする
    }

    btn.addEventListener('click', ()=>{//「つぎ」ボタンを押したとき
      
      if(btn.classList.contains('disabled')){//未回答のときは無。
      return;
    }
    btn.classList.add('disabled');//未回答状態に戻す。「つぎ」押せなくする。
    
    if(currentNum === quiz.length - 2){//三問終了済
      toResult.classList.remove('hidden');//「柴犬は」が表示される。
      
      
      if (score == 0) {//リンク先変更
        toResult.href = '0nade_result.html';
      }
      else if (score == 1) {
        toResult.href = '1nade_result.html';
      }
      else if (score == 2) {
        toResult.href = '2nade_result.html';
      }
      else if (score == 3) {
        toResult.href = '3nade_result.html';
      }
      
    }else{
      currentNum++;
      doQuiz();//次の問題呼ぶ
    }
    
  })
}

  
}