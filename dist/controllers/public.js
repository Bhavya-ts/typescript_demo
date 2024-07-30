var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import jwt from 'jsonwebtoken';
import { userModel } from "../models/user.js";
// const userModel = require("../models/user");
import { project } from "../models/project.js";
import { roleModel } from "../models/role.js";
export var sigin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordCorect, jwtTocken, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                //check the data weather you got the data or not
                if (!email || !password) {
                    return [2 /*return*/, res.status(400).send("Please entre a email and password")];
                }
                //validate email
                if (!validateEmail(email)) {
                    return [2 /*return*/, res.status(400).send("Please provide valid email ")];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userModel.findOne({ email: email })];
            case 2:
                user = _b.sent();
                console.log(user);
                if (!user) {
                    // Handle the case where user is not found
                    throw new Error('User not found');
                }
                isPasswordCorect = bcrypt.compare(password, user.password);
                console.log("password is correct");
                if (!isPasswordCorect) {
                    return [2 /*return*/, res.send("Invalid Password")];
                }
                console.log(process.env.SECRET_KEY);
                jwtTocken = jwt.sign({ userId: user._id, email: email, role: user.role }, process.env.SECRET_KEY, {
                    expiresIn: 60 * 60,
                });
                res.cookie("accessToken", jwtTocken);
                // return jwt token
                return [2 /*return*/, res.send({
                        message: "Logged In Successfully",
                        jwtTocken: jwtTocken,
                    })];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(501).send("Something went wrong")];
            case 4: return [2 /*return*/];
        }
    });
}); };
//signup the user
export var signup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, role, password, salt, passwordHash, newUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("inside sign up function ");
                _a = req.body, name = _a.name, email = _a.email, role = _a.role, password = _a.password;
                console.log(req.body);
                console.log(name, email, role, password);
                //check weather we are getting the data or not
                if (!name || !email || !role || !password) {
                    return [2 /*return*/, res.status(400).send("Please provide all details")];
                }
                //validate email
                if (!validateEmail(email)) {
                    res.status(400);
                    return [2 /*return*/, res.send("Please provide valid email address")];
                }
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(password, salt)];
            case 2:
                passwordHash = _b.sent();
                console.log("password = ", passwordHash);
                newUser = new userModel({
                    name: name,
                    email: email,
                    role: role,
                    password: passwordHash,
                }).save();
                console.log("this is sign up function");
                return [2 /*return*/, res.status(200).send("user created")];
        }
    });
}); };
export var showPerticcularProject = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, projectData, roleData, newProjectData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = req.body.projectId;
                //if peoject id is not there then return
                if (!projectId) {
                    res.send("seelct project you want to watch");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, project.findOne({ _id: projectId })];
            case 2:
                projectData = _a.sent();
                if (!projectData) {
                    return [2 /*return*/, res.send("no project found with this id")];
                }
                return [4 /*yield*/, roleModel.find({ projectId: projectData._id })];
            case 3:
                roleData = _a.sent();
                console.log("role of list ", roleData);
                newProjectData = { projectData: projectData, role: roleData };
                // Send the updated project data as a response
                console.log("project data ", newProjectData);
                if (projectData.status === "Active") {
                    console.log("status ", projectData.status);
                    return [2 /*return*/, res.status(200).send(projectData)];
                    // res.status(200).send("role Data ", roleData);
                }
                if (projectData.createdBy !== req.payload.userId) {
                    return [2 /*return*/, res
                            .status(300)
                            .send("as you have not created this project and project is still in a drafting process because of that you are not allowd to access or watch this  project ")];
                }
                // return res.status(200).send(projectData);
                res.json(projectData);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                return [2 /*return*/, res.send(error_2)];
            case 5: return [2 /*return*/];
        }
    });
}); };
var validateEmail = function (email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
