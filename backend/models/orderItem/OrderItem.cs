using ApiDependencies.models.order;

namespace backend.models.orderItem;

public class OrderItem
{
    public int id { get; set; }
    public int quantity { get; set; }
    public double price { get; set; }
    public int productId { get; set; }
    public int orderId { get; set; }
    
    // Navigation Peoperties
    public product.product product { get; set; }
    public order order { get; set; }
    
}