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
    wedding_invitation: 'Wedding Invitation',
    open_invitation: 'Open Invitation',
    swipe_to_open: 'Swipe up to open',
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
    bride_parents: 'Ông NGUYỄN VĂN KHANG\nBà NGUYỄN THỊ CÁN',
    calendar_title: 'Calendar',
    calendar_date: '12:30 - CHỦ NHẬT - 02.08.2026 (Tức ngày 20/06 năm Bính Ngọ)',
    calendar_venue: 'SHERATON WEST HOTEL - 36 Lê Đức Thọ, Từ Liêm, Hà Nội',
    days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    gallery_more: 'Xem thêm >>',
    event_vu_quy: 'LỄ VU QUY',
    event_nha_gai: 'NHÀ GÁI',
    event_vu_quy_time: 'Thứ Bảy - 01.08.2026',
    event_vu_quy_location: 'TƯ GIA NHÀ GÁI',
    event_vu_quy_address: 'Thôn Đồng Phú, xã Thần Khê,<br/>tỉnh Hưng Yên',
    event_thanh_hon: 'LỄ THÀNH HÔN',
    event_nha_trai: 'NHÀ TRAI',
    event_thanh_hon_time: 'Chủ Nhật - 02.08.2026',
    event_thanh_hon_location: 'SHERATON WEST HOTEL',
    event_thanh_hon_address: '36 Lê Đức Thọ, Từ Liêm,<br/>Hà Nội',
    guestbook_list_title: 'Danh sách lời chúc',
    guestbook_loading: 'Đang tải lời chúc...',
    guestbook_empty: 'Chưa có lời chúc nào. Hãy là người đầu tiên!',
    story_1_date: '14.02.2023',
    story_1_title: 'Lần đầu gặp gỡ',
    story_1_desc: 'Một ngày tình cờ vào dịp Valentine, ánh mắt vô tình chạm nhau và bắt đầu một câu chuyện...',
    story_2_date: '20.10.2023',
    story_2_title: 'Lời yêu thương',
    story_2_desc: 'Cuối cùng anh ấy cũng lấy hết can đảm để nói ra lời yêu.',
    story_3_date: '01.01.2025',
    story_3_title: 'Lời cầu hôn',
    story_3_desc: 'Giữa pháo hoa rực rỡ chào năm mới, một lời hứa trọn đời được trao.',
    gift_desc: 'Sự hiện diện của quý khách là món quà tuyệt vời nhất đối với chúng tôi. Nếu quý khách muốn gửi lời chúc mừng từ xa, có thể sử dụng mã QR dưới đây.',
    bank_name: 'Ngân hàng:',
    bank_account: 'Số tài khoản:',
    bank_owner: 'Chủ tài khoản:'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang] = useState('vi');
  
  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
