# Car Damage Assessment System - Frontend Documentation

## English Version

### Project Overview

The Car Damage Assessment System (CDAS) is a comprehensive web-based platform designed to automate and streamline the vehicle damage assessment process. The frontend application provides an intuitive interface for multiple user roles including vehicle owners (clients), professional assessors, and system administrators. The system integrates advanced AI-powered damage detection and segmentation capabilities to accurately assess vehicle damage, generate cost estimates, and manage assessment workflows.

### Key Features

#### 1. Authentication & User Management
- Secure user registration and login functionality
- Role-based access control (Client, Assessor, Administrator)
- JWT token-based authentication
- Password encryption and security best practices
- Session management and automatic token refresh

#### 2. Client Module
**Damage Upload & Assessment:**
- Intuitive drag-and-drop image upload interface
- Support for multiple image formats (JPEG, PNG, WebP)
- Real-time image preview and validation
- Integration with AI-powered damage detection

**Assessment History:**
- Comprehensive view of all submitted damage assessments
- Detailed assessment records with timestamps
- Filter and search capabilities
- Export assessment reports to PDF format

**Repair Recommendations:**
- AI-generated repair suggestions based on damage assessment
- Estimated repair costs and timelines
- Recommended repair centers
- Parts replacement suggestions

**Support & Resources:**
- Customer support portal
- FAQ and knowledge base
- Direct messaging with assessors
- Ticket-based issue tracking

#### 3. Assessor Module
**Assessment Queue:**
- Real-time queue of pending assessments
- Priority-based sorting
- Quick-view assessment details
- Batch assessment processing

**Case Review:**
- Detailed assessment case information
- Manual damage verification and annotation
- Ability to approve, reject, or request modifications
- Add professional notes and comments

**AI Review Mode:**
- Compare AI predictions with manual assessments
- Validate AI detection accuracy
- Train feedback loop for model improvement
- Confidence score indicators

**Performance Statistics:**
- Personal assessment metrics and KPIs
- Assessment speed and accuracy tracking
- Performance trends and analytics
- Comparison with team averages

#### 4. Administrator Module
**User Management:**
- Create, update, and delete user accounts
- Assign and modify user roles
- View user activity logs
- Account status management

**Role Management:**
- Define and configure user roles
- Set permission levels for each role
- Manage role hierarchies
- Custom role creation

**AI Model Settings:**
- Configure AI model parameters
- Adjust detection sensitivity thresholds
- Model version management
- Performance tuning options

**Training Data Management:**
- Upload new training data for model improvement
- Data annotation and labeling
- Training dataset versioning
- Model retraining workflows

**System Logs & Monitoring:**
- Comprehensive system event logging
- User activity tracking
- Error and exception monitoring
- System performance metrics

**Analytics Dashboard:**
- System-wide statistics and insights
- Assessment volume trends
- User engagement metrics
- AI model performance analytics

**Billing & Cost Management:**
- Usage-based billing calculations
- Cost estimate generation
- Invoice history and downloads
- Billing plan management

**Content Management System:**
- Manage website content and static pages
- Update announcements and notifications
- Configure system messages
- Brand and theme customization

### Project Structure

