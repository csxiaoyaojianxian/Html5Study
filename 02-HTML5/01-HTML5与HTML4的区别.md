# HTML5与HTML4的区别

本文选译自：[W3C Working Group Note: HTML5 Differences from HTML4](http://www.w3.org/TR/html5-diff/)

# 关于本翻译：

- 原文所有指涉HTML5的地方用的要么是无定语的"HTML"，要么是“新的HTML”，为了避免和HTML4的混淆，均写作HTML5；
- 由于缺乏一目了然的译名，原文中的User Agent统一简写为UA；
- 由于原文的章节划分非常合理，第五节的属性均为Property，此外其它的章节均是Attribute，因此本文不在翻译上区分它们，均译作“属性”；
- Application统一简写为App；
- 为避免混淆，第四节即文档模型章节部分，分类名均保留英文名不翻译。
- 第五节中IDL([Interface Definition Language](http://www.w3.org/TR/WebIDL/))相关内容由于没有标准翻译，概念legacy caller、Stringifiers、 setter、getter、creator、deleter等均保留原文

# 1. 简介

## 1.1. 文档范围

本文档覆盖W3C的HTML5标准，它不包含W3C HTML5.1标准或WHATWG HTML标准。

## 1.4. 向后兼容

HTML5是这样被定义的：能向后兼容目前UA处理内容的方式。为了让语言更简单，一些老的元素和Attribute被舍弃。比如一些纯粹用于展现的元素（译注：即非语义化的元素，如`big`）或Attribute被舍弃，因为他们更适合用CSS来处理。
但UA依然可以支持老旧的属性和元素。这就是为什么HTML5标准清楚地划分了给开发的要求和给UA的要求。比如，开发者不应当使用`plaintext`元素，但UA需要兼容`plaintext`元素。
既然HTML5已区分对UA和对开发者的要求，再也不需将一些特性标记为deprecated（不赞成使用）了。

# 2. 语法

HTML5定义了HTML5语法，日前已广泛兼容于网络上HTML4和XHTML1的文档，但不兼容大部分HTML4中的深奥SGML特性，大部分UA都不支持它们，比如处理指令 (processing instructions) 和标签简写 (shorthand markup)。
HTML5语法中同时定义了解析规则——包括异常的处理方式。这种解析规则能够广泛支持HTML4领域的实现，UA可以使用这些规则来解析媒体类型为`text/html`的资源。

下面是一个能够说明HTML语法的示例文档：

```
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Example document</title>
  </head>
  <body>
    <p>Example paragraph</p>
  </body>
</html>
```

另外一个可以被用于HTML的语法是XML。XML语法可兼容于XHTML文档或实现。使用XML语法的文档需要配套XML文档的媒体类型如`application/xhtml+xml`或`application/xml`来使用，同时，元素需要遵循XML规则，被放到`http://www.w3.org/1999/xhtml`命名空间中：

```
<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Example document</title>
  </head>
  <body>
    <p>Example paragraph</p>
  </body>
</html>
```

## 2.1 符号编码

HTML标准中要求开发声明编码方式，有这些方式可以做到：

- 传输层，可以用HTTP头部的`Content-Type`
- 在文档头部放置对应使用的编码的BOM
- 使用有charset的meta元素
  比如`<meta charset="UTF-8">`可以用于声明UTF-8编码。这个新声明替代了`<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`，尽管后者依然可以使用。

XML语法中，开发需要按照XML标准来设置编码。

## 2.2 Doctype

HTML5语法要求声明Doctype，以确保浏览器以标准模式渲染页面。Doctype没有其他用途。
HTML5语法中的Doctype声明为`<!DOCTYPE html>`，不区分大小写。
之前HTML4标准中的Doctype更长，因为HTML4语法是基于SGML的，需要引用DTD。而在新的HTML5标准中，再也不需要引用DTD了（译注：因为HTML5不再基于SGML）。因此，doctype只是为了确保文档以标准模式渲染。
为了支持旧有的标签，可以使用`<!DOCTYPE html SYSTEM "about:legacy-compat">`作为Doctype声明。
HTML4.0、HTML 4.01、XHTML 1.0、XHTML 1.1之类严格的Doctype，在HTML5中可以使用，但不被提倡。
在XML语法中，可以使用任何Doctype声明或省略Doctype。使用XML媒体类型的文档永远会在标准模式中被解析。

## 2.3 MathML和SVG

HTML语法允许文档内嵌MathML和SVG元素。

- `math`和`svg`的开始标签将会导致HTML解析器转为特殊的插入模式，以将元素和属性放入合适的命名空间，并转化大小写，并支持XML中的空元素语法
- HTML中的math/svg的相关元素及其属性依然是区分大小写的
- 可以省略namespace（译注：如svg的namespace可以省略`xmlns="http://www.w3.org/2000/svg"`）
- 在这个特殊的插入模式里，可以使用CDATA语法
- 一些MathML和SVG元素可能导致解析器转回HTML解析模式，比如`mtext`和`foreignObject`，在这些元素内部你可以使用HTML元素或者新的`math`/`svg`元素。

一个使用了svg功能的例子如下：

```
<!doctype html>
<title>SVG in text/html</title>
<p>
 A green circle:
 <svg> <circle r="50" cx="50" cy="50" fill="green"/> </svg>
</p>
```

## 2.4 其它方面

- 字符实体`&lang;`和`&rang;`分别代表`U+27E8`和`U+27E9`（数学意义上的左右尖括号〈、〉），而非`U+2329`和`U+232A`（尖括号的旧有表示方法〈、 〉）。（译注，见[维基百科的说明](http://en.wikipedia.org/wiki/Bracket_(mathematics))）
- 一些新的字符实体被加入，包括在MathML中定义的全部字符实体
- 空元素（如`br`）允许有一个结尾反斜杠（trailing slash）
- 相较于HTML4，HTML5中的`&`在更多场景下不转义
- 属性需要起码一个空格字符来区隔开
- 有空值的属性等价于属性与值完全相同的情形（译注：比如`<input autofocus>`就相当于`<input autofocus="autofocus">`），即使这个属性并非boolean属性
- 相较于HTML4，HTML5中省略了引号的属性值允许使用更大范围的字符集
- HTML解析器不再对属性值中间出现的空格进行标准化，比如`<input id=" a ">`中的id不再有效，同时`<input value="">`中的value中的空行字符可以被使用，而不需要使用实体来替代
- `optgroup`结束标签可选填
- `colgroup`开始标签可选填，HTML解析器会根据上下文补完

# 3. 语言

## 3.1 新标签

以下标签的引入是为了用于更好的文档结构：

- `section`代表一般意义上的文档/app区块，它应当与`h1`~`h6`等元素搭配使用，以标示文档层级
- `article`代表了独立于文档的一块内容，比如blog入口或报刊文章
- `main`代表了文档/app的主体内容
- `aside`代表了一些与页面其它部分关联性不那么大的内容
- `header`代表了一组介绍性或导航性质的辅助内容
- `footer`代表了一个区块的底部，可以包含作者、版权等信息
- `nav`代表了文档中可以导航的区块
- `figure`代表了代表了一个独立的内容流
  `figcaption`可以用作内容流的标题
- `template`可以用于声明一块可用于克隆与插入的HTML片段
  （译注：这替代了我们常见的方案`textarea`、`script type="text/html"`、`script type="text/template"`）

其它的新标签：

- `audio`和`video`代表了多媒体元素，它们也提供了相应的API用于开发者定制UI，同时也提供了触发UA展示其默认控件的方式。
  `source`元素跟他们一同使用，用于有多类型的内容流的情形
  `track`提供了`audio`的文本轨道（译注：包含字幕等）
- `embed`用于插件内容
- `mark`代表了一个文档中需要标记或高亮的引用部分
- `progress`代表了一个任务的完成程度
- `meter`代表了一个度量，比如对磁盘空间的度量
- `time`代表了时间/日期
- `ruby`、`rt`、`rp`为ruby表达式
- `bdi`代表了一段隔绝于周围元素的双向书写文本格式
- `wbr`代表了可能断行的部分
- `canvas`用于渲染动态位图
- `datalist`与`input`的`list`属性共同使用，可以用于创建下拉选择框控件

```
<input list="browsers">
<datalist id="browsers">
 <option value="Safari">
 <option value="Internet Explorer">
 <option value="Opera">
 <option value="Firefox">
</datalist>
```

- `keygen`代表生成的密钥对
- `output`代表了一种输出内容

## 3.2 新属性

表单元素：

- `input`的`type`属性有了更多新值：`tel`、`search`、`url`、`email`、`date`、`time`、`number`、`range`、`color`
- `form`属性可用于在`input`、`output`、`select`、`textarea`、`button`、`label`、`object`、`fieldset`元素上指定关联的`<form>`元素的id，不局限于常规的层叠关系

```
<table>
 <tr>
  <th>Key
  <th>Value
  <th>Action
 <tr>
  <td><form id=a><input name=a-key></form>
  <td><input form=a name=a-value>
  <td><button form=a name=a-action value=save>✓</button>
      <button form=a name=a-action value=delete>✗</button>
 ...
</table>
```

- `input`、`textarea`元素可使用`placeholder`属性来帮助用户填写数据，注意，它不应当替代label元素的作用
- 非`type="hidden"`的`input`、`select`、`textarea`、`button`可使用`autofocus`元素来制定自动获得焦点的元素
- `input`、`select`、`textarea`有新属性`required`，代表了用户需要填写该字段，才可以提交这个表单。`select`的第一个元素应当为没有值的元素，以作为空值的占位符

```
<label>Color: <select name=color required>
 <option value="">Choose one
 <option>Red
 <option>Green
 <option>Blue
</select></label>
```

- `fieldset`标签允许使用`disabled`属性，这将禁止所有子元素的交互；它同时还可以使用`name`以方便脚本获取
- `input`元素有了用于指明输入限制的属性`autocomplete`, `min`,`max`, `multiple`, `pattern`及`step`
- `input type="image"`的元素有`width`和`height`属性
- `input`与`textarea`元素有了`dirname`以指明书写方向（译注：ltr或rtl）
- `textarea`元素有了新的属性，如`maxlength`、`minlength`、`wrap`来控制最大输入长度与提交时的断行行为
- `form`元素有了`novalidate`属性来禁止默认的表单验证行为
- `input`与`button`元素有了`formaction`, `formenctype`, `formmethod`, `formnovalidate`与`formtarget`属性，用于覆盖继承自form的`action`, `enctype`, `method`, `novalidate`及`target`属性
- `input`元素有了`minlength`和`maxlength`属性

非表单元素的新属性：

- `area`元素同`a`和`link`元素一样有了新的`hreflang`、`type`、`rel`属性
- `base`元素同`a`一样可以有`target`属性
- `meta`元素有了`charset`属性
- `script`元素有了`async`属性将影响脚本的加载与运行
- `html`元素有`manifest`属性，可用于指定缓存行为
- `link`元素有了新的属性`sizes`，可以指定不同的大小的favicon
- `ol`元素有了新的属性`reversed`，它代表着列表的顺序是逆序的
- `iframe`元素有了`sandbox`和`srcdoc`属性以支持沙盒安全保护
- `object`元素有了`typemustmatch`元素以保证更安全的嵌入顺序
- `img`元素有`crossorigin`属性以在canvas中支持CORS

HTML4中有一些全部标签都可以使用的属性，在HTML5中叫做全局属性，如：`accesskey` , `class`, `dir`, `id`, `lang`, `style`, `tabindex` 及`title`。此外，XHTML 1.0仅允许一些标签上的`xml:space`属性设置。
有这些新的全局属性：

- `contenteditable`
- `data-*`代表了开发定制的属性，这种格式可以避免与将来的新HTML属性冲突
- `hidden`属性代表一个元素不再与文档相关
- `role`及`aria-*`用于支持无障碍访问
- `spellcheck`用于指定内容是否允许进行拼写检查
- `translate`用于指定内容是否应当翻译

## 3.3 修改的标签

- `b`元素现在表示一段加强表示的文本，但并不表达额外的重要性、暗示需要加重的语气和声调(译注：与`em`的语义区分开来)。比如文档摘要里的关键字、产品评价里的产品名字、可以与之交互的文本等等
- `i`元素现在代表了一段需要使用不同的语气或声调的文本，或代表了不同品类的文本，如分类学名称、科技术语、其他语言中的方言或俚语等等
- `s`元素代表了不再准确/相关的元素
- `small`元素代表了旁注，如免责声明、注意事项、法律限制或版权声明
- `strong`元素代表了重要性，而非着重强调
- `u`元素 represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt.（译注：没理解这个元素的语义）
- `address`元素的范围现已由最近的祖先`article`/`body`元素决定，代表了后者的联系信息
- `script`标签可以被用于自定义数据块
- `blockquote`元素依然表示从另外一个来源里摘录的内容，但现在允许包含`footer`或`cite`元素
- `dl`元素现在代表了有关联的命名-值的列表，但不再适用于对话了
- `hr`元素代表了段与段之间的主题意义上的区隔（译注：即暗示段落主题已经发生了变化）
- `noscript`元素 represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed.（译注：没看出来前后有什么区别）

## 3.4. 修改的属性

（译注：大部分是限制放宽，略）

## 3.5. 废弃的元素

开发不应当使用这些废弃的元素了，但是UA仍应当支持他们。

这些元素被废弃，因为他们仅仅是用于展现层面的标签，他们用CSS处理更好：`basefont`、`big`、`center`、`font`、`strike`、`tt`。

这些元素被废弃，因为他们有损可访问性与可用性：`frame`、`frameset`、`noframes`

这些元素被废弃，因为他们罕有人使用、有其他元素替代或造成了迷惑：

- 在表示省略语的时候，`acronym`被`abbr`取代
- `applet`被`object`取代
- `isindex`元素被表单元素取代
- `dir`被`ul`取代

最后，`noscript`仅仅可以在HTML语法中被使用，它不被XML语法允许。
因为需要在视觉上隐藏它内部的内容，同时不允许`noscript`内部内容有运行脚本、应用样式、拥有可以提交的表单、加载资源等行为，所以`noscript`内部的内容将被当作纯文本解析。

## 3.6. 废弃的属性

这些属性被废弃，你可以在[这里](http://www.w3.org/TR/html5/single-page.html#non-conforming-features)找到你能够用以替代的属性或标签。

- `a`废弃属性：`shape`, `coords`, `rev`, `charset`
- `area`废弃属性：`nohref`
- `form`废弃属性：`accept`
- `head`废弃属性：`profile`
- `html`废弃属性：`version`
- `iframe`废弃属性：`longdesc`
- `img`废弃属性：`name`
- `input`废弃属性：`usemap`
- `link`废弃属性：`target`, `rev`, `charset`
- `meta`废弃属性：`scheme`
- `object`废弃属性：`archive`, `classid`, `codebase`, `codetype`, `declare`, `standby`
- `param`废弃属性：`valuetype`, `type`
- `table`废弃属性：`summary`
- `td`废弃属性：`axis`, `abbr`, `scope`
- `th`废弃属性：`axis`

此外，HTML不再包含纯用于表现的属性，它们应当被CSS替代：

- `caption`, `iframe`, `img`, `input`, `object`, `legend`, `table`, `hr`, `div`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `col`, `colgroup`, `tbody`, `td`, `tfoot`, `th`, `thead`和`tr`的`align`属性被废弃
- `body`的`alink`, `link`, `text`, `background`属性被废弃
- `table`, `tr`, `td`, `th`和`body`的`bgcolor`属性被废弃
- `object`的`border`属性被废弃
- `table`的`cellpadding`和`cellspacing`属性被废弃
- `col`, `colgroup`, `tbody`, `td`, `tfoot`, `th`, `thead`和`tr`的`char`和`charoff`属性被废弃
- `br`的`clear`属性被废弃
- `dl`, `ol`和`ul`的`compact`属性被废弃
- `table`的`frame`属性被废弃
- `iframe`的`frameborder`属性被废弃
- `td`和`th`的`height`属性被废弃
- `img`和`object`的`hspace`和`vspace`属性被废弃
- `iframe`的`marginheight`和`marginwidth`属性被废弃
- `hr`的`noshade`属性被废弃
- `td`和`th`的`nowrap`属性被废弃
- `table`的`rules`属性被废弃
- `iframe`的`scrolling`属性被废弃
- `hr`的`size`属性被废弃
- `li`,和`ul`的`type`属性被废弃
- `col`, `colgroup`, `tbody`, `td`, `tfoot`, `th`, `thead`和`tr`的`valign`属性被废弃
- `hr`, `table`, `td`, `th`, `col`, `colgroup`和`pre`的`width`属性被废弃

下列属性允许使用，但不鼓励被使用：

- `img`元素上的`border`属性。如果使用，要求使用0作为值。应当替代为CSS控制
- `script`元素上的`language`属性。如果使用，要求使用`JavaScript`（不区分大小写），同时不应当与`type`属性冲突。由于它没有实际意义，开发应当省略它
- `a`的`name`属性。开发应当使用`id`来替代它

# 4. 内容模型

内容模型即元素的嵌套规则。

内容模型层面，HTML4有这些混乱的规则：

- 有两个大类"inline"和"block-level"元素，有一些元素不属于任何一个类别
- 有一些元素允许嵌套inline元素(如`p`)；
  有些允许嵌套block-level元素(如`body`)；
  有些都允许(如`div`)；
  然而一些元素不根据类别、而仅仅允许嵌套特定元素(如`table` `dl`)；
  或完全不允许嵌套元素
- 一个元素可能在一个类别中，而内容模型却在另外一个类别中。
  比如`p`属于block-level，但内容模型为inline。
- 更加让人混淆的是，针对HTML4的不一样的DTD声明——Strict、Transitional或Frameset——有不一样的内容模型。
  比如Strict下body元素仅仅允许嵌套block-level元素，但在Transitional下，body元素两种元素都允许嵌套
- CSS的视觉格式化模型中也存在"block-level element"和"inline-level element"的区分，它跟CSS中的`display`属性相关，同时没有跟HTML的内容模型有任何关联

HTML5的内容模型不再使用"inline"和"block-level"的方式区分元素，为避免与CSS类似概念的混淆。然而，比起HTML4，它增加了更多类别，一个元素可以属于任意个数的类别。

HTML5中划分出来的类别如下：

- Metadata，如`link`、`script`
- Flow，如`span`、`div`、文本节点。它接近于HTML4层面的block-level和inline的混合
- Sectioning，如`aside`、`section`
- Heading，如`h1`
- Phrasing，如`span`、`img`、文本节点。它接近于HTML4的inline概念
- Embedded，如`img`、`iframe`、`svg`
- Interactive，如`a`、`button`、`label`

与HTML4有很大不一样的一点是，HTML5中不再出现仅仅允许嵌套"block-level"的类别了（译注：因为HTML5已经不存在"block-level"类别的标签了）。
比如，`body`允许Flow类别的内容。这个规则比起HTML4 Strict，它更接近HTML4 Transitional。

更多变化包括：

- `address`元素允许嵌套Flow类别的标签，但不允许嵌套Heading、Section类别的元素，不允许嵌套`header`、`footer`、另一个`address`
- HTML4允许`object`出现在`head`内部，但HTML5不允许
- `noscript`元素由block-level类别转为Phrasing类别
- `table`, `thead`, `tbody`, `tfoot`, `tr`, `ol`, `ul`及`dl`元素允许为空
- 表格元素需要遵从[表格模型](http://www.w3.org/TR/html5/single-page.html#table-model)。比如两个单元格不允许交叠
- `table`元素允许`tfoot`元素作为它的最后一个子元素
- `caption`元素允许嵌套Flow类别的元素，但不允许嵌套`table`元素
- `th`元素允许嵌套Flow类别的元素，但不允许嵌套`header`元素、`footer`元素、Sectioning类别或Heading类别的元素
- `a`的内容模型为transparent，它与它的父级拥有同样的内容模型，这意味着在`a`的父级允许Flow类别的子元素的时候，`a`可以嵌套`div`元素。
  此外，它不允许嵌套Interactive类别的元素
- `ins`和`del`元素的内容模型为transparent。
  HTML4有类似的规则，但无法在DTD中表达出
- 在`object`元素的`param`子元素以后，内容模型为transparent
  （译注：这个规则应该是为了覆盖`object`内嵌套`embed`的场景）
- `map`元素的内容模型为transparent
  当有一个`map`作为祖先节点的时候，`area`元素被当作Phrasing类别的元素，同时`area`不再需要成为`map`的直接子节点
- `legend`元素不再是`fieldset`必须的子节点了

# 5. API

HTML5引进、修改、扩展、废弃了很多API。

## 5.1 新增接口

HTML5为了帮助创建Web App，引入了一些新的接口：

- 媒体标签`video`和`audio`的播放流程控制、同步多个媒体标签、字幕等接口
- 表单限制验证接口
  （如`setCustomValidity`）
- 引入应用缓存机制，允许Web App离线的API
- 允许Web App注册为对应协议或媒体类型的处理应用的APP的API。
  （即`registerProtocolHandler`和`registerContentHandler`）
- 引入`contenteditable`属性，允许编辑任意元素的接口
- 暴露会话历史、允许使用脚本无刷新更新页面URL
  （`History`接口）
- base64转换API
  （`atob()`及`btoa()`）
- 处理搜索服务提供方的接口
  （`AddSearchProvider()`及`IsSearchProviderInstalled()`）
- `External`接口
- 打印文档的接口
  （`print()`）

（译注：下列接口是很早就有，属于BOM中的共识部分，直到HTML5才加入标准）

- 暴露文档URL、允许使用脚本切换、刷新页面的接口
  （`Location`接口）
- 基于时间的回调接口
  （`setTimeout()`及`setInterval()`）
- 提供给用户的提示接口
  （`alert()`，`confirm()`，`prompt()`）
- `Window`接口
- `Navigator`接口

## 5.2 修改的接口

如下DOM 2的接口已被改动：

- `document.title`的返回值将会折叠多个空格符
- `document.domain`允许赋值，因此可以改变文档的script origin
- `document.open()`可以清空文档（如果调用时仅有两个或以下参数），或像是`window.open()`一样表现（如果调用时有三个或四个参数）。在前种调用方式下，抛出一个XML异常
- `document.close()`、`document.write()`、`document.writeln()`抛出一个XML异常。后两者允许可变参数，他们可以在文档解析阶段往文档流中加入文本，并隐式调用`document.open()`。在一些情形下，他们都可能会被忽略
- `document.getElementsByName()`将返回满足`name`符合参数的所有HTML元素
- `HTMLFormElement`的`elements`接口将返回`HTMLFormControlsCollection`，包括`button`, `fieldset`, `input`, `keygen`, `object`, `output`, `select`及`textarea`
- `HTMLSelectElement`的`add()`接口允许第二个参数为数字
- `HTMLSelectElement`的`remove()`接口在参数越界的时候，将删除集合中第一个元素
- 在所有的HTML元素中都可以调用`click()`、`focus()`及`blur()`接口了
- `a`及`area`stringify为它们的`href`属性
  （译注：意味着`HTMLAnchorElement`和`HTMLAreaElement`对应的`toString`方法返回它们的href属性）

## 5.3 Document扩展

DOM Level 2中有个`HTMLDocument`接口，继承自`Document`接口，并提供了文档内部的元素（仅局限于HTML范畴内）访问接口。
HTML5将这些成员移动到了`Document`接口中，并在特定方向上拓展了它。由于各类文档（译注：XML、HTML5、SVG等等文档）都使用了`Document`接口，而HTML5范畴内的元素在所有类别的文档中都可用，因此这些接口在SVG等文档中都可以很好的运作。

此外，`Document`接口还有一些新成员：

- `location`、`lastModified`及`readyState`：用于帮助管理文档的元数据(metadata)
- `dir`、`head`、`embeds`、`plugins`、`scripts`：用于获取DOM树的不同部分
- `activeElement`及`hasFocus`接口，用于判断一个元素是否获得了焦点
- 文档编辑接口：`designMode`、`execCommand()`、`queryCommandEnabled()`、`queryCommandIndeterm()`、`queryCommandState()`、`queryCommandSupported()`、`queryCommandValue()`
- 所有的IDL事件处理属性。此外，`onreadystatechange`是唯一一个在`Document`上才有效的接口

在脚本中修改了`HTMLDocument`原型的那部分还是可以正常运转的，由于`window.HTMLDocument`也将返回`Document`接口。

## 5.4 HTMLElement扩展

`HTMLElement`接口也在HTML5中得到了扩展：

- 用于得到`data-*`的属性的接口`dataset`
- `click()`、`focus()`、`blur()`接口允许脚本模拟用户点击与切换焦点
- `accessKeyLabel`给予UA赋予该元素的快捷键，开发可以通过`accesskey`属性来影响UA的该行为
- `isContentEditable`返回元素是否可以编辑
- 全部的IDL事件处理属性
- 得到元素属性的接口如`translate`、`hidden`、`tabIndex`、`accessKey`、`contentEditable`、`spellcheck`、`style`
  （译注：DOM Level 2仅建议采用Element接口上的setAttribute和getAttribute来获取或设置HTML Attribute，HTML5的这些定义扩展了HTML Attribute的范围，让它们可以像DOM Property一样set和get——UA早已广泛支持）
- 有些之前在`HTMLElement`上定义接口被移动到了`Element`接口中：`id`、`className`、`classList`、`getElementsByClassName()`
  （译注：扩展了[DOM Level 2上的Element接口](http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-745549614)定义，可以直接set/get id等属性值了——UA早已广泛支持）

## 5.5 其它接口扩展

DOM Level 2中的其它接口也得到了扩展。

| 接口                    | 新增接口                                                     |
| ----------------------- | ------------------------------------------------------------ |
| `HTMLOptionsCollection` | legacy caller、setter creator、`add()`、`remove()`、`selectedIndex` |
| `HTMLFormElement`       | 通过name或index索引的getter、`checkValidity()`               |
| `HTMLSelectElement`     | getter、setter creator、`item()`、`namedItem()`、`labels`、`selectedOptions`及各种validate接口函数 |
| `HTMLOptionElement`     | 构造器`new Option()`                                         |
| `HTMLInputElement`      | `files`、`height`、`indeterminate`、`list`、`valueAsDate`、`valueAsNumber`、`width`、`stepUp()`、`stepDown()`、`labels`、文本选取区域API及各种validate接口函数 |
| `HTMLTextAreaElement`   | `textLength`、`labels`、文本选取区域API及各种validate接口函数 |
| `HTMLButtonElement`     | `labels`及各种validate接口函数                               |
| `HTMLLabelElement`      | `control`                                                    |
| `HTMLFieldSetElement`   | `type`、`elements`及各种validate接口函数                     |
| `HTMLAnchorElement`     | `relList`、`text`                                            |
| `HTMLLinkElement`       | `relList`                                                    |
| `HTMLAreaElement`       | `relList`                                                    |
| `HTMLImageElement`      | 构造器`new Image()`、`naturalWidth`、`naturalHeight`、`complete` |
| `HTMLObjectElement`     | `contentWindow`、legacy caller及各种validate接口函数         |
| `HTMLMapElement`        | `images`                                                     |
| `HTMLTableElement`      | `createTBody()`                                              |
| `HTMLIFrameElement`     | `contentWindow`                                              |

此外：

- `HTMLLinkElement`和`HTMLStyleElement`实现了CSSOM中的`LinkStyle`接口
- `HTMLAnchorElement`、`HTMLLinkElement`和`HTMLAreaElement`实现了`URLUtils`接口

## 5.6 废弃接口

- 在HTML5中已被废弃的属性，其对应IDL属性接口也将被废弃。如`bgColor`已被废弃，那么`HTMLBodyElement`之上的IDL属性接口`bgcolor`也被废弃
- 在HTML5中已被废弃的元素，其对应接口也被废弃，包括`HTMLAppletElement`, `HTMLFrameSetElement`, `HTMLFrameElement`, `HTMLDirectoryElement`及`HTMLFontElement`、`HTMLBaseFontElement`
- 由于HTML解析器将`isindex`替代为其他元素了，`HTMLIsIndexElement`接口被废弃
- 一些成员属性从`HTMLDocument`接口移动到了`Document`接口，因此在原来的`HTMLDocument`下被废弃：`anchors`和`applets`。

