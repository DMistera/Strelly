using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Strelly;
using Strelly.Link;

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
        }

        public DbSet<Strelly.Column> Column { get; set; }

        public DbSet<Strelly.Task> Task { get; set; }

        public DbSet<Strelly.Link.Link> Link { get; set; }
    }
}
