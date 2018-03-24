//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const thickWidth = 100,
	middleWidth = 92,
	fineWidth = 51,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = -20,
	initX = 5100 + 200,
	initY = 4900 + 1100
export const whiteThickblocks = [
	{  //2
		x: middleWidth - offestX  + initX, y: initY + 40, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //5
		x: middleWidth + thickWidth  + 2 * fineWidth + initX - 4 * offestX , y:  initY + 190, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //6
		x: middleWidth + 2 * thickWidth + 2 * fineWidth - 5.5 * offestX + initX, y:  initY + 300, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //7
		x: middleWidth + 3 * thickWidth + 2 * fineWidth - 5.5 * offestX + initX, y:  initY + 380, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //8
		x: middleWidth + 4 * thickWidth + 2 * fineWidth  - 5.5 * offestX + initX, y:  initY + 380 , z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //9
		x: middleWidth + 5 * thickWidth + 2 * fineWidth  - 5.5 * offestX + initX, y:  initY + 380, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
]
