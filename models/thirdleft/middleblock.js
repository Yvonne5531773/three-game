//x越大，越里面；y越大，越上
const thickWidth = 100,
	middleWidth = 92,
	fineWidth = 51,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = -20,
	initX = 5100 + 200,
	initY = 4900 + 1100
export const whiteMiddleblocks = [
	{  //1
		x: initX, y: initY , z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},	
	{  //10
		x: middleWidth + 6 * thickWidth + 2 * fineWidth + initX -  7.5 *offestX, y:  initY + 460, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //11
		x: 2 * middleWidth + 6 * thickWidth + 2 * fineWidth  + initX - 9.5  * offestX, y:  initY + 540 , z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //14
		x: 3 * middleWidth + 6 * thickWidth + 4 * fineWidth  + initX - 15 * offestX, y:  initY + 760, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
]
