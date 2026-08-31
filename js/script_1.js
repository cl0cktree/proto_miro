document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. 모바일 사이드 네비게이션 드로어 핵심 인터랙션 엔진
    // ==========================================
    const menuToggle = document.querySelector(".menu-toggle");
    const navMobile = document.querySelector(".nav-mobile");
    const navOverlay = document.querySelector(".nav-mobile-overlay");
    const mobileLinks = document.querySelectorAll(".nav-mobile-links a");
    const bodyEl = document.body;

    // 모바일 메뉴 제어 통합 개폐 함수
    const toggleMobileMenu = () => {
        menuToggle.classList.toggle("active");
        navMobile.classList.toggle("open");
        navOverlay.classList.toggle("active");
        bodyEl.classList.toggle("no-scroll"); // 메뉴가 열려있을 때 뒷배경 바디 스크롤 Lock
    };

    // 햄버거 아이콘 및 딤(Dim) 아웃 레이어 클릭 이벤트 바인딩
    if (menuToggle && navMobile && navOverlay) {
        menuToggle.addEventListener("click", toggleMobileMenu);
        navOverlay.addEventListener("click", toggleMobileMenu);
    }

    // 모바일 메뉴 내부 링크 앵커 클릭 시 자동으로 드로어를 닫아 스크롤 지점을 명확화 처리
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMobile.classList.contains("open")) {
                toggleMobileMenu();
            }
        });
    });


    // ==========================================
    // [ADD] 1-2. 네비게이션 부드러운 스크롤링 (Smooth Scroll) 엔진
    // ==========================================
    // 데스크탑/모바일을 포함하여 '#'으로 시작하는 모든 내부 링크 선택
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            
            // '#' 혼자만 있는 링크는 최상단으로 이동하게 처리하거나 무시 가능
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault(); // 기본 이동 동작 방지
                
                // 해당 엘리먼트 위치로 부드럽게 스크롤 이동
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // ==========================================
    // 2. 숫자 카운트업 애니메이션 (시장 분석 스크롤 연동형 엔진)
    // ==========================================
    const stats = document.querySelectorAll(".stat-number");
    const speed = 200; 

    const startCountUp = (el) => {
        const target = +el.getAttribute("data-target");
        const count = +el.innerText;
        const inc = Math.ceil(target / speed);

        if (count < target) {
            el.innerText = count + inc;
            setTimeout(() => startCountUp(el), 15);
        } else {
            el.innerText = target.toLocaleString(); 
        }
    };

    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target.querySelector(".stat-number");
                if(targetElement) {
                    stats.forEach(stat => startCountUp(stat));
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const marketSection = document.querySelector("#market");
    if(marketSection) {
        observer.observe(marketSection);
    }


    // ==========================================
    // 3. 가상 아바타 인터랙션 시뮬레이션 호버 필터
    // ==========================================
    const wireframeBtn = document.querySelector(".wireframe");
    const renderedBtn = document.querySelector(".rendered");
    const avatarBox = document.querySelector(".avatar-box");

    if (wireframeBtn && renderedBtn) {
        wireframeBtn.addEventListener("mouseover", () => {
            avatarBox.style.background = "#e6f0fa";
            avatarBox.style.borderColor = "#f1c40f";
        });
        
        renderedBtn.addEventListener("mouseover", () => {
            avatarBox.style.background = "#d2e1f0";
            avatarBox.style.borderColor = "#2a5298";
        });
    }
});