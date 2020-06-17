'use strict';
{
    //HTMLから取得
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const fin = document.getElementById('fin');
    // -----------------↓スコア❤---------------------
    const scoreHeart = document.getElementById('score❤');
    var test;
    
    
    //↓クリックエフェクト
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
    //↑クリックエフェクト

  if(window.location.href.endsWith('play.html')){//あそび画面に居たら

    //配列
    // const quiz= shuffle(
    //   'img/head_dog.png','img/body_dog.png', 'img/kubi_dog.png'
    // );
        
    let score = 0;
    // -----------------↓タイマー---------------------
    const timer = document.getElementById('timer');
    let startTime;
    let timeoutId;
    let timeLimit = 11*1000 ;

    window.onload = function(){//画面を読み込んだらタイマースタート 
      startTime = Date.now();
      countDown();
    }
      
      //タイマーのカウントダウン関数
      function countDown(){
        const d = new Date(startTime + timeLimit - Date.now());
        const s = String(d.getSeconds()).padStart(1,'0');
        
        timer.textContent = `${s}`;
        timeoutId = setTimeout(()=>{countDown();}, 10);
    
        //タイマーリセット条件・タイムオーバー処理
          if(timer.textContent === "0"){//10秒経ったら
          clearTimeout(timeoutId);//タイマー停止。
          fin.classList.remove('hidden');//「柴犬は」が表示される。
        }else if(F_player === -10 || F_player === 10){//メーターmaxminにぶつかったら
          clearTimeout(timeoutId);//タイマー停止。
          timer.textContent = "0";//タイマー表示を0に。
          fin.classList.remove('hidden');//「柴犬は」が表示される。
        }
      }
      

    // -----------------↑タイマー---------------------

    let $intervalID;
    let $intervalID2;
    let isSP;
    let F_player = 0;
    // let String_p;
    let F_dog = 0;
    const touch_ring = document.getElementById('touch_ring');
    const bar = document.getElementById('bar');
    const Fp = document.getElementById('Fp');
    const Fd = document.getElementById('Fd');


    //長押しでF_player++ 10までにしたい 色を変えたい
    touch_ring.addEventListener("touchstart", e=>{
      e.preventDefault();
      clearInterval($intervalID2);
      $intervalID = setInterval(function(){
        if(timer.textContent === "0"){//10秒経ったら押せない
          touch_ring.classList.add('disabled');
          return;
        }
        F_player ++;
        Fp.textContent = F_player;//NaNが表示されている
        // String_p = String(F_player);
        // Fp.textContent = typeof(String_p);
      }, 500);
    });
    touch_ring.addEventListener("mousedown", e=>{
      e.preventDefault();
      clearInterval($intervalID2);
      $intervalID = setInterval(function(){
        if(timer.textContent === "0"){//10秒経ったら押せない
          touch_ring.classList.add('disabled');
          return;
        }
        F_player ++;
        Fp.textContent = F_player;//NaNが表示されている
        // String_p = String(F_player);
        // Fp.textContent = typeof(String_p);
      }, 500);
    });

    //離したら-- -10まで タイムアップで停止 ok
    touch_ring.addEventListener("touchend", e=>{
      e.preventDefault();
      // touch_ring.classList.remove('touch');
      clearInterval($intervalID);
      $intervalID2 = setInterval(function(){
        if(timer.textContent === "0"){//10秒経ったら減らない
          touch_ring.classList.add('disabled');
          return;
        }
        if(F_player === -9){
          clearInterval($intervalID2);
        }
        F_player--;
        Fp.textContent = F_player;
      }, 500);
    });
    touch_ring.addEventListener("mouseup", e=>{
      e.preventDefault();
      // touch_ring.classList.remove('touch');
      clearInterval($intervalID);
      $intervalID2 = setInterval(function(){
        if(timer.textContent === "0"){//10秒経ったら減らない
          touch_ring.classList.add('disabled');
          return;
        }
        if(F_player === -9){
          clearInterval($intervalID2);
        }
        F_player--;
        Fp.textContent = F_player;
      }, 500);
    });

    Fp.innerHTML = parseInt(F_player.innerHTML);





    fin.addEventListener('click', ()=>{
      if (score == 0) {//リンク先変更
        fin.href = '0nade_result.html';
      }
      else if (score == 1) {
        fin.href = '1nade_result.html';
      }
      else if (score == 2) {
        fin.href = '2nade_result.html';
      }
      else if (score == 3) {
        fin.href = '3nade_result.html';
      }
    })
    
  }



}