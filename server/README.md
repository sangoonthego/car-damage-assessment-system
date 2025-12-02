# Car Damage Assessment System - Backend Documentation

## English Version

### Project Overview

The Car Damage Assessment System (CDAS) Backend is a robust Node.js and Express-based API server that powers the vehicle damage assessment platform. Built with MongoDB for data persistence, the backend provides comprehensive RESTful API endpoints for authentication, user management, AI-powered damage detection and segmentation, assessment workflows, and billing operations. The system integrates Python-based machine learning models for intelligent vehicle damage analysis and generates automated cost estimates based on damage severity.

### Key Features

#### 1. Authentication & Authorization System
- Secure user registration with comprehensive validation
- Email and password-based authentication with JWT tokens
- Role-based access control (RBAC) with three main roles: Client, Assessor, Administrator
- Token blacklisting for secure logout functionality
- Automatic token validation on protected routes
- Password encryption using bcrypt with salt rounds

#### 2. User Management Module
- User account creation with complete profile information
- Profile management including avatar, phone, birthday, company, and address
- Email verification system with OTP (One-Time Password)
- Role assignment and modification capabilities
- User activity logging and tracking
- Account status management and soft deletion

#### 3. AI-Powered Damage Assessment
- Image-based damage detection using deep learning models
- Damage segmentation for precise area identification
- Integration with Python machine learning pipeline
- File upload handling with automatic image processing
- Result caching and storage for future reference
- Confidence scoring for assessment accuracy tracking

#### 4. Damage Reporting System
- Create comprehensive damage reports with multiple image uploads
- Automatic status tracking (Pending, Processing, Completed)
- Link damage reports to users and assigned assessors
- Store AI assessment results and predictions
- Timestamp tracking for audit trails
- Support for batch damage report queries

#### 5. Manual Assessment Module
- Professional assessors can perform manual damage evaluations
- Add detailed notes, annotations, and observations
- Assessment approval and rejection workflows
- Comparison between AI predictions and manual assessments
- Assessment history and versioning
- Performance metrics tracking for assessors

#### 6. Cost Estimation Engine
- Automatic cost calculation based on damage severity
- Integration with repair industry cost databases
- Parts replacement and labor cost estimation
- Multiple repair option generation
- Time-to-repair estimations
- Cost adjustment based on vehicle make/model and market rates

#### 7. Billing & Invoice Management
- Usage-based billing calculations
- Invoice generation and management
- Payment history tracking
- Billing plan configuration
- Late payment alerts
- Financial reporting and analytics

#### 8. Notification System
- Real-time notification generation
- Email and in-app notification delivery
- Notification status tracking (read/unread)
- Notification preferences per user
- Notification history and archival
- Alert categorization and filtering

#### 9. Security & Middleware
- CORS (Cross-Origin Resource Sharing) configuration
- Helmet.js for security headers
- Express rate limiting for DDoS protection
- Input validation using express-validator
- Error handling and centralized error responses
- Request logging and monitoring

### Project Structure

