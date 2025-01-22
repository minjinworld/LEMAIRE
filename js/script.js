document.addEventListener(`DOMContentLoaded`, function () {
  // AOS
  AOS.init();

  // 마우스 휠 헤더 이벤트
  // .header_area 가 휠이 내려갈때는 안보이다가 올라갈때 보이게끔 설정
  // scroll 이라는 클래스 추가제거로 조절
  window.addEventListener(`wheel`, (event) => {
    const headerArea = document.querySelector(`.header_area`);

    if (event.deltaY > 0) {
      // wheel down
      headerArea.classList.remove(`scroll`);
    } else {
      // wheel up
      headerArea.classList.add(`scroll`);
    }
  });

  // body 에 배경색 조정(sec_2)
  // 스크롤 이벤트 offsetTop 값 활용
  const sec2 = document.querySelector(`.sec_2`);
  const sec3 = document.querySelector(`.sec_3`);

  window.addEventListener(`scroll`, () => {
    const sec2OffsetTop = sec2.offsetTop - 500;
    const sec3OffsetTop = sec3.offsetTop;

    const scrollTop = window.scrollY;
    console.log(scrollTop);

    const bodyBg = document.querySelector(`body`);

    // 스크롤상단값이 sec2의 상단위치값보다 크고 스크롤상단값이 sec2의 상단위치값보다 작다면 body 에 클래스 추가
    if (scrollTop > sec2OffsetTop && scrollTop < sec3OffsetTop) {
      bodyBg.classList.add(`bg`);
    } else {
      bodyBg.classList.remove(`bg`);
    }
  });

  // swiper(sec_3)
  // 세로로 굴러가는 스와이퍼
  var swiper = new Swiper(".ceoSwiper", {
    direction: "vertical",
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false, // 다른 인터렉션이 있을때 자동재생을 멈추는 것을 방지
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // sub_menu : 마우스 올리면 카테고리에 맞는 탭 활성화
  const submenuTab = document.querySelectorAll(`.main_menu li`);
  const submenuBox = document.querySelector(`.sub_menu_box`);

  for (const li of submenuTab) {
    li.addEventListener(`mouseenter`, function () {
      submenuBox.classList.add(`active`);

      // 탭메뉴 연결
      const liData = this.getAttribute(`data-tab`);
      const subMenu = document.querySelectorAll(`.sub_menu`);

      // 전체적으로 서브메뉴 추가되어있으면 먼저 제거
      for (const tabContent of subMenu) {
        tabContent.classList.remove(`active`);
      }

      // data-tab 에 작성된 데이터명과 동일한 아이디명을 가진 서브메뉴는 출력
      // const changeTab = document.getElementById(liData);
      const changeTab = document.querySelector(`#${liData}`);

      changeTab.classList.add(`active`);
    });
  }

  // 서브메뉴박스에서 마우스 나가면 서브메뉴박스가 없어지게 설정
  submenuBox.addEventListener(`mouseleave`, function () {
    this.classList.remove(`active`);
  });

  // 상단이동버튼
  // 기존에는 투명하게 안보이다가 300px 이상일때 top_btn 보여지게끔(css에서 클래스명 설정해주고 진행)
  const topBtn = document.querySelector(`.top_btn`);

  window.addEventListener(`scroll`, function () {
    const scrollTop = window.scrollY;

    if (scrollTop >= 300) {
      topBtn.classList.add(`on`);
    } else {
      topBtn.classList.remove(`on`);
    }
  });

  topBtn.addEventListener(`click`, () => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  });

  // 작은 그리드에서 햄버거버튼 메인메뉴 출력
  const menuBtn = document.querySelector(`#hamburger`);
  const mainMenu = document.querySelector(`.main_menu`);

  menuBtn.addEventListener(`click`, function () {
    this.classList.toggle(`active`);
    // mainMenu.classList.toggle(`active`);
    // contains 활용해서 메인메뉴를 메뉴버튼 active가 있을때 추가 아니면 제거
    const hasClass = this.classList.contains(`active`);

    if (hasClass) {
      mainMenu.classList.add(`active`);
    } else {
      mainMenu.classList.remove(`active`);
    }
  });
});