```
client/
├── src/
│   ├── api/                          # API integration modules
│   │   ├── ai.ts                     # AI assessment endpoints
│   │   └── profile.ts                # User profile endpoints
│   ├── components/                   # Reusable React components
│   │   ├── Dropzone.tsx             # File upload component
│   │   ├── ResultDisplay.tsx        # Assessment result display
│   │   ├── figma/                   # Custom components
│   │   ├── layout/                  # Layout components
│   │   │   └── DashboardLayout.tsx  # Main dashboard wrapper
│   │   └── ui/                      # Radix UI component library
│   │       ├── accordion.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── modal.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       └── [other UI components]
│   ├── contexts/                    # React Context API
│   │   └── AuthContext.tsx          # Global authentication state
│   ├── hooks/                       # Custom React hooks
│   │   └── useApi.js                # API request hook
│   ├── lib/                         # Utility libraries
│   │   └── utils.js                 # Helper functions
│   ├── pages/                       # Page components organized by role
│   │   ├── AssessmentPage.tsx       # General assessment page
│   │   ├── admin/                   # Admin-only pages
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── UserManagementPage.tsx
│   │   │   ├── ai/
│   │   │   ├── management/
│   │   │   └── statistic/
│   │   ├── assessor/                # Assessor-specific pages
│   │   │   ├── AssessmentQueuePage.tsx
│   │   │   ├── AssessorStatsPage.tsx
│   │   │   └── review/
│   │   ├── client/                  # Client-specific pages
│   │   │   ├── UploadDamagePage.tsx
│   │   │   ├── ClientHistoryPage.tsx
│   │   │   ├── RepairRecommendationPage.tsx
│   │   │   └── SupportPage.tsx
│   │   ├── landing/
│   │   ├── login/
│   │   ├── profile/
│   │   ├── signup/
│   │   └── util/
│   ├── styles/                      # Global CSS styles
│   │   ├── globals.css
│   │   └── main.css
│   ├── utils/                       # Utility functions
│   │   ├── format.js                # Formatting utilities
│   │   └── helperFunctions.js       # General helpers
│   ├── App.tsx                      # Main application component
│   ├── Main.tsx                     # React entry point
│   ├── App.css
│   ├── global.css
│   ├── index.css
│   ├── tailwind.css
│   └── env.d.ts
├── public/                          # Static assets
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
├── vite.config.js                   # Vite build configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── eslint.config.js                 # ESLint configuration
├── jsconfig.json                    # JavaScript configuration
├── index.html                       # HTML entry point
└── .env                             # Environment variables
```

### Technology Stack

**Frontend Framework:**
- React 19.2 - Modern UI library
- TypeScript - Type-safe JavaScript
- Vite 7.2 - Fast build tool and development server
- React Router 7.9 - Client-side routing

**UI & Styling:**
- Tailwind CSS 3.4 - Utility-first CSS framework
- Radix UI - Headless UI components library
- Lucide React - Icon library
- Sonner - Toast notifications

**State & Form Management:**
- React Context API - Global state management
- React Hook Form 7.66 - Efficient form handling
- Axios 1.13 - HTTP client for API requests

**Data & Visualization:**
- Recharts 3.4 - Chart and analytics visualization
- html2canvas - Screenshot generation
- jsPDF - PDF generation

**Utilities:**
- React Dropzone 14.3 - File upload
- React Day Picker - Date selection
- next-themes - Theme management
- uuid - Unique ID generation

### Installation & Setup

#### Prerequisites
- Node.js (version 16.x or higher)
- npm (version 8.x or higher) or yarn
- Git version control

#### Step 1: Clone the Repository
```bash
git clone https://github.com/sangoonthego/car-damage-assessment-system.git
cd car-damage-assessment-system/client
```

#### Step 2: Install Dependencies
```bash
npm install
# or using yarn
yarn install
```

#### Step 3: Configure Environment Variables
Create a `.env` file in the client directory with the following variables:
```
VITE_BASE_URL=http://localhost:3636
```

Update the `VITE_BASE_URL` to match your backend server address. The default configuration assumes the backend runs on `http://localhost:3636`.

#### Step 4: Backend Setup (Required)
The frontend requires a running backend server. Navigate to the server directory and set up:

```bash
cd ../server
npm install
```

Create a `.env` file in the server directory with necessary configuration:
```
PORT=3636
MONGODB_URI=mongodb://localhost:27017/cdas
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

#### Step 5: Database Setup
Ensure MongoDB is running locally or update the connection string:
```bash
# If using local MongoDB
mongod
```

Seed initial data (optional):
```bash
cd server
npm run seed  # Seeds admin, assessor, and role data
```

### Running the Application

#### Development Mode

**Backend Server:**
```bash
cd server
npm run dev
```
The backend will start on `http://localhost:3636`

