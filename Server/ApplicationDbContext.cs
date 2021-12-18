using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Strelly;

namespace Strelly {
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, long> {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : base(options) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("DbContext"));
        }

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .HasMany(user => user.AssignedTasks)
                .WithMany(task => task.Assignees)
                .UsingEntity(e => e.ToTable("Assignees"));

            builder.Entity<Link>()
                .HasOne(link => link.FromTask)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Link>()
                .HasOne(link => link.ToTask)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

        }

        public DbSet<Column> Column { get; set; }

        public DbSet<Task> Task { get; set; }

        public DbSet<Link> Link { get; set; }
    }
}
