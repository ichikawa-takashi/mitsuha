gsap.registerPlugin(ScrollTrigger);

const fadeUp = { opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power2.out" };

// ファーストビュー：ロード時に背景→文字の順で表示
gsap.timeline()
    .from(".fv", { opacity: 0, duration: 1, ease: "power1.out" })
    .from(".fv__header, .fv__content", { ...fadeUp, clearProps: "opacity,transform" }, "-=0.3")
    // GSAPのopacityアニメーションとCSSのtransitionが競合しないよう、完了後にホバー用のtransitionを有効化する
    .call(() => document.querySelector(".fv__contact")?.classList.add("is-loaded"));

// お問い合わせボタン：FVのバッジと重なるため、バッジが画面外に出るまでは非表示にする
{
    const fvContact = document.querySelector(".fv__contact");
    const fvBadges = document.querySelector(".fv__badges");

    if (fvContact && fvBadges) {
        ScrollTrigger.create({
            trigger: fvBadges,
            start: "bottom top",
            onEnter: () => fvContact.classList.add("is-visible"),
            onLeaveBack: () => fvContact.classList.remove("is-visible"),
        });
    }
}

// 背景画像セクション：スクロールで背景→文字の順に表示
document.querySelectorAll(".mission, .sdgs, .site-footer").forEach((section) => {
    gsap.timeline({ scrollTrigger: { trigger: section, start: "top 50%" } })
        .from(section, { opacity: 0, duration: 1, ease: "power1.out" })
        .from(section.children, { ...fadeUp }, "-=0.4");
});

// その他のセクション：スクロールで中身をフェードアップ
document.querySelectorAll(".values, .services, .projects, .about").forEach((section) => {
    gsap.from(section.children, {
        ...fadeUp,
        scrollTrigger: { trigger: section, start: "top 50%" },
    });
});

// ScrollTriggerがloadイベントでscrollRestorationを"auto"に戻すため、それより後に上書きする
window.addEventListener("load", () => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
});
