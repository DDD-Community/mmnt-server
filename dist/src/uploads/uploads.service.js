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
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const aws_config_1 = require("../configs/aws.config");
const AWS = require("aws-sdk");
const BUCKET_NAME = 'mmntuploads';
let UploadsService = class UploadsService {
    constructor() { }
    async uploadImageToStorage(file) {
        const s3 = new AWS.S3();
        AWS.config.update(aws_config_1.AWSConfig);
        const fileName = Date.now() + file.originalname;
        const upload = await new AWS.S3().upload({
            Key: fileName,
            Body: file.buffer,
            Bucket: BUCKET_NAME,
            ACL: 'public-read',
        }).promise();
        return upload.Location;
    }
};
UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadsService);
exports.UploadsService = UploadsService;
//# sourceMappingURL=uploads.service.js.map