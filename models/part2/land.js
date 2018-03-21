const offest = 1200,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	offestY = 8,
	initX = 3*thickWidth + 7*middleWidth + 9*fineWidth + offest - 33*offestX + thickWidth,
	initY = offest + 102*offestY,
	plane = 12
export const lands = [
	{
		x: initX - thickWidth,
		y: initY,
		z: -thickWidth* 2.5 - plane - 1,
		width: thickWidth,
		height: 3 * thickWidth,
		depth: 5 * thickWidth,
		hex: ['#fdebbd', '#fdebbd'],
		animate: 1,
		duration: 0.3,
		delay: 0
	},
	{
		x: initX + thickWidth,
		y: initY + thickWidth + 2*offestY,
		z: -thickWidth* 2.5 - plane -0.8,
		width: thickWidth,
		height: thickWidth,
		depth: 5 * thickWidth,
		hex: ['#fdebbd', '#fdebbd'],
		animate: 2,
		duration: 0.3,
		delay: 0.25
	},
	{
		x: initX + thickWidth + offestY +5,
		y: initY + 2*thickWidth + 2*offestY + 55,
		z: -thickWidth* 2.5 - plane - 0.8,
		width: thickWidth + 2*offestY,
		height: thickWidth,
		depth: 5 * thickWidth,
		hex: ['#fdebbd', '#fdebbd'],
		animate: 2,
		duration: 0.3,
		delay: 0.5
	},
	// {
	// 	x: initX + 2*thickWidth + 2.4*offestY,
	// 	y: initY + 2.5*thickWidth + 2*offestY - 2,
	// 	z: -thickWidth* 2.5 - plane - 7,
	// 	width: thickWidth + 2*offestY,
	// 	height: 2* thickWidth,
	// 	depth: 5 * thickWidth,
	// 	hex: ['#fdebbd', '#fdebbd'],
	// 	animate: 2,
	// 	duration: 0.3,
	// 	delay: 0.75
	// },
	// {
	// 	x: initX + 2*thickWidth + 2.4*offestY,
	// 	y: initY + 2.5*thickWidth + 2*offestY - 2,
	// 	z: -thickWidth* 2.5 - plane - 7,
	// 	width: thickWidth + 2*offestY,
	// 	height: 2* thickWidth,
	// 	depth: 5 * thickWidth,
	// 	hex: ['#fdebbd', '#fdebbd'],
	// 	animate: 2,
	// 	duration: 0.3,
	// 	delay: 0.75
	// }
]