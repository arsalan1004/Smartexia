using backend.models.brand;
using backend.models.category;
using backend.models.operatingSystem;
using backend.models.product;
using Microsoft.EntityFrameworkCore;
using Supabase.Gotrue;
using User = backend.models.user.User;

namespace backend.data;

public class smartexiaContext: DbContext
{
    public smartexiaContext(DbContextOptions<smartexiaContext> options): base(options)
    {
    }
    public DbSet<User> User { get; set; }
    public DbSet<Category> Category { get; set; }
    public DbSet<brand> Brand { get; set; }
    public DbSet<operatingSystem> OperatingSystem { get; set; }
    public DbSet<product> Product { get; set; }
}