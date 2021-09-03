import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { User } from "./../entities/User";
import argon2 from "argon2";
import { UserMutationResponse } from "./../types/UserMutationResponse";
import { RegisterInput } from "../types/RegisterInput";
import { validateRegisterInput } from "../utils/validateRegisterInput";
import { LoginInput } from "../types/LoginInput";
import { CustomContext } from "../types/CustomContext";
import { COOKIE_NAME } from "./../const/constants";
import { ForgotPasswordInput } from "../types/ForgotPasswordInput";
import { sendEmail } from "../utils/sendEmail";
import { TokenModel } from "../models/Token";
import { v4 as uuidV4 } from "uuid";
import { ChangePasswordInput } from "../types/ChangePasswordInput";

@Resolver((_of) => User)
export class UserResolver {
    @FieldResolver((_return) => String)
    email(@Root() user: User, @Ctx() { req }: CustomContext) {
        return req.session.userId === user.id ? user.email : "****";
    }

    @Query((_return) => User, { nullable: true })
    async me(@Ctx() { req }: CustomContext): Promise<User | undefined | null> {
        if (!req.session.userId) return null;

        const user = await User.findOne(req.session.userId);
        return user;
    }

    @Mutation((_return) => UserMutationResponse, { nullable: true })
    async register(
        @Arg("registerInput") registerInput: RegisterInput,
        @Ctx() { req }: CustomContext
    ): Promise<UserMutationResponse | null> {
        const validationInput = validateRegisterInput(registerInput);

        if (validationInput !== null) {
            return {
                code: 400,
                success: false,
                ...validationInput,
            };
        }

        try {
            const { username, email, password } = registerInput;
            const existingUser = await User.findOne({
                where: [{ username }, { email }],
            });
            if (existingUser)
                return {
                    code: 400,
                    success: false,
                    message: "Duplicated username or email",
                    error: [
                        {
                            field: existingUser.username === username ? "username" : "Email",
                            message: `${
                                existingUser.username === username ? "Username" : "Email"
                            } already taken`,
                        },
                    ],
                };

            const hashedPassword = await argon2.hash(password);
            let newUser = User.create({
                username,
                password: hashedPassword,
                email,
            });

            newUser = await User.save(newUser);

            //session: store user
            req.session.userId = newUser.id;

            return {
                code: 200,
                success: true,
                message: "register success",
                user: newUser,
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500,
                success: true,
                message: "Internal error",
            };
        }
    }

    @Mutation((_return) => UserMutationResponse)
    async login(
        @Arg("loginInput") loginInput: LoginInput,
        @Ctx() { req }: CustomContext
    ): Promise<UserMutationResponse> {
        try {
            const existingUser = await User.findOne(
                loginInput.usernameOrEmail.includes("@")
                    ? { email: loginInput.usernameOrEmail }
                    : { username: loginInput.usernameOrEmail }
            );

            if (!existingUser) {
                return {
                    code: 400,
                    success: false,
                    message: "User not found",
                    error: [
                        {
                            field: "usernameOrEmail",
                            message: "username or password incorrect",
                        },
                    ],
                };
            }

            const passwordValid = await argon2.verify(existingUser.password, loginInput.password);
            if (!passwordValid) {
                return {
                    code: 400,
                    success: false,
                    message: "Wrong password",
                    error: [
                        {
                            field: "usernameOrEmail",
                            message: "username or password incorrect",
                        },
                    ],
                };
            }

            //session: create and return cookie
            req.session.userId = existingUser.id;

            return { code: 200, success: true, message: "Login success", user: existingUser };
        } catch (error) {
            console.log(error);
            return {
                code: 500,
                success: true,
                message: "Internal error",
                error: [
                    {
                        field: "usernameOrEmail",
                        message: "username or password incorrect",
                    },
                ],
            };
        }
    }

    @Mutation((_return) => Boolean)
    logout(@Ctx() { req, res }: CustomContext): Promise<boolean> {
        return new Promise((resolve, _reject) => {
            res.clearCookie(COOKIE_NAME);

            req.session.destroy((error) => {
                if (error) {
                    console.log("DESTROY SESSION ERROR", error);
                    resolve(false);
                }
                resolve(true);
            });
        });
    }

    @Mutation((_return) => Boolean)
    async forgotPassword(
        @Arg("forgotPasswordInput") forgotPasswordInput: ForgotPasswordInput
    ): Promise<boolean> {
        const user = await User.findOne({ email: forgotPasswordInput.email });

        if (!user) return true;

        await TokenModel.findOneAndDelete({ userId: `${user.id}` });

        const resetToken = uuidV4();
        const hashedResetToken = await argon2.hash(resetToken);

        //save token to db
        await new TokenModel({
            userId: `${user.id}`,
            token: hashedResetToken,
        }).save();
        // {
        //     token: token
        //     userId: req.userId
        // }

        //return reset password link to user via email

        await sendEmail(
            forgotPasswordInput.email,
            `Click here to reset your password <a href='http://localhost:3000/change-password?token=${resetToken}&userId=${user.id}'>here</a>`
        );

        return true;
    }

    @Mutation((_return) => UserMutationResponse)
    async changePassword(
        @Arg("token") token: string,
        @Arg("userId") userId: string,
        @Arg("changePasswordInput") changePasswordInput: ChangePasswordInput,
        @Ctx() { req }: CustomContext
    ): Promise<UserMutationResponse> {
        if (changePasswordInput.newPassword.length <= 2) {
            return {
                code: 400,
                success: false,
                message: "Invalid password",
                error: [
                    {
                        field: "newPassword",
                        message: "Length must greater than 2",
                    },
                ],
            };
        }

        try {
            const resetPasswordTokenRecord = await TokenModel.findOne({ userId });
            if (!resetPasswordTokenRecord) {
                return {
                    code: 400,
                    success: false,
                    message: "Invalid Token or expired token",
                    error: [
                        {
                            field: "token",
                            message: "Invalid Token or expired token",
                        },
                    ],
                };
            }

            const resetPasswordToken = argon2.verify(resetPasswordTokenRecord.token, token);

            if (!resetPasswordToken) {
                return {
                    code: 400,
                    success: false,
                    message: "Invalid Token or expired token",
                    error: [
                        {
                            field: "token",
                            message: "Invalid Token or expired token",
                        },
                    ],
                };
            }

            const userIdNum = parseInt(userId);
            const user = await User.findOne(userIdNum);

            if (!user) {
                return {
                    code: 400,
                    success: false,
                    message: "User no longer exists",
                    error: [
                        {
                            field: "token",
                            message: "User no longer exists",
                        },
                    ],
                };
            }

            const updatedPassword = await argon2.hash(changePasswordInput.newPassword);

            await User.update({ id: userIdNum }, { password: updatedPassword });

            await resetPasswordTokenRecord.deleteOne();

            req.session.userId = user.id;

            return {
                code: 200,
                success: true,
                message: "user password reset successfully",
                user: user,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: `Internal server error ${error.message}`,
            };
        }
    }
}
