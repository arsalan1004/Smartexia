using ApiDependencies.models.order;
using backend.models.brand;
using backend.models.cart;
using backend.models.cartItem;
using backend.models.category;
using backend.models.hub;
using backend.models.operatingSystem;
using backend.models.orderItem;
using backend.models.product;
using Microsoft.EntityFrameworkCore;
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
    public DbSet<hub> Hub { get; set; }
    
    public DbSet<cart> Cart { get; set; }
    public DbSet<cartItem> CartItem { get; set; }
    public DbSet<order> Order { get; set; }
    public DbSet<OrderItem> OrderItem { get; set; }
}