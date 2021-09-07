// 履歴関連
let history = {
  // プロパティ
  currentSymbolNumber: 0,   // 直近のアクション番号
  allActions: {}, // 全てのアクション

  // メソッド
  // 直近のアクション番号を取得
  getCurrentSymbolNumber: function(){
    return this.currentSymbolNumber
  },
  // アクション番号を inc する
  increaseCurrentSymbolNumber: function(){
    this.currentSymbolNumber += 1;    
  },
  // アクション番号を dec する
  decreaseCurrentSymbolNumber: function(){
    this.currentSymbolNumber -= 1;    
  },
  // 現在のアクションを allActions に追加する
  addCurrentToAllActions: function(){}
};

// ページ内の要素を削除する
function removeElements(){
    window.document.getElementById('english').innerText = window.document.getElementById('originalTxt').value;
    window.document.getElementById('originalTxt').value = "";
    window.document.getElementById('btn').remove();
    window.document.getElementById('originalTxt').remove();
}
// 原文を貼り付ける
window.btn.addEventListener('click', function(){removeElements();});

// つけた記号を削除する
function clear(){
    // 線記号の削除
    document.getElementById(`action${history.getCurrentSymbolNumber()-1}`).style = null;
    // 括弧記号 ( ) ＜ ＞ の削除
    document.getElementById(`action${history.getCurrentSymbolNumber()-1}`).innerHTML = 
    document.getElementById(`action${history.getCurrentSymbolNumber()-1}`).innerHTML.replace("＜","").replace("＞","").replace(" )","").replace("( ","").replace("⤺","");
    // ルビの消去
    document.getElementById(`action${history.getCurrentSymbolNumber()-1}`).removeAttribute("data-ruby");
    // id の消去
    document.getElementById(`action${history.getCurrentSymbolNumber()-1}`).removeAttribute("id");
    // 操作ラベルを 1 減らす
    history.decreaseCurrentSymbolNumber();
}
document.addEventListener('keydown', (event) => {
  // Cmd(Ctrl)+z で直前の操作を取り消す
  if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
    clear();
  }
});

// 選択箇所の記号をクリアする
function clearSelected(){
  let selection = window.getSelection();
  if(!selection.rangeCount) return; 
  let range = selection.getRangeAt(0);
  let newNode = document.createElement('span');
  newNode.setAttribute('style', ''); 
  newNode.innerHTML = selection.toString().replace("＜","").replace("＞","").replace(" )","").replace("( ","").replace("⤺","");
  range.deleteContents();
  range.insertNode(newNode);
  // 操作ラベルを 1 減らす
  history.decreaseCurrentSymbolNumber(); 
}

// 機能語の記号をつける
function alpha(){
  let selection = window.getSelection();
  if(!selection.rangeCount) return; 
  let range = selection.getRangeAt(0);
  let newNode = document.createElement('span');
  newNode.setAttribute('data-ruby', history.getCurrentSymbolNumber()+1);
  newNode.setAttribute('style', 'border: solid 1px black;background-color: #fff0e0');
  newNode.setAttribute('id', `action${history.getCurrentSymbolNumber()}`);
  // 半角スペース '&thinsp;'
  newNode.innerHTML = selection.toString();
  range.deleteContents();
  range.insertNode(newNode);
  // 履歴にタグと位置を入れる
  history.addCurrentToAllActions();
  // 操作のタグ番号を更新する
  history.increaseCurrentSymbolNumber();
}

// 主語の記号をつける
function s(){
  let selection = window.getSelection();
  if(!selection.rangeCount) return; 
  let range = selection.getRangeAt(0);
  let newNode = document.createElement('span');
  newNode.setAttribute('style', 'border-bottom:3px double black;padding-bottom:2px;');
  newNode.setAttribute('id', `action${history.getCurrentSymbolNumber()}`);
  newNode.setAttribute('data-ruby', history.getCurrentSymbolNumber()+1);
  newNode.innerHTML = selection.toString();
  range.deleteContents();
  range.insertNode(newNode);
  // 履歴にタグと位置を入れる
  history.addCurrentToAllActions();
  // 操作のタグ番号を更新する
  history.increaseCurrentSymbolNumber();
}