```
server/
├── src/
│   ├── config/                           # Configuration modules
│   │   └── db.js                         # MongoDB connection setup
│   ├── controllers/                      # Request handlers
│   │   ├── ai.controller.js             # AI detection/segmentation logic
│   │   ├── auth.controller.js           # Authentication handlers
│   │   ├── bill.controller.js           # Billing operations
│   │   ├── costEstimate.controller.js   # Cost estimation logic
│   │   ├── damageReport.controller.js   # Damage report management
│   │   ├── manualAssessment.controller.js # Manual assessment handlers
│   │   ├── notification.controller.js   # Notification operations
│   │   └── profile.controller.js        # User profile management
│   ├── helpers/                         # Helper functions
│   │   └── pythonRunner.js              # Python script execution wrapper
│   ├── middlewares/                     # Express middlewares
│   │   ├── auth.middleware.js           # JWT authentication
│   │   ├── error.handler.js             # Global error handling
│   │   ├── role.middleware.js           # Role-based access control
│   │   └── upload.middleware.js         # File upload handling
│   ├── models/                          # MongoDB schemas
│   │   ├── Bill.js                      # Billing schema
│   │   ├── BlacklistToken.js            # Token blacklist for logout
│   │   ├── CostEstimate.js              # Cost estimation schema
│   │   ├── DamageReport.js              # Damage report schema
│   │   ├── ManualAssessment.js          # Manual assessment schema
│   │   ├── Notification.js              # Notification schema
│   │   ├── Result.js                    # AI result storage schema
│   │   ├── Role.js                      # User role schema
│   │   └── User.js                      # User profile schema
│   ├── routes/                          # API route definitions
│   │   ├── ai.routes.js                 # AI assessment endpoints
│   │   ├── auth.routes.js               # Authentication endpoints
│   │   ├── bill.routes.js               # Billing endpoints
│   │   ├── costEstimate.routes.js       # Cost estimation endpoints
│   │   ├── damageReport.routes.js       # Damage report endpoints
│   │   ├── manualAssessment.routes.js   # Manual assessment endpoints
│   │   ├── notification.routes.js       # Notification endpoints
│   │   └── profile.routes.js            # User profile endpoints
│   ├── seeds/                           # Database seeding scripts
│   │   ├── admin.seed.js                # Initial admin account
│   │   ├── assessor.seed.js             # Assessor role setup
│   │   └── role.seed.js                 # Default roles creation
│   ├── services/                        # Business logic layer
│   │   ├── ai.service.js                # AI service functions
│   │   ├── auth.service.js              # Authentication services
│   │   ├── bill.service.js              # Billing services
│   │   ├── costEstimate.service.js      # Cost estimation services
│   │   ├── damageReport.service.js      # Damage report services
│   │   ├── manualAssessment.service.js  # Assessment services
│   │   ├── notification.service.js      # Notification services
│   │   └── profile.service.js           # Profile services
│   ├── utils/                           # Utility functions
│   │   └── areaCalculator.js            # Damage area calculation
│   └── server.js                        # Express application entry point
├── static/                              # Static assets directory
│   ├── output/                          # AI model output storage
│   └── segment_masks/                   # Segmentation mask results
├── uploads/                             # User-uploaded files
│   └── avatars/                         # User avatar images
├── package.json                         # Project dependencies
├── .env                                 # Environment variables
└── .gitignore                           # Git ignore rules
```

### Technology Stack

**Runtime & Framework:**
- Node.js - JavaScript runtime environment
- Express.js 5.1 - Web application framework
- MongoDB 8.19 - NoSQL database
- Mongoose 8.19 - MongoDB object modeling

**Authentication & Security:**
- JWT (jsonwebtoken 9.0.2) - Token-based authentication
- bcryptjs 3.0.3 - Password hashing and encryption
- Helmet 8.1.0 - Security headers middleware
- express-rate-limit 8.2.1 - Rate limiting for DDoS protection
- CORS 2.8.5 - Cross-Origin Resource Sharing

**Data Validation:**
- express-validator 7.3.0 - Request validation and sanitization

**File Handling:**
- Multer 2.0.2 - File upload middleware
- File system operations for image storage

**Python Integration:**
- Child process management for Python script execution
- JSON communication between Node.js and Python ML models

**Email Services:**
- Nodemailer 7.0.10 - Email delivery service

**Development & Utilities:**
- dotenv 17.2.3 - Environment variable management
- cross-env 10.1.0 - Cross-platform environment variables

### Installation & Setup

#### Prerequisites
- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or yarn
- MongoDB (version 4.4 or higher) - local or remote instance
- Python 3.8+ (for AI model execution)
- Git version control

#### Step 1: Clone the Repository
```bash
git clone https://github.com/sangoonthego/car-damage-assessment-system.git
cd car-damage-assessment-system/server
```

#### Step 2: Install Dependencies
```bash
npm install
# or using yarn
yarn install
```

#### Step 3: Configure Environment Variables
Create a `.env` file in the server root directory with the following variables:

