import { User } from '../../entities/users.entity';

export interface GetAllUsersDTO {
  users: User[];  // Using User interface for the array
  totalCount: number;        // Total number of users
  page: number;              // Current page
  itemsPerPage: number;      // Number of items per page
}
