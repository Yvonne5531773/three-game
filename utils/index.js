export const audio = (action, innerAudioContext) => {
	if(!innerAudioContext) return
	action === 1 && innerAudioContext.play()
	action === 2 && innerAudioContext.destroy()
}

export const submitRequest = ({method = 'get', url = '', data = ''}) => {
	const request = new XMLHttpRequest();
	return new Promise(function (resolve, reject) {
		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				if (request.status === 200) {
					resolve(JSON.parse(request.responseText))
				} else {
					reject(request.status)
				}
			}
		};
		request.open(method, url)
		request.send(data)
	})
}