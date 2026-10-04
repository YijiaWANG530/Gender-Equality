# The Compounding Gap

## English

### About the Project

The Compounding Gap is an interactive website about gender equality and workplace promotion opportunities.

The project uses a simplified mathematical model to show how a small difference in promotion probability can accumulate across multiple career stages and lead to a larger difference in expected representation.

Group A and Group B are kept neutral rather than directly representing men or women. The main focus is on how repeated differences in opportunity can shape later outcomes.

### Main Features

Users can adjust:

- Group A and Group B promotion probabilities
- Number of promotion stages
- Starting salary
- Salary growth per promotion

The website updates:

- Expected headcounts
- B/A representation ratio
- Promotion trend chart
- Stage-by-stage salary table
- Comparison results after equalizing opportunities

### Promotion Model

Both groups begin with 1,000 people.

```text
N_k = 1000 × p^k
```

With the default settings:

```text
Group A = 50%
Group B = 45%
Stages = 5
```

the expected final headcounts are approximately:

```text
Group A = 31.25
Group B = 18.45
B/A = 59.05%
```

### Equalizing Opportunities

The comparison tool allows Group B to use Group A's promotion probability after a selected stage.

This makes it possible to compare the original and adjusted outcomes and see how changing opportunities earlier or later can affect the final result.

### Salary Model

Salary is modeled as:

```text
S_j = S_0 × (1 + g)^j
```

The salary is the same for both groups at the same career level. The difference is in how many people are expected to reach that level.

### Technologies

- HTML
- CSS
- JavaScript
- Chart.js

The website supports English, Simplified Chinese, and Traditional Chinese.

### Disclaimer

This is a simplified educational model. The default values are illustrative and do not represent any specific company or population.

The project is designed to demonstrate how repeated differences in opportunity can accumulate over time, rather than to predict real workplace outcomes.

---

## 简体中文

### 项目介绍

The Compounding Gap 是一个关于性别平等与职场晋升机会的互动网站。

项目使用一个简化的数学模型，展示较小的晋升概率差异如何在多个职业阶段中不断累积，并最终形成更明显的群体代表性差距。

网站使用 A 组和 B 组作为中性名称，并不直接指定某一组代表男性或女性。重点是观察长期不同的晋升机会如何影响最终结果。

### 主要功能

用户可以调整：

- A 组和 B 组的晋升概率
- 晋升阶段数
- 起始薪资
- 每次晋升的薪资增长率

网站会实时更新：

- 两组的预期人数
- B/A 比例
- 晋升趋势图
- 各阶段薪资表
- 晋升机会调整后的比较结果

### 晋升模型

两组都从 1,000 人开始：

```text
N_k = 1000 × p^k
```

默认设置为：

```text
A 组 = 50%
B 组 = 45%
晋升阶段 = 5
```

最终预期人数约为：

```text
A 组 = 31.25
B 组 = 18.45
B/A = 59.05%
```

### 平等机会比较

用户可以选择一个阶段，让 B 组从之后的阶段开始使用和 A 组相同的晋升概率。

这个功能可以比较调整前后的结果，并更直观地观察平等机会出现得早或晚可能带来的不同影响。

### 薪资模型

薪资按照以下方式增长：

```text
S_j = S_0 × (1 + g)^j
```

同一个职业阶段中，两组的薪资相同。模型比较的是两组预计有多少人能够到达更高的职业阶段。

### 使用技术

- HTML
- CSS
- JavaScript
- Chart.js

网站支持英语、简体中文和繁体中文。

### 模型说明

这是一个简化的教学模型。默认数值仅用于示范，并不代表任何真实公司或群体。

项目主要用于展示重复出现的机会差异如何逐渐累积，而不是预测真实职场结果。

---

## 繁體中文

### 專案介紹

The Compounding Gap 是一個探討性別平等與職場升遷機會的互動式網站。

本專案透過簡化的數學模型，呈現看似不大的升遷機率差異，如何在多個職涯階段中逐步累積，最後形成更明顯的代表性差距。

網站以 A 組和 B 組作為中性名稱，不直接指定哪一組代表男性或女性。重點是觀察不同群體長期獲得不同升遷機會時，後續結果會如何改變。

### 主要功能

使用者可以調整：

- A 組與 B 組的升遷機率
- 升遷階段數
- 起薪
- 每次升遷的薪資成長率

網站會即時更新：

- 兩組的預期人數
- B/A 比例
- 升遷趨勢圖
- 各階段薪資表
- 調整升遷機會後的比較結果

### 升遷模型

兩組都從 1,000 人開始：

```text
N_k = 1000 × p^k
```

預設設定為：

```text
A 組 = 50%
B 組 = 45%
升遷階段 = 5
```

最後的預期人數約為：

```text
A 組 = 31.25
B 組 = 18.45
B/A = 59.05%
```

### 平等機會比較

使用者可以選擇一個階段，讓 B 組從之後的階段開始採用與 A 組相同的升遷機率。

這項功能可以比較調整前後的結果，也能更直觀地看到，平等機會從較早或較晚的階段開始，可能會帶來不同影響。

### 薪資模型

薪資成長方式為：

```text
S_j = S_0 × (1 + g)^j
```

在相同職涯層級中，兩組的薪資設定相同。模型比較的是兩組預期有多少人能夠到達較高的職涯層級。

### 使用技術

- HTML
- CSS
- JavaScript
- Chart.js

網站支援英文、簡體中文及繁體中文。

再用瀏覽器開啟 `index.html` 即可。

### 模型說明

本專案使用簡化的教學模型，預設數值僅供示範，不代表任何特定公司或族群。

主要目的是呈現重複出現的機會差異如何逐步累積，而不是用來預測真實職場結果。
