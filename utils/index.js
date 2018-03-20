export const audio = (action, innerAudioContext) => {
	if(!innerAudioContext) return
	action === 1 && innerAudioContext.play()
	action === 2 && innerAudioContext.destroy()
}