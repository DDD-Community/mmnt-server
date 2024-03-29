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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLocationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateLocationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 위치 경도',
    }),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], UpdateLocationDto.prototype, "locationX", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 위치 위도',
    }),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], UpdateLocationDto.prototype, "locationY", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '위치 반경(m)',
        minimum: 10,
        maximum: 5000,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLocationDto.prototype, "radius", void 0);
exports.UpdateLocationDto = UpdateLocationDto;
//# sourceMappingURL=update-location.dto.js.map