**Frontend Development Server:**
In a new terminal:
```bash
cd client
npm run dev
```
The frontend will typically start on `http://localhost:5173`

#### Production Build

**Build Frontend:**
```bash
npm run build
```
Creates optimized production build in the `dist` folder.

**Preview Production Build:**
```bash
npm run preview
```
Serves the production build locally for testing.

#### Code Quality

**Run ESLint:**
```bash
npm run lint
```
Checks code quality and style compliance.

### Main API Endpoints

The frontend communicates with the backend via RESTful API endpoints. Key endpoints include:

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh JWT token

#### User Profile
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update user profile
- `GET /api/profile/:id` - Get user profile by ID
- `DELETE /api/profile/:id` - Delete user account

#### AI Assessment
- `POST /api/ai/detect` - Perform damage detection on image
- `POST /api/ai/segment` - Perform damage segmentation
- `GET /api/ai/results` - Get assessment history

#### Damage Reports
- `POST /api/damage-report` - Create new damage report
- `GET /api/damage-report/:id` - Get damage report details
- `PUT /api/damage-report/:id` - Update damage report
- `DELETE /api/damage-report/:id` - Delete damage report
- `GET /api/damage-report` - List all damage reports

#### Cost Estimation
- `POST /api/cost-estimate` - Generate cost estimate
- `GET /api/cost-estimate/:id` - Get estimate details
- `PUT /api/cost-estimate/:id` - Update estimate

#### Manual Assessment
- `POST /api/manual-assessment` - Create manual assessment
- `GET /api/manual-assessment/:id` - Get assessment details
- `PUT /api/manual-assessment/:id` - Update assessment
- `GET /api/manual-assessment` - List assessments

#### Billing
- `GET /api/bill` - Get billing information
- `POST /api/bill/invoice` - Generate invoice
- `GET /api/bill/history` - Billing history

#### Notifications
- `GET /api/notification` - Get notifications
- `PUT /api/notification/:id` - Mark notification as read
- `DELETE /api/notification/:id` - Delete notification

For complete API documentation, refer to the backend README and API specification documents.

### Performance Optimization

- Lazy loading of route components for faster initial load
- Image optimization and compression for upload
- CSS purging with Tailwind CSS for minimal bundle size
- Code splitting with Vite for efficient chunking
- Responsive design for mobile and desktop devices

### Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Team

**Developer:** Nguyen Tuan Ngoc

### License

This project is licensed under the ISC License.

---

## 日本語版 (Japanese Version)

### プロジェクト概要

車両損傷評価システム (CDAS) は、車両損傷評価プロセスを自動化・効率化するための包括的なWebベースプラットフォームです。フロントエンドアプリケーションは、車両所有者 (クライアント)、専門の評価者、システム管理者など、複数のユーザーロールに対して直感的なインターフェースを提供します。このシステムは、AI搭載の損傷検出・セグメンテーション機能を統合し、正確な車両損傷評価、見積生成、評価ワークフロー管理を実現します。

### 主な機能

#### 1. 認証とユーザー管理
- セキュアなユーザー登録とログイン機能
- ロールベースのアクセス制御 (クライアント、評価者、管理者)
- JWTトークンベースの認証
- パスワード暗号化とセキュリティのベストプラクティス
- セッション管理と自動トークンリフレッシュ

#### 2. クライアントモジュール
**損傷アップロードと評価:**
- 直感的なドラッグ&ドロップ画像アップロードインターフェース
- 複数の画像フォーマット対応 (JPEG、PNG、WebP)
- リアルタイム画像プレビューと検証
- AI搭載の損傷検出との統合

**評価履歴:**
- 提出されたすべての損傷評価の包括的なビュー
- タイムスタンプ付きの詳細な評価レコード
- フィルタと検索機能
- PDF形式での評価レポート出力

