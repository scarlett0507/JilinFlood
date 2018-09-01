// 获取模态窗口
   var modal = document.getElementById('myModal');
// 获取图片模态框，alt 属性作为图片弹出中文本描述
   var img = document.getElementById('myImg');
   var modalImg = document.getElementById("img01");
   var captionText = document.getElementById("caption");
       img.onclick = function(){
          modal.style.display = "block";
          modalImg.src = this.src;
          modalImg.alt = this.alt;
          captionText.innerHTML = this.alt;
        }

// 获取 <span> 元素，设置关闭模态框按钮
    var span = document.getElementsByClassName("close")[0];

// 点击 <span> 元素上的 (x), 关闭模态框
    span.onclick = function() {
        modal.style.display = "none";
     }