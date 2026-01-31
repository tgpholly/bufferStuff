export default class Vec3 {
	public x: number;
	public y: number;
	public z: number;

	public constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public static From(other: Vec3) {
		return new Vec3(other.x, other.y, other.z);
	}

	public set(other: Vec3) {
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
	}

	public set_d(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public add(other: Vec3) {
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
	}

	public add_d(x: number, y: number, z: number) {
		this.x += x;
		this.y += y;
		this.z += z;
	}

	public sub(other: Vec3) {
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
	}

	public sub_d(x: number, y: number, z: number) {
		this.x -= x;
		this.y -= y;
		this.z -= z;
	}

	public mult(other: Vec3) {
		this.x *= other.x;
		this.y *= other.y;
		this.z *= other.z;
	}

	public mult_d(x: number, y: number, z: number) {
		this.x *= x;
		this.y *= y;
		this.z *= z;
	}

	public div(other: Vec3) {
		this.x /= other.x;
		this.y /= other.y;
		this.z /= other.z;
	}

	public div_d(x: number, y: number, z: number) {
		this.x /= x;
		this.y /= y;
		this.z /= z;
	}

	public dot(other: Vec3) {
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}

	public dot_d(x: number, y: number, z: number) {
		return this.x * x + this.y * y + this.z * z;
	}

	public cross(other: Vec3) {
		return new Vec3(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
	}

	public cross_d(x: number, y: number, z: number) {
		return new Vec3(this.y * z - this.z * y, this.z * x - this.x * z, this.x * y - this.y * x);
	}

	public get length() {
		return Math.sqrt(this.dot(this));
	}
}