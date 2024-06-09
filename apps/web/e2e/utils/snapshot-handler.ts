export class SnapshotHandler {
	private id: string;
	private readonly extension = 'png';

	constructor(id: string) {
		this.id = id;
	}

	private toFileString(input: string, extension = this.extension) {
		let result = input.toLowerCase();
		result = result.replace(/[^a-z0-9\s]/g, '');
		result = result.replace(/\s+/g, '-');
		result += `.${extension}`;
		return result;
	}

	public getFileName(fileName: string) {
		const proccessedFileName = this.toFileString(fileName);
		return this.id + '-' + proccessedFileName + '.' + this.extension;
	}
}
