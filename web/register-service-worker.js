/* eslint-env browser */

/**
 * scope を SW_PUBLIC_SCOPEに設定しているというのは、PWAがSW_PUBLIC_SCOPE内で有効になっているということであり、
 * そこがPWAのスコープなので、サービスワーカーのファイルもSW_PUBLIC_SCOPEのパス以降に存在することになる。
 * ただ、このアプリは最初からPWAを想定して作られているため、scopeはルートを表す'/'で、registerするjsファイルも'/' + ファイル名となる。
 * これで failed to register SW_PUBLIC_SCOPEうんたらかんたらエラーと、mimetype html ほにゃららエラーが発生しなくなる。
 */

if ('serviceWorker' in navigator && 'register' in navigator.serviceWorker) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/expo-service-worker.js', { scope: '/' })
      .then(function (info) {
        console.info('Registered service-worker', info);
      })
      .catch(function (error) {
        console.info('Failed to register service-worker', error);
      });
  });
}
