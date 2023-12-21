import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsString({
    message: "First name is required",
  })
  firstName: string;

  @IsString({
    message: "Last name is required",
  })
  lastName: string;

  @IsEmail(
    {},
    {
      message: "Email is not a valid email",
    }
  )
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        "Password must be atleast 8 characters with atleast 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol.",
    }
  )
  password: string;
}
