exports.id = 911;
exports.ids = [911];
exports.modules = {

/***/ 5911:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./components/menu/styles.scss
var styles = __webpack_require__(3588);
// EXTERNAL MODULE: ./styles/app.scss
var app = __webpack_require__(8446);
// EXTERNAL MODULE: external "react-icons/im"
var im_ = __webpack_require__(924);
;// CONCATENATED MODULE: ./components/menu/menuOptions.js


const optionsMenu = [
    {
        name: "Calculadora de horas",
        icon: /*#__PURE__*/ jsx_runtime.jsx(im_.ImCalculator, {})
    }
]; //ImCalculator

;// CONCATENATED MODULE: ./assets/logo.png
/* harmony default export */ const logo = ({"src":"/_next/static/media/logo.384c1988.png","height":401,"width":401,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA3ElEQVR42jWOQWvCQBSE33/pwfbQf9Hf1Ft/QfFUaGk991oKpYUGpJBainhT8SCeBMXdZBMTdcNmo+Os4IPhDfPxHiNJ4YW61uv6j7uhPH3MfSmcMyxM6bHK3EFlDsEzM2QtCZdm0yDd7Ov2+xTtjxn0Fi5lRtaVpPTNMrGHl06Mm+cxbh8G6D+9QaUW/FBJUcH//E4hcofHTg/D+1d8imDSGyGrYEOHmK/wHY3dXO2gFzkmX/9OFx5kkRBe0Zi1BdJQrmxg6JmtyC5E5XVQS+Wuy6CirM5cdIIicgRWmNTVx1WJTgAAAABJRU5ErkJggg==","blurWidth":8,"blurHeight":8});
;// CONCATENATED MODULE: ./components/menu/index.js








const Layout = ({ children })=>{
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "container",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "menu",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                        src: logo,
                        width: 80,
                        height: 80,
                        onClick: ()=>router.push("/"),
                        style: {
                            cursor: "pointer"
                        }
                    }),
                    optionsMenu.map((elem)=>/*#__PURE__*/ jsx_runtime.jsx("div", {
                            onClick: ()=>router.push("/hoursCalculator"),
                            className: "menuOptionDiv",
                            children: elem.icon
                        }, elem.name))
                ]
            }),
            children
        ]
    });
};
/* harmony default export */ const menu = (Layout);

;// CONCATENATED MODULE: ./pages/_app.js


function MyApp({ Component, pageProps }) {
    return /*#__PURE__*/ jsx_runtime.jsx(menu, {
        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
            className: "page",
            children: /*#__PURE__*/ jsx_runtime.jsx(Component, {
                ...pageProps
            })
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 3588:
/***/ (() => {



/***/ }),

/***/ 8446:
/***/ (() => {



/***/ })

};
;