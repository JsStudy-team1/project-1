// 1. 아이디 유효성 검사
// 2. 비밀번호 일치 유무
// 3. 입력창 옮길 때마다 (에러,성공) 메시지 숨기게 하는 기능
// 4. 생년월일 옵션 생성
// 5. 이메일 유효성 검사
// 4. 로컬저장소에 사용자 정보 저장

let userIdInput = document.querySelector('#id')
let failureMsg = document.querySelector('.failure-message')
let successMsg = document.querySelector('.success-message')
let mismatchMsg = document.querySelector('.mismatch-message')
const userPwInput = document.querySelector('#password');
const pwTestInput = document.querySelector('#password-retype')

// 메시지를 숨기는 함수
function hideMessage(element) {
    if (!element.classList.contains('hide')) {
        element.classList.add('hide');
    } 
    } 

    document.getElementById('id').addEventListener('focus', function () {
        hideMessage(document.querySelector('.failure-message'));
        hideMessage(document.querySelector('.success-message'));
    });
    
    document.getElementById('password-retype').addEventListener('focus', function () {
        hideMessage(document.querySelector('.mismatch-message'));
    });
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

    // 생년월일 옵션 생성
    const currentYear = new Date().getFullYear();
    const birthYearSelect = document.getElementById('birth-year');
    const birthMonthSelect = document.getElementById('birth-month');
    const birthDaySelect = document.getElementById('birth-day');

    for (let year = currentYear; year >= currentYear - 100; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        birthYearSelect.appendChild(option);
    }

    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        birthMonthSelect.appendChild(option);
    }

    for (let day = 1; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        birthDaySelect.appendChild(option);
    }

// 이메일 

let emailIdInput = document.getElementById('email-id');
let emailDomainInput = document.getElementById('email-domain');
let emailSelect = document.getElementById('email-select');
let successMessage = document.querySelector('.email-success-message');
let failureMessage = document.querySelector('.email-failure-message');

emailIdInput.addEventListener('input', checkEmptyInput);
emailDomainInput.addEventListener('input', checkEmptyInput);
emailSelect.addEventListener('change', updateEmailDomain);

// 커서가 입력 필드에 들어갈 때
emailIdInput.addEventListener('focus', hideErrorMessage);
emailDomainInput.addEventListener('focus', hideErrorMessage);

// 커서가 입력 필드에서 나갈 때
emailIdInput.addEventListener('blur', validateEmail);
emailDomainInput.addEventListener('blur', validateEmail);

// 이메일 유효성 검사
function validateEmail() {
    let emailId = emailIdInput.value;
    let emailDomain = emailDomainInput.value;
    let email = emailId + '@' + (emailSelect.value === 'type' ? emailDomain : emailSelect.value);

    // 이메일 유효성 검사 정규식
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // 입력창에 아무것도 없을 때, 다 완성되었을 때 에러 메시지 가리기
    if ((email.trim() === '' && emailSelect.value !== 'type') || emailRegex.test(email)) {
        successMessage.classList.add('hide');
        failureMessage.classList.add('hide');
    } else {
        successMessage.classList.add('hide');
        failureMessage.classList.remove('hide');
    }
}

function updateEmailDomain() {
    let selectedValue = emailSelect.value;
    emailDomainInput.value = (selectedValue !== 'type') ? selectedValue : '';
    validateEmail();
}

// 커서가 옮겨지면 숨기는 기능
function hideErrorMessage() {
    successMessage.classList.add('hide');
    failureMessage.classList.add('hide');
}

function checkEmptyInput() {
    validateEmail();
}

// 휴대전화 파트

let phoneInput = document.getElementById('phone');
let phoneError = document.getElementById('phone-error');

phoneInput.addEventListener('input', checkEmptyPhone);

// 커서가 입력 필드에 들어갈 때
phoneInput.addEventListener('focus', hidePhoneError);

// 커서가 입력 필드에서 나갈 때
phoneInput.addEventListener('blur', validatePhone);

// 휴대전화 유효성 검사
function validatePhone() {
    let phone = phoneInput.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    let phoneRegex = /^\d{11}$/; // 11자리 숫자인지 확인

    if (phone.trim() === '' || phoneRegex.test(phone)) {
        phoneError.classList.add('hide');
    } else {
        phoneError.classList.remove('hide');
    }
}

function hidePhoneError() {
    phoneError.classList.add('hide');
}

function checkEmptyPhone() {
    validatePhone();
}

// 회원정보를 로컬 저장소에 저장하는 기능

document.getElementById('submit-area').addEventListener('click', function () {
    // 1. 사용자 정보 수집
    const userId = document.getElementById('id').value;
    const userPassword = document.getElementById('password').value;
    const userName = document.querySelector('#name-area input').value;
    const userBirthYear = document.getElementById('birth-year').value;
    const userBirthMonth = document.getElementById('birth-month').value;
    const userBirthDay = document.getElementById('birth-day').value;

    // 2. 사용자 정보 객체 생성
    const userInfo = {
        userId: userId,
        userPassword: userPassword,
        userName: userName,
        userBirthYear: userBirthYear,
        userBirthMonth: userBirthMonth,
        userBirthDay: userBirthDay,
    };

    // 3. 로컬 스토리지에 정보 저장
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // 4. 사용자 정보 확인을 위해 콘솔에 출력
    console.log('사용자 정보:', userInfo);

    alert("가입되었습니다.")

});
