'use strict';

{
  //HTMLから取得
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const fin = document.getElementById('fin');
  const scoreLabel = document.querySelector('#result>p');
  // -----------------↓タイマー---------------------
  const timer = document.getElementById('timer');
  // -----------------↓スコア❤---------------------
  const scoreHeart = document.getElementById('score❤');
  
  // -----------------↓トップ画面---------------------
  const start_btn = document.getElementById('start');
  if(window.location.href.endsWith('index.html')){
    const modal_open = document.getElementById('modal_open');
    const modal_close = document.getElementById('modal_close');
    const modal_content = document.getElementById('modal_content');
    const nade = document.getElementById('nade');
    const oyatsu = document.getElementById('oyatsu');
    const tsuna = document.getElementById('tsuna');
    const totte = document.getElementById('totte');

    const modal_img = document.getElementById('modal_img');
    const slide_btns = document.getElementById('slide_btns');
    const slide_btn_top = document.getElementById('slide_btn_top');
    const slide_btn_nade = document.getElementById('slide_btn_nade');
    const slide_btn_oyatyu = document.getElementById('slide_btn_oyatyu');
    const slide_btn_tsuna = document.getElementById('slide_btn_tsuna');
    const slide_btn_totte = document.getElementById('slide_btn_totte');
    const map = document.getElementById('map');

    //ステージ選択
    start_btn.addEventListener('click', ()=>{
      if(start_btn.classList.contains('disabled')){
        return; //押せない時は何も起こらない。
      }else{
        start_btn.onclick = location.href="play.html"
      }//コース選択によってリンク先変えたい。
    });

    nade.addEventListener('click', ()=>{
      if(nade.classList.contains('unselected')){
        nade.classList.remove('unselected');
        oyatsu.classList.add('unselected');
        tsuna.classList.add('unselected');
        totte.classList.add('unselected');
        start_btn.classList.remove('disabled');
        // start_btn.onclick = location.href="play.html"
        //↑これするとなでなで押したら画面遷移する
        map.src = "img/map_nade.png"
      }else{
        return;
      }
    });
    oyatsu.addEventListener('click', ()=>{
      if(oyatsu.classList.contains('unselected')){
        oyatsu.classList.remove('unselected');
        nade.classList.add('unselected');
        tsuna.classList.add('unselected');
        totte.classList.add('unselected');
        start_btn.classList.remove('disabled');
        // start_btn.onclick = location.href="play.html"
        map.src = "img/map_oyatsu.png"
      }else{
        return;
      }
    });
    tsuna.addEventListener('click', ()=>{
      if(tsuna.classList.contains('unselected')){
        tsuna.classList.remove('unselected');
        nade.classList.add('unselected');
        oyatsu.classList.add('unselected');
        totte.classList.add('unselected');
        start_btn.classList.remove('disabled');
        // start_btn.onclick = location.href="play.html"
        map.src = "img/map_tsuna.png"
      }else{
        return;
      }
    });
    totte.addEventListener('click', ()=>{
      if(totte.classList.contains('unselected')){
        totte.classList.remove('unselected');
        nade.classList.add('unselected');
        oyatsu.classList.add('unselected');
        tsuna.classList.add('unselected');
        start_btn.classList.remove('disabled');
        // start_btn.onclick = location.href="play.html"
        map.src = "img/map_totte.png"
      }else{
        return;
      }
    });
    
    //ヘルプの表示
    modal_open.addEventListener('click', ()=>{
      modal_content.classList.add('show');
      slide_btns.classList.remove('hidden');
      //見えるように。
    });
    modal_close.addEventListener('click', ()=>{//「とじる」
      modal_content.classList.remove('show');
      slide_btns.classList.add('hidden');
    });
    slide_btn_top.addEventListener('click', ()=>{//「はじめに」
      modal_img.src = "img/modal_hazimeni.png"
    });
    slide_btn_nade.addEventListener('click', ()=>{//「なでなで」
      modal_img.src = "img/modal_nade.png"
    });
    slide_btn_oyatyu.addEventListener('click', ()=>{//「おやつあて」
      modal_img.src = "img/modal_hazimeni.png"
    });
    slide_btn_tsuna.addEventListener('click', ()=>{//「つなひき」
      modal_img.src = "img/modal_hazimeni.png"
    });
    slide_btn_totte.addEventListener('click', ()=>{//「とってこい」
      modal_img.src = "img/modal_hazimeni.png"
    });



  }
// --------ここまでトップ画面----------
  
  //配列
  const quiz= shuffle([
    {q: 'img/head_dog.png', c: ['❤頭を撫でる','❤お腹を撫でる','❤首を撫でる']},//0問目
    {q: 'img/body_dog.png', c: ['❤お腹を撫でる','❤頭を撫でる','❤首を撫でる']},
    {q: 'img/kubi_dog.png', c: ['❤首を撫でる','❤お腹を撫でる','❤頭を撫でる']},
  ]);
  
  const scoreHeartList = ['img/score0.png','img/score1.png', 'img/score2.png', 'img/score3.png',];
  
  //変数宣言
  let currentNum = 0; //今何問目？
  let isAnswered;
  let score = 0;
  // -----------------↓タイマー---------------------
  let startTime;
  let timeoutId;
  
  
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

    
    
    
    //タイマーのカウントアップ関数
    function countUp(){
      const d = new Date(Date.now() - startTime);
      const s = String(d.getSeconds()).padStart(1,'0');
      
      timer.textContent = `${s}`;
      timeoutId = setTimeout(()=>{countUp();}, 10);

      //タイマーリセット条件・タイムオーバー処理
      if(isAnswered){//選択肢押したら
        clearTimeout(timeoutId);//タイマー停止。
        timer.textContent = "5";//タイマー表示を5に戻す。
      }else if(timer.textContent === "5"){//5秒経ったら
        clearTimeout(timeoutId);//タイマー停止。
        isAnswered = true;//選択肢を押せなくなる。
        btn.classList.remove("disabled");//「つぎ」を押せるようにする。
        
      }
      
    }
    
    window.onload = function(){//画面を読み込んだらタイマースタート 
      startTime = Date.now();
      countUp();
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
      countUp();
      
      // question.textContent = quiz[currentNum].q;//問題文表示
      question.src = quiz[currentNum].q;//問題画像表示
      
      while(choices.firstChild){//他問題の選択肢表示は全消去
        choices.removeChild(choices.firstChild);
      }
      
      const shuffledChoices = shuffle([...quiz[currentNum].c]);//問題と選択肢の表示される並びをシャッフルしたもの。
      
      shuffledChoices.forEach(choice=>{//各選択肢に対して
        
        const li= document.createElement('li');//liをつくる
        
      li.textContent = choice;//liの文章に選択肢の文章を代入する。

      li.addEventListener('click', ()=>{//選択肢がクリックされたら...
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
  
  btn.addEventListener('click', ()=>{//「つぎ」ボタンを押したとき
    
    if(btn.classList.contains('disabled')){//未回答のときは無。
      return;
    }
    btn.classList.add('disabled');//未回答状態に戻す。「つぎ」押せなくする。
    
    if(currentNum === quiz.length - 1){//最後の一問だった時
      fin.classList.remove('hidden');//「柴犬は」が表示される。
      // scoreLabel.textContent = `うまくいった回数：${score}/${quiz.length}`;//スコアの表示
      
      if (score == 0) {//リンク先変更
        fin.href = 'result_0.html';
      }
      else if (score == 1) {
        fin.href = 'result_1.html';
      }
      else if (score == 2) {
        fin.href = 'result_2.html';
      }
      else if (score == 3) {
        fin.href = 'result_3.html';
      }
      
    }else{
      currentNum++;
      setQuiz();//次の問題呼ぶ
    }
    
  })
  
  

}