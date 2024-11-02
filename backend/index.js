import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js"
import ProductRoute from "./routes/ProductRoute.js";
import { config } from "dotenv";
import session from "express-session";
import db from "./config/UserDatabase.js";
import AuthRoute from "./routes/AuthRoute.js"
import SequelizeStore from "connect-session-sequelize"

config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore ({
    db: db
});

(async() => {
    await db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server up and running on port ${PORT}`));
