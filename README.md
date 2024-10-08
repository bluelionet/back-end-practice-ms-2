# 簡介

此專案以 REST API 的形式實作一個簡易銀行系統，系統包含開戶、存款、提款、轉帳四項功能。

# 安裝與執行

1. `git clone` 此 repository 到本地端
1. 於本地端切換到 repository 資料夾下
1. 執行 `npm install` 指令進行安裝
1. 執行 `node app.js` 指令跑起程式
1. 可開始使用 Postman 等軟體測試 API end points 了

# 單元測試與整合測試

1. 於本地端切換到 repository 資料夾下
1. 執行 `npm test` 指令開始測試

# API end points

## `POST /api/create_account`

- 行為：開戶
- body 格式：`{ name: 字串, balance: 整數且 >= 0 }`

## `POST /api/deposit`

- 行為：存款
- body 格式：`{ accountId: 整數, amount: 整數且 > 0 }`

## `POST /api/withdraw`

- 行為：提款
- body 格式：`{ accountId: 整數, amount: 整數且 > 0 }`

## `POST /api/transfer`

- 行為：轉帳
- body 格式：`{ fromAccountId: 整數, toAccountId: 整數, amount: 整數且 > 0 }`

# 關鍵程式碼

- `/app.js`
- `/test/unit.js`
- `/test/integration.js`
