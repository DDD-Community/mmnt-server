import { ConflictException, Injectable } from '@nestjs/common';

import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'mmntuploads';
@Injectable()
export class UploadsService {
  constructor() {}

  async uploadImageToStorage(file: any) {
    try {
      const s3 = new AWS.S3();
      const fileName =
        Date.now() + file.originalname ? file.originalname : file.filename;

      const upload = await new AWS.S3()
        .upload({
          Key: fileName,
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          ACL: 'public-read',
        })
        .promise();

      return { imageUrl: upload.Location };
    } catch (e) {
      throw new ConflictException('이미지 생성 실패');
    }
  }
}
