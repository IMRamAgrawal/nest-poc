import { Controller, Get, Param, Patch, Body, Delete , UseGuards , Req} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('Users') // Tag for grouping endpoints in Swagger UI
@ApiBearerAuth()
@Controller('users')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AdminGuard) // Apply AdminGuard to this endpoint
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile')
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Retrieve the authenticated user\'s profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  getProfile(@Req() req) {
    console.log(req.user)
    return this.userService.getProfile(req.user.sub);
  }
  
  @Patch()
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Update a user' })
  // @ApiParam({ name: 'id', description: 'The ID of the user', example: '12345' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.sub, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Delete a user by ID' })
  // @ApiParam({ name: 'id', description: 'The ID of the user', example: '12345' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  delete(@Req() req) {
    return this.userService.delete(req.user.sub);
  }
}


