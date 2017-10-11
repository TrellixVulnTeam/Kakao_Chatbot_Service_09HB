/**
 * Created by haams on 2017-08-29.
 */
var express = require("express");
var router = express.Router();
var Message = require("./message");
var message = {};
var MessageDB = require("../models/messageDB");
var index = 0;
var assert = require("assert");
// part / dest 저장
var mapNum1 = new Map();
var setImgCam1 = {};
var setImgCam2 = {};
var subindex1 = 0;
var subindex2 = 0;
var subindex3 = 0;


var subIdxMap = new Map();
var sCode = "";
var NodeWebCam = require("node-webcam");


//var Camera = require("./service/camera");


module.exports = function (router) {

// database connection

    var checkUserKey = (req, res, next) => {
        if (req.body.user_key != undefined) {
            console.log(req.body.user_key);
            next();
        } else {
            console.log("user key is not exist");
            res.status(500).send({error: 'user_key is invalid'});
        }
    };

    function hurt_part_check() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     병원 분류해서 15개로 추려서 정리할 것
                     */
                    "사진으로 아픈 부위 알리기",
                    "아픈 부위 선택 하기"
                ]
            }
        };

        mapNum1.set(setImgCam1, message.keyboard.buttons[0]);
    };

    function hurt_part_select() {
        message = {
            "message": {
                "text": "아픈 부위를 선택해주세요"
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     병원 분류해서 15개로 추려서 정리할 것
                     */
                    "목",
                    "코",
                    "눈",
                    "심장",
                    "허리",
                    "팔목",
                    "발목",
                    "기관지",
                    "배",
                    "머리",
                    "위",
                    "간",
                    "장",
                    "주요부위"
                ]
            }
        };
        subindex3 = 2;
    }

    function hurt_part_select_db_check(part) {
        console.log(part + "부위 다침");
        /*
        SQL 서버에서 쿼리문을 통해서 부위에 맞게 덴덴         */
    }

    function hos_close_here() {
        /*
         구로 나누기 / 동으로 나누기
         */
        sendLocNowInfo();
    }