**修理推奨:**
- 損傷評価に基づくAI生成の修理提案
- 推定修理費と工期
- 推奨修理センター情報
- パーツ交換提案

**サポートとリソース:**
- カスタマーサポートポータル
- FAQとナレッジベース
- 評価者との直接メッセージング
- チケットベースの問題追跡

#### 3. 評価者モジュール
**評価キュー:**
- 保留中の評価のリアルタイムキュー
- 優先度ベースのソート
- クイックビュー評価詳細
- バッチ評価処理

**ケースレビュー:**
- 詳細な評価ケース情報
- 手動損傷検証と注釈付け
- 承認、却下、修正リクエスト機能
- 専門的なメモとコメントの追加

**AI レビューモード:**
- AI予測と手動評価の比較
- AI検出精度の検証
- モデル改善のためのトレーニングフィードバックループ
- 信頼度スコア表示

**パフォーマンス統計:**
- 個人の評価指標とKPI
- 評価速度と精度の追跡
- パフォーマンストレンドと分析
- チーム平均との比較

#### 4. 管理者モジュール
**ユーザー管理:**
- ユーザーアカウントの作成、更新、削除
- ユーザーロールの割り当てと修正
- ユーザーアクティビティログの表示
- アカウント状態管理

**ロール管理:**
- ユーザーロールの定義と設定
- 各ロールの権限レベル設定
- ロール階層の管理
- カスタムロール作成

**AIモデル設定:**
- AIモデルパラメータの設定
- 検出感度閾値の調整
- モデルバージョン管理
- パフォーマンス調整オプション

**トレーニングデータ管理:**
- モデル改善のための新しいトレーニングデータアップロード
- データアノテーションとラベリング
- トレーニングデータセットバージョン管理
- モデル再トレーニングワークフロー

**システムログとモニタリング:**
- 包括的なシステムイベントログ
- ユーザーアクティビティ追跡
- エラーと例外モニタリング
- システムパフォーマンスメトリクス

**分析ダッシュボード:**
- システム全体の統計と分析情報
- 評価量トレンド
- ユーザーエンゲージメント指標
- AIモデルパフォーマンス分析

**請求と費用管理:**
- 使用量ベースの請求計算
- 見積生成
- 請求書履歴とダウンロード
- 請求プラン管理

**コンテンツ管理システム:**
- Webサイトコンテンツと静的ページの管理
- アナウンスと通知の更新
- システムメッセージの設定
- ブランドとテーマのカスタマイズ

### プロジェクト構造

