'use strict';
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const fin = document.getElementById('fin');
  const toResult = document.getElementById('toResult');
  // -----------------↓タイマー---------------------
  const timer = document.getElementById('timer');
  // -----------------↓スコア❤---------------------
  const scoreHeart = document.getElementById('score❤');
  var test;
  
  
  // //クリックエフェクト
  document.body.addEventListener("touchstart", drop, false);
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

      // /-----------とってこいゲーム---------
if(window.location.href.endsWith('play.html')){//あそび画面に居たら

      fin.addEventListener('touchstart',()=>{
      fin.onclick= location.href="/index.html";
    });

  //配列
  const quiz= shuffle(
    'img/head_dog.png', 'img/body_dog.png','img/kubi_dog.png',
    );
  
  const scoreHeartList = ['img/score0.png','img/score1.png', 'img/score2.png', 'img/score3.png',];
  
  //変数宣言
  let currentNum = 0; //今何問目？
  let isAnswered;
  let score = 0;
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
      }else if(timer.textContent === "59"){//5秒経ったら
        clearTimeout(timeoutId);//タイマー停止。
        isAnswered = true;//選択肢を押せなくなる。
        btn.classList.remove("disabled");//「つぎ」を押せるようにする。
        
      }     
    }
    
    window.onload = function(){//画面を読み込んだらタイマースタート 
      startTime = Date.now();
      countDown();
    }
    
    
    //シャッフル関数
    function shuffle(arr){//配列を入れるarr
      
      for(let i = arr.length - 1; i > 0; i--){//2.1.0
        const j = Math.floor(Math.random()*(i+1));//2.1.0
        [arr[i],arr[j]] = [arr[j],arr[i]];
      }
      
      return arr;
    }
    
    
    function checkAnswer(li){//選択肢をクリックしたあとの〇✖表示
      if(isAnswered){
        return;//回答済みなら何も起きない。
      }
      isAnswered = true;//回答済みとする
      
      if(li.textContent === quiz[currentNum].c[0]){//クリックした選択肢がその問題のひとつめの選択肢と一致していたら
        li.classList.add('correct');
        score++;
        scoreHeart.src = scoreHeartList[score];
        
      }else{
        li.classList.add('wrong');
      }
      
      btn.classList.remove('disabled');//「つぎ」押せるようにする
    }
    
    function setQuiz(){//クイズ表示関数
      isAnswered = false;
      
      startTime = Date.now();//タイマースタート
      countDown();
      
      // question.textContent = quiz[currentNum].q;//問題文表示
      question.src = quiz[currentNum].q;//問題画像表示
      
      while(choices.firstChild){//他問題の選択肢表示は全消去
        choices.removeChild(choices.firstChild);
      }
      
      const shuffledChoices = shuffle([...quiz[currentNum].c]);//問題と選択肢の表示される並びをシャッフルしたもの。
      
      shuffledChoices.forEach(choice=>{//各選択肢に対して
        
        const li= document.createElement('li');//liをつくる
        
      li.textContent = choice;//liの文章に選択肢の文章を代入する。
  
      li.addEventListener('touchstart', ()=>{//選択肢がクリックされたら...
        checkAnswer(li);
        // li.classList.add("disabled_c");
      });
      
      choices.appendChild(li);//ulの下にliを追加する。
      
      
    });
    
    
    
    if(currentNum === quiz.length - 1){//最後の一問の時
      // btn.textContent = 'Show Score';
      btn.classList.add('disabled');//「つぎ」押せなくする。
    }
  }
  
  setQuiz();
  
  btn.addEventListener('touchstart', ()=>{//「つぎ」ボタンを押したとき
    
    if(btn.classList.contains('disabled')){//未回答のときは無。
      return;
    }
    btn.classList.add('disabled');//未回答状態に戻す。「つぎ」押せなくする。
    
    if(currentNum === quiz.length - 1){//最後の一問だった時
      toResult.classList.remove('hidden'); //「柴犬は」が表示される。
      // toResult.classList.remove('hidden');//「柴犬は」が表示される。
      
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
      setQuiz();//次の問題呼ぶ
    }
    
  })

/*
 * スワイプイベント設定
 */
function setSwipe(elem) {
  let t = document.querySelector(elem);
  let startX;        // タッチ開始 x座標
  let startY;        // タッチ開始 y座標
  let moveX;    // スワイプ中の x座標
  let moveY;    // スワイプ中の y座標
  let dist = 30;    // スワイプを感知する最低距離（ピクセル単位）
   
  // タッチ開始時： xy座標を取得
  t.addEventListener("touchstart", function(e) {
      e.preventDefault();
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
  });
   
  // スワイプ中： xy座標を取得
  t.addEventListener("touchmove", function(e) {
      e.preventDefault();
      moveX = e.changedTouches[0].pageX;
      moveY = e.changedTouches[0].pageY;
  });
   
  // タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
  t.addEventListener("touchend", function(e) {
      if (startX > moveX && startX > moveX + dist) {        // 右から左にスワイプ
          // 右から左にスワイプした時の処理
          console.log('左から右へ');
      }
      else if (startX < moveX && startX + dist < moveX) {    // 左から右にスワイプ
          // 左から右にスワイプした時の処理
          console.log('右から左へ');
      }
  });
}


}
}