```
# Server Configuration
PORT=3636
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/car_damage

# JWT Configuration
JWT_SECRET=cdaismybestfriend

# File Upload Configuration
UPLOAD_DIR=uploads
STATIC_DIR=static

# Python AI Integration
PYTHON_AI_DIR=D:\saves\AI Research\Project\car_damage_assessment
```

**Key Environment Variables:**
- `PORT`: Server port number (default: 3636)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing (use a strong, unique value in production)
- `PYTHON_AI_DIR`: Path to Python AI models directory

#### Step 4: Database Setup

**Option A: Local MongoDB**
Ensure MongoDB is running on your system:

```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
Update `MONGO_URI` in `.env` file:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/car_damage?retryWrites=true&w=majority
```

#### Step 5: Initialize Database with Seed Data
Run the seeding scripts to create initial roles and admin account:

```bash
# Run all seed files
node src/seeds/role.seed.js
node src/seeds/admin.seed.js
node src/seeds/assessor.seed.js
```

This will create:
- Three default roles: Client, Assessor, Administrator
- Admin user account with administrative privileges
- Assessor role with assessment permissions

#### Step 6: Verify Installation
Check that all dependencies are installed correctly:

```bash
npm list
```

### Running the Application

#### Development Mode

Start the backend server with hot-reload support using nodemon:

```bash
npm run dev
```

The server will start on `http://localhost:3636` (or your configured PORT).

#### Production Mode

Build and run the application for production:

```bash
npm start
```

#### Alternative: Direct Execution

```bash
node src/server.js
```

### API Endpoints Overview

The backend provides the following RESTful API endpoints organized by functionality:

#### Authentication Endpoints (`/api/auth`)
- `POST /api/auth/register` - Register new user account
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout and invalidate token

#### User Profile Endpoints (`/api/profile`)
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update user profile information
- `GET /api/profile/:id` - Get specific user profile by ID
- `DELETE /api/profile/:id` - Delete user account
- `POST /api/profile/avatar` - Upload user avatar image
- `PUT /api/profile/verify-email` - Verify email with OTP

#### AI Assessment Endpoints (`/api/ai`)
- `POST /api/ai/detect` - Upload image for damage detection
- `POST /api/ai/segment` - Upload image for damage segmentation
- `GET /api/ai/results/:id` - Retrieve assessment results
- `GET /api/ai/history` - Get user assessment history

#### Damage Report Endpoints (`/api/damage-reports`)
- `POST /api/damage-reports` - Create new damage report
- `GET /api/damage-reports` - List all damage reports (with pagination)
- `GET /api/damage-reports/:id` - Get specific damage report
- `PUT /api/damage-reports/:id` - Update damage report
- `DELETE /api/damage-reports/:id` - Delete damage report
- `PUT /api/damage-reports/:id/assign` - Assign report to assessor
- `PUT /api/damage-reports/:id/status` - Update report status

#### Manual Assessment Endpoints (`/api/manual-assessment`)
- `POST /api/manual-assessment` - Create manual assessment
- `GET /api/manual-assessment` - List assessments
- `GET /api/manual-assessment/:id` - Get assessment details
- `PUT /api/manual-assessment/:id` - Update assessment
- `DELETE /api/manual-assessment/:id` - Delete assessment
- `GET /api/manual-assessment/user/:userId` - Get user's assessments

#### Cost Estimation Endpoints (`/api/cost`)
- `POST /api/cost` - Generate cost estimate
- `GET /api/cost/:id` - Get estimate details
- `PUT /api/cost/:id` - Update estimate
- `DELETE /api/cost/:id` - Delete estimate
- `GET /api/cost/report/:reportId` - Get costs for damage report

#### Billing Endpoints (`/api/bills`)
- `GET /api/bills` - Get user billing information
- `POST /api/bills/invoice` - Generate invoice
- `GET /api/bills/history` - Get billing history
- `PUT /api/bills/:id/payment` - Record payment
- `GET /api/bills/statistics` - Get billing statistics

#### Notification Endpoints (`/api/notifications`)
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `DELETE /api/notifications/:id` - Delete notification
- `DELETE /api/notifications` - Clear all notifications

### Request/Response Format

