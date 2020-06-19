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
        else if(bar_count === 5 || bar_count === -5){//Fmaxminで
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
    let F_player = 0;//10～0
    let F_dog = 0;//-10～0

    const touch_ring = document.getElementById('touch_ring');
    const bar = document.getElementById('bar');
    const tsuna_dog = document.getElementById('tsuna_dog');

    let y = 90; //バーの初期高さはtop:90px;
    let bar_count = 0;//バーの高さ。

    // 画像をバーの高さに比例して差し替えたい
    // function change_size(){
    //   if(bar_count < -2){
    //     tsuna_dog.src = "img/tsuna_dog_max.png";
    //   }else if(bar_count<0){
    //     tsuna_dog.src ="img/tsuna_dog_+mid.png";
    //   }else if(bar_count=== 0){
    //     tsuna_dog.src ="img/tsuna_dog.png";
    //   }else if(bar_count>0 &&  bar_count<3){
    //     tsuna_dog.src ="img/tsuna_dog_+mid.png";
    //   }else{
    //     tsuna_dog.src ="img/tsuna_dog_min.png";
    //   }
    // }
    // change_size();
    
    //バーの高さを変える関数
    function bar_1Up(){//バーをあげる＝topをちいさく
      y -= 18;
      bar.style.top = y + "px";
      bar_count ++;
    }
    function bar_1Down(){
      y += 18;
      bar.style.top = y + "px";
      bar_count--;
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
        if(i >=3  || F_dog === 0){
          F_dog_PULL(); // 8割
        }else{
          F_dog ++;
          console.log(F_dog);
          bar_1Down();
        }
      }, 500);
    }

    //長押しでF_player++ タイムアップで停止 ok 色を変えたい
    touch_ring.addEventListener("touchstart", e=>{
      e.preventDefault();
      touch_ring.src = "img/touch_ring.png";
      clearInterval($intervalID2);
      $intervalID = setInterval(function(){
        if(timer.textContent === "0"){//10秒経ったら押せない
          touch_ring.classList.add('disabled');
          return;
        }
        F_player ++;
        bar_1Down();
      }, 500);
    });
    //離したら-- タイムアップで停止ok
    touch_ring.addEventListener("touchend", e=>{
      e.preventDefault();
      touch_ring.src = "img/notouch_ring.png";
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
      }, 500);
    });


    toResult.addEventListener('click', ()=>{
      //リンク先変更
      if (bar_count >= 5) {
        toResult.href = 'tsuna_result/Inu_tsuna_result.html';//ほこらしげなやつ
      }
      else if (bar_count <= -5) {
        toResult.href = 'tsuna_result/Player_tsuna_result.html';//かなしそうなやつ
      }else{
        toResult.href = 'tsuna_result/nomal_tsuna_result.html';//ふつうのやつ
      }
    });
    
  }

}