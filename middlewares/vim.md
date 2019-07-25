const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next)=>{
    try {
        await next()
    } catch (error) {
        // 开发环境
        // 生产环境
        // 开发环境 不是HttpException
        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        
        if(isDev && !isHttpException){
            throw error
        }
        
        if(isHttpException){
            ctx.body = {
                msg:error.msg,
                error_code:error.errorCode,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
        else{
            ctx.body = {
                msg: 'we made a mistake O(∩_∩)O~~',
                error_code: 999,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError
### 插入技巧
```
a/i/o  a当前选中的字母后面 i选中字母的前面 o下一行
       A行首              I行尾          O 上一行
ctrl+h 删除上一个字符
ctrl+w 删除上一个单词
ctrl+u 删除当前行

esc/ctrl+c/ctrl+[

gi快速定位到上次编辑的地方
```
### 单词的移动
```
w/W 移动到下一个单词的开头
e/E 移动到下一个单词的结尾
b/B 移动上一个word开头
f{char} 移动到char字符上，t移动到char的前一个字符 如果第一次没搜到用;(该行下一个) ,(上一个)

行的移动
0 到行首(0w组合 = ^)    $ 行尾
^ 移动到第一个非空白字符

页面移动
gg移动到文件的开头
G移动到文件的结尾
H/M/L 屏幕的开头中间结尾

ctrl+u 上翻页
ctrl+f 下翻页
```
### 增删改查
```
x删除
dw删除单词
daw 删除单词包括空格
diw 删除单词不包括空格
dd删除一行
dt)删除括号里的内容 dt" 删除引号内的内容 -----从当前位置
d$ 删除到行尾 d0删除到行首

修改
r replace  r+替换的字符直接替换
R 直接输入替换
c change    ct字符 并插入 
s substitute s删除当前字符并开始插入
S 删除当前行 并插入

查询
:1,6 s/ctx/content/g
:开头 1,6行或者%(全局) s替换/ctx/替换的内容/g全局

复制粘贴
normal:
    y 复制 
    p 粘贴

    d 剪切
    yy复制一行

insert
    
```