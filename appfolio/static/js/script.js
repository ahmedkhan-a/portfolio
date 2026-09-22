document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".about, .skills, .tools, .services, .education, .projects, .experience, .contact"
    );

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        observer.observe(element);
    });


    /* =========================
       CURSOR GLOW
    ========================= */

    const glow = document.createElement("div");

    glow.className = "cursor-glow";

    document.body.appendChild(glow);

    document.addEventListener("mousemove", function (event) {

        glow.style.left = event.clientX + "px";
        glow.style.top = event.clientY + "px";
        glow.style.opacity = "1";

    });


    /* =========================================================
       PORTFOLIO — ADVANCED INTERACTIONS
       ========================================================= */

    /* =====================================================
       01 — HERO MOUSE PARALLAX
       ===================================================== */

    const hero = document.querySelector(".hero");
    const heroVisual = document.querySelector(".hero-visual");

    if (hero && heroVisual) {

        hero.addEventListener("mousemove", function (event) {

            const rect = hero.getBoundingClientRect();

            const mouseX =
                (event.clientX - rect.left) / rect.width - 0.5;

            const mouseY =
                (event.clientY - rect.top) / rect.height - 0.5;

            const moveX = mouseX * 18;
            const moveY = mouseY * 18;

            heroVisual.style.transform =
                `translate(${moveX}px, calc(-50% + ${moveY}px)) scale(1.02)`;
        });


        hero.addEventListener("mouseleave", function () {

            heroVisual.style.transform =
                "translate(0, -50%) scale(1)";

        });
    }


    /* =====================================================
       02 — NAV ACTIVE SECTION
       ===================================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        "nav a[href^='#']"
    );

    const navObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.getAttribute("id");

                    navLinks.forEach(function (link) {

                        link.classList.remove("active");

                        const href =
                            link.getAttribute("href");

                        if (href === "#" + currentId) {
                            link.classList.add("active");
                        }

                    });
                }

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(function (section) {
        navObserver.observe(section);
    });


    /* =====================================================
       03 — SMOOTH INTERNAL NAVIGATION
       ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       04 — PROJECT CARD MOUSE TILT
       ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach(function (card) {

        card.addEventListener("mousemove", function (event) {

            if (window.innerWidth <= 768) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2.5;

            const rotateY =
                ((x - centerX) / centerX) * 2.5;

            card.style.transform =
                `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", function () {

            card.style.transform =
                "translateY(0) rotateX(0) rotateY(0)";

        });

    });


    /* =====================================================
       05 — BUTTON MAGNETIC EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".hero-buttons .btn"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "mousemove",
            function (event) {

                if (window.innerWidth <= 768) {
                    return;
                }

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX - rect.left - rect.width / 2;

                const y =
                    event.clientY - rect.top - rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            function () {

                button.style.transform =
                    "translate(0, 0)";

            }
        );

    });


    /* =====================================================
       06 — SCROLL PROGRESS BAR
       ===================================================== */

    const progressBar =
        document.createElement("div");

    progressBar.className =
        "scroll-progress";

    document.body.appendChild(progressBar);


    window.addEventListener(
        "scroll",
        function () {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress =
                documentHeight > 0
                    ? (scrollTop / documentHeight) * 100
                    : 0;

            progressBar.style.width =
                progress + "%";

        },
        { passive: true }
    );


    /* =====================================================
       07 — PARALLAX BACKGROUND CIRCLES
       (reuses revealElements: it was the same selector list)
       ===================================================== */

    window.addEventListener(
        "scroll",
        function () {

            const scrollY =
                window.scrollY;

            revealElements.forEach(function (section) {

                const rect =
                    section.getBoundingClientRect();

                const center =
                    rect.top + rect.height / 2;

                const distance =
                    window.innerHeight / 2 - center;

                const movement =
                    distance * 0.015;

                section.style.setProperty(
                    "--section-parallax",
                    movement + "px"
                );

            });

        },
        { passive: true }
    );


    /* =====================================================
       08 — BACK TO TOP BUTTON
       ===================================================== */

    const topButton =
        document.createElement("button");

    topButton.className =
        "back-to-top";

    topButton.innerHTML =
        "↑";

    topButton.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(topButton);


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                topButton.classList.add("show");

            } else {

                topButton.classList.remove("show");

            }

        },
        { passive: true }
    );


    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


});

