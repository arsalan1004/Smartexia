using Microsoft.EntityFrameworkCore;
using Supabase.Gotrue;
using User = backend.models.user.User;

namespace backend.data;

public class supabaseContext: DbContext
{
    public supabaseContext(DbContextOptions<supabaseContext> options): base(options)
    {
    }
    public DbSet<User> User { get; set; }
}