控制台报错：fullPage: Fullpage.js version 3 has changed its license to GPLv3 and it requires a `licenseKey` option. Read about it here:

解决办法：

在 fullpage.js 文件中查找 licenseKey，删除如下代码

if(!isOK){
　　 showError('error', 'Fullpage.js version 3 has changed its license to GPLv3 and it requires a `licenseKey` option. Read about it here:');
　　 showError('error', 'https://github.com/alvarotrigo/fullPage.js#options.');
}

删除后将下一行的 else 也删掉，变成如下代码
if(l && l.length < 20){
　　 console.warn('%c This website was made using fullPage.js slider. More info on the following website:', msgStyle);
　　 console.warn('%c https://alvarotrigo.com/fullPage/', msgStyle);
}
