const rules = {
    book: {
        id: [{ required: true, message: "账本id不可为空" }, { pattern: /^[1-9]\d*$/, message: "账本id格式错误" }],
        name: [{ required: true, message: "账本名不可为空" }, { length: 50, message: "账本名超出限制长度" }],
        remark: [{ required: false, message: "" }],
        // 筛选条件
        pageNum: [{ required: false, message: "" }, { pattern: /^[1-9]\d*$/, message: "pageNum格式错误" }],
        pageSize: [{ required: false, message: "" }, { pattern: /^[1-9]\d*$/, message: "pageSize格式错误" }],
    },
    label: {
        id: [{ required: true, message: "数据id不可为空" }, { pattern: /^[1-9]\d*$/, message: "用户id格式错误" }],
        label: [{ required: true, message: "标签不可为空" }],
        creatorId: [{ required: true, message: "创建者用户id不可为空" }, { pattern: /^[1-9]\d*$/, message: "用户id格式错误" }],
    },
    detail: {
        id: [{ required: true, message: "数据id不可为空" }, { pattern: /^[1-9]\d*$/, message: "数据id格式错误" }],
        bookId: [{ required: true, message: "账本id不可为空" }, { pattern: /^[1-9]\d*$/, message: "账本id格式错误" }],
        type: [{ required: true, message: "类型不可为空" }, { pattern: /[01]/, message: "类型格式错误" }],
        date: [{ required: true, message: "日期不可为空" }, { pattern: /^[1-9]\d{3}-[01]\d-(([0-2]\d)|(3[01]))$/, message: "日期格式错误" }],
        amount: [{ required: true, message: "金额不可为空" }, { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: "金额格式错误" }],
        labelId: [{ required: true, message: "标签id不可为空" }, { pattern: /^[1-9]\d*$/, message: "标签id格式错误" }],
        remark: [{ required: false, message: "", max: 100 }],
        // 筛选条件
        start: [{ required: false, message: "" }],
        end: [{ required: false, message: "" }],
    },
}

module.exports = rules;