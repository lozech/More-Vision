window.addEventListener("load",()=>{
    document.body.classList.add("loaded");
});
//섹션 변경
    //gnb 탭
const gnbBtns = document.querySelectorAll(".gnb1");
const sectionCards = document.querySelector(".cards");

let isDragging = false;
let startX = 0;
let currentIndex = 0;
const totalSections = gnbBtns.length;
function moveSlide(index){
    currentIndex = index;

    if(currentIndex >= totalSections){
        currentIndex = 0;
    }
    if(currentIndex < 0){
        currentIndex = totalSections - 1;
    }
    sectionCards.style.transition = "transform 0.8s ease";
    sectionCards.style.transform = `translateX(-${currentIndex*100}vw)`;

    gnbBtns.forEach(b => b.classList.remove("toggleH"));
    gnbBtns[currentIndex].classList.add("toggleH");
}

gnbBtns.forEach((btn,index)=>{
    btn.addEventListener("click",()=>{
        moveSlide(index);
    });
});
    //마우스드래그
function dragStart(e){
    if(modalOpen) return;

    isDragging = true;
    startX = e.clientX;
    sectionCards.style.transition = "none";
}

function dragMove(e){
    if(!isDragging) return;

    const moveX = e.clientX - startX;

    sectionCards.style.transform =
        `translateX(calc(${-currentIndex * 100}vw + ${moveX}px))`;
}

function dragEnd(e){
    if(!isDragging) return;

    isDragging = false;

    const moveX = e.clientX - startX;

    if(moveX < -100){
        moveSlide(currentIndex + 1);
    }

    if(moveX > 100){
        moveSlide(currentIndex - 1);
    }
}

sectionCards.addEventListener("mousedown", dragStart);
sectionCards.addEventListener("mousemove", dragMove);
sectionCards.addEventListener("mouseup", dragEnd);
sectionCards.addEventListener("mouseleave", dragEnd);

//nav-btn클릭 시
const previous = document.querySelectorAll(".previous");
const next = document.querySelectorAll(".next");

previous.forEach(pbtn=>{
    pbtn.addEventListener("click",()=>{
        moveSlide(currentIndex - 1);
    });
});
next.forEach(nbtn=>{
    nbtn.addEventListener("click",()=>{
        moveSlide(currentIndex + 1);
    });
});

//스크롤 시 섹션이동
let isScrolling = false;
let modalOpen = false;

sectionCards.addEventListener("wheel",(e)=>{
    if(modalOpen) return;
    e.preventDefault();

    if(isScrolling) return;
    isScrolling = true;
    if(e.deltaY > 0){
        moveSlide(currentIndex + 1);
    }else{
        moveSlide(currentIndex - 1);
    }
    setTimeout(()=>{
        isScrolling = false;
    },700);
},{ passive:false });

