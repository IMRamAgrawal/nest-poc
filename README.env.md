# Environment Variables

The following environment variables are required for the application to work properly:

## Auth
- `JWT_SECRET`: Secret key for signing JWT tokens
- `JWT_REFRESH_SECRET`: Secret key for refresh tokens
- `DATABASE_URL`: PostgreSQL connection URL

## SendGrid Email Configuration
- `SENDGRID_API_KEY`: Your SendGrid API key
- `SENDGRID_FROM_EMAIL`: Verified sender email address in SendGrid
- `FRONTEND_URL`: URL of your frontend application (for reset password links)

## Example .env file
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
FRONTEND_URL="http://localhost:3000"
```

## Installation Steps
1. Create a `.env` file in the root directory
2. Copy the above example and replace with your values
3. Install dependencies including @sendgrid/mail:
   ```bash
   npm install @sendgrid/mail
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```


   