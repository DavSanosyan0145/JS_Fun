class chess {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.multiply = 0;
		this.energy = 3;
		this.directions = [];
	}
	newDirections() {
		this.directions = [
			[this.x - 1, this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y - 1],
			[this.x + 2, this.y + 1],
			[this.x - 1, this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x - 2, this.y + 1],
			[this.x - 2, this.y - 1],
		];
	}
	chooseCell(t) {
		this.newDirections();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == t) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}
	move() {
		var fundCords = this.chooseCell(0);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			matrix[y][x] = 5;
			matrix[this.y][this.x] = 0;
			this.x = x;
			this.y = y;
		}
	}
	eat() {
		var fundCords_0 = this.chooseCell(1);
		var fundCords_1 = this.chooseCell(2);
		var fundCords_2 = this.chooseCell(3);
		var fundCords_3 = this.chooseCell(4);
		var fundCords = fundCords_0.concat(fundCords_1, fundCords_2, fundCords_3);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			matrix[y][x] = 5;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

			this.multiply++;
			this.energy++;

			for (var i in grassArr) {
				if (x == grassArr[i].x && y == grassArr[i].y) {
					grassArr.splice(i, 1);
				}
			}
			for (var i in eatArr) {
				if (x == eatArr[i].x && y == eatArr[i].y) {
					eatArr.splice(i, 1);
				}
			}
			for (var i in redArr) {
				if (x == redArr[i].x && y == redArr[i].y) {
					redArr.splice(i, 1);
				}
			}
			for (var i in creatArr) {
				if (x == creatArr[i].x && y == creatArr[i].y) {
					creatArr.splice(i, 1);
				}
			}
			if (this.multiply > 100) {
				this.mul()
				this.multiply = 0;
			}
		}
		else {
			this.move();
			this.energy--;
			if (this.energy < 0) {
				this.die();
			}
		}
	}
	mul() {
		this.multiply++;
		var newCell = random(this.chooseCell(0));
		if (this.multiply >= 3 && newCell) {
			var newGrass = new chess(newCell[0], newCell[1]);
			chessArr.push(newGrass);
			matrix[newCell[1]][newCell[0]] = 5;
			this.multiply = 0;
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in chessArr) {
			if (this.x == chessArr[i].x && this.y == chessArr[i].y) {
				chessArr.splice(i, 1);
			}
		}
	}
}