// 헤더 언어, sns 서브 메뉴
const toggleSub = document.querySelectorAll(".etc > div");
toggleSub.forEach((subMenu) => {
    const menuP = subMenu.querySelector("p");
    menuP.addEventListener("click",()=>{
        const isOpen = subMenu.classList.contains("sub");
        toggleSub.forEach(m => m.classList.remove("sub"));
        if(!isOpen){
            subMenu.classList.add("sub");
        }
    });
});

    // 카드 호버 시 움직이는 효과
    const cards = document.querySelectorAll(".card-hovers");

    cards.forEach(card => {
        const wrapper = card.closest(".card-wrap");

    card.addEventListener("mousemove", (e) => {
        const slide = card.closest(".swiper-slide");
        if (!slide) return;

        if (card.classList.contains("open")) return;//모달창 열려있을 땐 멈춤

        if (slide.classList.contains("swiper-slide-active")){
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;

        const rotate = -((x / width) - 0.5) * 40;

        card.style.transition = "none";
        card.style.transform = `rotateY(${rotate}deg) translateZ(28px)`;
        card.style.zIndex = "999";
        }
        else {
            card.style.transform = `scale(1.05)`;
            card.style.zIndex = "10";
        }
    });

    card.addEventListener("mouseenter", () => {

        card.style.zIndex = "500";
        const slide = card.closest(".swiper-slide");
        if (!slide) return;

        if (!slide.classList.contains("swiper-slide-active")){
            card.style.transform = "scale(1.08)";
        }

    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `rotateY(0deg) translateZ(0px) scale(1)`;
        card.style.zIndex = "1";
        });
    });
    
    // 카드 마우스커서 
    const aboutCursors = document.querySelectorAll(".about-section .card-hovers")
    aboutCursors.forEach(aboutCursor => {
    aboutCursor.addEventListener("mousedown", () => {
        aboutCursor.classList.add("dragging");
        });
    });
    window.addEventListener("mouseup", () => {
        aboutCursors.forEach(aboutCursor => {
            aboutCursor.classList.remove("dragging");
        });
    });
    const artistCursors = document.querySelectorAll(".artist-section .card-hovers")
    artistCursors.forEach(artistCursor => {
    artistCursor.addEventListener("mousedown", () => {
        artistCursor.classList.add("dragging");
        });
    });
    window.addEventListener("mouseup", () => {
        artistCursors.forEach(artistCursor => {
            artistCursor.classList.remove("dragging");
        });
    });
    const careersCursors = document.querySelectorAll(".careers-section .card-hovers")
    careersCursors.forEach(careersCursor => {
    careersCursor.addEventListener("mousedown", () => {
        careersCursor.classList.add("dragging");
        });
    });
    window.addEventListener("mouseup", () => {
        careersCursors.forEach(careersCursor => {
            careersCursor.classList.remove("dragging");
        });
    });

    // 카드바꾸기, 인디게이터
    function initSwiper(sectionSelector, swiperSelector) {

    const swiper = new Swiper(swiperSelector, {
        effect: "cards",
        grabCursor: true,
        cardsEffect: {
            rotate: false,
            slideShadows: false
        }
    });

    const lines = document.querySelectorAll(`${sectionSelector} .line > div`);

    swiper.on("slideChange", () => {
        lines.forEach(line => line.classList.remove("nation-color"));

        if (lines[swiper.realIndex]) {
            lines[swiper.realIndex].classList.add("nation-color");
        }
    });

    lines.forEach((line, index) => {
        line.addEventListener("click", () => {
            swiper.slideTo(index);
        });
    });

    return swiper;
}

// 각각 섹션 초기화
const aboutSwiper = initSwiper(".about-section", ".about.mySwiper");
const artistSwiper = initSwiper(".artist-section", ".artistscard.mySwiper");
const careersSwiper = initSwiper(".careers-section", ".careers.mySwiper");
const auditionSwiper = initSwiper(".audition-section", ".auditions.mySwiper");

