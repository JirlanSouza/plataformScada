"use strict";
requestAnimationFrame(mainLoop);
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const storedRects = [];
const baseImage = loadImage("https://www.w3schools.com/css/img_fjords.jpg");
var refresh = true;
const rect = (() => {
    var x1: number, y1: number, x2: number, y2: number;
    var show = false;
    function fix() {
        rect.x = Math.min(x1, x2);
        rect.y = Math.min(y1, y2);
        rect.w = Math.max(x1, x2) - Math.min(x1, x2);
        rect.h = Math.max(y1, y2) - Math.min(y1, y2);
    }
    function draw(ctx: CanvasRenderingContext2D) { ctx.strokeRect(rect.x, rect.y, rect.w, rect.h) }
    const rect = {x : 0, y : 0, w : 0, h : 0,  draw};
    const API = {
        restart(point) {
            x2 = x1 = point.x;
            y2 = y1 = point.y;
            fix();
            show = true;
        },
        update(point) {
            x2 = point.x;
            y2 = point.y;
            fix();
            show = true;
        },
        toRect() {
            show = false;
            return Object.assign({}, rect);
        },
        draw(ctx) {
            if (show) { rect.draw(ctx) }
        },
        show : false,
    }
    return API;
})();

function loadImage(url) {
    const image = new Image();
    image.src = url;
    image.onload = () => refresh = true;
    return image;
}

const mouse = {
    button : false,
    x : 0,
    y : 0,
    down : false,
    up : false,
    element : null,
    event(e) {
        const m = mouse;
        m.bounds = m.element.getBoundingClientRect();
        m.x = e.pageX - m.bounds.left - scrollX;
        m.y = e.pageY - m.bounds.top - scrollY;
        const prevButton = m.button;
        m.button = e.type === "mousedown" ? true : e.type === "mouseup" ? false : mouse.button;
        if (!prevButton && m.button) { m.down = true }
        if (prevButton && !m.button) { m.up = true }
    },
    start(element) {
        mouse.element = element;
        "down,up,move".split(",").forEach(name => document.addEventListener("mouse" + name, mouse.event));
    }
}

mouse.start(canvas);
function draw() {
    ctx.drawImage(baseImage, 0, 0, ctx.canvas.width, ctx.canvas.width);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "yellow";
    storedRects.forEach(rect => rect.draw(ctx));
    ctx.strokeStyle = "red";
    rect.draw(ctx);
}
function mainLoop() {
    if (refresh || mouse.down || mouse.up || mouse.button) {
        refresh = false;
        if (mouse.down) {
            mouse.down = false;
            rect.restart(mouse);
        } else if (mouse.button) {
            rect.update(mouse);
        } else if (mouse.up) {
            mouse.up = false;
            rect.update(mouse);
            storedRects.push(rect.toRect());
        }
        draw();
    }
    requestAnimationFrame(mainLoop)
}