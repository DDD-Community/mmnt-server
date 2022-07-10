"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const initSwagger = (app) => {
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('MMNT_API')
        .addBearerAuth()
        .setDescription('MMNT API 명세서 입니다!')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('/docs', app, document);
};
exports.initSwagger = initSwagger;
//# sourceMappingURL=app.swagger.js.map