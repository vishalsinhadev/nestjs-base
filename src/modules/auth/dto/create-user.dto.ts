import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: "Name can not be null" })
  @IsString()
  name: string;

  @Transform(({ value }: { value: string | undefined }) =>
    value?.trim()?.toLowerCase()
  )
  @IsNotEmpty({ message: "Email can not be null" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "Password can not be null" })
  @MinLength(6, { message: "Password must be at least 8 characters" })
  @MaxLength(32, { message: "Password must not exceed 32 characters" })
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password too weak. Must include upper, lower, number and special char",
  })
  password: string;
}