// 動詞の記号をつける
function v(){
  let selection = window.getSelection();
  if(!selection.rangeCount) return; 
  let range = selection.getRangeAt(0);
  let newNode = document.createElement('span');
  newNode.setAttribute('style', 'border: solid 1px black;border-radius: 10px;');
  newNode.setAttribute('id', `action${history.getCurrentSymbolNumber()}`);
  newNode.setAttribute('data-ruby', history.getCurrentSymbolNumber()+1);
  newNode.innerHTML = selection.toString();
  range.deleteContents();
  range.insertNode(newNode);
  // 履歴にタグと位置を入れる
  history.addCurrentToAllActions();
  // 操作のタグ番号を更新する
  history.increaseCurrentSymbolNumber();
}

// 目的語(O)・補語(C)の記号をつける
function oc(){
  let selection = window.getSelection();
  if(!selection.rangeCount) return; 
  let range = selection.getRangeAt(0);
  let newNode = document.createElement('span');
  newNode.setAttribute('style', 'border-bottom:1px solid black;padding-bottom:2px;'); 
  newNode.setAttribute('id', `action${history.getCurrentSymbolNumber()}`);
  newNode.setAttribute('data-ruby', history.getCurrentSymbolNumber()+1);
  newNode.innerHTML = selection.toString();
  range.deleteContents();
  range.insertNode(newNode);
  // 履歴にタグと位置を入れる
  history.addCurrentToAllActions();
  // 操作のタグ番号を更新する
  history.increaseCurrentSymbolNumber();
}

// 副詞の記号をつける
function adv(){
  let selection = window.getSelection();
  if(!selection.rangeCount) return; 
  let range = selection.getRangeAt(0);
  let newNode = document.createElement('span');  
  newNode.setAttribute('data-ruby', history.getCurrentSymbolNumber()+1);
  newNode.setAttribute('id', `action${history.getCurrentSymbolNumber()}`);
  newNode.innerHTML = "＜"+selection.toString()+"＞";
  range.deleteContents();
  range.insertNode(newNode);
  // 履歴にタグと位置を入れる
  history.addCurrentToAllActions();
  // 操作のタグ番号を更新する
  history.increaseCurrentSymbolNumber();
}

// 後置修飾の記号をつける
function adj(){
  let selection = window.getSelection();
  if(!selection.rangeCount) return; 
  let range = selection.getRangeAt(0);
  let newNode = document.createElement('span');
  newNode.setAttribute('id', `action${history.getCurrentSymbolNumber()}`);
  newNode.setAttribute('data-ruby', history.getCurrentSymbolNumber()+1);
  newNode.innerHTML = '<span style="display:inline-block;transform:scale(1.5, 1);">⤺</span>'+
    '( '+ 
    selection.toString()+' )';
  range.deleteContents();
  range.insertNode(newNode);
  // 履歴にタグと位置を入れる
  history.addCurrentToAllActions();
  // 操作のタグ番号を更新する
  history.increaseCurrentSymbolNumber();
}

// キー操作
document.addEventListener('keypress', (event) => {

    // 選択範囲がないときは return
    if(window.getSelection().toString() == '') return;
    // 記号付け
    let keyName = event.key;
    if (keyName == 'a'){
        s();
    }else if(keyName == 's'){
        v();
    }else if(keyName == 'd'){
        oc();
    }else if(keyName == 'f'){
        adv();
    }else if(keyName == 'g'){
        adj();
    }else if(keyName == 'z'){
        alpha();
    }else if(keyName == 'c'){
        clearSelected();
    }
});

// ドラッグ選択の操作
const element = document.querySelector("body");

element.addEventListener('selectstart', function(){
    element.addEventListener('mouseup', function(event) {
        // 半角スペースで始まるときは選択を打ち消す
        if(window.getSelection().toString().slice(0,1) == " "){
            window.getSelection().removeAllRanges();
        }

        // 選択が長すぎる場合は選択を取り消す
        if(window.getSelection().toString().length >= 80){
            window.getSelection().removeAllRanges();
        }

        // 最後が半角スペースで始まるときは選択を打ち消す
        if(window.getSelection().toString().slice(-1) == " "){
            console.log("!")
            window.getSelection().removeAllRanges();
        }
    });
});