```
client/
├── src/
│   ├── api/                          # API統合モジュール
│   │   ├── ai.ts                     # AI評価エンドポイント
│   │   └── profile.ts                # ユーザープロフィールエンドポイント
│   ├── components/                   # 再利用可能なReactコンポーネント
│   │   ├── Dropzone.tsx             # ファイルアップロードコンポーネント
│   │   ├── ResultDisplay.tsx        # 評価結果表示
│   │   ├── figma/                   # カスタムコンポーネント
│   │   ├── layout/                  # レイアウトコンポーネント
│   │   │   └── DashboardLayout.tsx  # メインダッシュボードラッパー
│   │   └── ui/                      # Radix UIコンポーネントライブラリ
│   │       ├── accordion.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── modal.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       └── [その他UIコンポーネント]
│   ├── contexts/                    # React Context API
│   │   └── AuthContext.tsx          # グローバル認証状態
│   ├── hooks/                       # カスタムReactフック
│   │   └── useApi.js                # API要求フック
│   ├── lib/                         # ユーティリティライブラリ
│   │   └── utils.js                 # ヘルパー関数
│   ├── pages/                       # ページコンポーネント (ロール別)
│   │   ├── AssessmentPage.tsx       # 一般的な評価ページ
│   │   ├── admin/                   # 管理者専用ページ
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── UserManagementPage.tsx
│   │   │   ├── ai/
│   │   │   ├── management/
│   │   │   └── statistic/
│   │   ├── assessor/                # 評価者固有ページ
│   │   │   ├── AssessmentQueuePage.tsx
│   │   │   ├── AssessorStatsPage.tsx
│   │   │   └── review/
│   │   ├── client/                  # クライアント固有ページ
│   │   │   ├── UploadDamagePage.tsx
│   │   │   ├── ClientHistoryPage.tsx
│   │   │   ├── RepairRecommendationPage.tsx
│   │   │   └── SupportPage.tsx
│   │   ├── landing/
│   │   ├── login/
│   │   ├── profile/
│   │   ├── signup/
│   │   └── util/
│   ├── styles/                      # グローバルCSSスタイル
│   │   ├── globals.css
│   │   └── main.css
│   ├── utils/                       # ユーティリティ関数
│   │   ├── format.js                # フォーマット関数
│   │   └── helperFunctions.js       # 汎用ヘルパー
│   ├── App.tsx                      # メインアプリケーションコンポーネント
│   ├── Main.tsx                     # Reactエントリーポイント
│   ├── App.css
│   ├── global.css
│   ├── index.css
│   ├── tailwind.css
│   └── env.d.ts
├── public/                          # 静的アセット
├── package.json                     # プロジェクト依存関係
├── tsconfig.json                    # TypeScript設定
├── vite.config.js                   # Viteビルド設定
├── tailwind.config.js               # Tailwind CSS設定
├── postcss.config.js                # PostCSS設定
├── eslint.config.js                 # ESLint設定
├── jsconfig.json                    # JavaScript設定
├── index.html                       # HTMLエントリーポイント
└── .env                             # 環境変数
```

### 技術スタック

**フロントエンドフレームワーク:**
- React 19.2 - モダンUIライブラリ
- TypeScript - 型安全JavaScript
- Vite 7.2 - 高速ビルドツール・開発サーバー
- React Router 7.9 - クライアント側ルーティング

**UI とスタイリング:**
- Tailwind CSS 3.4 - ユーティリティファーストCSSフレームワーク
- Radix UI - ヘッドレスUIコンポーネントライブラリ
- Lucide React - アイコンライブラリ
- Sonner - トースト通知

**状態・フォーム管理:**
- React Context API - グローバル状態管理
- React Hook Form 7.66 - 効率的なフォーム処理
- Axios 1.13 - API通信用HTTPクライアント

**データと可視化:**
- Recharts 3.4 - チャートと分析可視化
- html2canvas - スクリーンショット生成
- jsPDF - PDF生成

**ユーティリティ:**
- React Dropzone 14.3 - ファイルアップロード
- React Day Picker - 日付選択
- next-themes - テーマ管理
- uuid - 一意なID生成

### インストールとセットアップ

#### 前提条件
- Node.js (バージョン16.x以上)
- npm (バージョン8.x以上) またはyarn
- Gitバージョン管理

#### ステップ 1: リポジトリをクローン
```bash
git clone https://github.com/sangoonthego/car-damage-assessment-system.git
cd car-damage-assessment-system/client
```

#### ステップ 2: 依存関係をインストール
```bash
npm install
# またはyarnを使用
yarn install
```

#### ステップ 3: 環境変数を設定
クライアントディレクトリに `.env` ファイルを作成し、次の変数を追加します:
```
VITE_BASE_URL=http://localhost:3636
```

`VITE_BASE_URL` をバックエンドサーバーのアドレスに更新してください。デフォルト設定ではバックエンドが `http://localhost:3636` で動作することを想定しています。

#### ステップ 4: バックエンドセットアップ (必須)
フロントエンドは実行中のバックエンドサーバーを必要とします。サーバーディレクトリに移動してセットアップします:

```bash
cd ../server
npm install
```

