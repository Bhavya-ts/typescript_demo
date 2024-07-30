var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
import { project } from "../models/project.js";
import { roleModel } from "../models/role.js";
export var addProject = function (req, res, next) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, newProject;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (_a = req.body), (name = _a.name), (description = _a.description);
          //if details is not there then return the user
          if (!name || !description) {
            return [2 /*return*/, res.status(400).send("Please enter a data")];
          }
          return [
            4 /*yield*/,
            new project({
              name: name,
              description: description,
              createdBy: req.payload.userId,
            }).save(),
          ];
        case 1:
          newProject = _b.sent();
          return [
            2 /*return*/,
            res.status(200).send("Project succesfully created"),
          ];
      }
    });
  });
};
export var addRole = function (req, res, next) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectId, name, role, description, chekStatus, newRole;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (_a = req.body),
            (projectId = _a.projectId),
            (name = _a.name),
            (role = _a.role),
            (description = _a.description);
          //if any data is not there then return the user
          if (!projectId || !name || !role || !description) {
            return [
              2 /*return*/,
              res.status(400).send("Please enter a valid detail"),
            ];
          }
          console.log("project Id =  ", projectId);
          return [4 /*yield*/, project.findById(projectId)];
        case 1:
          chekStatus = _b.sent();
          if (!chekStatus) {
            // Handle the case where user is not found
            throw new Error("project not found");
          }
          console.log("checkstatus : ", chekStatus.status);
          if (chekStatus.status === "Active") {
            return [
              2 /*return*/,
              res.send("Project is in active status, you can't add role now"),
            ];
          }
          return [
            4 /*yield*/,
            new roleModel({
              projectId: projectId,
              name: name,
              role: role,
              description: description,
            }).save(),
          ];
        case 2:
          newRole = _b.sent();
          return [2 /*return*/, res.send("Role succesfully added")];
      }
    });
  });
};
export var editProject = function (req, res, next) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectId, name, description, status, projectData, update;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (_a = req.body),
            (projectId = _a.projectId),
            (name = _a.name),
            (description = _a.description),
            (status = _a.status);
          return [4 /*yield*/, project.findById(projectId)];
        case 1:
          projectData = _b.sent();
          if (!projectData) {
            // Handle the case where user is not found
            throw new Error("User not found");
          }
          if (projectData.createdBy !== req.payload.userId) {
            return [
              2 /*return*/,
              res
                .status(400)
                .send(
                  "As you have not created the project you are not allow to change the project "
                ),
            ];
          }
          return [
            4 /*yield*/,
            project.updateOne(
              { _id: projectId },
              { name: name, description: description, status: status }
            ),
          ];
        case 2:
          update = _b.sent();
          return [2 /*return*/, res.status(200).send("project is updated")];
      }
    });
  });
};
export var editRole = function (req, res, next) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, projectId, name, role, description, projectData, update;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (_a = req.body),
            (_id = _a._id),
            (projectId = _a.projectId),
            (name = _a.name),
            (role = _a.role),
            (description = _a.description);
          return [4 /*yield*/, project.findById(projectId)];
        case 1:
          projectData = _b.sent();
          if (!projectData) {
            // Handle the case where user is not found
            throw new Error("project not found");
          }
          if (projectData.createdBy !== req.payload.userId) {
            return [
              2 /*return*/,
              res
                .status(400)
                .send(
                  "As you have not created the project you are not allow to change the role "
                ),
            ];
          }
          return [
            4 /*yield*/,
            roleModel.updateOne(
              { _id: _id },
              {
                projectId: projectId,
                name: name,
                role: role,
                description: description,
              }
            ),
          ];
        case 2:
          update = _b.sent();
          return [2 /*return*/, res.status(200).send("role is updated")];
      }
    });
  });
};