// 카메라 연동
    function cam_record_connection() {
        message = {
            "message": {
                "text": "보여질 부위 사진을 보내주세요"
            },
            "keyboard": {
                "type": "text"
            }
        };
        subindex3 = 1;
    }

    function check_vision_byAI(reply) {
        console.log(reply);
        /*
         google -> vision.api & tensorflow 적용해서 부위 불러오기.
         */
    }

    function setLocation1() { // 구
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    "강남구",
                    "강동구",
                    "강북구",
                    "강서구",
                    "관악구",
                    "광진구",
                    "구로구",
                    "금천구",
                    "노원구",
                    "도봉구",
                    "동대문구",
                    "동작구",
                    "마포구",
                    "서대문구",
                    "서초구",
                    "성동구",
                    "성북구",
                    "송파구",
                    "양천구",
                    "영등포구",
                    "용산구",
                    "은평구",
                    "종로구",
                    "중구",
                    "중랑구"
                ]
            }
        };
    }

    function setBtnGangNam() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "개포동",
                    "논현동",
                    "대치동",
                    "도곡동",
                    "삼성동",
                    "세곡동",
                    "수서동",
                    "신사동",
                    "압구정동",
                    "역삼동",
                    "율현동",
                    "일원동",
                    "자곡동",
                    "청담동"

                ]
            }
        };
    }

    function setBtnGangDong() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "강일동",
                    "고덕동",
                    "길동",
                    "둔촌동",
                    "명일동",
                    "상일동",
                    "성내동",
                    "암사동",
                    "천호동"
                ]
            }
        };
    }

    function setBtnGangBuk() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "미아동",
                    "번동",
                    "수유동",
                    "우이동",
                ]
            }
        };
    }

    function setBtnGangSeo() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "가양동",
                    "개화동",
                    "공항동",
                    "과해동",
                    "내발산동",
                    "등촌동",
                    "마곡동",
                    "방화동",
                    "염창동",
                    "오곡동",
                    "오쇠동",
                    "외발산동",
                    "화곡동"
                ]
            }
        };
    }

    function setBtnGwanAk() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "남현동",
                    "봉천동",
                    "신림동"
                ]
            }
        };
    }

    function setBtnGwangJin() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "광장동",
                    "구의동",
                    "군자동",
                    "능동",
                    "자양동",
                    "중곡동",
                    "화양동"
                ]
            }
        };
    }

    function setBtnGuro() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "가리봉동",
                    "개봉동",
                    "고척동",
                    "구로동",
                    "궁동",
                    "신도림동",
                    "오류동",
                    "온수동",
                    "천왕동",
                    "항동"
                ]
            }
        };
    }

    function setBtnGeumChun() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "가산동",
                    "독산동",
                    "시흥동"
                ]
            }
        };
    }

    function setBtnNoWon() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "공릉동",
                    "상계동",
                    "월계동",
                    "중계동",
                    "하계동"
                ]
            }
        };
    }

    function setBtnDoBong() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "도봉동",
                    "방학동",
                    "쌍문동",
                    "창동"
                ]
            }
        };
    }

    function setBtnDongDaeMun() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "답십리동",
                    "신설동",
                    "용두동",
                    "이문동",
                    "장안동",
                    "전농동",
                    "제기동",
                    "청량리동",
                    "회기동",
                    "휘경동"
                ]
            }
        };
    }

    function setBtnDongJak() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "노량진동",
                    "대방동",
                    "동작동",
                    "본동",
                    "사당동",
                    "상도1동",
                    "상도동",
                    "신대방동",
                    "흑석동"
                ]
            }
        };
    }

    function setBtnMaPo() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "공덕동",
                    "구수동",
                    "노곤산동",
                    "당인동",
                    "대흥동",
                    "도화동",
                    "동교동",
                    "마포동",
                    "망원동",
                    "상수동",
                    "상암동",
                    "서교동",
                    "성산동",
                    "산공덕동",
                    "신수동",
                    "신정동",
                    "아현동",
                    "연남동",
                    "염리동",
                    "용강동",
                    "중동",
                    "창전동",
                    "토정동",
                    "하중동",
                    "합정동",
                    "현석동"

                ]
            }
        };
    }

    function setBtnSeoDaeMun() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "남가좌동",
                    "냉천동",
                    "대신동",
                    "대현동",
                    "미근동",
                    "봉원동",
                    "북가좌동",
                    "북아현동",
                    "신촌동",
                    "연희동",
                    "영천동",
                    "옥천동",
                    "창천동",
                    "천연동",
                    "충정로2가",
                    "충정로3가",
                    "합동",
                    "현저동",
                    "홍은동",
                    "홍제동"
                ]
            }
        };
    }

    function setBtnSeoCho() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "내곡동",
                    "반포동",
                    "방배동",
                    "서초동",
                    "신원동",
                    "양재동",
                    "염곡동",
                    "우면동",
                    "원지동",
                    "잠원동"
                ]
            }
        };
    }

    function setBtnSeongDong() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "금호동1가",
                    "금호동2가",
                    "금호동3가",
                    "금호동4가",
                    "도선동",
                    "마장동",
                    "사근동",
                    "상왕십리동",
                    "성수동1가",
                    "성수동2가",
                    "송정동",
                    "옥수동",
                    "용답동",
                    "응봉동",
                    "하왕십리동",
                    "행당동",
                    "홍익동"

                ]
            }
        };
    }


    function setBtnSeongBuk() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "길음동",
                    "돈암동",
                    "동선동1가",
                    "동선동2가",
                    "동선동3가",
                    "동선동4가",
                    "동선동5가",
                    "동소문동1가",
                    "동소문동2가",
                    "동소문동3가",
                    "동소문동4가",
                    "동소문동5가",
                    "동소문동6가",
                    "동소문동7가",
                    "보문동1가",
                    "보문동2가",
                    "보문동3가",
                    "보문동4가",
                    "보문동5가",
                    "보문동6가",
                    "보문동7가",
                    "삼선동1가",
                    "삼선동2가",
                    "삼선동3가",
                    "삼선동4가",
                    "삼선동5가",
                    "상월곡동",
                    "석관동",
                    "성북동",
                    "성북동1가",
                    "안암동1가",
                    "안암동2가",
                    "안암동3가",
                    "안암동4가",
                    "안암동5가",
                    "장위동",
                    "정릉동",
                    "종암동",
                    "하월곡동"

                ]
            }
        };
    }


    function setBtnSongPa() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "가락동",
                    "거여동",
                    "마천동",
                    "문정동",
                    "방이동",
                    "삼전동",
                    "석촌동",
                    "송파동",
                    "신천동",
                    "오금동",
                    "잠실동",
                    "장지동",
                    "풍납동"

                ]
            }
        };
    }


    function setBtnYangChun() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "목동",
                    "신월동",
                    "신정동"
                ]
            }
        };
    }


    function setBtnYeongDeungPo() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "당산동",
                    "당산동1가",
                    "당산동2가",
                    "당산동3가",
                    "당산동4가",
                    "당산동5가",
                    "당산동6가",
                    "대림동",
                    "도림동",
                    "문래동1가",
                    "문래동2가",
                    "문래동3가",
                    "문래동4가",
                    "문래동5가",
                    "문래동6가",
                    "신길동",
                    "양평동",
                    "양평동1가",
                    "양평동2가",
                    "양평동3가",
                    "양평동4가",
                    "양평동5가",
                    "양평동6가",
                    "양화동",
                    "여의도동",
                    "영등포동",
                    "영등포동1가",
                    "영등포동2가",
                    "영등포동3가",
                    "영등포동4가",
                    "영등포동5가",
                    "영등포동6가",
                    "영등포동7가",
                    "영등포동8가"
                ]
            }
        };
    }


    function setBtnYongSan() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "갈월동",
                    "남영동",
                    "도원동",
                    "동빙고동",
                    "동자동",
                    "문배동",
                    "보광동",
                    "산천동",
                    "서계동",
                    "서빙고동",
                    "신계동",
                    "신창동",
                    "용문동",
                    "용산동1가",
                    "용산동2가",
                    "용산동3가",
                    "용산동4가",
                    "용산동5가",
                    "용산동6가",
                    "원효로1가",
                    "원효로2가",
                    "원효로3가",
                    "원효로4가",
                    "이촌동",
                    "이태원동",
                    "주성동",
                    "청암동",
                    "청파동1가",
                    "청파동2가",
                    "청파동3가",
                    "한강로1가",
                    "한강로2가",
                    "한강로3가",
                    "한남동",
                    "효창동",
                    "후암동"

                ]
            }
        };
    }


    function setBtnEunPyeong() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "갈현동",
                    "구산동",
                    "녹번동",
                    "대조동",
                    "불광동",
                    "수색동",
                    "신사동",
                    "역촌동",
                    "응암동",
                    "증산동",
                    "진관동"
                ]
            }
        };
    }


    function setBtnJongRo() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "가회동",
                    "견지동",
                    "경운동",
                    "계동",
                    "공평동",
                    "관수동",
                    "관철동",
                    "관훈동",
                    "교남동",
                    "교북동",
                    "구기동",
                    "궁정동",
                    "권농동",
                    "낙원동",
                    "내수동",
                    "내자동",
                    "누상동",
                    "누하동",
                    "당주동",
                    "도렴동",
                    "돈의동",
                    "동숭동",
                    "명륜1가",
                    "명륜2가",
                    "명륜3가",
                    "명륜4가",
                    "묘동",
                    "무악동",
                    "봉익동",
                    "부암동",
                    "사간동",
                    "사직동",
                    "삼청동",
                    "서린동",
                    "세종로",
                    "소격동",
                    "송월동",
                    "송현동",
                    "수송동",
                    "숭인동",
                    "신교동",
                    "신문로1가",
                    "신문로2가",
                    "신영동",
                    "안국동",
                    "연건동",
                    "연지동",
                    "예지동",
                    "옥인동",
                    "와룡동",
                    "운니동",
                    "원남동",
                    "원서동",
                    "이화동",
                    "익선동",
                    "인사동",
                    "인의동",
                    "장사동",
                    "재동",
                    "적선동",
                    "종로1가",
                    "종로2가",
                    "종로3가",
                    "종로4가",
                    "종로5가",
                    "종로6가",
                    "중학동",
                    "창성동",
                    "창신동",
                    "청운동",
                    "청진동",
                    "체부동",
                    "충신동",
                    "통의동",
                    "통인동",
                    "팔판동",
                    "평동",
                    "평창동",
                    "필운동",
                    "행촌동",
                    "혜화동",
                    "홍지동",
                    "홍파동",
                    "화동",
                    "효자동",
                    "효제동",
                    "훈정동"

                ]
            }
        };
    }


    function setBtnJoongGu() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "광희동1가",
                    "광희동2가",
                    "남대문로1가",
                    "남대문로2가",
                    "남대문로3가",
                    "남대문로4가",
                    "남대문로5가",
                    "남산동1가",
                    "남산동2가",
                    "남산동3가",
                    "남창동",
                    "남학동",
                    "다동",
                    "만리동1가",
                    "만리동2가",
                    "명동1가",
                    "명동2가",
                    "무교동",
                    "무학동",
                    "묵정동",
                    "방산동",
                    "봉래동1가",
                    "봉래동2가",
                    "북창동",
                    "산림동",
                    "삼각동",
                    "서소문동",
                    "소공동",
                    "수표동",
                    "수하동",
                    "순화동",
                    "신당동",
                    "쌍림동",
                    "예관동",
                    "예장동",
                    "오장동",
                    "을지로1가",
                    "을지로2가",
                    "을지로3가",
                    "을지로4가",
                    "을지로5가",
                    "을지로6가",
                    "을지로7가",
                    "의주로1가",
                    "의주로2가",
                    "인현동1가",
                    "인현동2가",
                    "입정동",
                    "장교동",
                    "장충동1가",
                    "장충동2가",
                    "저동1가",
                    "저동2가",
                    "정동",
                    "주교동",
                    "주자동",
                    "중림동",
                    "초동",
                    "충무로1가",
                    "충무로2가",
                    "충무로3가",
                    "충무로4가",
                    "충무로5가",
                    "충정로1가",
                    "태평로1가",
                    "태평로2가",
                    "필동1가",
                    "필동2가",
                    "필동3가",
                    "황학동",
                    "회현동1가",
                    "회현동2가",
                    "회현동3가",
                    "흥인동"

                ]
            }
        };
    }


    function setBtnJoongRang() {
        message = {
            "message": {
                "text": "가야할 병원을 선택해주세요."
            },
            "keyboard": {
                "type": "buttons",
                "buttons": [
                    /*
                     동
                     */
                    "망우동",
                    "면목동",
                    "묵동",
                    "상봉동",
                    "신내동",
                    "중화동"
                ]
            }
        };
    }


    function sendLocNowInfo() {
        message = {
            "message": {
                "text": "현재 위치를 체크합니다.",
                "photo": {
                    "url": "http://cfile30.uf.tistory.com/image/223CD847573EC9F433D6A3",
                    "width": 640,
                    "height": 480
                },
                "message_button": {
                    "label": "위치 확인",
                    "url": "http://map.daum.net/?eX=523953&eY=1084098&eName=%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%8C%90%EA%B5%90%EC%98%A4%ED%94%BC%EC%8A%A4"
                    /*
                     "label":"위치 확인",
                     "url": "http://52.79.83.51:2721/map"
                     */
                }
            }
        };
    };

    function setAddressReply(subindex1, reply2) {
        sCode = subindex1 + reply2;
        console.log(sCode);

        /*
         공공데이터 크롤링 시에 sCode를 스키마에 추가할 것 (구 : 번호 / 동 : 이름) == 구+번호 == sCode
         */
    }


    function save_second_reply(reply) {
        console.log("되낭?");
        console.log(reply + "22");
        var message2 = new MessageDB();

        if (index == 1) {
            if (reply == "사진으로 아픈 부위 알리기") {
                // 두 번째 질문과 겹치지 않게 하기 위함.
                subindex2 = 1;
                subindex1 = 26;
                cam_record_connection();
            }
            else if (reply == "아픈 부위 선택 하기") {
                subindex2 = 2;
                subindex1 = 27;
                hurt_part_select();
            }
        } else if (index == 2) {
            /*
             GPS 정보 키면서 지도로 바로 연동
             */
            /*
             두 번째 질문에서 버튼 클릭했을 때임!!
             */
            switch (reply) {
                case "강남구": {
                    subindex1 = 1;
                    setBtnGangNam();
                    break;
                }

                case "강동구": {
                    subindex1 = 2;
                    setBtnGangDong();
                    break;
                }

                case "강북구": {
                    subindex1 = 3;
                    setBtnGangBuk();
                    break;
                }

                case "강서구": {
                    subindex1 = 4;
                    setBtnGangSeo();
                    break;
                }

                case "관악구": {
                    subindex1 = 5;
                    setBtnGwanAk();
                    break;
                }

                case "광진구": {
                    subindex1 = 6;
                    setBtnGwangJin();
                    break;
                }

                case "구로구": {
                    subindex1 = 7;
                    setBtnGuro();
                    break;
                }

                case "금천구": {
                    subindex1 = 8;
                    setBtnGeumChun();
                    break;
                }

                case "노원구": {
                    subindex1 = 9;
                    setBtnNoWon();
                    break;
                }

                case "도봉구": {
                    subindex1 = 10;
                    setBtnDoBong();
                    break;
                }

                case "동대문구": {
                    subindex1 = 11;
                    setBtnDongDaeMun();
                    break;
                }

                case "동작구": {
                    subindex1 = 12;
                    setBtnDongJak();
                    break;
                }

                case "마포구": {
                    subindex1 = 13;
                    setBtnMaPo();
                    break;
                }

                case "서대문구": {
                    subindex1 = 14;
                    setBtnSeoDaeMun();
                    break;
                }

                case "서초구": {
                    subindex1 = 15;
                    setBtnSeoCho();
                    break;
                }

                case "성동구": {
                    subindex1 = 16;
                    setBtnSeongDong();
                    break;
                }

                case "성북구": {
                    subindex1 = 17;
                    setBtnSeongBuk();
                    break;
                }

                case "송파구": {
                    subindex1 = 18;
                    setBtnSongPa();
                    break;
                }

                case "양천구": {
                    subindex1 = 19;
                    setBtnYangChun();
                    break;
                }

                case "영등포구": {
                    subindex1 = 20;
                    setBtnYeongDeungPo();
                    break;
                }

                case "용산구": {
                    subindex1 = 21;
                    setBtnYongSan();
                    break;
                }

                case "은평구": {
                    subindex1 = 22;
                    setBtnEunPyeong();
                    break;
                }
                case "종로구": {
                    subindex1 = 23;
                    setBtnJongRo();
                    break;
                }

                case "중구": {
                    subindex1 = 24;
                    setBtnJoongGu();
                    break;
                }

                case "중랑구": {
                    subindex1 = 25;
                    setBtnJoongRang();
                    break;
                }
            }
            //  var setLocationService = new SetLocationService(router,reply);
        } else {
            // nothing
        }
    }


    router.post("/message", checkUserKey, function (req, res) {
        const _obj = {
            user_key: req.body.user_key,
            type: req.body.type,
            content: req.body.content
        };

        if (_obj.content == "가야할 병원 분류를 선택") {
            console.log("첫 번째 버튼 클릭");
            index = 1;
            hurt_part_check();
        }
        else if (_obj.content == "가까운 병원 찾아가기") {
            index = 2;
            console.log("두 번째 버튼 클릭");
            setLocation1();
            //hos_close_here();
        }
        else {
            console.log('subindex1 : ' + subindex1);
            if (subindex1 == 0) { // 처음 들어갈 땐 subindex1은 0 이기에 아래 함수로 진행되고 아래 함수에서
                // 구를 선택할 경우 subindex1 값도 변경 되기에 setAddressReply로 넘어감
                // 동을 선택하도록 진행.
                save_second_reply(_obj.content);
            } else {
                console.log(subindex2 + '선택의 시간');
                if (subindex2 == 1) {

                    // camera 연동 함수 
                    // 카메라 촬영
                    if (subindex3 == 1) {
                        check_vision_byAI(_obj.content);
                    }
                } else if (subindex2 == 2) {
                    if (subindex3 == 2) {
                        hurt_part_select_db_check(_obj.content);
                    }
                }
                else if (subindex2 == 3) {
                    setAddressReply(subindex1, _obj.content);
                }
            }
        }

        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(message));
    });
};
