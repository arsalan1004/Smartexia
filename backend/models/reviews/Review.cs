using backend.models.user;

namespace backend.models.reviews;

public class Review
{
    public int id { get; set; }
    public int rating { get; set; }
    public string comment { get; set; }
    public int userId { get; set; }
    public int productId { get; set; }
    
    //Navigation properties
    public User user { get; set; }
    public product.product product { get; set; }
}