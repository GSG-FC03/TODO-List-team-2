// Light and dark mode
const themeSwitcher = document.getElementById("checkbox");
themeSwitcher.onclick = function () {

    let dark = Array.from(document.querySelectorAll(".list , .label , .borderDark , .select-selected , .lineBelow , .below"));
    let listDark = Array.from(document.querySelectorAll(".list"));
    let checkk = Array.from(document.querySelectorAll("input[type=\"checkbox\"]"));
    let currentTheme = document.documentElement.getAttribute("data-theme");
    let switchToTheme;

    switchToTheme = currentTheme === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", switchToTheme);

    dark.forEach(el => {
        el.classList.toggle("noborder");
    })

    checkk.forEach(el => {
        el.classList.toggle("noborder");
        if (getComputedStyle(el).border == "0px none rgb(13, 22, 29)")
            el.style.border = "1px solid #e6e6e6"
        else
            el.style.border = "none";

    })
}
