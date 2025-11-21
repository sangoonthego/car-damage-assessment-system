/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // nếu có thêm biến khác, khai báo ở đây
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