#### Standard Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Error description",
  "statusCode": 400
}
```

#### Authentication
All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Database Models

**User Model:**
- firstname, lastname, username, email (unique)
- passwordHash, roleId (references Role)
- avatar, phone (unique), birthday, company, address
- isVerified, otp, otpExpires
- createdAt timestamp

**DamageReport Model:**
- userId (references User)
- images (array of image paths)
- status (Pending, Processing, Completed)
- aiResult (object containing AI predictions)
- assessorId (references User)
- createdAt, updatedAt timestamps

**ManualAssessment Model:**
- damageReportId (references DamageReport)
- assessorId (references User)
- notes, damageDescription
- severity (Low, Medium, High, Critical)
- estimatedRepairTime
- createdAt, updatedAt

**CostEstimate Model:**
- damageReportId (references DamageReport)
- laborCost, partsCost, miscCost
- totalCost, currency
- estimatedTime
- createdAt, updatedAt

### Security Considerations

- Passwords are hashed using bcrypt with salt rounds (default: 10)
- JWT tokens are signed with a secret key stored in environment variables
- Token blacklisting prevents reuse of invalidated tokens
- CORS is configured to accept requests from frontend origin only
- Rate limiting protects against brute force attacks
- Input validation sanitizes all user inputs
- Helmet.js secures HTTP headers against common vulnerabilities

### Performance Optimization

- Database indexing on frequently queried fields
- Pagination support for large data sets
- Caching of AI model results
- Connection pooling for database requests
- Efficient file upload handling with streaming
- Response compression with gzip

### Error Handling

The backend implements comprehensive error handling:
- Validation errors (400 Bad Request)
- Authentication errors (401 Unauthorized)
- Authorization errors (403 Forbidden)
- Resource not found errors (404 Not Found)
- Server errors (500 Internal Server Error)
- Custom error messages for better debugging

### Logging & Monitoring

- Console logging for development
- Error stack trace logging
- Request/response logging available
- Database operation logging
- Performance metrics tracking

### Future Enhancements

- Advanced analytics and reporting
- Machine learning model versioning
- Real-time notifications with WebSockets
- Payment gateway integration
- Multi-language support
- Advanced search and filtering

### Team

**Developer:** Nguyen Tuan Ngoc

### License

This project is licensed under the ISC License.

### Support

For issues, questions, or contributions, please refer to the project repository and documentation.

---

## 日本語版 (Japanese Version)

### プロジェクト概要

車両損傷評価システム (CDAS) バックエンドは、Node.js と Express をベースとした堅牢なAPIサーバーです。MongoDB データベースを使用してデータを永続化し、認証、ユーザー管理、AI搭載の損傷検出・セグメンテーション、評価ワークフロー、および請求操作のための包括的なRESTful APIエンドポイントを提供します。このシステムは、Python ベースの機械学習モデルを統合して、インテリジェントな車両損傷分析を行い、損傷の程度に基づいた自動見積を生成します。

### 主な機能

#### 1. 認証・認可システム
- 包括的な検証を伴うセキュアなユーザー登録
- メールとパスワード認証を使用したJWTトークン
- 3つの主要ロール (クライアント、評価者、管理者) を持つロールベースアクセス制御 (RBAC)
- セキュアなログアウト機能のためのトークンブラックリスト
- 保護されたルートの自動トークン検証
- bcrypt を使用したパスワード暗号化とソルト処理

#### 2. ユーザー管理モジュール
- 完全なプロフィール情報を含むユーザーアカウント作成
- アバター、電話番号、生年月日、会社、住所を含むプロフィール管理
- OTP (One-Time Password) を使用したメール検証システム
- ロール割り当てと修正機能
- ユーザーアクティビティログと追跡
- アカウント状態管理とソフト削除

#### 3. AI搭載損傷評価
- ディープラーニングモデルを使用した画像ベースの損傷検出
- 正確な領域識別のための損傷セグメンテーション
- Python 機械学習パイプラインとの統合
- 自動画像処理を伴うファイルアップロード処理
- 将来の参照用の結果キャッシングと保存
- 評価精度追跡のための信頼度スコアリング

#### 4. 損傷レポートシステム
- 複数の画像アップロードを伴う包括的な損傷レポート作成
- 自動ステータス追跡 (保留中、処理中、完了)
- ユーザーと割り当てられた評価者への損傷レポートのリンク
- AI評価結果と予測の保存
- 監査証跡のためのタイムスタンプ追跡
- バッチ損傷レポートクエリのサポート

#### 5. 手動評価モジュール
- 専門の評価者による手動損傷評価の実施
- 詳細なメモ、注釈、および観察の追加
- 評価承認と却下ワークフロー
- AI予測と手動評価の比較
- 評価履歴とバージョン管理
- 評価者のパフォーマンス指標追跡

#### 6. 見積エンジン
- 損傷の程度に基づいた自動見積計算
- 修理業界のコストデータベースとの統合
- パーツ交換と労賃見積
- 複数の修理オプション生成
- 修理時間見積
- 車両のメーク/モデルと市場レートに基づいたコスト調整

#### 7. 請求・請求書管理
- 使用量ベースの請求計算
- 請求書生成と管理
- 支払い履歴追跡
- 請求プラン設定
- 期限超過アラート
- 財務レポートと分析

#### 8. 通知システム
- リアルタイム通知生成
- メール・アプリ内通知配信
- 通知ステータス追跡 (既読/未読)
- ユーザーごとの通知設定
- 通知履歴とアーカイブ
- アラートカテゴリ化とフィルタリング

#### 9. セキュリティ・ミドルウェア
- CORS (Cross-Origin Resource Sharing) 設定
- Helmet.js によるセキュリティヘッダー
- DDoS 対策のための Express レート制限
- express-validator による入力検証
- エラー処理と集中エラーレスポンス
- リクエストログとモニタリング

### プロジェクト構造

```
server/
├── src/
│   ├── config/                           # 設定モジュール
│   │   └── db.js                         # MongoDB 接続設定
│   ├── controllers/                      # リクエストハンドラー
│   │   ├── ai.controller.js             # AI 検出/セグメンテーションロジック
│   │   ├── auth.controller.js           # 認証ハンドラー
│   │   ├── bill.controller.js           # 請求操作
│   │   ├── costEstimate.controller.js   # 見積ロジック
│   │   ├── damageReport.controller.js   # 損傷レポート管理
│   │   ├── manualAssessment.controller.js # 手動評価ハンドラー
│   │   ├── notification.controller.js   # 通知操作
│   │   └── profile.controller.js        # ユーザープロフィール管理
│   ├── helpers/                         # ヘルパー関数
│   │   └── pythonRunner.js              # Python スクリプト実行ラッパー
│   ├── middlewares/                     # Express ミドルウェア
│   │   ├── auth.middleware.js           # JWT 認証
│   │   ├── error.handler.js             # グローバルエラー処理
│   │   ├── role.middleware.js           # ロールベースアクセス制御
│   │   └── upload.middleware.js         # ファイルアップロード処理
│   ├── models/                          # MongoDB スキーマ
│   │   ├── Bill.js                      # 請求スキーマ
│   │   ├── BlacklistToken.js            # ログアウト用トークンブラックリスト
│   │   ├── CostEstimate.js              # 見積スキーマ
│   │   ├── DamageReport.js              # 損傷レポートスキーマ
│   │   ├── ManualAssessment.js          # 手動評価スキーマ
│   │   ├── Notification.js              # 通知スキーマ
│   │   ├── Result.js                    # AI 結果保存スキーマ
│   │   ├── Role.js                      # ユーザーロールスキーマ
│   │   └── User.js                      # ユーザープロフィールスキーマ
│   ├── routes/                          # API ルート定義
│   │   ├── ai.routes.js                 # AI 評価エンドポイント
│   │   ├── auth.routes.js               # 認証エンドポイント
│   │   ├── bill.routes.js               # 請求エンドポイント
│   │   ├── costEstimate.routes.js       # 見積エンドポイント
│   │   ├── damageReport.routes.js       # 損傷レポートエンドポイント
│   │   ├── manualAssessment.routes.js   # 手動評価エンドポイント
│   │   ├── notification.routes.js       # 通知エンドポイント
│   │   └── profile.routes.js            # ユーザープロフィールエンドポイント
│   ├── seeds/                           # データベースシーディングスクリプト
│   │   ├── admin.seed.js                # 初期管理者アカウント
│   │   ├── assessor.seed.js             # 評価者ロール設定
│   │   └── role.seed.js                 # デフォルトロール作成
│   ├── services/                        # ビジネスロジックレイヤー
│   │   ├── ai.service.js                # AI サービス関数
│   │   ├── auth.service.js              # 認証サービス
│   │   ├── bill.service.js              # 請求サービス
│   │   ├── costEstimate.service.js      # 見積サービス
│   │   ├── damageReport.service.js      # 損傷レポートサービス
│   │   ├── manualAssessment.service.js  # 評価サービス
│   │   ├── notification.service.js      # 通知サービス
│   │   └── profile.service.js           # プロフィールサービス
│   ├── utils/                           # ユーティリティ関数
│   │   └── areaCalculator.js            # 損傷領域計算
│   └── server.js                        # Express アプリケーションエントリーポイント
├── static/                              # 静的アセットディレクトリ
│   ├── output/                          # AI モデル出力保存
│   └── segment_masks/                   # セグメンテーションマスク結果
├── uploads/                             # ユーザーアップロードファイル
│   └── avatars/                         # ユーザーアバター画像
├── package.json                         # プロジェクト依存関係
├── .env                                 # 環境変数
└── .gitignore                           # Git 無視ルール
```

### 技術スタック

**ランタイム・フレームワーク:**
- Node.js - JavaScript ランタイム環境
- Express.js 5.1 - Web アプリケーションフレームワーク
- MongoDB 8.19 - NoSQL データベース
- Mongoose 8.19 - MongoDB オブジェクトモデリング

**認証・セキュリティ:**
- JWT (jsonwebtoken 9.0.2) - トークンベース認証
- bcryptjs 3.0.3 - パスワードハッシュと暗号化
- Helmet 8.1.0 - セキュリティヘッダーミドルウェア
- express-rate-limit 8.2.1 - DDoS 対策レート制限
- CORS 2.8.5 - クロスオリジンリソース共有

**データ検証:**
- express-validator 7.3.0 - リクエスト検証とサニタイズ

**ファイル処理:**
- Multer 2.0.2 - ファイルアップロードミドルウェア
- ファイルシステム操作による画像保存

**Python 統合:**
- Python スクリプト実行用の子プロセス管理
- Node.js と Python ML モデル間の JSON 通信

**メールサービス:**
- Nodemailer 7.0.10 - メール配信サービス

**開発・ユーティリティ:**
- dotenv 17.2.3 - 環境変数管理
- cross-env 10.1.0 - クロスプラットフォーム環境変数

### インストールとセットアップ

#### 前提条件
- Node.js (バージョン 14.x 以上)
- npm (バージョン 6.x 以上) またはyarn
- MongoDB (バージョン 4.4 以上) - ローカルまたはリモートインスタンス
- Python 3.8以上 (AI モデル実行用)
- Git バージョン管理

#### ステップ 1: リポジトリをクローン
```bash
git clone https://github.com/sangoonthego/car-damage-assessment-system.git
cd car-damage-assessment-system/server
```

#### ステップ 2: 依存関係をインストール
```bash
npm install
# またはyarnを使用
yarn install
```

#### ステップ 3: 環境変数を設定
サーバーのルートディレクトリに `.env` ファイルを作成し、次の変数を追加します:

```
# サーバー設定
PORT=3636
NODE_ENV=development

