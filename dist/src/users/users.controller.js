"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dtos/create.user.dto");
const users_service_1 = require("./users.service");
const http_status_codes_1 = require("http-status-codes");
const success_reponse_helper_1 = require("../helpers/success-reponse.helper");
const get_user_decorator_1 = require("../common/decorators/get.user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const get_profile_Info_response_dto_1 = require("../common/responses/users/get.profile-Info.response.dto");
const update_location_dto_1 = require("./dtos/update-location.dto");
const swagger_1 = require("@nestjs/swagger");
const sign_up_response_dto_1 = require("../common/responses/users/sign-up.response.dto");
const sign_in_response_dto_1 = require("../common/responses/users/sign-in.response.dto");
const update_userInfo_dto_1 = require("./dtos/update-userInfo.dto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(body, res) {
        const responseData = await this.userService.createUser(body.email, body.password);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.CREATED, '?????? ?????? ??????', responseData));
    }
    async signin(body, res) {
        const responseData = await this.userService.signIn(body.email, body.password);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.CREATED, '????????? ??????', responseData));
    }
    async updateUserInfo(user, body, res) {
        const responseData = await this.userService.updateUserInfo(user.userIdx, body);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, '?????? ?????? ?????? ??????'));
    }
    async findProfileInfo(user, res) {
        const responseData = await this.userService.getDetailUserInfo(user.userIdx);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, '??? ????????? ?????? ??????', responseData));
    }
    async updateUserLocation(user, body, res) {
        const responseData = await this.userService.updateUserLocation(user.userIdx, { 'locationX': body.locationX, 'locationY': body.locationY }, body.radius);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, '?????? ?????? ?????? ??????', responseData));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '?????? ?????? API' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiCreatedResponse)({
        status: 201,
        description: '?????? ?????? ??????',
        type: sign_up_response_dto_1.SignUpResponseDto
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: 400,
        description: 'Bad Request'
    }),
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '????????? API' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiCreatedResponse)({
        status: 201,
        description: '????????? ??????',
        type: sign_in_response_dto_1.SignInResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        status: 401,
        description: '?????? ????????? ???????????? ????????????.'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: 404,
        description: '?????? ????????? ???????????? ????????????.'
    }),
    (0, common_1.Post)('/sign-in'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signin", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({
        summary: '?????? ?????? ?????? | ?????? ?????? ?????? API',
        description: `?????????, ????????????, ????????? ?????? ??????. 
        ????????? ?????? ???, [?????? ?????? ??????] API??? ?????? ??????????????????.`
    }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        description: '?????? ?????? ?????? ??????'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: 404,
        description: '?????? ????????? ???????????? ????????????.'
    }),
    (0, common_1.Patch)(''),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_userInfo_dto_1.UpdateUserInfo, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserInfo", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({
        summary: '?????? ????????? ?????? API',
        description: '?????? ??? | ????????? ?????? ?????? ???????????????.'
    }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        description: '?????? ????????? ?????? ??????',
        type: get_profile_Info_response_dto_1.GetProfileInfoResponse
    }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, description: '?????? ????????? ???????????? ????????????.' }),
    (0, common_1.Get)('/profile-info'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findProfileInfo", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({
        summary: '?????? ?????? ?????? ??? ?????? ??? ????????? ?????? API',
        description: 'radius(m) : 50m ??? ?????? 50 ??????'
    }),
    (0, swagger_1.ApiBody)({ type: update_location_dto_1.UpdateLocationDto }),
    (0, swagger_1.ApiOkResponse)({
        status: 200,
        description: '?????? ?????? ?????? ??????'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: 404,
        description: '?????? ????????? ???????????? ????????????.'
    }),
    (0, common_1.Patch)('/location'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_location_dto_1.UpdateLocationDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserLocation", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map