/* =========================================================
   NAVBAR SCROLL STATE
   ========================================================= */

window.addEventListener("scroll", function () {

    const nav = document.querySelector("nav");

    if (!nav) {
        return;
    }

    if (window.scrollY > 40) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }

}, { passive: true });


/* =========================================================
   PREMIUM HERO VIDEO
   Cinematic 500ms fade loop
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const video = document.getElementById("heroVideo");

    if (!video) {
        return;
    }


    let fadeFrame = null;

    let fadingOut = false;


    /* -----------------------------------------------------
       Get current opacity
       ----------------------------------------------------- */

    function getOpacity() {

        const value =
            parseFloat(
                window.getComputedStyle(video).opacity
            );

        return Number.isFinite(value)
            ? value
            : 0;

    }


    /* -----------------------------------------------------
       Cancel current fade
       ----------------------------------------------------- */

    function cancelFade() {

        if (fadeFrame !== null) {

            cancelAnimationFrame(
                fadeFrame
            );

            fadeFrame = null;
        }

    }


    /* -----------------------------------------------------
       Fade to target opacity
       ----------------------------------------------------- */

    function fadeTo(target, duration, callback) {

        cancelFade();

        const startOpacity =
            getOpacity();

        const difference =
            target - startOpacity;

        const startTime =
            performance.now();


        function animate(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /* Smooth ease */
            const eased =
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 -
                      Math.pow(
                          -2 * progress + 2,
                          2
                      ) / 2;


            video.style.opacity =
                startOpacity +
                difference * eased;


            if (progress < 1) {

                fadeFrame =
                    requestAnimationFrame(
                        animate
                    );

            } else {

                fadeFrame = null;

                if (callback) {
                    callback();
                }

            }

        }


        fadeFrame =
            requestAnimationFrame(
                animate
            );
    }


    /* -----------------------------------------------------
       Initial video load
       ----------------------------------------------------- */

    function fadeInVideo() {

        video.style.opacity = "0";

        fadeTo(
            1,
            500
        );
    }


    /* -----------------------------------------------------
       Video metadata loaded
       ----------------------------------------------------- */

    video.addEventListener(
        "loadeddata",
        function () {

            video
                .play()
                .then(function () {

                    fadeInVideo();

                })
                .catch(function (error) {

                    console.log(
                        "Hero video autoplay:",
                        error
                    );

                });

        }
    );


    /* -----------------------------------------------------
       Fade out 0.55 seconds before end
       ----------------------------------------------------- */

    video.addEventListener(
        "timeupdate",
        function () {

            if (!video.duration) {
                return;
            }


            const remaining =
                video.duration -
                video.currentTime;


            if (
                remaining <= 0.55 &&
                !fadingOut
            ) {

                fadingOut = true;


                fadeTo(
                    0,
                    500
                );

            }

        }
    );


    /* -----------------------------------------------------
       Seamless loop restart
       ----------------------------------------------------- */

    video.addEventListener(
        "ended",
        function () {

            cancelFade();

            video.style.opacity = "0";


            setTimeout(
                function () {

                    video.currentTime = 0;

                    fadingOut = false;


                    const playPromise =
                        video.play();


                    if (
                        playPromise &&
                        typeof playPromise.then === "function"
                    ) {

                        playPromise
                            .then(function () {

                                fadeTo(
                                    1,
                                    500
                                );

                            })
                            .catch(function () {

                                /* Browser blocked playback */

                            });

                    } else {

                        fadeTo(
                            1,
                            500
                        );

                    }

                },
                100
            );

        }
    );


    /* -----------------------------------------------------
       Safety fallback
       ----------------------------------------------------- */

    video.addEventListener(
        "error",
        function () {

            console.warn(
                "Hero background video could not be loaded."
            );

        }
    );

});