#本資料夾內容，是我從原本專案移出dest內容來作測試
> 本來只複製dest內容執行打包，後來為了方便查看，而新增dest資料夾，並把專案程式收進該資料夾裡

#dest\js\dist\cusfruits.bundle.js
> 這個js檔有成功打包，內容不包含vendor的js

#以下問題: 
> vendor的js們打包時報錯

>ERROR in ./dest/js/src/vendor/jquery-ui.js
Module not found: Error: Can't resolve 'jquery' in 'C:\Users\luck4\AppData\Local\Temp\hello-webpack\dest\js\src\vendor' 
