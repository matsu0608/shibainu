'use strict';
{
    //HTMLから取得
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const fin = document.getElementById('fin');
    // -----------------↓タイマー---------------------
    const timer = document.getElementById('timer');
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
        
    //変数宣言
    let score = 0;
    // -----------------↓タイマー---------------------
    let startTime;
    let timeoutId;
    let timeLimit = 11*1000 ;
      
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
        }
        // if(isAnswered){//選択肢押したら
        //   clearTimeout(timeoutId);//タイマー停止。
        //   timer.textContent = "10";//タイマー表示を10に戻す。
        // }else if(timer.textContent === "0"){//10秒経ったら
        //   clearTimeout(timeoutId);//タイマー停止。
        //   fin.classList.remove('hidden');//「柴犬は」が表示される。
        // }
      }
      
      window.onload = function(){//画面を読み込んだらタイマースタート 
        startTime = Date.now();
        countDown();
      }
      
      
      //シャッフル関数
    //   function shuffle(arr){//配列を入れるarr
        
    //     for(let i = arr.length - 1; i > 0; i--){//2.1.0
    //       const j = Math.floor(Math.random()*(i+1));//2.1.0
    //       [arr[i],arr[j]] = [arr[j],arr[i]];
    //     }
        
    //     return arr;
    //   }
      
    //   function setQuiz(){//クイズ表示関数
    //     isAnswered = false;
        
    //     startTime = Date.now();//タイマースタート
    //     countDown();
        
    //     question.src = quiz[currentNum].q;//問題画像表示
        
    //     while(choices.firstChild){//他問題の選択肢表示は全消去
    //       choices.removeChild(choices.firstChild);
    //     }
        
    //     const shuffledChoices = shuffle([...quiz[currentNum].c]);//問題と選択肢の表示される並びをシャッフルしたもの。
        
    //     shuffledChoices.forEach(choice=>{//各選択肢に対して
          
    //       const li= document.createElement('li');//liをつくる
          
    //     li.textContent = choice;//liの文章に選択肢の文章を代入する。
    
    //     li.addEventListener('click', ()=>{//選択肢がクリックされたら...
    //       checkAnswer(li);
    //     });
        
    //     choices.appendChild(li);//ulの下にliを追加する。
        
        
    //   });
      
      
      
    //   if(currentNum === quiz.length - 1){//最後の一問の時
    //     btn.classList.add('disabled');//「つぎ」押せなくする。
    //   }
    // }

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