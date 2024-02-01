export class CreateBoundaryDto {
  name: string;
  value: any;

  validate() {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Name is required');
    }

    try {
      JSON.parse(this.value);
    } catch (error) {
      throw new Error('Invalid JSON value');
    }
  }
}

