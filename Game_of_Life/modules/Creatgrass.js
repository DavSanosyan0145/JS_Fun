class Creatgrass {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 10;
		this.multiply = 0;
		this.directions = [];
	}
	newDirections() {
		this.directions = [
			[this.x, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x, this.y + 1]
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
			matrix[y][x] = 4;
			matrix[this.y][this.x] = 0;
			this.x = x;
			this.y = y;
		}
	}
	eat() {
		var fundCords_1 = this.chooseCell(2);
		var fundCords_2 = this.chooseCell(3);
		var fundCords = fundCords_1.concat(fundCords_2);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			if (this.multiply > 5) {
				matrix[y][x] = 1;
				grassArr.push(new Grass(x, y));

			}
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

			this.multiply++;
			this.energy += 2;

			for (var i in redArr) {
				if (x == redArr[i].x && y == redArr[i].y) {
					redArr.splice(i, 1);
				}
			}
			for (var i in eatArr) {
				if (x == eatArr[i].x && y == eatArr[i].y) {
					eatArr.splice(i, 1);
				}
			}
		}
		if (this.multiply > 4) {
			this.mul();
			this.multiply = 0;
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
		this.multiply += 2;
		var newCell = random(this.chooseCell(0));
		if (this.multiply >= 2 && newCell) {
			var newGras = new Creatgrass(newCell[0], newCell[1]);
			creatArr.push(newGras);
			matrix[newCell[1]][newCell[0]] = 4;
			this.multiply = 0;
		}
	}
	die() {
for (var i in this.directions) {		var x = this.directions[i][0];
			var y = this.directions[i][1];
		if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
			matrix[this.y][this.x] = 0;
		}
	}
	}
}