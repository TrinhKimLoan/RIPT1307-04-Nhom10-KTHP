import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../config/emailEnv';
import type { Post } from './Posts/typings.d';
import type { User } from './Users/typings.d';

/**
 * Gửi email thông báo khi có bình luận mới trên bài viết.
 * Chỉ gọi nếu post.notifyOnNewComment === true
 */
export const sendEmailOnNewComment = (post: Post, user: User) => {
  if (!user.email || !user.fullName) return;
  console.log('[ EmailJS] Số người sẽ nhận email bài đăng mới:', user.email);
  emailjs
    .send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      {
        to_email: user.email,
        to_name: user.fullName,
        subject: 'Bài viết của bạn vừa nhận được bình luận mới!',
        message: `Bài viết "${post.title}" bạn đã đăng vừa nhận được một bình luận mới. Vui lòng truy cập để xem chi tiết.`,
      },
      EMAIL_CONFIG.PUBLIC_KEY
    )
    .then(
      () => console.log(`📩 Gửi email bình luận đến ${user.email} thành công`),
      (err) => console.error('❌ Gửi email thất bại:', err)
    );
};

/**
 * Gửi email đến những người dùng đã chọn nhận thông báo khi có bài viết mới
 * và có tag yêu thích trùng với tag trong bài đăng
 */
export const sendEmailOnNewPost = (post: Post, users: User[]) => {
  const recipients = users.filter(
    (u) =>
      u.notifyOnNewPost &&
      u.email &&
      u.favouriteTags &&
      u.favouriteTags.some((tagId) => post.tagIds.includes(tagId))
  );

  recipients.forEach((user) => {
    emailjs
      .send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          to_email: user.email,
          to_name: user.fullName,
          subject: 'Bài viết mới liên quan đến chủ đề bạn theo dõi',
          message: `Một bài viết mới có tiêu đề "${post.title}" vừa được đăng, liên quan đến các chủ đề bạn quan tâm.`,
        },
        EMAIL_CONFIG.PUBLIC_KEY
      )
      .then(
        () => console.log(`📨 Gửi email bài mới đến ${user.email} thành công`),
        (err) => console.error(`❌ Gửi email thất bại tới ${user.email}:`, err)
      );
  });
};
