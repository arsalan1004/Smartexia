using backend.models.user;

namespace ApiDependencies.models.order;

public class order
{
    public int id { get; set; }
    public double totalPrice { get; set; }
    public string status { get; set; }
    public DateTime orderDate { get; set; }
    public int userId { get; set; }
    
    //Navigation Properties
    public User user { get; set; }
}