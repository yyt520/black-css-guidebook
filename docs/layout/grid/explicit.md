---
title: 显式网格属性
order: 2
group:
  title: 网格布局
  order: 8
nav:
  title: 布局
  order: 2
---

# 显式网格属性

* 网格容器
* 网格模版
  * 网格轨道
  * 网格轨道最值尺寸
  * 重复的网格轨道
* 网格线
  * 网格项目跨越行列
  * 网格线命名
  * 网格线名定位项目
  * 同名网格线命名和定位项目
  * 网格线区域命名和定位项目
* 网格间隙

## 网格容器

将元素定义为网格容器，并为其内容建立新的网格格式上下文（GFC）。

- `grid`：网格项目按行排列，网格项目占用整个容器的宽度。
- `inline-grid`：网格项目按行排列，网格项目宽度由自身宽度决定。

```css
grid {
    display: grid | inline-grid
}
```

## 网格模版

* `grid-template`
* `grid-template-rows`
* `grid-template-columns`
* `grid-template-area`

### 网格轨道

属性 `grid-template-rows` 和 `grid-template-columns` 用于显示定义网格，分别用于定义行轨道和列轨道。

| 属性                    | 描述                                                       |
| ----------------------- | ---------------------------------------------------------- |
| `grid-template-rows`    | 定义行的尺寸，即轨道尺寸。轨道尺寸可以是任何非负的长度值。 |
| `grid-template-columns` | 定义列的尺寸。                                             |

🌰 **示例**

```css
grid {
    display: grid;
    grid-template-rows: 50px 100px;
    grid-template-columns: 50px 100px 150px;
}
```

单位 `fr` 用于表示轨道尺寸配额，表示按配额比例分配分配可用空间。

🌰 **示例**

```css
grid {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
}
```

单位 `fr` 和其它长度单位混合使用时，`fr` 的计算基于其它单位分配后的剩余空间。

🌰 **示例**

该示例中 `1fr = (容器宽度 - 3rem -容器宽度的25%) / 3`

```css
grid {
    display: grid;
    grid-template-columns: 3rem 25% 1fr 2fr;
}
```

### 网格轨道最值尺寸

函数 `minmax()` 用于定义轨道最小 / 最大边界值。

函数 `minmax()` 接收两个参数：第一个参数表示最小轨道尺寸，第二个参数表示最大轨道尺寸。长度值可以是 `auto`，表示轨道尺寸可以根据内容大小进行伸长或收缩。

🌰 **示例**

本例中，第一行最小高度设置成 100px，但是最大高度设置成 `auto`，表示行高可以根据内容伸长超过 100px。

本例中，第一列宽度的最大值设置成 50%，表示其宽度不能超过整个容器宽度的 50%。

```css
grid {
    display: grid;
    grid-template-rows: minmax(100px, auto);
    grid-template-columns: minmax(auto, 50%) 1fr 3em;
}
```

### 重复的网格轨道

函数 `repeat()` 用于定义重复的网格轨道，尤其适用于有多个重复单元格的情况下。

函数 `repeat()` 接收两个参数：第一个参数表示重复的次数，第二个参数表示轨道尺寸。

🌰 **示例**

```css
grid {
    display: grid;
    grid-template-rows: repeat(4, 100px);
    grid-template-columns: repeat(3, 1fr);
}
```

函数 `repeat()` 可以用在轨道定义列表当中。

🌰 **示例**

本例中，第 1 列和第 5 列的宽度是 50px。函数 `repeat()` 创建中间三列，每一列宽度都是 `1fr`。

```css
grid {
    display: grid;
    grid-template-columns: 50px repeat(3, 1fr) 50px;
}
```

## 网格线

网格线本质上是用来表示网格轨道的开始和结束。

每一条网格线编号都以 1 开始，以 1 为步长向前编号，其中包括行列两组网格线。

🌰 **示例**

这是一个 3 行 2 列的网格，即在行上有 4 条网格线，在列上有 3 条网格线。项目 1 利用网格线编号定位在第 2 行第 2 列的位置上。

```css
.item1 {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;
}
```

属性 `grid-row` 是 `grid-row-start` 和 `grid-row-end`的简写形式。

属性 `grid-column` 是 `grid-column-start` 和 `grid-column-end`的简写形式。

- 如果只指定一个值，它表示 `grid-row/column-start`。

- 如果两个值都指定，第一个表示 `grid-row/column-start` ，第二个值表示`grid-row/column-end`。而且你必须用斜杠（`/`）分隔这两个值。

🌰 **示例**

```css
.item1 {
    grid-row: 2;
    grid-column: 3/4;
}
```

属性 `grid-area` 是 `grid-row-start`, `grid-column-start`, `grid-row-end` 和 `grid-column-end`的简写形式。

如果四个值都指定，则第一个表示 `grid-row-start`, 第二个表示 `grid-column-start`, 第三个表示 `grid-row-end` ,第四个表示 `grid-column-end`。

🌰 **示例**

```css
.item1 {
    grid-area: 2/2/3/3;
}
```

**总结**

* `grid-row-start`
* `grid-row-end`
* `grid-column-start`
* `grid-column-end`
* `grid-row`：`grid-row-start / grid-row-end`
* `grid-column`：`grid-column-start / grid-column-end`
* `grid-area`：`grid-row-start / grid-column-start / grid-row-end / grid-column-end`

### 网格项目跨越行列

网格项目默认都占用一行和一列，但可以使用前一节中定位项目的属性来指定项目跨越多行或多列。

通过 `grid-column-start` 和 `grid-column-end` 属性值的设置，使该网格项目跨越多列。

🌰 **示例：跨越多列**

