# Vercel 部署設置指南

## 🚀 自動部署（推薦）

### 第一步：連接 GitHub 到 Vercel

1. 去 https://vercel.com/new
2. 點擊 **Import Git Repository**
3. 登入你的 GitHub 賬戶（hishere4）
4. 搜索並選擇 `i-ching-divination`
5. 點擊 **Import**

### 第二步：配置項目設置

| 設置項 | 值 |
|--------|-----|
| **Framework Preset** | `Next.js` |
| **Root Directory** | `./` (默認) |
| **Build Command** | `next build` |
| **Output Directory** | `out` |

### 第三步：環境變量（暫時不需要）

暫無需要設置的環境變量。

### 第四步：部署

點擊 **Deploy** 按鈕！

Vercel 會自動：
- 拉取代碼
- 安裝依賴（npm install）
- 構建項目（npm run build）
- 部署到全球 CDN

---

## 📝 重要：確認 next.config.js

確保你的 `next.config.js` 有正確設置：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

---

## ✅ 部署後

Vercel 會給你一個網址：
```
https://i-ching-divination.vercel.app
```

之後每次你 `git push` 到 GitHub，Vercel 會自動重新部署！

---

## 🔧 如果部署失敗

### 常見問題 1：Build 失敗
```
Error: Could not find a Next.js project
```
**解決**：確保 `package.json` 有 `next` 依賴。

### 常見問題 2：Output directory not found
```
Error: No Output Directory named "dist" found
```
**解決**：確認 `next.config.js` 有 `distDir: 'dist'`。

### 常見問題 3：Images not loading
```
Error: Image optimization not available
```
**解決**：確認 `images: { unoptimized: true }`。

---

## 📱 部署狀態檢查

部署後可以去 Vercel Dashboard 查看：
- https://vercel.com/dashboard

找到你的項目，可以看到：
- ✅ 構建狀態
- 🌐 訪問網址
- 📊 分析數據

---

## 🎯 下一步

部署成功後：
1. **訪問網站** 測試功能
2. **補充64卦** 完善內容
3. **添加域名**（如需自定義域名）

---

需要我幫你檢查 `package.json` 或 `next.config.js` 嗎？
