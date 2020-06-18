'use strict';
{
    //HTMLから取得
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const toResult = document.getElementById('toResult');
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

    fin.addEventListener('touchstart',()=>{
      fin.onclick= location.href="index.html";
    });
    
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
      F_dog_notPULL();
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
          toResult.classList.remove('hidden');//「柴犬は」が表示される。
        }
        else if(F_dog === -10 || F_player === 10){//Fmaxminで
          clearTimeout(timeoutId);//タイマー停止。
          timer.textContent = "0";//タイマー表示を0に。
          toResult.classList.remove('hidden');//「柴犬は」が表示される。
        }
      }
      

    // -----------------↑タイマー---------------------

    let $intervalID;
    let $intervalID2;
    let $intervalIDdog;
    let $intervalIDdog2;
    let $intervalID_F;
    let F_player = 0;//10～0
    // let String_p;
    let F_dog = 0;//-10～0

    const touch_ring = document.getElementById('touch_ring');
    const bar = document.getElementById('bar');

    const Fp = document.getElementById('Fp');
    const Fd = document.getElementById('Fd');

    let y = 90; //バーの初期高さはtop:90px;
    //バーの高さを変える関数
    function bar_1Up(){//バーをあげる＝topをちいさく
      y -= 9;
      bar.style.top = y + "px";
    }
    function bar_1Down(){
      y += 9;
      bar.style.top = y + "px";
    }


    //時間経過でF_dog-- タイムアップで停止 ok
    function F_dog_PULL(){
      clearInterval($intervalIDdog);
      $intervalIDdog2 = setInterval(function(){
        if(timer.textContent === "0"){//10秒経ったら押せない
          touch_ring.classList.add('disabled');
          return;
        }
        let i = Math.floor(Math.random()*11);//0~10
        if(i >= 8 || F_dog === -10){F_dog_notPULL(); // 3割
        }else{
          F_dog --;
          console.log(F_dog);
          bar_1Up();
          Fd.textContent = F_dog;//あとでけす
        }
      }, 500);
    }

    //時間経過でF_dog++ タイムアップで停止 ok
    function F_dog_notPULL(){
      clearInterval($intervalIDdog2);
      $intervalIDdog = setInterval(function(){
        if(timer.textContent === "0"){//10秒経ったら押せない
          touch_ring.classList.add('disabled');
          return;
        }
        let i = Math.floor(Math.random()*11);//0-10
        if(i >=3  || F_dog === -1){F_dog_PULL(); // 8割
        }else{
          F_dog ++;
          console.log(F_dog);
          bar_1Down();
          Fd.textContent = F_dog;//あとでけす
        }
      }, 500);
    }

    //長押しでF_player++ タイムアップで停止 ok 色を変えたい
    touch_ring.addEventListener("touchstart", e=>{
      e.preventDefault();
      clearInterval($intervalID2);
      $intervalID = setInterval(function(){
        if(timer.textContent === "0"){//10秒経ったら押せない
          touch_ring.classList.add('disabled');
          return;
        }
        F_player ++;
        bar_1Down();
        Fp.textContent = F_player;//あとでけす
      }, 500);
    });
    // touch_ring.addEventListener("mousedown", e=>{//マウス版
    //   e.preventDefault();
    //   clearInterval($intervalID2);
    //   $intervalID = setInterval(function(){
    //     if(timer.textContent === "0"){//10秒経ったら押せない
    //       touch_ring.classList.add('disabled');
    //       return;
    //     }
    //     F_player ++;
    //     Fp.textContent = F_player;
    //   }, 500);
    // });
    //離したら-- タイムアップで停止ok
    touch_ring.addEventListener("touchend", e=>{
      e.preventDefault();
      // touch_ring.classList.remove('touch');
      clearInterval($intervalID);
      $intervalID2 = setInterval(function(){
        if(timer.textContent === "0"){//10秒経ったら減らない
          touch_ring.classList.add('disabled');
          return;
        }
        if(F_player === 1){
          clearInterval($intervalID2);
        }
        F_player--;
        bar_1Up();
        Fp.textContent = F_player;//あとでけす
      }, 500);
    });
    // touch_ring.addEventListener("mouseup", e=>{//マウス版
    //   e.preventDefault();
    //   // touch_ring.classList.remove('touch');
    //   clearInterval($intervalID);
    //   $intervalID2 = setInterval(function(){
    //     if(timer.textContent === "0"){//10秒経ったら減らない
    //       touch_ring.classList.add('disabled');
    //       return;
    //     }
    //     if(F_player === 1){
    //       clearInterval($intervalID2);
    //     }
    //     F_player--;
    //     Fp.textContent = F_player;
    //   }, 500);
    // });


    toResult.addEventListener('click', ()=>{
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
    })
    
  }

}