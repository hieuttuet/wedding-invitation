import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  vi: {
    hero_title: 'Chúng mình cưới nhau',
    wedding_date: 'Ngày Cưới',
    countdown_days: 'Ngày',
    countdown_hours: 'Giờ',
    countdown_minutes: 'Phút',
    countdown_seconds: 'Giây',
    story_title: 'Câu Chuyện Tình Yêu',
    event_title: 'Sự Kiện Cưới',
    time_label: 'Thời Gian',
    location_label: 'Địa Điểm',
    directions: 'Dẫn đường',
    gallery_title: 'Album Ảnh Cưới',
    gift_title: 'Mừng Cưới Online',
    guestbook_title: 'Sổ Lưu Bút',
    guestbook_desc: 'Hãy để lại những lời chúc tốt đẹp nhất cho cô dâu và chú rể nhé!',
    name_label: 'Tên của bạn',
    message_label: 'Lời chúc',
    send_button: 'Gửi Lời Chúc',
    sent_message: 'Đã gửi lời chúc ♥',
    footer_text: 'Rất hân hạnh được đón tiếp!',
    open_invitation: 'Mở Thiệp',
    bride_bank: 'Tài khoản Nhà Gái',
    groom_bank: 'Tài khoản Nhà Trai',
    invite_heading: 'Invite you',
    invite_p1: 'Gặp được người mà khi ở bên tiếng cười không bao giờ dứt,',
    invite_p2: 'Chúng tôi quyết định kết hôn để được cười cùng nhau trọn đời.',
    invite_p3: 'Gặp được người sẽ kề vai sát cánh khi sóng gió cuộc đời ập đến,',
    invite_p4: 'Chúng tôi quyết định kết hôn để bằng niềm tin vượt qua tất cả.',
    invite_p5: 'Trong khoảnh khắc bước những bước đi đầu tiên của lời thề ước hôm nay,',
    invite_p6: 'Để thời gian ngập tràn niềm vui và hạnh phúc,',
    invite_p7: 'Trân trọng kính mời những người trân quý nhất đến chung vui cùng chúng tôi.',
    groom_title: 'Chú Rể',
    bride_title: 'Cô Dâu',
    groom_parents: 'Ông KIM SUN KEUN\nBà CHO MYEONG HWA',
    bride_parents: 'Ông NGUYỄN VĂN KHANG\nBà NGUYỄN THỊ CẦN',
    calendar_title: 'Calendar',
    calendar_date: '12:30 - CHỦ NHẬT - 02.08.2026 (Tức ngày 20/06 năm Bính Ngọ)',
    calendar_venue: 'SHERATON WEST HOTEL - 36 Lê Đức Thọ, Từ Liêm, Hà Nội',
    days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    gallery_more: 'Xem thêm >>'
  },
  ko: {
    hero_title: '우리 결혼합니다',
    wedding_date: '결혼식 날짜',
    countdown_days: '일',
    countdown_hours: '시간',
    countdown_minutes: '분',
    countdown_seconds: '초',
    story_title: '우리의 이야기',
    event_title: '결혼식 안내',
    time_label: '시간',
    location_label: '오시는 길',
    directions: '길 찾기',
    gallery_title: '웨딩 갤러리',
    gift_title: '마음 전하실 곳',
    guestbook_title: '방명록',
    guestbook_desc: '신랑 신부에게 축하의 메시지를 남겨주세요!',
    name_label: '이름',
    message_label: '메시지',
    send_button: '메시지 남기기',
    sent_message: '메시지가 전송되었습니다 ♥',
    footer_text: '축하해 주셔서 감사합니다!',
    open_invitation: '청첩장 열기',
    bride_bank: '신부측 계좌',
    groom_bank: '신랑측 계좌',
    invite_heading: 'Invite you',
    invite_p1: '함께 있을 때 웃음이 끊이지 않는 사람을 만나,',
    invite_p2: '한 평생 웃어보고 싶어 결혼합니다.',
    invite_p3: '인생의 파도가 밀려올 때 곁을 지켜 줄 사람을 만나,',
    invite_p4: '한 평생 믿음으로 헤쳐나가고자 결혼합니다.',
    invite_p5: '오늘 첫 발을 내딛는 이 약속의 자리에',
    invite_p6: '기쁨과 행복이 가득한 시간이 될 수 있도록',
    invite_p7: '소중한 여러분들을 초대합니다.',
    groom_title: '신랑',
    bride_title: '신부',
    groom_parents: '김선근 · 조명화 의',
    bride_parents: '응우옌 반 캉 · 응우옌 티 껀 의',
    calendar_title: 'Calendar',
    calendar_date: '2026년 8월 2일 일요일 오후 12시 30분',
    calendar_venue: '쉐라톤 웨스트 호텔 - 하노이 뚜리엠 레득토 36',
    days: ['일', '월', '화', '수', '목', '금', '토'],
    gallery_more: '밀어서 더보기 >>'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('vi');
  
  const t = (key) => {
    return translations[lang][key] || key;
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'vi' ? 'ko' : 'vi');
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