# データベース設定
MONGO_URI=mongodb://localhost:27017/car_damage

# JWT 設定
JWT_SECRET=cdaismybestfriend

# ファイルアップロード設定
UPLOAD_DIR=uploads
STATIC_DIR=static

# Python AI 統合
PYTHON_AI_DIR=D:\saves\AI Research\Project\car_damage_assessment
```

**主な環境変数:**
- `PORT`: サーバーポート番号 (デフォルト: 3636)
- `MONGO_URI`: MongoDB 接続文字列
- `JWT_SECRET`: JWT トークン署名用の秘密鍵 (本番環境では強力で一意の値を使用)
- `PYTHON_AI_DIR`: Python AI モデルディレクトリパス

#### ステップ 4: データベースセットアップ

**オプション A: ローカル MongoDB**
システムで MongoDB が実行されていることを確認します:

```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**オプション B: MongoDB Atlas (クラウド)**
`.env` ファイルで `MONGO_URI` を更新:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/car_damage?retryWrites=true&w=majority
```

#### ステップ 5: シードデータでデータベースを初期化
シードスクリプトを実行して、初期ロールと管理者アカウントを作成:

```bash
# すべてのシードファイルを実行
node src/seeds/role.seed.js
node src/seeds/admin.seed.js
node src/seeds/assessor.seed.js
```

これにより以下が作成されます:
- 3つのデフォルトロール: クライアント、評価者、管理者
- 管理者権限を持つ管理者ユーザーアカウント
- 評価権限を持つ評価者ロール

#### ステップ 6: インストール確認
すべての依存関係が正しくインストールされていることを確認:

```bash
npm list
```

### アプリケーション実行

#### 開発モード

ホットリロードサポート付きで nodemon を使用してバックエンドサーバーを起動:

```bash
npm run dev
```

サーバーは `http://localhost:3636` (または設定された PORT) で起動します。

