/** @type {import('tailwindcss').Config} */
export default {
  // Chỉ định các file trong project sẽ sử dụng Tailwind class
  content: [
    "./index.html", // Cần thiết cho project Vite
    "./src/**/*.{js,jsx,ts,tsx}", // Quét tất cả các file component trong thư mục src
  ],
  theme: {
    extend: {
      // Bạn có thể thêm các tùy chỉnh về màu sắc, font, v.v. ở đây
    },
  },
  plugins: [], // Thêm các plugin nếu cần (ví dụ: @tailwindcss/forms)
}