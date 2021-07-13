function compileCode(src:string) {
	src = `
		Object.assign(exposeObj,data);
		with (exposeObj) {
			${src} 
		}
	`;
	// eslint-disable-next-line
	return new Function('exposeObj',"data", src)
}

function proxyObj(originObj:any) {
	let exposeObj = new Proxy(originObj, {
		has:(target, key:string)=>{
			if (["parseInt","String","Error", "Math", "Date","console"].indexOf(key) >= 0) {
				return false;
			}
			return true;
		},
		get: (target, key) => {
			if(key === Symbol.unscopables || typeof key === "symbol"){
				return undefined;
			}
			if (!target.hasOwnProperty(key)) {
				throw new Error(`${key} is not defined`)
			}
			return target[key]
		},
	})
	return exposeObj
}

export function createSandbox(src:string, obj={}) {
	let proxy = proxyObj(obj);
	return compileCode(src).bind(proxy,proxy); //绑定this 防止this访问window
}
