using ApiDependencies.models.order;
using ApiDependencies.models.productFirmware;
using backend.models.brand;
using backend.models.cart;
using backend.models.cartItem;
using backend.models.category;
using backend.models.firmware;
using backend.models.hub;
using backend.models.networkBand;
using backend.models.operatingSystem;
using backend.models.orderItem;
using backend.models.product;
using backend.models.protocol;
using backend.models.reviews;
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
    public DbSet<Review> Review { get; set; }
    public DbSet<Protocol> Protocol { get; set; }
    public DbSet<NetworkBand> NetworkBand { get; set; }
    public DbSet<Firmware> Firmware { get; set; }
    public DbSet<ProductFirmware> ProductFirmware { get; set; }
    public DbSet<ProductNetworkBand> ProductNetworkBand { get; set; }
    public DbSet<ProductProtocol> ProductProtocol { get; set; }
}