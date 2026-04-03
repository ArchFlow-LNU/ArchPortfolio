using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Models; 

namespace ArchPortfolio.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<ProjectCategory> ProjectCategories { get; set; } = null!;
        public DbSet<Project> Projects { get; set; } = null!;
        public DbSet<Review> Reviews { get; set; } = null!;
        public DbSet<ContactRequest> ContactRequests { get; set; } = null!;
        public DbSet<Admin> Admins { get; set; } = null!;
        public DbSet<ProjectImage> ProjectImages { get; set; }
        public DbSet<About> Abouts { get; set; }
        public DbSet<Step> Steps { get; set; }
        public DbSet<Advantage> Advantages { get; set; }
        public DbSet<FAQ> FAQs { get; set; }
        public DbSet<ContactInfo> ContactInfos { get; set; }

    }
}