```css
.item1 {
    grid-cloumn-start: 1;
    grid-column-end: 4;
}
```

通过 `grid-row-start` 和 `grid-row-end` 属性值的设置，使该网格项目跨越多行。

🌰 **示例：跨越多行**

```css
.item1 {
    grid-row-start: 1;
    grid-row-end:   4;
}
```

简写属性 `grid-row` 和 `grid-column` 即能用来定位项目，也能用来使项目跨越多个行列。

🌰 **示例：跨越多个行列**

```css
.item1 {
    grid-row: 2 / span 3;
    grid-column: span 2;
}
```

关键字 `span` 用来指定跨越行或列的数量。`span 1` 代表跨越一个单位的行/列。

### 网格线命名

当利用属性 `grid-template-rows` 和 `grid-template-columns` 定义网格时，可以同时定义网格线的名称。网格线名称可以用于定位网格项目。

用属性`grid-template-rows` 和 `grid-template-columns`定义网格，同时定义网格线名称。

为避免混淆，网格线名称应避免使用规范中的关键字（`span` 等）。

定义网格线名称的方法是要将其放在中括号内（`[name-of-line]`），并要和网格轨道相对应。

🌰 **示例：网格线命名**

```css
grid  {
    display: grid;
    grid-template-rows:    [row-1-start] 1fr [row-2-start] 1fr [row-2-end];
    grid-template-columns: [col-1-start] 1fr [col-2-start] 1fr [col-3-start] 1fr [col-3-end];
｝
```

可以给同一网格线定义多个名称，方法就是在中括号内用空格将多个名称分开。

每一个网格线名都可以被引用，以用来定位网格项目。

🌰 **示例：网格线命名多个名称**

```css
.grid {
    display: grid;
    grid-template-rows: [row-start row-1-start] 1fr [row-1-end row-2-start] 1fr [row-2-end row-end];
    grid-template-columns: [col-start] 1fr [col-2-start] 1fr [col-3-start] 1fr [col-end];
}
```

### 网格线名定位项目

利用命名的网格线，可以很方便地进行项目定位。

引用网格线名称不用加中括号。

🌰 **示例**

```css
.item1 {
    grid-row-start: row-2-start;
    grid-row-end: row-end;
    grid-column-start: col-2-start;
    grid-column-end: col-end;
}
```

简写属性`grid-row` 和 `grid-column` 也可以利用网格线名称来定位项目。

🌰 **示例**

```css
.item1 {
    grid-row: row-2-start / row-end;
    grid-column: col-2-start / col-end;
}
```

### 同名网格线命名和定位项目

函数 `repeat()` 可以定义同名网格线。这节省了给每条网格线都命名的时间。

🌰 **示例**

```css
grid {
    display: grid;
    grid-template-rows: repeat(3, [row-start] 1fr [row-end]);
    grid-template-columns: repeat(3, [col-start] 1fr [col-end]);
}
```

函数 `repeat()` 可以用来定义同名网格线。 这样多个网格线拥有相同的名字。

同名网格线会被分配一个位置编号，做为其唯一标识。

🌰 **示例**

本例中，项目 1 的行定位开始于第 2 条名称是`row-start`的网格线，结束于第 3 条名称是`row-end`的网格线；列定位开始于第 1 条名称是`col-start`的网格线，结束于第 3 条名称是`col-start`的网格线

```css
.item1 {
   grid-row: row-start 2 / row-end 3;
   grid-column: col-start / col-start 3;
}
```

⚠️ 注意：用同名网格线来定位项目时，应注意在网格线名称和编号之间有一个空格。

### 网格线区域命名和定位项目

如同网格线命名，可以用属性 `grid-template-areas` 给网格区域命名。网格区域名称可以用来定位网格项目。

一组区域名称要放在单引号或双引号内，每一个名称之间以空格分隔。

每一组名称定义一行，每一个名称定义一列。

🌰 **示例：网格区域命名**

```css
grid {
    display: grid;
    grid-template-areas: "header header"
                         "content sidebar"
                         "footer footer";
    grid-template-rows: 150px 1fr 100px;
    grid-template-columns: 1fr 200px;
}
```

网格区域名称可以用在属性 `grid-row-start`、`grid-row-end`、`grid-column-start` 和 `grid-column-end` 的值中，用来定位项目。

🌰 **示例：网格线定位**

```css
header {
    grid-row-start: header;
    grid-row-end: header;
    grid-column-start: header;
    grid-column-end: header;
}
```

网格区域名称也可以用于简写属性 `grid-row` 和 `grid-column` 的值中。

🌰 **示例：简写属性**

```css
footer {
    grid-row: footer;
    grid-column: footer;
}
```

网格区域名称也可以用于简写属性 `grid-area` 的值中。

🌰 **示例：网格区域**

```css
aside {
    grid-area: sidebar;
}
```

## 网格间隙

📌 属性 `grid-column-gap` 和 `grid-row-gap` 用于定义网格间隙。

网格间隙只创建在行列之间，项目与边界之间无间隙。

间隙尺寸可以是任何非负的长度值。

🌰 **示例**

```css
grid {
    display: grid;
    grid-row-gap: 20px;
    grid-column-gap: 5rem;
}
```

📌 属性 `grid-gap` 是 `grid-row-gap` 和 `grid-column-gap` 的简写形式。

📌 第一个值表示行间隙，第二个值表示列间隙。

🌰 **示例**

```css
grid {
    display: grid;
    grid-gap: 100px 1em;
}
```

如只有一个值，则其即表示行间隙，也表示列间隙。

🌰 **示例**

```css
grid {
    display: grid;
    grid-gap: 2rem;
}
```

