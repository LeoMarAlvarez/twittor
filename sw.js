importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    // '/',
    'index.html',
    'js/app.js',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'css/animate.css',
    'js/libs/jquery.js',
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css'
];

self.addEventListener('install', e => {
    const resStatic = caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL));

    const resInmutable = caches.open(INMUTABLE_CACHE).then(cache => cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([resStatic, resInmutable]));
});

self.addEventListener('activate', e => {
            const respuesta = caches.keys().then(keys => {
                    keys.forEach(key => {
                            if (key != STATIC_CACHE && key.includes('static')) {
                                return caches.delete(key);
                            }
                            if (key != INMUTABLE_CACHE && key.includes('inmutable') {

                                }
                            });
                    });

                e.waitUntil(respuesta);
            });

        self.addEventListener('fetch', e => {
            const respuesta = caches.match(e.request).then(cache => {
                if (cache) {
                    return cache;
                } else {
                    return fetch(e.request).then(newRes => {
                        return updateDynamicCache(DYNAMIC_CACHE, e.request, newRes);
                    });
                }
            });

            e.respondWith(respuesta);
        });