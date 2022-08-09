let optionsButtons = document.querySelectorAll('.option-button')
let advancedOptionButton = document.querySelectorAll('.adv-option-button')
let fontName = document.getElementById('fontName')
let fontSizeRef = document.getElementById('fontSize')
let writingArea = document.getElementById('text-input')
let linkButton = document.getElementById('createLink')
let alignButtons = document.querySelectorAll('.align')
let spacingButtons = document.querySelectorAll('.spacing')
let formatButtons = document.querySelectorAll('.format')
let scriptButtons = document.querySelectorAll('.script')

// font列表
let fontList = ['Arial', 'Verdana', 'Times New Roman', 'Garamond', 'Georgia', 'Courier New', 'cursive']

// 初始化
const initializer = () => {
    highlighter(alignButtons, true)
    highlighter(spacingButtons, true)
    highlighter(formatButtons, false)
    highlighter(scriptButtons, true)

    // 为fontlist创造选项
    fontList.map(value => {
        let option = document.createElement('option')
        option.value = value
        option.innerHTML = value
        fontName.appendChild(option)
    })

    // fontsize最多为7
    for (let i = 0; i < 7; i++) {
        let option = document.createElement('option')
        option.value = i
        option.innerHTML = i
        fontSizeRef.appendChild(option)
    }

    // 默认fontsize
    fontSizeRef.value = 3

    // 主要逻辑
    // 修改文本
    const modifyText = (command, defaultUi, value) => {
        // execcommand允许操作可编辑内容区域的元素
        document.execCommand(command, defaultUi, value)
    }

    // 不需要传值的操作
    optionsButtons.forEach(button => {
        button.addEventListener('click', () => {
            // button.id作为command传入并实现对应的效果，具体见mdn execCommand
            modifyText(button.id, false, null)
        })
    })

    // 需要传值的操作
    advancedOptionButton.forEach(button => {
        button.addEventListener('change', () => {
            modifyText(button.id, false, button.value)
        })
    })

    // 连接
    linkButton.addEventListener('click', () => {
        let userLink = prompt('Enter A URL')
        // 判断连接有没有http开头
        if(/http/i.test(userLink)){
            modifyText(linkButton.id, false, userLink)
        }else {
            userLink = 'http://' + userLink
            modifyText(linkButton.id, false, userLink)
        }
    })
}

// 高亮被点击的按钮
const highlighter = (className, needsRemoval) => {
    className.forEach(button => {
        button.addEventListener('click', () => {
            // 如果needsRemoval是true，那么只有一个按钮高亮其他原样
            if(needsRemoval){
                let alreadyActive = false
                // 如果点击的按钮已经高亮
                if(button.classList.contains('active')){
                    alreadyActive = true
                }
                // 从其他按钮移除高亮
                highlighterRemover(className)
                if(!alreadyActive){
                    // 高亮被点击按钮
                    button.classList.add('active')
                }
            }
            else{
                button.classList.toggle('active')
            }
        })
    });
}

const highlighterRemover = className => {
    className.forEach(button => {
        button.classList.remove('active')
    })
}

window.onload = initializer()