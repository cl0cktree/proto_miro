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
    // [MODIFIED] 1-2. 맞춤형 스크롤 속도 제어 엔진 (Scroll Top 이용)
    // ==========================================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    // 🎛️ 스크롤 애니메이션 지속 시간 (밀리초 단위, 1000 = 1초)
    const SCROLL_DURATION = 800; 

    // 부드러운 감속 효과를 위한 Easing 함수 (Cubic EaseInOut)
    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const customSmoothScroll = (targetElement, duration) => {
        // 현재 브라우저의 Y축 스크롤 시작 위치 구하기
        const startPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // 대상 엘리먼트의 절대 위치 구하기
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
        
        // 이동해야 할 총 거리
        const distance = targetPosition - startPosition;
        
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            
            // 현재 진행 흐름율 계산 (0 ~ 1)
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing 필터를 적용하여 부드러운 속도 곡선 생성
            const easeProgress = easeInOutCubic(progress);

            // 실제 브라우저의 scrollTop 위치 변경 이동 처리
            window.scrollTo(0, startPosition + (distance * easeProgress));

            // 목적지 시간에 도달할 때까지 반복 호출
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // 이벤트 바인딩
    scrollLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                // 커스텀 스크롤 함수 실행 (대상 요소, 지속 시간)
                customSmoothScroll(targetElement, SCROLL_DURATION);
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
