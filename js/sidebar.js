const sidebar = document.getElementById("sidebar");

function toggleMenu() {
    sidebar.classList.add("active");
}

// 當滑鼠離開 sidebar 時，關閉它
sidebar.addEventListener("mouseleave", () => {
    sidebar.classList.remove("active");
});