---
title: 隐式网格属性
order: 3
group:
  title: 网格布局
  order: 8
nav:
  title: 布局
  order: 2
---

# 隐式网格属性

* `grid-auto-rows`
* `grid-auto-columns`
* `grid-auto-flow`

## 隐式网格

隐式网格用来在显式网格之外定位项目。有时在显示网格中没有足够的空间，或者是要在显示网格之外定位项目就要用到隐式网格。这时可以把这些项目放置在隐式网格中。

隐式网格可以通过属性 `grid-auto-rows`、`grid-auto-columns` 和 `grid-auto-flow` 来定义。

🌰 **示例**

本例中，只定一个行轨道，因此项目 1 和 2 高 70px 。

第 2 行轨道有隐式网格自动创建并为项目 3 和 4 分配了空间。 属性 `grid-auto-rows` 定义了隐式网格的行轨道尺寸，即项目 3 和 4 的高度是 140px 。

```css
grid {
    display : grid;
    grid-template-rows: 70px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 140px;
}
```

缺省的网格布局方向是行的方向（`row`）。

🌰 **示例**

```css
grid {
    display : grid;
    grid-auto-flow: row;
}
```

网格的布局方向可以定义为列的方向（column）。

🌰 **示例**

```css
grid {
    display: grid;
    grid-auto-flow: column;
}
```

## 隐式命名的网格区域

网格线名称可以任意指定，但分配以 `-start` 和 `-end` 结尾的名字有额外的益处，这样隐式地创建了具名网格区域，该名称可以用于项目定位。

**示例**

本例中，行和列都有名为 `inner-start` 和 `inner-end` 的网格线，它们隐式地给网格区域分派了名称（`inner`）。

```css
grid {
    display : grid;
    grid-template-rows: [outer-start] 1fr [inner-start] 1fr [inner-end] 1fr [outer-end];
    grid-template-columns: [outer-start] 1fr [inner-start] 1fr [inner-end] 1fr [outer-end];
}

item1 {
    grid-area: inner;
}
```

这样我们就能够直接使用网格区域名来定位，而不需要再用网格线来定位项目了。

## 隐式命名网格线

隐式命名网格线和隐式命名的网格区域的工作原理刚好相反。

🌰 **示例**

定义网格区域时隐式的命名了网格线的名称。这些网格线的名称是基于区域名加上 `-start` 或 `-end` 后缀组成的。

```css
grid {
    display : grid;
    grid-template-areas: "header header"
                         "content sidebar"
                         "footer footer";
    grid-template-rows: 80px 1fr 40px;
    grid-template-columns: 1fr 200px;
}
```

🌰**示例**

本例中，`header` 是通过隐式网格线名称进行定位的。

```css
.item1 {
    grid-row-start: header-start;
    grid-row-end: content-start;
    grid-column-start: footer-start;
    grid-column-end: sidebar-end;
}
```

## 层叠网格项目

通过项目定位可以使多个项目层叠在一起，属性 `z-index` 可以改变层叠项目的层次。

🌰 **示例**

本例中，项目 1 和 2 行定位开始于第 1 条行网格线，并跨越两列。

两个项目都是用网格线编号进行定位。项目 1 起始于第 1 条列网格线，项目 2 起始于第 2 条列网格线，这使得两个项目在第一行中间列发生层叠。

缺省情况下，项目 2 将层叠于项目 1 之上；然而，给项目 1 设置属性 `z-index: 1` 就使得项目 1 层叠于项目 2 之上。

```css
.item-1, .item-2 {
  grid-row-start:  1;
  grid-column-end: span 2;
}
.item-1 { grid-column-start: 1; z-index: 1; }
.item-2 { grid-column-start: 2 }
```

🌰 **示例**

本例中，利用在 `grid-template-areas` 定义中的隐式网格线名称，定位了一个网格项目（`overlay`），并将层叠于上层。

```css
.overlay {
    grid-row-start: header-start;
    grid-row-end: content-end;
    grid-column-start: content-start;
    grid-column-end: sidebar-start;
    z-index: 1;
}
```

## 网格项目的对齐方式

CSS 的 [盒模型对齐模块](https://drafts.csswg.org/css-align/) 补充了 CSS 网格的内容，网格项目可以按行或列的轴线方向实现多种对齐方式。

属性 `justify-items` 和 `justify-self` 以行轴为参照对齐项目，属性 `align-items` 和 `align-self` 以列轴为参照对齐项目。

属性 `justify-items` 和 `align-items` 是网格容器的属性，并支持如下这些值：

| 值             | `justify-items`                                      | `align-items`                    |
| -------------- | ---------------------------------------------------- | -------------------------------- |
| auto           |                                                      |                                  |
| normal         |                                                      |                                  |
| start          | 在行的轴线起点处对齐                                 | 在列的轴线起点处对齐             |
| end            | 在行的轴线终点处对齐                                 | 在列的轴线终点处对齐             |
| center         | 在行的轴线中点处对齐                                 | 在列的轴线中点处对齐             |
| stretch        | 在行的轴线方向延伸并填满整个区域。`stretch` 是缺省值 | 在列的轴线方向延伸并填满整个区域 |
| baseline       |                                                      |                                  |
| first baseline |                                                      |                                  |
| last baseline  |                                                      |                                  |

## 网格轨道的对齐方式

在网格容器中，网格轨道延轴线方向有多种对齐方式。

属性 `align-content` 用于定义网格轨道延着行的轴线的对齐方式，而属性 `justify-content` 用于定义网格轨道沿着列的轴线的对齐方式。并分别支持如下属性：

| 属性值         | `justify-content`                              | `align-content`                                   |
| -------------- | ---------------------------------------------- | ------------------------------------------------- |
| normal         |                                                |                                                   |
| start          | 列的轨道在行的轴线起点处对齐。`start` 是缺省值 | 行的轨道在列的轴线起点处对齐，属性`start`是缺省值 |
| end            | 列的轨道在行的轴线终点处对齐                   | 行的轨道在列的轴线终点处对齐                      |
| center         | 列的轨道在行的轴线中间处对齐                   | 行的轨道在列的轴线中点处对齐                      |
| stretch        |                                                |                                                   |
| space-around   | 在每一列的两侧平均分配额外空间                 | 每一行的两侧平均分配额外空间                      |
| space-between  | 在列与列之间平均分配额外的空间                 | 在行与行之间平均分配额外空间。                    |
| space-evenly   | 在列与列之间及列与边界之间平均分配额外空间     | 在行与行之间及行与边界之间平均分配额外空间。      |
| baseline       |                                                |                                                   |
| first baseline |                                                |                                                   |
| last baseline  |                                                |                                                   |