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
}