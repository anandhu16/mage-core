import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import Logger from '../utils/logger.js';
import User from '../models/user.model.js';

export default function configurePassport() {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                try {
                    Logger.debug("LocalStrategy: Attempting login for", { email });
                    const user = await User.findOne({ where: { email } });

                    if (!user) {
                        Logger.warn("LocalStrategy: User not found", { email });
                        return done(null, false, {
                            message: "Incorrect email or password.",
                        });
                    }

                    if (!user.hashedPassword) {
                        Logger.warn(
                            "LocalStrategy: User has no password set (e.g., Google signup)",
                            { email }
                        );
                        return done(null, false, {
                            message: "Password login not available for this account.",
                        });
                    }

                    const isMatch = await bcrypt.compare(password, user.hashedPassword);

                    if (!isMatch) {
                        Logger.warn("LocalStrategy: Incorrect password", { email });
                        return done(null, false, {
                            message: "Incorrect email or password.",
                        });
                    }

                    Logger.debug("LocalStrategy: Authentication successful", { email });
                    return done(null, user);
                } catch (error) {
                    Logger.error("LocalStrategy: Error during authentication", {
                        email,
                        error: error.message,
                    });
                    return done(error);
                }
            }
        )
    );
}
