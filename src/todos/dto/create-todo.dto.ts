
import { IsBoolean, IsString } from 'class-validator'
export class CreateTodoDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly description: string;
    @IsString()
    readonly color: string;
    @IsBoolean()
    readonly isImportant: boolean;
}