// Jay Park
    const jayIndicator = videoIndicator(
        document.querySelector(".jay-video"),
        document.querySelector(".jay-modal .fa-angle-left"),
        document.querySelector(".jay-modal .fa-angle-right"),
        document.querySelector(".jay-modal .first-page"),
        document.querySelector(".jay-modal .last-page")
    );
    // CHUNGHA
    const chunghaIndicator = videoIndicator(
        document.querySelector(".chungha-video"),
        document.querySelector(".chungha-modal .fa-angle-left"),
        document.querySelector(".chungha-modal .fa-angle-right"),
        document.querySelector(".chungha-modal .first-page"),
        document.querySelector(".chungha-modal .last-page")
    );
    // HoneyJ
    const honeyjIndicator = videoIndicator(
        document.querySelector(".honeyj-video"),
        document.querySelector(".honeyj-modal .fa-angle-left"),
        document.querySelector(".honeyj-modal .fa-angle-right"),
        document.querySelector(".honeyj-modal .first-page"),
        document.querySelector(".honeyj-modal .last-page")
    );
    // HolyBang
    const holyIndicator = videoIndicator(
        document.querySelector(".holy-video"),
        document.querySelector(".holy-modal .fa-angle-left"),
        document.querySelector(".holy-modal .fa-angle-right"),
        document.querySelector(".holy-modal .first-page"),
        document.querySelector(".holy-modal .last-page")
    );
    // MVP
    const mvpIndicator = videoIndicator(
        document.querySelector(".mvp-video"),
        document.querySelector(".mvp-modal .fa-angle-left"),
        document.querySelector(".mvp-modal .fa-angle-right"),
        document.querySelector(".mvp-modal .first-page"),
        document.querySelector(".mvp-modal .last-page")
    );

    // 모달1
    const aboutSection = document.querySelector(".about-section");

    const infoCard = aboutSection.querySelector(".info");
    const readMore = aboutSection.querySelector(".read-card");
    const closeCard = aboutSection.querySelector(".close-card");
    const infoModal = aboutSection.querySelector(".info-modal");
    const closeBtn = aboutSection.querySelectorAll(".close");
    const lineWrap = aboutSection.querySelector(".line");

    const launchCard = aboutSection.querySelector(".launch");
    const launchModal = aboutSection.querySelector(".launch-modal");

    const header = document.querySelector("header");
    const companyBlur = document.querySelectorAll(".company");
    
    const guidehide = aboutSection.querySelectorAll(".nav-btn");
    const cardHide = aboutSection.querySelectorAll(".first-card");
    
    
    function openInfo(){
        modalOpen = true;

        launchCard.style.display = "none";

        infoCard.classList.add("open");
        infoModal.classList.add("show");
        readMore.classList.add("btnhide");
        closeCard.classList.add("btnShow");
        lineWrap.classList.add("line-close");
        header.classList.add("blur1");

        companyBlur.forEach(c => c.classList.add("blur2"));
        guidehide.forEach(g => g.classList.add("guideHide"));
    }
    function closeInfo(){
        modalOpen = false;

        launchCard.style.display = "block";

        infoCard.classList.remove("open");
        infoModal.classList.remove("show");
        closeCard.classList.remove("btnShow");
        readMore.classList.remove("btnhide");
        lineWrap.classList.remove("line-close");
        launchModal.classList.remove("openlaunch");
        header.classList.remove("blur1");

        companyBlur.forEach(c => c.classList.remove("blur2"));
        guidehide.forEach(g => g.classList.remove("guideHide"));
        cardHide.forEach(c => c.style.display = "block");
    }


    infoCard.addEventListener("click", (e) => {
        if (infoCard.classList.contains("open")) return;

        const wrapper = infoCard.closest(".card-wrap");
            wrapper.style.transform = "rotateY(0deg)"; //카드 효과 멈춤

        e.stopPropagation();//event bubbling prevent

        openInfo();
    });

    closeBtn.forEach(btn => {
        btn.addEventListener("click", closeInfo);
    });

    closeCard.addEventListener("click", (e)=>{
        e.stopPropagation();
        
        closeInfo();
    });

    // launch modal
    launchCard.addEventListener("click", (e) => {
        modalOpen = true;

        if (launchCard.classList.contains("openlaunch")) return;
        e.stopPropagation();//event bubbling prevent

        cardHide.forEach(card => {
            card.style.display = "none";
        });
        launchModal.classList.add("openlaunch");
        lineWrap.classList.add("line-close");
        guidehide.forEach(guide => {
                guide.classList.add("guideHide");
        });
        header.classList.add("blur1");
        companyBlur.forEach(company => {
            company.classList.add("blur2");
        });
    });

    // 모달2
    const artistcards = document.querySelectorAll(".second-card");
    const artistmodals = document.querySelectorAll(".artist-modal");
    const closeBtns = document.querySelectorAll(".artist-modal .close");
    const readBtns = document.querySelectorAll(".artist-section .read-card");
    const closeCards = document.querySelectorAll(".artist-section .close-card");
    const navBtns = document.querySelectorAll(".artist-section .nav-btn");
    const lineWrap2 = document.querySelector(".artist-section .line");

    artistcards.forEach((artistcard, index) => {
        artistcard.addEventListener("click", () => {
            modalOpen = true;

            const wrapper = artistcard.closest(".card-wrap");
            wrapper.style.transform = "rotateY(0deg)";

            artistcard.classList.add("open");
            artistmodals[index].classList.add("show");

            readBtns[index].classList.add("btnhide");
            closeCards[index].classList.add("btnShow");

            artistmodals[index].classList.add("show");

            setTimeout(()=>{
                artistmodals[index].initIndicator();
            },50);

            artistcards.forEach((c, i) => {
            if(i !== index){
                c.style.display = "none";
            }
            });
            navBtns.forEach(btn=>{
                btn.classList.add("guideHide");
            });
            header.classList.add("blur1");
            companyBlur.forEach(company => {
                company.classList.add("blur2");
            });
            lineWrap2.classList.add("line-close");
        });
    });
    const artcloseBtns = document.querySelectorAll(".artist-modal .close");
    
    artcloseBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            modalOpen = false;

            jayIndicator.reset();
            chunghaIndicator.reset();
            holyIndicator.reset();
            honeyjIndicator.reset();
            mvpIndicator.reset();
            artistcards[index].classList.remove("open");
            artistmodals[index].classList.remove("show");

            readBtns[index].classList.remove("btnhide");
            closeCards[index].classList.remove("btnShow");

            artistcards.forEach(artistcard=>{
                artistcard.style.display="block";
            });
            navBtns.forEach(btn=>{
                btn.classList.remove("guideHide");
            });
            header.classList.remove("blur1");
            companyBlur.forEach(company => {
                company.classList.remove("blur2");
            });
            lineWrap2.classList.remove("line-close");
        }); 
    });
    closeCards.forEach((btn,index)=>{

        btn.addEventListener("click",(e)=>{
            modalOpen = false;

            e.stopPropagation();
            jayIndicator.reset();
            chunghaIndicator.reset();
            holyIndicator.reset();
            honeyjIndicator.reset();
            mvpIndicator.reset();
            artistcards[index].classList.remove("open");
            artistmodals[index].classList.remove("show");
            btn.classList.remove("btnShow");
            readBtns[index].classList.remove("btnhide");
            artistcards.forEach(artistcard=>{
                    artistcard.style.display="block";
                });
            navBtns.forEach(btn=>{
                btn.classList.remove("guideHide");
            });
            header.classList.remove("blur1");
            companyBlur.forEach(company => {
                company.classList.remove("blur2");
            });
            lineWrap2.classList.remove("line-close");
        });
    });

    //music-video 

        const videoWraps = document.querySelectorAll(".artist-video");
        videoWraps.forEach(videoWrap => {
            const videos = videoWrap.querySelectorAll("a");
            let isDown = false;
            let lastX;
            let isDragging = false;

            
            videoWrap.addEventListener("mousedown",(e)=>{
                isDown = true;
                lastX = e.clientX;
                isDragging = false;
            });
            window.addEventListener("mouseup",()=>{
                isDown = false;
            });
            videoWrap.addEventListener("mousemove",(e)=>{
                if(!isDown) return;
                e.preventDefault();
                const delta = e.clientX - lastX;
                if(Math.abs(delta) > 3){
                    isDragging = true;
                }
                videoWrap.scrollLeft -= delta;
                lastX = e.clientX;
            });
            videos.forEach(link => {
                link.addEventListener("click",(e)=>{
                    if(isDragging){
                        e.preventDefault();
                    }
                });
            });
        });

        // 뮤비 인디게이터
        function videoIndicator(videoWrap, prevBtn, nextBtn, firstPage, lastPage){
        const videos = videoWrap.querySelectorAll("a");
        let currentPage = 1;
        let moveWidth = 0;
        let totalPages = 0;
        function initIndicator(){
            const pageWidth = videos[0].offsetWidth + 5;
            const containerWidth = videoWrap.parentElement.offsetWidth;
            const perPage = Math.max(1, Math.floor(containerWidth / pageWidth));
            totalPages = Math.ceil(videos.length / perPage);
            moveWidth = pageWidth * perPage;
            lastPage.textContent = totalPages;
            firstPage.textContent = 1;
            prevBtn.classList.add("map-color");
        }
        initIndicator();
        function pageMove(page){
            videoWrap.scrollTo({
                left: (page - 1) * moveWidth,
                behavior: "smooth"
            });
            firstPage.textContent = page;
            if(page <= 1){
                prevBtn.classList.add("map-color");
            } else {
                prevBtn.classList.remove("map-color");
            }
        }
        nextBtn.addEventListener("click", () => {
            if(currentPage >= totalPages) return;
            currentPage++;
            pageMove(currentPage);
        });
        prevBtn.addEventListener("click", () => {
            if(currentPage <= 1) return;
            currentPage--;
            pageMove(currentPage);
        });
        videoWrap.addEventListener("scroll", () => {
            const page = Math.round(videoWrap.scrollLeft / moveWidth) + 1;
            if(page !== currentPage){
                currentPage = page;
                firstPage.textContent = currentPage;
                if(currentPage <= 1){
                    prevBtn.classList.add("map-color");
                } else {
                    prevBtn.classList.remove("map-color");
                }
            }
        });
        function reset(){

        currentPage = 1;
        videoWrap.scrollLeft = 0;
        firstPage.textContent = 1;
        prevBtn.classList.add("map-color");

    }

    return { reset };
    }
    

    //모달3
    const careersSection = document.querySelector(".careers-section");

    const careersCard = careersSection.querySelectorAll(".third-card");
    const readMore3 = careersSection.querySelectorAll(".read-card");
    const closeCard3 = careersSection.querySelectorAll(".close-card");
    const careersModal = careersSection.querySelectorAll(".careers-modal");
    const closeBtn3 = careersSection.querySelectorAll(".careers-modal .close");
    const lineWrap3 = careersSection.querySelector(".line");

    const guidehide3 = careersSection.querySelectorAll(".nav-btn");
    
    function openInfo3(index){
        modalOpen = true;

        careersCard[index].classList.add("open");
        careersModal[index].classList.add("show")
        readMore3[index].classList.add("btnhide");
        closeCard3[index].classList.add("btnShow");
        lineWrap3.classList.add("line-close");

        header.classList.add("blur1");
        companyBlur.forEach(c => c.classList.add("blur2"));

        guidehide3.forEach(g => g.classList.add("guideHide"));
        careersCard.forEach((card, i) => {
            if(i !== index){
                card.style.display = "none";
            }
            });
    }
    function closeInfo3(index){
        modalOpen = false;

        careersCard[index].classList.remove("open");
        careersModal[index].classList.remove("show");

        readMore3[index].classList.remove("btnhide");
        closeCard3[index].classList.remove("btnShow");

        lineWrap3.classList.remove("line-close");

        header.classList.remove("blur1");
        companyBlur.forEach(c => c.classList.remove("blur2"));
        guidehide3.forEach(g => g.classList.remove("guideHide"));

        careersCard.forEach(c=>{
            c.style.display="block";
        });
    }


    careersCard.forEach((card,index)=>{
        card.addEventListener("click",(e)=>{
            modalOpen = true;

            if(card.classList.contains("open")) return;

            const wrapper = card.closest(".card-wrap");
            wrapper.style.transform = "rotateY(0deg)";

            e.stopPropagation();

            openInfo3(index);
        });
    });

    closeBtn3.forEach((btn,index)=>{
        btn.addEventListener("click",()=>{
            modalOpen = false;

            closeInfo3(index);
        });
    });

    closeCard3.forEach((btn,index)=>{
        btn.addEventListener("click",(e)=>{
            modalOpen = false;

            e.stopPropagation();
            closeInfo3(index);
        });
    });

    // 채용모달 채용 사이트 이동 버튼
    const select = document.getElementById("jobSelect");
    const btn = document.getElementById("goBtn");
select.addEventListener("change", () => {
    if(select.value){
        btn.disabled = false;
    }
});

btn.addEventListener("click", () => {
    window.open(select.value, "_blank");
});