#### 本番モード

本番環境用のアプリケーションをビルド・実行:

```bash
npm start
```

#### 代替: 直接実行

```bash
node src/server.js
```

### API エンドポイント概要

バックエンドは以下のRESTful APIエンドポイントを機能別に提供:

#### 認証エンドポイント (`/api/auth`)
- `POST /api/auth/register` - 新規ユーザーアカウント登録
- `POST /api/auth/login` - メールとパスワードでログイン
- `POST /api/auth/logout` - ログアウトとトークン無効化

#### ユーザープロフィールエンドポイント (`/api/profile`)
- `GET /api/profile` - 現在のユーザープロフィール取得
- `PUT /api/profile` - ユーザープロフィール情報更新
- `GET /api/profile/:id` - ID でユーザープロフィール取得
- `DELETE /api/profile/:id` - ユーザーアカウント削除
- `POST /api/profile/avatar` - ユーザーアバター画像アップロード
- `PUT /api/profile/verify-email` - OTP でメール検証

#### AI 評価エンドポイント (`/api/ai`)
- `POST /api/ai/detect` - 損傷検出用画像アップロード
- `POST /api/ai/segment` - 損傷セグメンテーション用画像アップロード
- `GET /api/ai/results/:id` - 評価結果取得
- `GET /api/ai/history` - ユーザー評価履歴取得