サーバーディレクトリに `.env` ファイルを作成し、必要な設定を追加します:
```
PORT=3636
MONGODB_URI=mongodb://localhost:27017/cdas
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

#### ステップ 5: データベースセットアップ
MongoDBがローカルで実行されていることを確認するか、接続文字列を更新します:
```bash
# ローカルMongoDBを使用する場合
mongod
```

初期データをシード (オプション):
```bash
cd server
npm run seed  # 管理者、評価者、ロールデータをシード
```

### アプリケーション実行

#### 開発モード

**バックエンドサーバー:**
```bash
cd server
npm run dev
```
バックエンドは `http://localhost:3636` で起動します

**フロントエンド開発サーバー:**
新しいターミナルで:
```bash
cd client
npm run dev
```
フロントエンドは通常 `http://localhost:5173` で起動します

#### プロダクションビルド

**フロントエンドをビルド:**
```bash
npm run build
```
`dist` フォルダに最適化されたプロダクションビルドを作成します。

**プロダクションビルドをプレビュー:**
```bash
npm run preview
```
テスト用にプロダクションビルドをローカルで提供します。

#### コード品質

**ESLintを実行:**
```bash
npm run lint
```
コード品質とスタイル準拠を確認します。

### メインAPIエンドポイント

フロントエンドはRESTful APIエンドポイント経由でバックエンドと通信します。主要なエンドポイント:

#### 認証
- `POST /api/auth/register` - ユーザー登録
- `POST /api/auth/login` - ユーザーログイン
- `POST /api/auth/logout` - ユーザーログアウト
- `POST /api/auth/refresh-token` - JWTトークンリフレッシュ

#### ユーザープロフィール
- `GET /api/profile` - 現在のユーザープロフィール取得
- `PUT /api/profile` - ユーザープロフィール更新
- `GET /api/profile/:id` - IDでユーザープロフィール取得
- `DELETE /api/profile/:id` - ユーザーアカウント削除

#### AI評価
- `POST /api/ai/detect` - 画像の損傷検出実行
- `POST /api/ai/segment` - 損傷セグメンテーション実行
- `GET /api/ai/results` - 評価履歴取得

#### 損傷レポート
- `POST /api/damage-report` - 新規損傷レポート作成
- `GET /api/damage-report/:id` - レポート詳細取得
- `PUT /api/damage-report/:id` - レポート更新
- `DELETE /api/damage-report/:id` - レポート削除
- `GET /api/damage-report` - すべての損傷レポート一覧

#### 見積生成
- `POST /api/cost-estimate` - 見積生成
- `GET /api/cost-estimate/:id` - 見積詳細取得
- `PUT /api/cost-estimate/:id` - 見積更新

#### 手動評価
- `POST /api/manual-assessment` - 手動評価作成
- `GET /api/manual-assessment/:id` - 評価詳細取得
- `PUT /api/manual-assessment/:id` - 評価更新
- `GET /api/manual-assessment` - 評価一覧

#### 請求
- `GET /api/bill` - 請求情報取得
- `POST /api/bill/invoice` - 請求書生成
- `GET /api/bill/history` - 請求履歴

#### 通知
- `GET /api/notification` - 通知取得
- `PUT /api/notification/:id` - 通知を既読にマーク
- `DELETE /api/notification/:id` - 通知削除

完全なAPI仕様については、バックエンドREADMEとAPIドキュメントを参照してください。

### パフォーマンス最適化

- ルートコンポーネントの遅延読み込みで初期ロード高速化
- アップロード用の画像最適化と圧縮
- Tailwind CSSによるCSSパージで最小バンドルサイズ実現
- Viteによるコード分割で効率的なチャンキング
- モバイルとデスクトップ対応のレスポンシブデザイン

### ブラウザサポート

- Chrome/Chromium (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)
- モバイルブラウザ (iOS Safari、Chrome Mobile)

### チームメンバー

**開発者:** Nguyen Tuan Ngoc

### ライセンス

このプロジェクトはISCライセンスの下でライセンスされています。
