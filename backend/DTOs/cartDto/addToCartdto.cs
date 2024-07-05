using backend.models.user;

namespace backend.DTOs.cartDto;

public class addToCartdto
{
    public int productId { get; set; }
    public int quantity { get; set; }
    public int userId { get; set; }
}