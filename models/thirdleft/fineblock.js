const thickWidth = 100,
	middleWidth = 92,
	fineWidth = 51,
	offestX =8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = -20,
	initX = 5100 + 200,
	initY = 4900 + 1100
export const whiteFineblocks = [
	{  //3
		x: middleWidth + thickWidth - 5 * offestX + initX, y: initY + 120 , z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //4
		x: middleWidth + thickWidth  + fineWidth  - 6 * offestX + initX, y:  initY + 160  , z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //12
		x: 3 * middleWidth + 6 * thickWidth + 2 * fineWidth  + initX - 14 * offestX, y:  initY + 590, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //13
		x: 3 * middleWidth + 6 * thickWidth + 3 * fineWidth  + initX - 15* offestX, y:  initY + 700, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //15
		x: 4 * middleWidth + 6 * thickWidth + 4 * fineWidth  + initX - 18 * offestX, y:  initY + 800, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
]
