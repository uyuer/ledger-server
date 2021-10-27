var fs = require('fs');

// 检查对象是否有指定属性
// preinstall: 指定属性
// params: 被检查对象
exports.hasAttribute = (preinstall, params) => {
	let result = preinstall.every((key) => {
		if (params.hasOwnProperty(key)) {
			return true;
		}
		return false;
	});
	return result;
};

/**
 * 确定目录是否存在
 * pathStr: 路径
 * isCreate: 是否创建该目录, 默认false不创建
 */
exports.confirmPath = function (pathStr, isCreate = false) {
	if (fs.existsSync(pathStr)) {
		return true;
	}
	if (isCreate) {
		fs.mkdirSync(pathStr);
		console.log('createPath: ' + pathStr);
		return true;
	}
	return false;
}

// 下划线转驼峰
exports.underlineToHump = (s) => {
	var a = s.split("_");
	var result = a[0];
	for (var i = 1; i < a.length; i++) {
		result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1);
	}
	return result
}
// 驼峰转下划线
exports.humpToUnderline = (str) => {
	return str.replace(/([A-Z])/g, "_$1").toLowerCase()
}

// 内部函数, 用于判断对象类型
function _getClass(object) {
	return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

exports.getType = (obj) => {
	return _getClass(obj).toLowerCase();
}

exports.isFunction = (obj) => {
	return _getClass(obj).toLowerCase() === 'function';
}

exports.isArray = (obj) => {
	return _getClass(obj).toLowerCase() === 'array';
}

exports.isString = (obj) => {
	return _getClass(obj).toLowerCase() === 'string';
}

exports.isDate = (obj) => {
	return _getClass(obj).toLowerCase() === 'date';
}

exports.isObject = (obj) => {
	return _getClass(obj).toLowerCase() === 'object';
}

exports.isNumber = (obj) => {
	return _getClass(obj).toLowerCase() === 'number';
}

exports.isFormData = (obj) => {
	try {
		if (obj instanceof FormData) {
			return true;
		}
	} catch (e) {
		return false;
	}
	return false;
}

exports.isIE = () => {
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf('compatible') > -1
		&& userAgent.indexOf('MSIE') > -1) {
		return true;
	}
	return false;
}

/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
exports.isEmpty = (obj) => {
	var empty = false;

	if (obj === null || obj === undefined) {    // null and undefined
		empty = true;
	} else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
		empty = true;
	} else if (isObject(obj)) {
		var hasProp = false;
		for (let prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				hasProp = true;
				break;
			}
		}
		if (!hasProp) {
			empty = true;
		}
	} else if (isNumber(obj) && isNaN(obj)) {
		empty = true;
	}
	return empty;
}

/**
 * @desc 判断参数是否不为空
 */
exports.isNotEmpty = (obj) => {
	return !isEmpty(obj);
}

/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中全是空格的情况, 如: '   '.
 * @param {string} str 需判断的字符串
 */
exports.isBlank = (str) => {
	if (isEmpty(str)) {
		return true;
	} else if (isString(str) && str.trim().length === 0) {
		return true;
	}
	return false;
}

/**
 * @desc 判断参数是否不为空字符串
 */
exports.isNotBlank = (obj) => {
	return !isBlank(obj);
}