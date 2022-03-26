import { IsBoolean, IsString } from 'class-validator';
export class CreateTodoDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly color: string;
  @IsBoolean()
  readonly isImportant: boolean;
  @IsString()
  readonly userTodoRef: string;
}
