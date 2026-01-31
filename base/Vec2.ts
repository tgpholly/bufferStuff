export default class Vec2 {
	public x: number;
	public y: number;

	public constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public static From(other: Vec2) {
		return new Vec2(other.x, other.y);
	}

	public set(other: Vec2) {
		this.x = other.x;
		this.y = other.y;
	}

	public set_d(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public add(other: Vec2) {
		this.x += other.x;
		this.y += other.y;
	}

	public add_d(x: number, y: number) {
		this.x += x;
		this.y += y;
	}

	public sub(other: Vec2) {
		this.x -= other.x;
		this.y -= other.y;
	}

	public sub_d(x: number, y: number) {
		this.x -= x;
		this.y -= y;
	}

	public mult(other: Vec2) {
		this.x *= other.x;
		this.y *= other.y;
	}

	public mult_d(x: number, y: number) {
		this.x *= x;
		this.y *= y;
	}

	public div(other: Vec2) {
		this.x /= other.x;
		this.y /= other.y;
	}

	public div_d(x: number, y: number) {
		this.x /= x;
		this.y /= y;
	}

	public dot(other: Vec2) {
		return this.x * other.x + this.y * other.y;
	}

	public dot_d(x: number, y: number) {
		return this.x * x + this.y * y;
	}

	public get length() {
		return Math.sqrt(this.dot(this));
	}
}