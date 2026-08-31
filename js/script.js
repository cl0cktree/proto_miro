document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. 모바일 사이드 네비게이션 드로어 핵심 인터랙션 엔진
    // ==========================================
    const menuToggle = document.querySelector(".menu-toggle");
    const navMobile = document.querySelector(".nav-mobile");
    const navOverlay = document.querySelector(".nav-mobile-overlay");
    const mobileLinks = document.querySelectorAll(".nav-mobile-links a");
    const bodyEl = document.body;

    const hero = document.getElementById('hero');
    // const slide_img = main_slide.querySelectorAll('.main_slide img');
    // let max_leng = main_slide.querySelectorAll('.main_slide img').length;

    let max_leng;
    let autospeed=3000;
    let i=0;

    function start_s(){
        
        // let count = 0;
        // function checkImage(index) {
        //     // 파일명 규칙에 맞게 패딩 처리 (예: slide_01, slide_02...)            
        //     const fileName = `slide_0${index}.PNG`;
        //     const img = new Image();
        //     let idx_count;
        //     img.onload = function() {
        //         count++;
        //         console.log('in index = '+index);
        //         if(index<4) {
        //             idx_count = index;
        //              console.log('in idx_count = '+idx_count);
        //         }
        //         checkImage(index + 1); // 다음 이미지 확인
        //     };
        //     img.onerror = function() {
        //         // 이미지를 찾을 수 없으면(404) 종료하고 최종 개수 출력
        //         console.log(`확인된 총 slide_0 파일 개수: ${count}`);
        //     };
        //     img.src = `./images/slide/${fileName}`;
        //     max_leng = count;
        // }
        // 1번 파일부터 검사 시작
        // checkImage(1);

        interval = setInterval(function(){
            if(i<4){
                i++;
                // console.log('leng_num = '+i);
            }else{
                i = 1;
            }
            hero.style.backgroundImage='url(./images/slide/slide_0'+i+'.PNG)';
        },autospeed)
    }
    start_s();
    // console.log('max_leng = '+max_leng);

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
    // [UPDATED] 1-2. 맞춤형 스크롤 엔진 (고정 헤더 보정 + 탑버튼 기능 통합)
    // ==========================================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    const SCROLL_DURATION = 500; // 스크롤 애니메이션 지속 시간 (밀리초)
    const HEADER_OFFSET = 78;    // 고정 헤더 가림 방지를 위한 상단 여백 보정값 (px)

    // 부드러운 감속 효과를 위한 Easing 함수 (Cubic EaseInOut)
    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // 공용 스크롤 탑 애니메이션 함수
    const customSmoothScroll = (targetY, duration) => {
        const startPosition = window.pageYOffset || document.documentElement.scrollTop;
        const distance = targetY - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + (distance * easeProgress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        requestAnimationFrame(animation);
    };

    // 일반 네비게이션 내부 링크 이벤트 바인딩
    scrollLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // 대상 엘리먼트 위치 계산 후 헤더 높이(오프셋)만큼 차감
                const startPosition = window.pageYOffset || document.documentElement.scrollTop;
                const absoluteTargetY = targetElement.getBoundingClientRect().top + startPosition;
                const finalTargetY = Math.max(0, absoluteTargetY - HEADER_OFFSET);
                
                customSmoothScroll(finalTargetY, SCROLL_DURATION);
            }
        });
    });

    // --- 탑버튼 동적 노출 및 제어 로직 ---
    const scrollTopBtn = document.querySelector(".scroll-top-btn");

    if (scrollTopBtn) {
        // 스크롤 위치 감지하여 300px 이상 내려오면 탑버튼 표시
        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > 300) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        });

        // 탑버튼 클릭 시 최상단(0)으로 커스텀 스크롤 이동
        scrollTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            customSmoothScroll(0, SCROLL_DURATION);
        });
    }


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