#### 損傷レポートエンドポイント (`/api/damage-reports`)
- `POST /api/damage-reports` - 新規損傷レポート作成
- `GET /api/damage-reports` - すべての損傷レポート一覧 (ページ分割対応)
- `GET /api/damage-reports/:id` - 特定の損傷レポート取得
- `PUT /api/damage-reports/:id` - 損傷レポート更新
- `DELETE /api/damage-reports/:id` - 損傷レポート削除
- `PUT /api/damage-reports/:id/assign` - レポートを評価者に割り当て
- `PUT /api/damage-reports/:id/status` - レポートステータス更新

#### 手動評価エンドポイント (`/api/manual-assessment`)
- `POST /api/manual-assessment` - 手動評価作成
- `GET /api/manual-assessment` - 評価一覧
- `GET /api/manual-assessment/:id` - 評価詳細取得
- `PUT /api/manual-assessment/:id` - 評価更新
- `DELETE /api/manual-assessment/:id` - 評価削除
- `GET /api/manual-assessment/user/:userId` - ユーザーの評価取得

#### 見積エンドポイント (`/api/cost`)
- `POST /api/cost` - 見積生成
- `GET /api/cost/:id` - 見積詳細取得
- `PUT /api/cost/:id` - 見積更新
- `DELETE /api/cost/:id` - 見積削除
- `GET /api/cost/report/:reportId` - 損傷レポートのコスト取得

