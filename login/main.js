// 1, 클릭 이벤트 생성
// 2. 엔터 이벤트 생성
// 3. 유효성 검사(아이디 비밀번호 둘 다 입력해야 로그인, 아이디와 비빌번호 길이)
// 4. 홈화면으로 가기
// 5. 로그인 3회 이상 실패시 로그인 버튼 disabled된다. 5초후에 다시 재활성화

let loginFailures = 0; //로그인 실패 횟수 초기화

// 엔테 키를 누르면 클릭 이벤트 생성
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        validateAndLogin();
    }
});

// 클릭 이벤트 로그인 
document.getElementById('login-button').addEventListener('click', function () {
    validateAndLogin();
});

// 유효성 검사된 로그인
function validateAndLogin() {
    // 아이디와 비밀번호의 입력 값을 받는다.
    const username = document.getElementById('id').value;
    const password = document.getElementById('pw').value;

    // 유효성 검사 함수 호출
    if (validateLoginForm(username, password)) {

        //로그인 성공시 초기화
        loginFailures = 0;

        // 유효성 통과 시 로그인 처리
        alert('로그인 성공!');

        // 홈으로 넘어가기
        window.location.href = 'home.html';
    } else {
        //로그인 실패 시 실패 횟수 증가
        loginFailures++;
    }
    // 실패 횟수에 따라 로그인 버튼 disabled로 만든다. 3회 정도 기회
    if (loginFailures >= 3) {
        document.getElementById('login-button').disabled = true;
        alert('로그인 실패가 3회 이상으로 일정 시간 후 다시 시도하세요.')

        // 타이머를 사용하여 일정 시간 후에 로그인 버튼을 활성화
        setTimeout(function () {
            document.getElementById('login-button').disabled = false;
        }, 5000)
    }

}

// 유효성 검사 
function validateLoginForm(username, password) {
    // 간단한 예시로 빈 값 체크만 수행//trim() 함수:문자열 공백을 제거할 때 쓰는 함수
    if (username.trim() === '' || password.trim() === '') {
        alert('아이디와 비밀번호를 모두 입력하세요.');
        return false;
    }
// 아이디 길이 체크 (최소 3자 이상)
if (username.length < 3) {
    alert('아이디는 최소 3자 이상이어야 합니다.');
    return false;
}

// 비밀번호 길이 체크 (최소 6자 이상)
if (password.length < 6) {
    alert('비밀번호는 최소 6자 이상이어야 합니다.');
    return false;
}
    // 여기에 추가적인 유효성 검사를 수행할 수 있습니다.

    return true; // 모든 유효성 검사를 통과하면 true 반환
}

