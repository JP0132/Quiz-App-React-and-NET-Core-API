using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models
{
    public class QuizDbContext:DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) { 
        
        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
