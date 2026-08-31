jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    var topBtn = $('.pagetop');
    topBtn.hide();

    // ボタンの表示設定
    $(window).scroll(function () {
        if ($(this).scrollTop() > 70) {
            // 指定px以上のスクロールでボタンを表示
            topBtn.fadeIn();
        } else {
            // 画面が指定pxより上ならボタンを非表示
            topBtn.fadeOut();
        }
    });

    // ボタンをクリックしたらスクロールして上に戻る
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 300, 'swing');
        return false;
    });

    //ドロワーメニュー
    $("#MenuButton").click(function () {
        // $(".l-drawer-menu").toggleClass("is-show");
        // $(".p-drawer-menu").toggleClass("is-show");
        $(".js-drawer-open").toggleClass("open");
        $(".drawer-menu").toggleClass("open");
        $("html").toggleClass("is-fixed");

    });



    // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

    $(document).on('click', 'a[href*="#"]', function () {
        let time = 400;
        let header = $('.fv__header').innerHeight() || 0;
        let target = $(this.hash);
        if (!target.length) return;
        let targetY = target.offset().top - header;
        $('html,body').animate({
            scrollTop: targetY
        }, time, 'swing');
        return false;
    });

    // ハンバーガーメニュー
    $(function () {
        $(".js-hamburger").click(function () {
            $(this).toggleClass("is-open");
            if ($(this).hasClass("is-open")) {
                openDrawer();
            } else {
                closeDrawer();
            }
        });

        // backgroundまたはページ内リンクをクリックで閉じる
        $(".js-drawer a[href]").on("click", function () {
            closeDrawer();
        });

        // resizeイベント
        $(window).on('resize', function () {
            if (window.matchMedia("(min-width: 768px)").matches) {
                closeDrawer();
            }
        });
    });

    function openDrawer() {
        $(".js-drawer").addClass("is-open").attr("aria-hidden", "false");
        $(".js-hamburger").addClass("is-open").attr("aria-expanded", "true");
        $("html").addClass("is-fixed");
    }

    function closeDrawer() {
        $(".js-drawer").removeClass("is-open").attr("aria-hidden", "true");
        $(".js-hamburger").removeClass("is-open").attr("aria-expanded", "false");
        $("html").removeClass("is-fixed");
    }

    // modal
    $(".js-modal-open").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var target = $(this).data("target");
            var modal = document.getElementById(target);
            $(modal).fadeIn();
            $("html,body").css("overflow", "hidden");
        });
    });
    $(".js-modal-close").on("click", function () {
        $(".js-modal").fadeOut();
        $("html,body").css("overflow", "initial");
    });

    // 各セクション: section-heading__labelの左端を本文コピー要素の左端に揃える
    var HEADING_LINE_ALIGN_TARGETS = [
        { section: "#values", copy: ".values__copy" },
        { section: "#mission", copy: ".mission__copy-ja" },
        { section: "#projects", copy: ".projects__copy" }
    ];

    function alignHeadingLines() {
        var isPc = window.matchMedia("(min-width: 769px)").matches;

        HEADING_LINE_ALIGN_TARGETS.forEach(function (target) {
            var $section = $(target.section);
            var $line = $section.find(".section-heading__line");
            var $label = $section.find(".section-heading__label");
            var $copy = $section.find(target.copy);

            if (!$line.length || !$label.length || !$copy.length) return;

            if (!isPc) {
                $line.css("width", "");
                return;
            }

            var currentWidth = $line.width();
            var delta = $copy.offset().left - $label.offset().left;
            $line.css("width", currentWidth + delta + "px");
        });
    }

    alignHeadingLines();
    $(window).on("load", alignHeadingLines);
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(alignHeadingLines);
    }

    var headingLineResizeTimer;
    $(window).on("resize", function () {
        clearTimeout(headingLineResizeTimer);
        headingLineResizeTimer = setTimeout(alignHeadingLines, 100);
    });
});