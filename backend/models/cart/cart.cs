using backend.models.user;

namespace backend.models.cart;

public class cart
{
    public int id { get; set; }
    public int userId { get; set; }
    
    // Navigation properties
    public User user { get; set; }
}