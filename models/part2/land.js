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
		z: -thickWidth* 2.5 - plane - 0.3,
		width: thickWidth,
		height: 3 * thickWidth,
		depth: 5 * thickWidth,
		animate: 1,
		duration: 0.3,
		delay: 0
	},
	{
		x: initX + thickWidth - 5,
		y: initY + thickWidth + 2*offestY,
		z: -thickWidth* 2.5 - plane - 0.6,
		width: thickWidth,
		height: thickWidth,
		depth: 5 * thickWidth,
		animate: 2,
		duration: 0.3,
		delay: 0.25
	},
	{
		x: initX + thickWidth + 5,
		y: initY + 2*thickWidth + 2*offestY - 5,
		z: -thickWidth* 2.5 - plane - 0.6,
		width: thickWidth + 20,
		height: thickWidth,
		depth: 5 * thickWidth,
		animate: 2,
		duration: 0.3,
		delay: 0.5
	},
	{
		x: initX + 2*thickWidth + 2.4*offestY + 5,
		y: initY + 2.5*thickWidth + 2*offestY - 5,
		z: -thickWidth* 2.5 - plane - 0.6,
		width: thickWidth + 20,
		height: 2* thickWidth,
		depth: 5 * thickWidth,
		animate: 2,
		duration: 0.3,
		delay: 0.75
	},
	{
		x: initX + 2*thickWidth + 2.4*offestY + 5,
		y: initY + 4*thickWidth + 2*offestY - 6,
		z: -thickWidth* 2.5 - plane - 0.6,
		width: thickWidth + 20 - 3,
		height: thickWidth,
		depth: 5 * thickWidth - 2,
		animate: 2,
		duration: 0.3,
		delay: 1
	},
	{
		x: initX + 3*thickWidth,
		y: initY + 4*thickWidth + 4*offestY,
		z: -thickWidth* 2.5 - plane - 0.7,
		width: thickWidth,
		height: 1.5*thickWidth,
		depth: 5 * thickWidth - 4,
		animate: 2,
		duration: 0.3,
		delay: 1.25
	},
	{
		x: initX + 3.5*thickWidth,
		y: initY + 5*thickWidth,
		z: -thickWidth* 2.5 - plane - 0.9,
		width: thickWidth,
		height: 1.5*thickWidth,
		depth: 5 * thickWidth - 5,
		animate: 2,
		duration: 0.3,
		delay: 1.5
	},
	{
		x: initX + 4*thickWidth,
		y: initY + 6*thickWidth,
		z: -thickWidth* 2.5 - plane - 1,
		width: thickWidth,
		height: 2*thickWidth,
		depth: 5 * thickWidth - 7,
		animate: 2,
		duration: 0.3,
		delay: 1.75
	}
]