#### 請求エンドポイント (`/api/bills`)
- `GET /api/bills` - ユーザー請求情報取得
- `POST /api/bills/invoice` - 請求書生成
- `GET /api/bills/history` - 請求履歴取得
- `PUT /api/bills/:id/payment` - 支払い記録
- `GET /api/bills/statistics` - 請求統計取得

#### 通知エンドポイント (`/api/notifications`)
- `GET /api/notifications` - ユーザー通知取得
- `PUT /api/notifications/:id/read` - 通知を既読にマーク
- `DELETE /api/notifications/:id` - 通知削除
- `DELETE /api/notifications` - すべての通知削除

### リクエスト/レスポンス形式

#### 標準成功レスポンス
```json
{
  "success": true,
  "data": {},
  "message": "操作が正常に完了しました"
}
```

#### エラーレスポンス
```json
{
  "success": false,
  "error": "エラー説明",
  "statusCode": 400
}
```

#### 認証
保護されたすべてのエンドポイントは Authorization ヘッダーで JWT トークンが必要:
```
Authorization: Bearer <your_jwt_token>
```

### データベースモデル

**User モデル:**
- firstname、lastname、username、email (ユニーク)
- passwordHash、roleId (Role への参照)
- avatar、phone (ユニーク)、birthday、company、address
- isVerified、otp、otpExpires
- createdAt タイムスタンプ

**DamageReport モデル:**
- userId (User への参照)
- images (画像パスの配列)
- status (保留中、処理中、完了)
- aiResult (AI 予測を含むオブジェクト)
- assessorId (User への参照)
- createdAt、updatedAt タイムスタンプ

**ManualAssessment モデル:**
- damageReportId (DamageReport への参照)
- assessorId (User への参照)
- notes、damageDescription
- severity (低、中、高、致命的)
- estimatedRepairTime
- createdAt、updatedAt

**CostEstimate モデル:**
- damageReportId (DamageReport への参照)
- laborCost、partsCost、miscCost
- totalCost、currency
- estimatedTime
- createdAt、updatedAt

### セキュリティ対策

- bcrypt を使用したパスワードハッシュとソルト処理 (デフォルト: 10 ラウンド)
- 環境変数に保存される秘密鍵で署名された JWT トークン
- トークンブラックリストは無効化されたトークンの再利用を防止
- CORS はフロントエンドオリジンからのリクエストのみを受け入れるよう設定
- レート制限はブルートフォース攻撃から保護
- 入力検証はすべてのユーザー入力をサニタイズ
- Helmet.js は一般的な脆弱性からHTTPヘッダーを保護

### パフォーマンス最適化

- 頻繁にクエリされるフィールドのデータベースインデックス
- 大規模データセットのページネーション対応
- AI モデル結果のキャッシング
- データベースリクエストの接続プーリング
- ストリーミングによる効率的なファイルアップロード処理
- gzip によるレスポンス圧縮

### エラー処理

バックエンドは包括的なエラー処理を実装:
- 検証エラー (400 Bad Request)
- 認証エラー (401 Unauthorized)
- 認可エラー (403 Forbidden)
- リソース未検出エラー (404 Not Found)
- サーバーエラー (500 Internal Server Error)
- デバッグ向けのカスタムエラーメッセージ

### ログ・モニタリング

- 開発用のコンソールログ
- エラースタックトレースログ
- リクエスト/レスポンスログ利用可能
- データベース操作ログ
- パフォーマンス指標追跡

### 今後の改善予定

- 高度な分析とレポート機能
- 機械学習モデルのバージョン管理
- WebSocket によるリアルタイム通知
- 決済ゲートウェイの統合
- 多言語対応
- 高度な検索とフィルタリング

### チームメンバー

**開発者:** Nguyen Tuan Ngoc

### ライセンス

このプロジェクトはISCライセンスの下でライセンスされています。

### サポート

問題、質問、貢献については、プロジェクトリポジトリとドキュメントを参照してください。
