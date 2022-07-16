import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { SignInResponseDto } from 'src/common/responses/users/sign-in.response.dto';
import { Pin } from 'src/pins/pin.entity';
import { Moment } from 'src/moments/moment.entity';
import { createHashedPassword } from 'src/configs/functions/create.hashed-password';
import { UpdateUserInfo } from './dtos/update-userInfo.dto';
import { MomentsService } from 'src/moments/moments.service';
import { camelCase } from "change-case";
let wkx = require('wkx');




@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        @InjectRepository(Pin) private pinRepo: Repository<Pin>,
        @InjectRepository(Moment) private momentRepo: Repository<Moment>,
        private jwtService: JwtService,
    ) {}


    async createUser(email: string, password: string) {

        const user: User = await this.repo.findOneBy({ email });
        if(user){
            throw new BadRequestException('중복된 이메일입니다.');
        }
        
        const hashedPassword = await createHashedPassword(password);
        const profileUrl = 'https://mmntuploads.s3.ap-northeast-2.amazonaws.com/1657956807175version%3Dprofile.png';

        const new_user = await this.repo.create({ email, password: hashedPassword, profileUrl  });

        const { userIdx } = await this.repo.save(new_user);
        await this.repo.update(userIdx, { nickname:`${userIdx}번째 익명이` } );

        return { userIdx, email };
        

    }

    async signIn(email: string, password: string){
        const payload = await this.validateUser(email, password);

        return await this.login(payload);
    }

    async updateUserInfo(userIdx: number, attrs: Partial<UpdateUserInfo>) {
        const user = await this.findActiveUserByUserIdx(userIdx);
        if(attrs?.password){
            Object.assign(attrs, { password: await createHashedPassword(attrs.password) });
        }

        Object.assign(user, attrs);
        return await this.repo.save(user);
    }

    async updateUserLocation(userIdx: number, location: UpdateLocationDto) {
        const user = await this.findActiveUserByUserIdx(userIdx);
        let geometry1 = await wkx.Geometry.parseGeoJSON({ type: 'Point', coordinates: [127.1655347, 37.6118924] });
        let geometry2 = await wkx.Geometry.parseGeoJSON({ type: 'Point', coordinates: [127.1655347, 37.6118924] });

        // const closestPin = await this.pinRepo.query(
        //     `SELECT ST_DISTANCE(ST_GeomFromGeoJSON('${ geometry1 }'), ST_GeomFromGeoJSON('${ geometry2 }'));`
        // );


        // console.log(closestPin);
        
        // const point = `'POINT (${location.locationY} ${location.locationX})`;
        

        
        //const distance_tb = await this.pinRepo.query(query);


        // console.log(closestPin);
        return await this.repo.update(userIdx, location);
        //return Object.assign(result, closestPin);
    }
    
    

    async getDetailUserInfo(userIdx: number){
        const user = await this.repo.createQueryBuilder()
            .select(['user_idx, email, nickname, profile_url'])
            .where({ userIdx })
            .getRawOne();

        const moment = await this.momentRepo.createQueryBuilder()
        .select(['count(distinct pin_idx) as fin_count, count(moment_idx) as moment_count'])
        .where({ userIdx })
        .getRawOne();
        
        
        if(!user){
            throw new NotFoundException('해당 유저가 존재하지 않습니다.');
        }

        let newProfileInfo = {};
        for (let prop in Object.assign(user, moment)) {
            newProfileInfo[camelCase(prop)] = user[prop];
        }

        return newProfileInfo;
    }

    async findActiveUserByUserIdx(userIdx: number){
        const user = await this.repo.findOneBy({ userIdx });
        if(!user){
            throw new NotFoundException('해당 유저가 존재하지 않습니다.');
        }
        
        return user;
    }

    async findActiveUserByEmail(email: string){
        const user = await this.repo.findOneBy({ email });
        if(!user){
            throw new NotFoundException('해당 유저가 존재하지 않습니다.');
        }
        
        return user;
    }



    async validateUser(email: string, password: string){
        const user = await this.findActiveUserByEmail(email);

        if(!(await bcrypt.compare(password, user.password))){
            throw new UnauthorizedException('유저 정보가 올바르지 않습니다.');
        }

        return { id: user.userIdx, email };
    }

    async login(payload): Promise<SignInResponseDto>{
        const { id, email } = payload;
        return { 
            userIdx: id, 
            accessToken: await this.jwtService.signAsync(payload) 
        };
    }

    async deleteUser(userIdx: number): Promise<any> {
        return await this.repo.delete({ userIdx });
    }
}

