Kakao.init('2517611ca5e48a350f53ae84963b89eb');

function sendMsg(){
    //<![CDATA[
    // // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '딸기 치즈 케익',
            description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
            imageUrl: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
            link: {
                mobileWebUrl: 'https://developers.kakao.com',
                webUrl: 'https://developers.kakao.com'
            }
        },
        social: {
            likeCount: 286,
            commentCount: 45,
            sharedCount: 845
        },
        buttons: [
            {
                title: '웹으로 보기',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                }
            },
            {
                title: '앱으로 보기',
                link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com'
                }
            }
        ]
    });
    //]]>
}