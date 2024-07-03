namespace backend.models.cartItem;

public class cartItem
{
    public int id { get; set; }
    public int quantity { get; set; }
    public int cartId { get; set; }
    public int productId { get; set; }
    
    // Navigation properties
    public cart.cart cart { get; set; }
    public product.product product { get; set; }
}