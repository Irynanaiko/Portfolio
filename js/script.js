"use strict";
window.addEventListener("DOMContentLoaded", () => {
    // Menu

    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        closeElem = document.querySelector('.close');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });


    // Reating

    const counters = document.querySelectorAll('.skills__ratings-counter'),
        lines = document.querySelectorAll('.skills__ratings-line span');

    counters.forEach((item, i) => {
        lines[i].style.width = item.innerHTML;
    });


    // Scrolling

    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener("click", function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute("href");

            document.querySelector(id).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }


    // Form

    const form = document.querySelector(".contacts__form");

    const message = {
        loading: "Loading...",
        success: "Thanks! I will contact you soon!",
        failure: "Something is wrong...",
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const statusMessage = document.createElement("div");
        statusMessage.classList.add("status");
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open("POST", "server.php");

        request.setRequestHeader("Content-type", "application/json");
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener("load", () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            }
        });
    });

    // Promo buttons active

    const buttons = document.querySelectorAll('.promo__link');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('.btn'));
            this.classList.add('btn');
        });
    });






});