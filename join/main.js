// 1. 아이디 유효성 검사
// 2. 비밀번호 일치
// 3. 입력창 옮길 때마다 (에러,성공) 메시지 숨기게 하는 기능

let userIdInput = document.querySelector('#id')
let failureMsg = document.querySelector('.failure-message')
let successMsg = document.querySelector('.success-message')
let mismatchMsg = document.querySelector('.mismatch-message')
const userPwInput = document.querySelector('#password');
const pwTestInput = document.querySelector('#password-retype')

// 메시지를 숨기는 함수
function hideMessage(element) {
    element.classList.add('hide');
    } 

  // 메시지 요소에 이벤트 핸들러 추가 (마우스 호버 시 숨김)
    document.querySelector('.failure-message').addEventListener('mouseover', function () {
    hideMessage(this);
    });

    document.querySelector('.success-message').addEventListener('mouseover', function () {
    hideMessage(this);
    });

    document.querySelector('.mismatch-message').addEventListener('mouseover', function () {
    hideMessage(this);
    });

    // 생년월일
    document.getElementById('birth-year').addEventListener('change', function () {
        hideMessage(document.querySelector('.birth-error-message'));
        });
    
    document.getElementById('birth-month').addEventListener('change', function () {
        hideMessage(document.querySelector('.birth-error-message'));
        });
    
    document.getElementById('birth-day').addEventListener('change', function () {
        hideMessage(document.querySelector('.birth-error-message'));
        });

  // 입력 필드에 포커스 이벤트 추가 (포커스가 이동하면 메시지를 숨김)
    document.getElementById('id').addEventListener('focus', function () {
    hideMessage(document.querySelector('.failure-message'));
    hideMessage(document.querySelector('.success-message'));
    });

    document.getElementById('password-retype').addEventListener('focus', function () {
    hideMessage(document.querySelector('.mismatch-message'));
    });

    // 아이디, 비빌번호 유효성 검사
    document.addEventListener('keyup', function (event) {
    const target = event.target;

    if (target.matches('#id')) {
        const isSuccess = id4Length(target.value);
        displayMessage(document.querySelector('.success-message'), '사용 가능한 아이디입니다', isSuccess);
        displayMessage(document.querySelector('.failure-message'), '6~20자의 영문 소문자와 숫자만 사용 가능합니다', !isSuccess);
    } else if (target.matches('#password-retype')) {
        const isPasswordMatch = isMatch(document.querySelector('#password').value, target.value);
        displayMessage(document.querySelector('.mismatch-message'), '비밀번호가 일치하지 않습니다', !isPasswordMatch);
    }
    });
    // 조건에 따라 메시지 숨기기
    function displayMessage(element, message, isSuccess) {
    element.textContent = message;
    element.classList.toggle('hide', !isSuccess);
    }

    function id4Length(value) {
    return value.length >= 6;
    }

    function isMatch(password1, password2) {
    return password1 === password2;
    }

    // 생년월일 이벤트
    const birthYearSelect = document.getElementById('birth-year');
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 100; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        birthYearSelect.appendChild(option);
    }

    // 월 옵션 생성
    const birthMonthSelect = document.getElementById('birth-month');
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        birthMonthSelect.appendChild(option);
    }

    // 일 옵션 생성 (1일부터 31일까지)
    const birthDaySelect = document.getElementById('birth-day');
    for (let day = 1; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        birthDaySelect.appendChild(option);
    }